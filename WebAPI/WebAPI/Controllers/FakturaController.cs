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
            new Faktura{ id=1,PIB=456234321,PIB2=537852917,datumGenerisanja="01/02/2022",datumPlacanja="testdatumplacanja",ukupnaCena=1000,tipFakture="ulazna"},
            new Faktura{ id=2,PIB=456234321,PIB2=542685398,datumGenerisanja="02/06/2022",datumPlacanja="testdatumplacanja1",ukupnaCena=1001,tipFakture="izlazna"},
            new Faktura{ id=3,PIB=273234592,PIB2=421754368,datumGenerisanja="01/02/2018",datumPlacanja="testdatumplacanja2",ukupnaCena=30,tipFakture="ulazna"}
        };
        [HttpGet("sveFakture")]
        public IActionResult sveFakture()
        {
            return Ok(fakture);
        }
        [HttpGet("{PIB}")]
        public IActionResult faktureZaJednuFirmu(double PIB)
        {
            return Ok(fakture.Where(x=>x.PIB==PIB));
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
        public IActionResult dodavanje([FromForm] int PIB, [FromForm] int PIB2, [FromForm] string datumGenerisanja, [FromForm] string datumPlacanja, [FromForm] double ukupnaCena, [FromForm] string tipFakture)
        {
            if (proveraPib(PIB))
            {
                return Ok("PIB je u netacnom formatu!!!");
            }

            Faktura fak = new Faktura();
            fak.id = sledeciId();
            fak.PIB = PIB;
            fak.PIB2 = PIB2;
            fak.datumGenerisanja = datumGenerisanja;
            fak.datumPlacanja = datumPlacanja;
            fak.ukupnaCena = ukupnaCena;
            fak.tipFakture = tipFakture;
            fakture.Add(fak);
            return Ok(fak);
        }
        [HttpPost("izmeniFakturu")]
        public IActionResult izmeniPreduzece([FromForm] int PIB, [FromForm] int PIB2, [FromForm] string datumGenerisanja, [FromForm] string datumPlacanja, [FromForm] double ukupnaCena, [FromForm] string tipFakture, [FromForm] double PIBstari, [FromForm] double PIB2stari)
        {
            if (proveraPib(PIB))
            {
                return Ok("PIB je u netacnom formatu!!!");
            }
            int pozicija = -1;
            for (int i = 0; i < fakture.Count; i++)
            {
                Faktura temp = fakture[i];
                if (temp.PIB == PIBstari && temp.PIB2==PIB2stari)
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
            fak.PIB = PIB;
            fak.PIB2 = PIB2;
            fak.datumGenerisanja = datumGenerisanja;
            fak.datumPlacanja = datumPlacanja;
            fak.ukupnaCena = ukupnaCena;
            fak.tipFakture = tipFakture;
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
