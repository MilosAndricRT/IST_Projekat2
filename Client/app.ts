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
    piB2:number;
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
              <button id="#felush-collapseOne-tim-${t.pib}" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne-tim-${t.pib}" aria-expanded="false" aria-controls="flush-collapseOne-tim-${t.pib}">
                ${t.naziv}
              </button>
            </h2>
            <div id="flush-collapseOne-tim-${t.pib}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne-tim-${t.pib}" data-bs-parent="#felush-collapseOne-tim-${t.pib}">
            <ul>
                <li>Odgovorno Lice: ${t.ime} ${t.prezime}</li>
                <li>Adresa: ${t.adresa}</li>
                <li>Email: ${t.email}</li>
                <li>Pib: ${t.pib}</li>
            </ul> 
            <div id="ovdebilans-${t.pib}"></div>
            <button onclick="Bilans.bilans('${t.pib}')">Bilans</button>
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
    static prikaziFiltriranjePoPibu(div:HTMLElement){
        let enterprises=[];
        let url = "http://localhost:5292/api/Preduzece/filtrirajPreduzecePoPibu";
        let pib = document.getElementById("pib") as HTMLInputElement;
        fetch(url + `?promenljiva=${pib.value}`).then(resp => resp.json()).then((data) => {
            console.log(data)
            div.innerHTML =`
            <div class="accordion accordion-flush" id="accordionFlushExample">${RadSaPrikazom.prikaziDetaljePreduzeca(data)}</div>`
       
        }).catch(err => console.log(err))
    }

    static prikaziFiltriranjePoNazivu(div:HTMLElement){
        let enterprises=[];
        let url = "http://localhost:5292/api/Preduzece/filtrirajPreduzecePoNazivu";
        let name = document.getElementById("name") as HTMLInputElement;
        fetch(url + `/${name.value}`).then(resp => resp.json()).then((data) => {

            div.innerHTML =`
            <div class="accordion accordion-flush" id="accordionFlushExample">${RadSaPrikazom.prikaziDetaljePreduzeca(data)}</div>`
        }).catch(err => console.log(err))
    }

    static prikaziFiltriranjePoPibuINazivu(div:HTMLElement){
        let enterprises=[];
        let url = "http://localhost:5292/api/Preduzece/filtrirajPreduzecePoNazivuIPibu";
        let name = document.getElementById("name") as HTMLInputElement;
        let pib = document.getElementById("pib") as HTMLInputElement;
        fetch(url + `/${name.value}/${pib.value}`).then(resp => resp.json()).then((data) => {
            div.innerHTML =`
            <div class="accordion accordion-flush" id="accordionFlushExample">${RadSaPrikazom.prikaziDetaljePreduzeca(data)}</div>`
        }).catch(err => console.log(err))
    }
    static prikaziDetaljeFaktura(timovi:Array<Faktura>){
        let prikaz="";
        timovi.forEach(t=>{
            prikaz+=`<div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne-tim-perica-${t.id}">
              <button id="#fealush-collapseOne-tim-${t.id}" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne-tim-perica-${t.id}" aria-expanded="false" aria-controls="flush-collapseOne-tim-perica-${t.id}">
                ${t.naziv} - ${t.tipFakture}
              </button>
            </h2>
            <div id="flush-collapseOne-tim-perica-${t.id}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne-tim-perica-${t.id}" data-bs-parent="#fealush-collapseOne-tim-${t.id}">
            <ul>
                <li>Id: ${t.id}</li>
                <li>Pib: ${t.pib}</li>
                <li>Pib primaoca fakture: ${t.piB2}</li>
                <li>Datum: ${t.datumGenerisanja}</li>
                <li>Datum Uplate: ${t.datumPlacanja}</li>
                <li>Cena: ${t.ukupnaCena}</li>
                <li>Tip: ${t.tipFakture}</li>
                <li>Naziv: ${t.naziv}</li>
                <li>Cena po jedinici mere: ${t.cenaPoJediniciMere}</li>
                <li>Jedinica mere: ${t.jedinicaMere}</li>
                <li>Kolicina: ${t.kolicina}</li>
            </ul> 
            <div id="ovdeforma-izmenafak-${t.id}"></div>
            <button onclick="IzmenaFakture.izmenaFakture('${t.id}','${t.pib}','${t.piB2}','${t.datumGenerisanja}','${t.datumPlacanja}','${t.ukupnaCena}','${t.tipFakture}','${t.naziv}','${t.cenaPoJediniciMere}','${t.jedinicaMere}','${t.kolicina}')">Izmeni fakturu</button>
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
                div.innerHTML+=`<p>${i.pib} ${i.piB2} - ${i.naziv}</p>`
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
    }

}


class Bilans{
    static bilans(broj){
        document.getElementById("ovdebilans-" + broj).innerHTML=`<form id="postForm" class="editForm" action="http://localhost:5292/api/Faktura/bilans" method="post">
        <input type="hidden" name="PIB" value="${broj}"><br>
        OD: <input type="date" name="Od"><br>
        DO: <input type="date" name="Do"><br>
        <button  type="submit" >Izracunaj bilans</button>
        </form>`
    }

}

class DodavanjeFakture{
    static dodavanjeFakture(broj){
        document.getElementById("ovdeforma-dodavanjefak-"+broj).innerHTML=`<form id="postForm" class="editForm" action="http://localhost:5292/api/Faktura/dodajFakturu" method="post">
        <input type="hidden" name="PIB" value="${broj}"><br>
        PIB Kome: <input type="text" name="PIB2"><br>
        Datum Generisanja: <input type="text" name="datumGenerisanja"><br>
        Datum Placanja: <input type="text" name="datumPlacanja"><br>
        Ukupna cena: <input type="number" name="ukupnaCena"><br>
        Tip fakture: <input type="text" name="tipFakture"><br>
        Naziv: <input type="text" name="naziv"><br>
        Cena po jedinici mere: <input type="number" name="cenaPoJediniciMere"><br>
        Jedinica mere: <input type="text" name="jedinicaMere"><br>
        Kolicina: <input type="number" name="kolicina"><br>
        <button  type="submit" >Dodaj Fakturu</button>
        </form>`
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


class IzmenaFakture{    
    static izmenaFakture(id,pib, pib2, dg, dp, uc, tip, naz, cpj, jm, kol){
    document.getElementById("ovdeforma-izmenafak-"+id).innerHTML=`<form id="postForm" class="editForm" action="http://localhost:5292/api/Faktura/izmeniFakturu" method="post">
    <input type="hidden" name="id" value="${id}"><br>
    <input type="hidden" name="PIB" value="${pib}"><br>
    PIB Kome: <input type="text" name="PIB2" value="${pib2}"><br>
    Datum Generisanja: <input type="text" name="datumGenerisanja" value="${dg}"><br>
    Datum Placanja: <input type="text" name="datumPlacanja" value="${dp}"><br>
    Ukupna cena: <input type="number" name="ukupnaCena" value="${uc}"><br>
    Tip fakture: <input type="text" name="tipFakture" value="${tip}"><br>
    Naziv: <input type="text" name="naziv" value="${naz}"><br>
    Cena po jedinici mere: <input type="number" name="cenaPoJediniciMere" value="${cpj}"><br>
    Jedinica mere: <input type="text" name="jedinicaMere" value="${jm}"><br>
    Kolicina: <input type="number" name="kolicina" value="${kol}"><br>
    <button  type="submit" >Sacuvaj Izmene Fakture</button>
    </form>`
   
}
}
    
const dugme:HTMLButtonElement=document.getElementById("dugme") as HTMLButtonElement;

dugme.addEventListener('click',(e:Event)=>RadSaPrikazom.prikaziPreduzeca(document.querySelector("#preduzeca")));


const dugmee:HTMLButtonElement=document.getElementById("dodajPreduzece") as HTMLButtonElement;

dugmee.addEventListener('click',(e:Event)=>DodajPreduzece.dodajPreduzece());

let pibInput = document.querySelector("#pib") as HTMLInputElement;
let nameInput = document.querySelector("#name")  as HTMLInputElement;
const btnFilter=document.getElementById("btnFilter") as HTMLButtonElement;

btnFilter.addEventListener("click", () => {
    if(pibInput.value !="" && nameInput.value!="")
    {
        RadSaPrikazom.prikaziFiltriranjePoPibuINazivu(document.querySelector("#preduzeca"))
    }
    else if (pibInput.value != "") {
        RadSaPrikazom.prikaziFiltriranjePoPibu(document.querySelector("#preduzeca"));
    } else if (nameInput.value != "") {

        RadSaPrikazom.prikaziFiltriranjePoNazivu(document.querySelector("#preduzeca"));
    }
})

