let ucitavanje=document.getElementById("celina");
let url="http://localhost:5292/api/Preduzece/ukupanBrojPreduzeca";
let btn=document.getElementById("dugme");
btn.addEventListener("click",()=>{
    fetch(url).then(resp=>resp.json()).then((data)=>{
        ucitavanje.innerHTML="";
        data.forEach(element => {
            const {ime,prezime,email,naziv,adresa,pib}=element;
            ucitavanje.innerHTML+=`<ul><li>${ime}</li>
            <li>${prezime}</li>
            <li>${email}</li>
            <li>${naziv}</li>
            <li>${adresa}</li>
            <li>${pib}</li></ul>
            <button onclick="izmeniPreduzece('${ime}','${prezime}','${email}','${naziv}','${adresa}','${pib}')">Izmeni</button>`
        });
    });
})

const izmeniPreduzece=(ime,prezime,email,naziv,adresa,pib)=>{
    let url = "http://localhost:5292/api/Preduzece/izmeniPreduzece"
    let root=document.getElementById("celina")
    root.innerHTML=`<form action="${url}" method="post">
    Ime: <input type="text" name="ime" value="${ime}"><br>
    Prezime: <input type="text" name="prezime" value="${prezime}"><br>
    Email: <input type="email" name="email" value="${email}"><br>
    Naziv preduzeca: <input type="text" name="naziv" value="${naziv}"><br>
    Adresa: <input type="text" name="adresa" value="${adresa}"><br>
    PIB: <input type="number" name="PIB" value="${pib}"><br>
    <input type="hidden" name="PIBstari" value="${pib}">
    <button type="submit" name="">Izmeni</button>
</form>`
};
const dodajPreduzece=()=>{
    let url = "http://localhost:5292/api/Preduzece/dodajPreduzece"
    let root=document.getElementById("celina")
    root.innerHTML=`<form action="${url}" method="post">
    Ime: <input type="text" name="ime"><br>
    Prezime: <input type="text" name="prezime"><br>
    Email: <input type="email" name="email"><br>
    Naziv preduzeca: <input type="text" name="naziv"><br>
    Adresa: <input type="text" name="adresa"><br>
    PIB: <input type="number" name="PIB"><br>
    <button type="submit" name="">Dodaj</button>
</form>`
};
document.getElementById("dodajPreduzece").addEventListener("click",()=>{
    dodajPreduzece();
})

