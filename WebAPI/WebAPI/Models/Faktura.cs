namespace mojePreduzece.Models
{
    public class Faktura
    {
        public int id { get; set; }
        public int PIB { get; set; }
        public int PIB2 { get; set; }
        public string datumGenerisanja { get; set; }
        public string datumPlacanja { get; set; }
        public double ukupnaCena { get; set; }
        public string tipFakture { get; set; }
        public string naziv { get; set; }
        public int cenaPoJediniciMere { get; set; }
        public string jedinicaMere { get; set; }
        public int kolicina { get; set; }
    }
}
