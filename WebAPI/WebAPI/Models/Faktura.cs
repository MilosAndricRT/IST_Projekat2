namespace WebAPI.Models
{
    public class Faktura
    {
        public int PIB { get; set; }
        public int PIB2 { get; set; }
        public string datumGenerisanja { get; set; }
        public string datumPlacanja { get; set; }
        public double ukupnaCena { get; set; }
        public string tipFakture { get; set; }
    }
}
