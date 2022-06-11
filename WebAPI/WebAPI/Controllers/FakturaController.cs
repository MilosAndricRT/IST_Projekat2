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
            new Faktura{ PIB=456234321,PIB2=537852917,datumGenerisanja="testdatum",datumPlacanja="testdatumplacanja",ukupnaCena=1000,tipFakture="ulazna"}
        };
        [HttpGet("{PIB}")]
        public IActionResult ukupanBrojPreduzeca(double PIB)
        {
            return Ok("TODO");
        }
    }
}
