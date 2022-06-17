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
    pib:number;
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
    pib:number;
    pib2:number;
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
            <h2 class="accordion-header" id="flush-headingOne-tim-${t.pib}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne-tim-${t.pib}" aria-expanded="false" aria-controls="flush-collapseOne-tim-${t.pib}">
                ${t.naziv}
              </button>
            </h2>
            <div id="flush-collapseOne-tim-${t.pib}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne-tim-${t.pib}" data-bs-parent="#accordionFlushExample">
            <ul>
                <li>Odgovorno Lice: ${t.ime} ${t.prezime}</li>
                <li>Adresa: ${t.adresa}</li>
                <li>Email: ${t.email}</li>
                <li>Pib: ${t.pib}</li>
            </ul> 

            <div id="ovdeforma-${t.pib}"></div>
            <div id="ovdeforma-dodavanjefak-${t.pib}"></div>
            <button onclick="IzmeniPreduzece.izmeniPreduzece('${t.ime}','${t.prezime}','${t.email}','${t.naziv}','${t.adresa}','${t.pib}')">Izmeni</button>
            <button onclick="RadSaPrikazom.listajFaktureZa('${t.pib}')">Prikazi fakture za preduzece</button>
            <button onclick="DodavanjeFakture.dodavanjeFakture('${t.pib}')">Dodaj Fakturu</button>
            <div id="ovdelistaFak-${t.pib}"></div>


            </div>
          </div>`
        })
        return prikaz
    }
    static prikaziDetaljeFaktura(timovi:Array<Faktura>){
        let prikaz="";
        timovi.forEach(t=>{
            prikaz+=`<div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne-tim-${t.id}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne-tim-${t.id}" aria-expanded="false" aria-controls="flush-collapseOne-tim-${t.id}">
                ${t.naziv}
              </button>
            </h2>
            <div id="flush-collapseOne-tim-${t.id}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne-tim-${t.id}" data-bs-parent="#accordionFlushExample">
            <ul>
                <li>Id: ${t.id}</li>
                <li>Pib: ${t.pib}</li>
                <li>Pib primaoca fakture: ${t.pib2}</li>
                <li>Datum: ${t.datumGenerisanja}</li>
                <li>Datum Uplate: ${t.datumPlacanja}</li>
                <li>Cena: ${t.ukupnaCena}</li>
                <li>Tip: ${t.tipFakture}</li>
            </ul> 

            <div id="ovdebilans-${t.pib}"></div>
            <button onclick="RadSaPrikazom.bilans('${t.id}')">Izmeni fakturu</button>
            

            <div id="ovdeforma-zimenafak-${t.pib}"></div>
            <button onclick="IzmenaFakture.izmenaFakture('${t.id}','${t.id}','${t.id}','${t.id}','${t.id}','${t.id}')">Izmeni fakturu</button>
            
            

            </div>
          </div>`
        })
        return prikaz
    }
    static listajFaktureZa(pib){
        settings.url=`http://localhost:5292/api/Faktura/${pib}/0`
        $.ajax(settings).done(function (response) {
            document.getElementById("ovdelistaFak-" + pib).innerHTML =`
        <div class="accordion accordion-flush" id="accordionFlushExample">${RadSaPrikazom.prikaziDetaljeFaktura(response)}</div>
        `
        });
        
    }

    static prikaziPreduzeca(div:HTMLElement){
    settings.url=`http://localhost:5292/api/Preduzece/ukupanBrojPreduzeca`
        let timovi=[];
        $.ajax(settings).done(function (response) {
            div.innerHTML =`
        <div class="accordion accordion-flush" id="accordionFlushExample">${RadSaPrikazom.prikaziDetaljePreduzeca(response)}</div>
        `
        });
        
    }
    static prikaziFakture(pib, page:number){
       const div = document.getElementById("ovdelistaFak-" + pib);
        settings.url=`http://localhost:5292/api/Faktura/sveFakture/${page}`
        div.innerHTML=""
        $.ajax(settings).done(function (response:FakturaResponse) {
            response.data.forEach(i=>{
                div.innerHTML+=`<p>${i.pib} ${i.pib2} - ${i.naziv}</p>`
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

class DodajPreduzece{
    static dodajPreduzece(){
        
        document.getElementById("dodavanjePreduzeca").innerHTML=`<form id="postForm" class="editForm" action="http://localhost:5292/api/Preduzece/dodajPreduzece" method="post">
        Ime: <input type="text" name="ime"><br>
        Prezime: <input type="text" name="prezime"><br>
        Email: <input type="email" name="email"><br>
        Naziv preduzeca: <input type="text" name="naziv"><br>
        Adresa: <input type="text" name="adresa"><br>
        PIB: <input type="number" name="PIB"><br>
        <button  type="submit" >Dodaj</button>
        </form>`
        
      /*
        $("#postForm").submit((e) => {
        e.preventDefault();
        $.ajax({
        url: "http://localhost:5292/api/Preduzece/ukupanBrojPreduzeca",
        type: "post",
        data: $("#postForm").serialize(),
        success: () => {
            alert("Izmenjeno Preduzece sa pibom " + broj + "!")
        }
    });
    })    */  
    }

}


class IzmeniPreduzece{
    
    static izmeniPreduzece(ime,prezime,email,naziv,adresa,pib){
        document.getElementById("ovdeforma-" + pib).innerHTML=`<form action="http://localhost:5292/api/Preduzece/izmeniPreduzece" method="post">
        Ime: <input type="text" name="ime" value="${ime}"><br>
        Prezime: <input type="text" name="prezime" value="${prezime}"><br>
        Email: <input type="email" name="email" value="${email}"><br>
        Naziv preduzeca: <input type="text" name="naziv" value="${naziv}"><br>
        Adresa: <input type="text" name="adresa" value="${adresa}"><br>
        PIB: <input type="number" name="PIB" value="${pib}"><br>
        <input type="hidden" name="PIBstari" value="${pib}">
        <button type="submit" name="">Saqcuvaj Izmene</button>
    </form><br>`
   
}
}
//RadSaPrikazom.prikaziPreduzeca(document.querySelector("#timovi"));
//RadSaPrikazom.prikaziFakture(,0);



const dugme:HTMLButtonElement=document.getElementById("dugme") as HTMLButtonElement;

dugme.addEventListener('click',(e:Event)=>RadSaPrikazom.prikaziPreduzeca(document.querySelector("#preduzeca")));


const dugmee:HTMLButtonElement=document.getElementById("dodajPreduzece") as HTMLButtonElement;

dugmee.addEventListener('click',(e:Event)=>DodajPreduzece.dodajPreduzece());

