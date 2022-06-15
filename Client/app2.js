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
            prikaz += "<div class=\"accordion-item\">\n            <h2 class=\"accordion-header\" id=\"flush-headingOne-tim-".concat(t.PIB, "\">\n              <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseOne-tim-").concat(t.PIB, "\" aria-expanded=\"false\" aria-controls=\"flush-collapseOne-tim-").concat(t.PIB, "\">\n                ").concat(t.naziv, "\n              </button>\n            </h2>\n            <div id=\"flush-collapseOne-tim-").concat(t.PIB, "\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingOne-tim-").concat(t.PIB, "\" data-bs-parent=\"#accordionFlushExample\">\n              <div class=\"accordion-body\">").concat(t.adresa, "-").concat(t.ime, "-").concat(t.prezime, "</div>\n            </div>\n          </div>");
        });
        return prikaz;
    };
    RadSaPrikazom.prikaziPreduzeca = function (div) {
        var timovi = [];
        $.ajax(settings).done(function (response) {
            div.innerHTML = "\n        <div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">".concat(RadSaPrikazom.prikaziDetaljePreduzeca(response.data), "</div>\n        ");
        });
    };
    RadSaPrikazom.prikaziFakture = function (div, page) {
        settings.url = "http://localhost:5292/api/Faktura/sveFakture/".concat(page);
        div.innerHTML = "";
        $.ajax(settings).done(function (response) {
            response.data.forEach(function (i) {
                div.innerHTML += "<p>".concat(i.PIB, " ").concat(i.PIB2, " - ").concat(i.naziv, "</p>");    
            });
            div.innerHTML += "<ul class=\"pagination\">\n            <li class=\"page-item\"><a class=\"page-link\" id=\"previous_page\" data-page=".concat(response.meta.current_page - 1, ">Previous</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" id=\"next_page\" data-page=").concat(response.meta.next_page, ">Next</a></li>\n          </ul>");
            document.querySelector("#previous_page").addEventListener("click", function () {
                var page = parseInt(document.querySelector("#previous_page").getAttribute("data-page"));
                if (page < 0) {
                    page = 0;
                }
                RadSaPrikazom.prikaziFakture(document.querySelector("#fakture"), page);
            });
            document.querySelector("#next_page").addEventListener("click", function () {
                var page = parseInt(document.querySelector("#next_page").getAttribute("data-page"));
                RadSaPrikazom.prikaziFakture(document.querySelector("#fakture"), page);
            });
        });
    };
    return RadSaPrikazom;
}());
RadSaPrikazom.prikaziPreduzeca(document.querySelector("#timovi"));
RadSaPrikazom.prikaziFakture(document.querySelector("#fakture"), 0);
