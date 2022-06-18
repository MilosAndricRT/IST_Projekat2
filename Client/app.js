var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:5292/api/Preduzece/ukupanBrojPreduzeca",
    "method": "GET"
};
var RadSaPrikazom = /** @class */ (function () {
    function RadSaPrikazom() {
    }
    RadSaPrikazom.prikaziDetaljePreduzeca = function (timovi) {
        var prikaz = "";
        timovi.forEach(function (t) {
            prikaz += "<div class=\"accordion-item\">\n            <h2 class=\"accordion-header\" id=\"flush-headingOne-tim-".concat(t.pib, "\">\n              <button id=\"#felush-collapseOne-tim-").concat(t.pib, "\" class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseOne-tim-").concat(t.pib, "\" aria-expanded=\"false\" aria-controls=\"flush-collapseOne-tim-").concat(t.pib, "\">\n                ").concat(t.naziv, "\n              </button>\n            </h2>\n            <div id=\"flush-collapseOne-tim-").concat(t.pib, "\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingOne-tim-").concat(t.pib, "\" data-bs-parent=\"#felush-collapseOne-tim-").concat(t.pib, "\">\n            <ul>\n                <li>Odgovorno Lice: ").concat(t.ime, " ").concat(t.prezime, "</li>\n                <li>Adresa: ").concat(t.adresa, "</li>\n                <li>Email: ").concat(t.email, "</li>\n                <li>Pib: ").concat(t.pib, "</li>\n            </ul> \n            <div id=\"ovdebilans-").concat(t.pib, "\"></div>\n            <button onclick=\"Bilans.bilans('").concat(t.pib, "')\">Bilans</button>\n            <div id=\"ovdeforma-").concat(t.pib, "\"></div>\n            <div id=\"ovdeforma-dodavanjefak-").concat(t.pib, "\"></div>\n            <button onclick=\"IzmeniPreduzece.izmeniPreduzece('").concat(t.ime, "','").concat(t.prezime, "','").concat(t.email, "','").concat(t.naziv, "','").concat(t.adresa, "','").concat(t.pib, "')\">Izmeni</button>\n            <button onclick=\"RadSaPrikazom.listajFaktureZa('").concat(t.pib, "')\">Prikazi fakture za preduzece</button>\n            <button onclick=\"DodavanjeFakture.dodavanjeFakture('").concat(t.pib, "')\">Dodaj Fakturu</button>\n            <div id=\"ovdelistaFak-").concat(t.pib, "\"></div>\n\n\n            </div>\n          </div>");
        });
        return prikaz;
    };
    RadSaPrikazom.prikaziFiltriranjePoPibu = function (div) {
        var enterprises = [];
        var url = "http://localhost:5292/api/Preduzece/filtrirajPreduzecePoPibu";
        var pib = document.getElementById("pib");
        fetch(url + "?promenljiva=".concat(pib.value)).then(function (resp) { return resp.json(); }).then(function (data) {
            console.log(data);
            div.innerHTML = "\n            <div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">".concat(RadSaPrikazom.prikaziDetaljePreduzeca(data), "</div>");
        })["catch"](function (err) { return console.log(err); });
    };
    RadSaPrikazom.prikaziFiltriranjePoNazivu = function (div) {
        var enterprises = [];
        var url = "http://localhost:5292/api/Preduzece/filtrirajPreduzecePoNazivu";
        var name = document.getElementById("name");
        fetch(url + "/".concat(name.value)).then(function (resp) { return resp.json(); }).then(function (data) {
            div.innerHTML = "\n            <div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">".concat(RadSaPrikazom.prikaziDetaljePreduzeca(data), "</div>");
        })["catch"](function (err) { return console.log(err); });
    };
    RadSaPrikazom.prikaziFiltriranjePoPibuINazivu = function (div) {
        var enterprises = [];
        var url = "http://localhost:5292/api/Preduzece/filtrirajPreduzecePoNazivuIPibu";
        var name = document.getElementById("name");
        var pib = document.getElementById("pib");
        fetch(url + "/".concat(name.value, "/").concat(pib.value)).then(function (resp) { return resp.json(); }).then(function (data) {
            div.innerHTML = "\n            <div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">".concat(RadSaPrikazom.prikaziDetaljePreduzeca(data), "</div>");
        })["catch"](function (err) { return console.log(err); });
    };
    RadSaPrikazom.prikaziDetaljeFaktura = function (timovi) {
        var prikaz = "";
        timovi.forEach(function (t) {
            prikaz += "<div class=\"accordion-item\">\n            <h2 class=\"accordion-header\" id=\"flush-headingOne-tim-perica-".concat(t.id, "\">\n              <button id=\"#fealush-collapseOne-tim-").concat(t.id, "\" class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseOne-tim-perica-").concat(t.id, "\" aria-expanded=\"false\" aria-controls=\"flush-collapseOne-tim-perica-").concat(t.id, "\">\n                ").concat(t.naziv, " - ").concat(t.tipFakture, "\n              </button>\n            </h2>\n            <div id=\"flush-collapseOne-tim-perica-").concat(t.id, "\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingOne-tim-perica-").concat(t.id, "\" data-bs-parent=\"#fealush-collapseOne-tim-").concat(t.id, "\">\n            <ul>\n                <li>Id: ").concat(t.id, "</li>\n                <li>Pib: ").concat(t.pib, "</li>\n                <li>Pib primaoca fakture: ").concat(t.piB2, "</li>\n                <li>Datum: ").concat(t.datumGenerisanja, "</li>\n                <li>Datum Uplate: ").concat(t.datumPlacanja, "</li>\n                <li>Cena: ").concat(t.ukupnaCena, "</li>\n                <li>Tip: ").concat(t.tipFakture, "</li>\n                <li>Naziv: ").concat(t.naziv, "</li>\n                <li>Cena po jedinici mere: ").concat(t.cenaPoJediniciMere, "</li>\n                <li>Jedinica mere: ").concat(t.jedinicaMere, "</li>\n                <li>Kolicina: ").concat(t.kolicina, "</li>\n            </ul> \n            <div id=\"ovdeforma-izmenafak-").concat(t.id, "\"></div>\n            <button onclick=\"IzmenaFakture.izmenaFakture('").concat(t.id, "','").concat(t.pib, "','").concat(t.piB2, "','").concat(t.datumGenerisanja, "','").concat(t.datumPlacanja, "','").concat(t.ukupnaCena, "','").concat(t.tipFakture, "','").concat(t.naziv, "','").concat(t.cenaPoJediniciMere, "','").concat(t.jedinicaMere, "','").concat(t.kolicina, "')\">Izmeni fakturu</button>\n            </div>\n          </div>");
        });
        return prikaz;
    };
    RadSaPrikazom.listajFaktureZa = function (pib) {
        settings.url = "http://localhost:5292/api/Faktura/".concat(pib, "/0");
        RadSaPrikazom.prikaziFaktureTest(divshowInvoice, pib, 1);
    };
    RadSaPrikazom.prikaziPreduzeca = function (div) {
        settings.url = "http://localhost:5292/api/Preduzece/ukupanBrojPreduzeca";
        var timovi = [];
        $.ajax(settings).done(function (response) {
            div.innerHTML = "\n        <div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">".concat(RadSaPrikazom.prikaziDetaljePreduzeca(response), "</div>\n        ");
        });
    };
    RadSaPrikazom.prikaziFaktureTest = function (div, id, page) {
        settings.url = "http://localhost:5292/api/Faktura/".concat(id, "/").concat(page);
        div.innerHTML = "";
        $.ajax(settings).done(function (response) {
            response.forEach(function (item) {
                div.innerHTML += "\n                <button id=\"".concat(item.id, "\" class=\"").concat(item.tipFakture, "\">\n                <ul>\n                <oi>ID: ").concat(item.id, "||</oi>\n                <oi>Pib: ").concat(item.pib, "||</oi>\n                <oi>PIB kome saljemo: ").concat(item.piB2, "||</oi>\n                <oi>Datum generisanja: ").concat(item.datumGenerisanja, "||</oi>\n                <oi>Datum placanja: ").concat(item.datumPlacanja, "||</oi>\n                <oi>Ukupna cena: ").concat(item.ukupnaCena, "||</oi>\n                <oi>Tip fakture: ").concat(item.tipFakture, "||</oi>\n                <oi>Naziv: ").concat(item.naziv, "||</oi>\n                <oi>Cena po jedinici mere: ").concat(item.cenaPoJediniciMere, "||</oi>\n                <oi>Jedinica mere: ").concat(item.jedinicaMere, "||</oi>\n                <oi>Kolicina: ").concat(item.kolicina, "</oi>\n            </ul> </button>\n                ");
            });
            div.innerHTML += "<ul class=\"pagination\">\n            <li class=\"page-item\"><a class=\"page-link\" id=\"previous_page\" data-page=".concat(page - 1, ">Previous</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" id=\"next_page\" data-page=").concat(page + 1, ">Next</a></li>\n          </ul>");
            document.querySelector("#previous_page").addEventListener("click", function () {
                var page = parseInt(document.querySelector("#previous_page").getAttribute("data-page"));
                if (page < 0) {
                    page = 0;
                }
                RadSaPrikazom.prikaziFaktureTest(div, id, page);
            });
            document.querySelector("#next_page").addEventListener("click", function () {
                var page = parseInt(document.querySelector("#next_page").getAttribute("data-page"));
                RadSaPrikazom.prikaziFaktureTest(div, id, page);
            });
        });
    };
    RadSaPrikazom.filtrirajFakturePoNazivu = function (div) {
        var enterprises = [];
        var url = "http://localhost:5292/api/Faktura/filtrirajFakturuPoNazivu";
        var pib = document.getElementById("filter1");
        fetch(url + "/".concat(pib.value)).then(function (resp) { return resp.json(); }).then(function (data) {
            div.innerHTML = "";
            data.forEach(function (item) {
                div.innerHTML += "\n                            <button id=\"".concat(item.id, "\" class=\"").concat(item.tipFakture, "\">\n                            <ul>\n                            <oi>ID: ").concat(item.id, "||</oi>\n                            <oi>Pib: ").concat(item.pib, "||</oi>\n                            <oi>PIB kome saljemo: ").concat(item.piB2, "||</oi>\n                            <oi>Datum generisanja: ").concat(item.datumGenerisanja, "||</oi>\n                            <oi>Datum placanja: ").concat(item.datumPlacanja, "||</oi>\n                            <oi>Ukupna cena: ").concat(item.ukupnaCena, "||</oi>\n                            <oi>Tip fakture: ").concat(item.tipFakture, "||</oi>\n                            <oi>Naziv: ").concat(item.naziv, "||</oi>\n                            <oi>Cena po jedinici mere: ").concat(item.cenaPoJediniciMere, "||</oi>\n                            <oi>Jedinica mere: ").concat(item.jedinicaMere, "||</oi>\n                            <oi>Kolicina: ").concat(item.kolicina, "</oi>\n                            </ul> </button>\n                            ");
            })["catch"](function (err) { return console.log(err); });
        });
    };
    RadSaPrikazom.filtrirajFakturePoCeni = function (div) {
        var enterprises = [];
        var url = "http://localhost:5292/api/Faktura/filtrirajFakturuPoCeni";
        var name = document.getElementById("filter2");
        fetch(url + "/".concat(name.value)).then(function (resp) { return resp.json(); }).then(function (data) {
            div.innerHTML = "";
            data.forEach(function (item) {
                div.innerHTML += "\n                            <button id=\"".concat(item.id, "\" class=\"").concat(item.tipFakture, "\">\n                            <ul>\n                            <oi>ID: ").concat(item.id, "||</oi>\n                            <oi>Pib: ").concat(item.pib, "||</oi>\n                            <oi>PIB kome saljemo: ").concat(item.piB2, "||</oi>\n                            <oi>Datum generisanja: ").concat(item.datumGenerisanja, "||</oi>\n                            <oi>Datum placanja: ").concat(item.datumPlacanja, "||</oi>\n                            <oi>Ukupna cena: ").concat(item.ukupnaCena, "||</oi>\n                            <oi>Tip fakture: ").concat(item.tipFakture, "||</oi>\n                            <oi>Naziv: ").concat(item.naziv, "||</oi>\n                            <oi>Cena po jedinici mere: ").concat(item.cenaPoJediniciMere, "||</oi>\n                            <oi>Jedinica mere: ").concat(item.jedinicaMere, "||</oi>\n                            <oi>Kolicina: ").concat(item.kolicina, "</oi>\n                            </ul> </button>\n                            ");
            })["catch"](function (err) { return console.log(err); });
        });
    };
    return RadSaPrikazom;
}());
var DodajPreduzece = /** @class */ (function () {
    function DodajPreduzece() {
    }
    DodajPreduzece.dodajPreduzece = function () {
        document.getElementById("dodavanjePreduzeca").innerHTML = "<form id=\"postForm\" class=\"editForm\" action=\"http://localhost:5292/api/Preduzece/dodajPreduzece\" method=\"post\">\n        Ime: <input type=\"text\" name=\"ime\"><br>\n        Prezime: <input type=\"text\" name=\"prezime\"><br>\n        Email: <input type=\"email\" name=\"email\"><br>\n        Naziv preduzeca: <input type=\"text\" name=\"naziv\"><br>\n        Adresa: <input type=\"text\" name=\"adresa\"><br>\n        PIB: <input type=\"number\" name=\"PIB\"><br>\n        <button  type=\"submit\" >Dodaj</button>\n        </form>";
    };
    return DodajPreduzece;
}());
var Bilans = /** @class */ (function () {
    function Bilans() {
    }
    Bilans.bilans = function (broj) {
        document.getElementById("ovdebilans-" + broj).innerHTML = "<form id=\"postForm\" class=\"editForm\" action=\"http://localhost:5292/api/Faktura/bilans\" method=\"post\">\n        <input type=\"hidden\" name=\"PIB\" value=\"".concat(broj, "\"><br>\n        OD: <input type=\"date\" name=\"Od\"><br>\n        DO: <input type=\"date\" name=\"Do\"><br>\n        <button  type=\"submit\" >Izracunaj bilans</button>\n        </form>");
    };
    return Bilans;
}());
var DodavanjeFakture = /** @class */ (function () {
    function DodavanjeFakture() {
    }
    DodavanjeFakture.dodavanjeFakture = function (broj) {
        document.getElementById("ovdeforma-dodavanjefak-" + broj).innerHTML = "<form id=\"postForm\" class=\"editForm\" action=\"http://localhost:5292/api/Faktura/dodajFakturu\" method=\"post\">\n        <input type=\"hidden\" name=\"PIB\" value=\"".concat(broj, "\"><br>\n        PIB Kome: <input type=\"text\" name=\"PIB2\"><br>\n        Datum Generisanja: <input type=\"text\" name=\"datumGenerisanja\"><br>\n        Datum Placanja: <input type=\"text\" name=\"datumPlacanja\"><br>\n        Ukupna cena: <input type=\"number\" name=\"ukupnaCena\"><br>\n        Tip fakture: <input type=\"text\" name=\"tipFakture\"><br>\n        Naziv: <input type=\"text\" name=\"naziv\"><br>\n        Cena po jedinici mere: <input type=\"number\" name=\"cenaPoJediniciMere\"><br>\n        Jedinica mere: <input type=\"text\" name=\"jedinicaMere\"><br>\n        Kolicina: <input type=\"number\" name=\"kolicina\"><br>\n        <button  type=\"submit\" >Dodaj Fakturu</button>\n        </form>");
    };
    return DodavanjeFakture;
}());
var IzmeniPreduzece = /** @class */ (function () {
    function IzmeniPreduzece() {
    }
    IzmeniPreduzece.izmeniPreduzece = function (ime, prezime, email, naziv, adresa, pib) {
        document.getElementById("ovdeforma-" + pib).innerHTML = "<form action=\"http://localhost:5292/api/Preduzece/izmeniPreduzece\" method=\"post\">\n        Ime: <input type=\"text\" name=\"ime\" value=\"".concat(ime, "\"><br>\n        Prezime: <input type=\"text\" name=\"prezime\" value=\"").concat(prezime, "\"><br>\n        Email: <input type=\"email\" name=\"email\" value=\"").concat(email, "\"><br>\n        Naziv preduzeca: <input type=\"text\" name=\"naziv\" value=\"").concat(naziv, "\"><br>\n        Adresa: <input type=\"text\" name=\"adresa\" value=\"").concat(adresa, "\"><br>\n        PIB: <input type=\"number\" name=\"PIB\" value=\"").concat(pib, "\"><br>\n        <input type=\"hidden\" name=\"PIBstari\" value=\"").concat(pib, "\">\n        <button type=\"submit\" name=\"\">Saqcuvaj Izmene</button>\n    </form><br>");
    };
    return IzmeniPreduzece;
}());
var IzmenaFakture = /** @class */ (function () {
    function IzmenaFakture() {
    }
    IzmenaFakture.izmenaFakture = function (id, pib, pib2, dg, dp, uc, tip, naz, cpj, jm, kol) {
        document.getElementById("ovdeforma-izmenafak-" + id).innerHTML = "<form id=\"postForm\" class=\"editForm\" action=\"http://localhost:5292/api/Faktura/izmeniFakturu\" method=\"post\">\n    <input type=\"hidden\" name=\"id\" value=\"".concat(id, "\"><br>\n    <input type=\"hidden\" name=\"PIB\" value=\"").concat(pib, "\"><br>\n    PIB Kome: <input type=\"text\" name=\"PIB2\" value=\"").concat(pib2, "\"><br>\n    Datum Generisanja: <input type=\"text\" name=\"datumGenerisanja\" value=\"").concat(dg, "\"><br>\n    Datum Placanja: <input type=\"text\" name=\"datumPlacanja\" value=\"").concat(dp, "\"><br>\n    Ukupna cena: <input type=\"number\" name=\"ukupnaCena\" value=\"").concat(uc, "\"><br>\n    Tip fakture: <input type=\"text\" name=\"tipFakture\" value=\"").concat(tip, "\"><br>\n    Naziv: <input type=\"text\" name=\"naziv\" value=\"").concat(naz, "\"><br>\n    Cena po jedinici mere: <input type=\"number\" name=\"cenaPoJediniciMere\" value=\"").concat(cpj, "\"><br>\n    Jedinica mere: <input type=\"text\" name=\"jedinicaMere\" value=\"").concat(jm, "\"><br>\n    Kolicina: <input type=\"number\" name=\"kolicina\" value=\"").concat(kol, "\"><br>\n    <button  type=\"submit\" >Sacuvaj Izmene Fakture</button>\n    </form>");
    };
    return IzmenaFakture;
}());
var dugme = document.getElementById("dugme");
dugme.addEventListener('click', function (e) { return RadSaPrikazom.prikaziPreduzeca(document.querySelector("#preduzeca")); });
var dugmee = document.getElementById("dodajPreduzece");
dugmee.addEventListener('click', function (e) { return DodajPreduzece.dodajPreduzece(); });
var pibInput = document.querySelector("#pib");
var nameInput = document.querySelector("#name");
var btnFilter = document.getElementById("btnFilter");
var divshowInvoice = document.querySelector("#showInvoices");
btnFilter.addEventListener("click", function () {
    if (pibInput.value != "" && nameInput.value != "") {
        RadSaPrikazom.prikaziFiltriranjePoPibuINazivu(document.querySelector("#preduzeca"));
    }
    else if (pibInput.value != "") {
        RadSaPrikazom.prikaziFiltriranjePoPibu(document.querySelector("#preduzeca"));
    }
    else if (nameInput.value != "") {
        RadSaPrikazom.prikaziFiltriranjePoNazivu(document.querySelector("#preduzeca"));
    }
});
document.addEventListener('click', function (e) {
    var target = e.target;
    if (target && target.className == "btnShowInvoiceFilter") {
        var amount = document.getElementById("filter2");
        var name_1 = document.getElementById("filter1");
        if (amount.value != "" && name_1.value == "") {
            RadSaPrikazom.filtrirajFakturePoCeni(divshowInvoice);
        }
        if (name_1.value != "" && amount.value == "") {
            RadSaPrikazom.filtrirajFakturePoNazivu(divshowInvoice);
        }
    }
});
