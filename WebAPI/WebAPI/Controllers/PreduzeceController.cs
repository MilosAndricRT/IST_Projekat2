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
            new Preduzece{ime="nesto",prezime="nesto2",email="nesto@gmail.com",naziv="nesto3",adresa="nesto4",PIB= 456234321}
        };
        [HttpGet]       
        public IEnumerable<Preduzece> ukupanBrojPreduzeca()
        {
            return preduzece;
        }

    }
}
