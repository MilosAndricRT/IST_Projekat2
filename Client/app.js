let ucitavanje=document.getElementById("celina");
let url="http://localhost:5292/api/Preduzece";
let btn=document.getElementById("dugme");
btn.addEventListener("click",()=>{
    fetch(url).then(resp=>resp.json()).then((data)=>{
        data.forEach(element => {
            const {ime,prezime,email,naziv,adresa,PIB}=element;
            ucitavanje.innerHTML=`<ul><li>${ime}</li>
            <li>${prezime}</li>
            <li>${email}</li>
            <li>${naziv}</li>
            <li>${adresa}</li>
            <li>${PIB}</li></ul>`
        });
    });
})

