using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mojePreduzece.Models;

namespace mojePreduzece.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PreduzeceController : ControllerBase
    {
        static List<Preduzece> preduzeca = new List<Preduzece>()
        {
            new Preduzece{ime="Milan",prezime="Milanovic",email="milanmilanovic@gmail.com",naziv="PanAuto",adresa="Pancevo",PIB= 456234321},
            new Preduzece{ime="Luka",prezime="Lukic",email="lukalukic@gmail.com",naziv="Lancast",adresa="Novi Sad",PIB=273234592},
            new Preduzece{ime="Ana",prezime="Nikolic",email="ananikolic@gmail.com",naziv="IDJ",adresa ="Nis",PIB =537852917}
        };
        [HttpGet("ukupanBrojPreduzeca")]       
        public IActionResult ukupanBrojPreduzeca()
        {
            return Ok(preduzeca.OrderBy(Preduzece => Preduzece.PIB).ThenBy(Preduzece => Preduzece.naziv));
        }

        [HttpPost("dodajPreduzece")]
        public IActionResult dodavanje([FromForm] string ime, [FromForm] string prezime, [FromForm] string email, [FromForm] string naziv, [FromForm] string adresa, [FromForm] double PIB)
        {
            if (proveraPib(PIB))
            {
                return Ok("PIB je u netacnom formatu!!!");
            }
            foreach (Preduzece item in preduzeca)
            {
                if (item.PIB == PIB)
                {
                    return Ok("Vec postoji dati PIB!!!");
                }
            }
            Preduzece preduzece = new Preduzece();
            preduzece.ime = ime;
            preduzece.prezime = prezime;
            preduzece.email = email;
            preduzece.naziv = naziv;
            preduzece.adresa = adresa;
            preduzece.PIB = PIB;
            preduzeca.Add(preduzece);
            return Ok(preduzece);
        }

        [HttpPost("izmeniPreduzece")]
        public IActionResult izmeniPreduzece([FromForm] string ime, [FromForm] string prezime, [FromForm] string email, [FromForm] string naziv, [FromForm] string adresa, [FromForm] double PIB,[FromForm] double PIBstari)
        {
            if (proveraPib(PIB))
            {
                return Ok("PIB je u netacnom formatu!!!");
            }
            int pozicija = -1;
            for (int i = 0; i < preduzeca.Count; i++)
            {
                Preduzece temp = preduzeca[i];
                if(temp.PIB == PIBstari)
                {
                    pozicija = i;
                    break;
                }
            }
            if (pozicija == -1)
            {
                return Ok("Nismo pronasli preduzece koje trazite");
            }
            Preduzece preduzece = new Preduzece();
            preduzece.ime = ime;
            preduzece.prezime = prezime;
            preduzece.email = email;
            preduzece.naziv = naziv;
            preduzece.adresa = adresa;
            preduzece.PIB = PIB;
            preduzeca[pozicija] = preduzece;
            return Ok(preduzece);
        }

        private bool proveraPib(double PIB)
        {
            if(PIB<99999999 && PIB>1000000000)
            {
                return true;
            }

            return false;
        }
    }
}
