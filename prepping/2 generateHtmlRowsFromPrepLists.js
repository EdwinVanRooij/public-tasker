//var ALL_PREP_LISTS = `[{"name":"Werk","items":[{"name":"Wortels, tomaten, appel","unique":"Nee","quantity":1},{"name":"Brood, pindakaas, halvarine, banaan, ei(?)","unique":"Nee","quantity":1},{"name":"Banaan, kiwi, avocado, amandelen, walnoten","unique":"Nee","quantity":2}]},{"name":"Fitness","items":[{"name":"Handdoek (x2)","unique":"Nee","quantity":1},{"name":"Sokken","unique":"Nee","quantity":1},{"name":"Onderbroek","unique":"Nee","quantity":1},{"name":"Fitness shirt","unique":"Ja","quantity":1},{"name":"Fitness broek","unique":"Ja","quantity":1},{"name":"Shampoo","unique":"Ja","quantity":1},{"name":"Zeep","unique":"Ja","quantity":1},{"name":"Deo","unique":"Ja","quantity":1},{"name":"Parfum","unique":"Ja","quantity":1},{"name":"Gezichtscreme","unique":"Ja","quantity":1},{"name":"Oortjes","unique":"Ja","quantity":1},{"name":"Fitness pas","unique":"Ja","quantity":1},{"name":"Een euromunt","unique":"Ja","quantity":1}]},{"name":"Haarproducten","items":[{"name":"Wax","unique":"Ja","quantity":1},{"name":"Fohn","unique":"Ja","quantity":1},{"name":"Haarlak","unique":"Ja","quantity":1},{"name":"Haar wave spray","unique":"Ja","quantity":1}]},{"name":"Op stap","inheritsFrom":"Haarproducten, Douchen","items":[{"name":"Oordopjes","unique":"Ja","quantity":1},{"name":"Listerine","unique":"Ja","quantity":1},{"name":"Tandenborstel","unique":"Ja","quantity":1},{"name":"Tandpasta","unique":"Ja","quantity":1},{"name":"Kauwgom","unique":"Ja","quantity":1},{"name":"Ketting + poets spul","unique":"Ja","quantity":1},{"name":"Mobiel + oplader","unique":"Ja","quantity":1},{"name":"Scheergel","unique":"Ja","quantity":1},{"name":"Scheermesje","unique":"Ja","quantity":1},{"name":"Scheerapparaat","unique":"Ja","quantity":1},{"name":"Parfum","unique":"Ja","quantity":1},{"name":"Deo","unique":"Ja","quantity":1},{"name":"ID, geld/pinpas","unique":"Ja","quantity":1},{"name":"Fancy shirt","unique":"Nee","quantity":1},{"name":"Broek","unique":"Nee","quantity":1},{"name":"Sokken","unique":"Nee","quantity":1},{"name":"Stapschoenen","unique":"Ja","quantity":1},{"name":"Lenzendoosje + vloeistof","quantity":1},{"name":"Wax","unique":"Ja","quantity":1},{"name":"Fohn","unique":"Ja","quantity":1},{"name":"Haarlak","unique":"Ja","quantity":1},{"name":"Haar wave spray","unique":"Ja","quantity":1},{"name":"Zeep","unique":"Ja","quantity":1},{"name":"Gezichtscreme","unique":"Ja","quantity":1},{"name":"Shampoo","unique":"Ja","quantity":1},{"name":"Scrubgel","unique":"Ja","quantity":1}]},{"name":"Douchen","items":[{"name":"Zeep","unique":"Ja","quantity":1},{"name":"Gezichtscreme","unique":"Ja","quantity":1},{"name":"Shampoo","unique":"Ja","quantity":1},{"name":"Scrubgel","unique":"Ja","quantity":1}]},{"name":"Festival","inheritsFrom":"Op stap","items":[{"name":"Powerbank","unique":"Ja","quantity":1},{"name":"Nuts","unique":"Nee","quantity":1},{"name":"Kwark","unique":"Nee","quantity":1},{"name":"Bananen","unique":"Nee","quantity":1},{"name":"Oplader mobiel","unique":"Ja","quantity":1},{"name":"Zonnebrillen / gekke ook","unique":"Ja","quantity":1},{"name":"Eten","unique":"Nee","quantity":1},{"name":"Drinken","unique":"Nee","quantity":1},{"name":"Tandenborstel","unique":"Ja","quantity":1},{"name":"Tandpasta","unique":"Ja","quantity":1},{"name":"Snoep","unique":"Nee","quantity":1},{"name":"Waaier(s)","unique":"Ja","quantity":1},{"name":"Pet","unique":"Ja","quantity":1},{"name":"Waterzak(ken)","unique":"Ja","quantity":1},{"name":"Paraplu","unique":"Ja","quantity":1},{"name":"OV chipkaart","unique":"Ja","quantity":1},{"name":"Oordopjes","unique":"Ja","quantity":1},{"name":"Listerine","unique":"Ja","quantity":1},{"name":"Kauwgom","unique":"Ja","quantity":1},{"name":"Ketting + poets spul","unique":"Ja","quantity":1},{"name":"Mobiel + oplader","unique":"Ja","quantity":1},{"name":"Scheergel","unique":"Ja","quantity":1},{"name":"Scheermesje","unique":"Ja","quantity":1},{"name":"Scheerapparaat","unique":"Ja","quantity":1},{"name":"Parfum","unique":"Ja","quantity":1},{"name":"Deo","unique":"Ja","quantity":1},{"name":"ID, geld/pinpas","unique":"Ja","quantity":1},{"name":"Fancy shirt","unique":"Nee","quantity":1},{"name":"Broek","unique":"Nee","quantity":1},{"name":"Sokken","unique":"Nee","quantity":1},{"name":"Stapschoenen","unique":"Ja","quantity":1},{"name":"Lenzendoosje + vloeistof","quantity":1},{"name":"Wax","unique":"Ja","quantity":1},{"name":"Fohn","unique":"Ja","quantity":1},{"name":"Haarlak","unique":"Ja","quantity":1},{"name":"Haar wave spray","unique":"Ja","quantity":1},{"name":"Zeep","unique":"Ja","quantity":1},{"name":"Gezichtscreme","unique":"Ja","quantity":1},{"name":"Shampoo","unique":"Ja","quantity":1},{"name":"Scrubgel","unique":"Ja","quantity":1}]},{"name":"Zwemmen","items":[{"name":"Tas om zooi in te doen","unique":"Ja","quantity":1},{"name":"Speaker (bluetooth)","unique":"Ja","quantity":1},{"name":"Strand handdoek","unique":"Ja","quantity":1},{"name":"Powerbank","unique":"Ja","quantity":1},{"name":"USB kabel van powerbank naar speaker","unique":"Ja","quantity":1},{"name":"Zonnebril","unique":"Ja","quantity":1},{"name":"Beurs (met pinpas/geld)","unique":"Ja","quantity":1},{"name":"Zonnebrand","unique":"Ja","quantity":1}]}]`;
var allPrepLists = JSON.parse(global('%ALL_PREP_LISTS'));

function generateTableRowFromPrepList(prepList) {
    var template = `<tr>
                    <td>
                        <input type="checkbox" id="checkbox-{{NAME}}" name="1" value="1"
                               onclick="onCheckClicked('checkbox-{{NAME}}', 'count-{{NAME}}')">
                        <label for="checkbox-{{NAME}}" data-content="Extra ding">{{NAME}}</label>
                        <button class="round-button plus-min-button"
                                onclick="subtractOneFrom('checkbox-{{NAME}}', 'count-{{NAME}}')">-
                        </button>
                        <span id="count-{{NAME}}" class="count">0</span>
                        <button class="round-button plus-min-button"
                                onclick="addOneTo('checkbox-{{NAME}}', 'count-{{NAME}}')">+
                        </button>
                    </td>
                 </tr>`;
    return template.split('{{NAME}}').join(prepList.name);
}

// Save all rows in an array
var allRows = [];

allPrepLists.forEach(function(prepList) {
    var tableRow = generateTableRowFromPrepList(prepList);
    allRows.push(tableRow);
});

// Now join them
var allRowsAsOneString = allRows.join(" ");

//console.log(allRowsAsOneString)
setGlobal("HTML_ROWS_PREP_LIST", allRowsAsOneString);
