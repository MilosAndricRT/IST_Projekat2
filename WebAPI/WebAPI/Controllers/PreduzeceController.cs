using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mojePreduzece.Models;

namespace mojePreduzece.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PreduzeceController : ControllerBase
    {
        Preduzece[] preduzece = new Preduzece[]
        {
            new Preduzece{ime="Milan",prezime="Milanovic",email="milanmilanovic@gmail.com",naziv="PanAuto",adresa="Pancevo",PIB= 456234321},
            new Preduzece{ime="Luka",prezime="Lukic",email="lukalukic@gmail.com",naziv="Lancast",adresa="Novi Sad",PIB=273234592},
            new Preduzece{ime="Ana",prezime="Nikolic",email="ananikolic@gmail.com",naziv="IDJ",adresa ="Nis",PIB =537852917}
        };
        [HttpGet]       
        public IEnumerable<Preduzece> ukupanBrojPreduzeca()
        {
            return preduzece;
        }

    }
}
