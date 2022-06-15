const settings = {
	"async": true,
	"crossDomain": true,
	"url": "http://localhost:5292/api/Preduzece/ukupanBrojPreduzeca",
	"method": "GET"
};


interface Preduzece{
    ime:string;
    prezime:string;
    email:string;
    naziv:string;
    adresa:string;
    PIB:number;
}
interface FakturaResponse{
    data:Array<Faktura>;
    meta:{
        total_pages:number;
        current_page:number;
        next_page:number;
    }
}
interface Faktura{
    id:number;
    PIB:number;
    PIB2:number;
    datumGenerisanja:string;
    datumPlacanja:string;
    ukupnaCena:number;
    tipFakture:string;
    naziv:string;
    cenaPoJediniciMere:number;
    jedinicaMere:string;
    kolicina:number;
}
class RadSaPrikazom{
    static prikaziDetaljePreduzeca(timovi:Array<Preduzece>){
        let prikaz="";
        timovi.forEach(t=>{
            prikaz+=`<div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne-tim-${t.PIB}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne-tim-${t.PIB}" aria-expanded="false" aria-controls="flush-collapseOne-tim-${t.PIB}">
                ${t.naziv}
              </button>
            </h2>
            <div id="flush-collapseOne-tim-${t.PIB}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne-tim-${t.PIB}" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">${t.adresa}-${t.ime}-${t.prezime}</div>
            </div>
          </div>`
        })
        return prikaz
    }
    static prikaziPreduzeca(div:HTMLElement){
        let timovi=[];
        $.ajax(settings).done(function (response) {
            div.innerHTML =`
        <div class="accordion accordion-flush" id="accordionFlushExample">${RadSaPrikazom.prikaziDetaljePreduzeca(response.data)}</div>
        `
        });
        
    }
    static prikaziFakture(div:HTMLElement,page:number){
        
        settings.url=`http://localhost:5292/api/Faktura/sveFakture/${page}`
        div.innerHTML=""
        $.ajax(settings).done(function (response:FakturaResponse) {
            response.data.forEach(i=>{
                div.innerHTML+=`<p>${i.PIB} ${i.PIB2} - ${i.naziv}</p>`
            })
            div.innerHTML+=`<ul class="pagination">
            <li class="page-item"><a class="page-link" id="previous_page" data-page=${response.meta.current_page-1}>Previous</a></li>
            <li class="page-item"><a class="page-link" id="next_page" data-page=${response.meta.next_page}>Next</a></li>
          </ul>`
          document.querySelector("#previous_page").addEventListener("click",()=>{
            let page=parseInt(document.querySelector("#previous_page").getAttribute("data-page"));  
            if(page<0){
                page=0;
            }
            RadSaPrikazom.prikaziFakture(document.querySelector("#fakture"),page);
          })
          document.querySelector("#next_page").addEventListener("click",()=>{
            let page=parseInt(document.querySelector("#next_page").getAttribute("data-page"));
            RadSaPrikazom.prikaziFakture(document.querySelector("#fakture"),page);
        })
        });
    }
    
}
RadSaPrikazom.prikaziPreduzeca(document.querySelector("#timovi"));
RadSaPrikazom.prikaziFakture(document.querySelector("#fakture"),0);