using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mojePreduzece.Models;

namespace mojePreduzece.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FakturaController : ControllerBase
    {
        static List<Faktura> fakture = new List<Faktura>()
        {
            new Faktura{ id=1,PIB=456234321,PIB2=537852917,datumGenerisanja="01/02/2022",datumPlacanja="testdatumplacanja",ukupnaCena=1000,tipFakture="ulazna",naziv="testnaziv1",cenaPoJediniciMere=15,jedinicaMere="kg",kolicina=5},
            new Faktura{ id=2,PIB=456234321,PIB2=542685398,datumGenerisanja="02/06/2022",datumPlacanja="testdatumplacanja1",ukupnaCena=1001,tipFakture="izlazna",naziv="testnaziv2",cenaPoJediniciMere=10,jedinicaMere="kg",kolicina=3},
            new Faktura{ id=3,PIB=273234592,PIB2=421754368,datumGenerisanja="01/02/2018",datumPlacanja="testdatumplacanja2",ukupnaCena=30,tipFakture="ulazna",naziv="testnaziv3",cenaPoJediniciMere=5,jedinicaMere="kg",kolicina=4}
        };
        [HttpGet("sveFakture/{strana}")]
        public IActionResult sveFakture(int strana)
        {
            List<Faktura> fakturaList = new List<Faktura>();
            for (int i = strana; i < strana+10 && i<fakture.Count; i++)
            {
                fakturaList.Add(fakture[i]);
            }
            return Ok(fakturaList);
        }
        [HttpGet("{PIB}/{strana}")]
        public IActionResult faktureZaJednuFirmu(double PIB,int strana)
        {
            List<Faktura> fakturaList = new List<Faktura>();
            for (int i = strana; i < strana + 10 && i < fakture.Count; i++)
            {
                if(fakture[i].PIB==PIB || fakture[i].PIB2==PIB)
                {
                    fakturaList.Add(fakture[i]);
                }
                
            }
            return Ok(fakturaList);
        }
        [HttpGet("bilans/{PIB}/{Od}/{Do}")]
        public IActionResult bilans(double PIB,string Od,string Do)
        {
            double ukupno=0;
            DateTime Odd=Convert.ToDateTime(Od.Replace("%2F","/"));
            DateTime Dod=Convert.ToDateTime(Do.Replace("%2F", "/"));
            List<Faktura> temp=new List<Faktura>();
            foreach (Faktura item in fakture)
            {
                DateTime ispitian=Convert.ToDateTime(item.datumGenerisanja);
                if(ispitian>Odd && ispitian<Dod)
                {
                    temp.Add(item);
                }
            }
            foreach (Faktura item in temp)
            {
                if (item.PIB==PIB)
                {
                    if (item.tipFakture == "ulazna")
                    {
                        ukupno += item.ukupnaCena;
                    }
                    else
                    {
                        ukupno -= item.ukupnaCena;
                    }
                }  
            }
            return Ok(ukupno);
        }
        [HttpPost("dodajFakturu")]
        public IActionResult dodavanjeFakture([FromForm] int PIB, [FromForm] int PIB2, [FromForm] string datumGenerisanja, [FromForm] string datumPlacanja, [FromForm] double ukupnaCena, [FromForm] string tipFakture, [FromForm] string naziv, [FromForm] int cenaPoJediniciMere, [FromForm] string jedinicaMere, [FromForm] int kolicina)
        {
            if (proveraPib(PIB))
            {
                return Ok("PIB je u netacnom formatu!!!");
            }
            if (proveraPib(PIB2))
            {
                return Ok("PIB2 je u netacnom formatu!!!");
            }

            string drugaFaktura = "";
            if (tipFakture == "ulazna")
            {
                drugaFaktura = "izlazna";
            }
            else
            {
                drugaFaktura = "ulazna";
            }
            int id = sledeciId();
            Faktura faktura2 = new Faktura();
            Faktura faktura = new Faktura();
            faktura.id = id;
            faktura.PIB = PIB;
            faktura.PIB2 = PIB2;
            faktura.datumGenerisanja = datumGenerisanja;
            faktura.datumPlacanja = datumPlacanja;
            faktura.ukupnaCena = ukupnaCena;
            faktura.tipFakture = tipFakture;
            faktura.naziv = naziv;
            faktura.cenaPoJediniciMere = cenaPoJediniciMere;
            faktura.jedinicaMere = jedinicaMere;
            faktura.kolicina = kolicina;
            faktura2.id = id+1;
            faktura2.PIB = PIB2;
            faktura2.PIB2 = PIB;
            faktura2.datumGenerisanja = datumGenerisanja;
            faktura2.datumPlacanja = datumPlacanja;
            faktura2.ukupnaCena = ukupnaCena;
            faktura2.tipFakture = drugaFaktura;
            faktura2.naziv = naziv;
            faktura2.cenaPoJediniciMere = cenaPoJediniciMere;
            faktura2.jedinicaMere = jedinicaMere;
            faktura2.kolicina = kolicina;
            fakture.Add(faktura);
            fakture.Add(faktura2);
            return Ok(fakture);
        }
        [HttpPost("izmeniFakturu")]
        public IActionResult izmeniFakturu([FromForm] int PIB, [FromForm] int PIB2, [FromForm] string datumGenerisanja, [FromForm] string datumPlacanja, [FromForm] double ukupnaCena, [FromForm] string tipFakture, [FromForm] string naziv, [FromForm] int cenaPoJediniciMere, [FromForm] string jedinicaMere, [FromForm] int kolicina,[FromForm] int id)
        {
            if (proveraPib(PIB))
            {
                return Ok("PIB je u netacnom formatu!!!");
            }
            if (proveraPib(PIB2))
            {
                return Ok("PIB2 je u netacnom formatu!!!");
            }
            int pozicija = -1;
            for (int i = 0; i < fakture.Count; i++)
            {
                Faktura temp = fakture[i];
                if (temp.id == id)
                {
                    pozicija = i;
                    break;
                }
            }
            if (pozicija == -1)
            {
                return Ok("Nismo pronasli fakturu koju trazite");
            }
            Faktura fak = new Faktura();
            fak.id = id;
            fak.PIB = PIB;
            fak.PIB2 = PIB2;
            fak.datumGenerisanja = datumGenerisanja;
            fak.datumPlacanja = datumPlacanja;
            fak.ukupnaCena = ukupnaCena;
            fak.tipFakture = tipFakture;
            fak.naziv = naziv;
            fak.cenaPoJediniciMere = cenaPoJediniciMere;
            fak.jedinicaMere = jedinicaMere;
            fak.kolicina = kolicina;
            fakture[pozicija] = fak;
            return Ok(fak);
        }
        private bool proveraPib(double PIB)
        {
            if (PIB > 99999999 && PIB < 1000000000)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        private int sledeciId()
        {
            int resenje=0;
            foreach (Faktura item in fakture)
            {
                if(resenje<item.id)
                {
                    resenje=item.id;
                }
            }
            return resenje+1;
        }
    }
}
