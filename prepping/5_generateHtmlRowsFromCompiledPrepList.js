//var compiledPrepList = {"name":"Compiled Prep List","items":[{"name":"Wortels, tomaten, appel","unique":"Nee","quantity":2},{"name":"Brood, pindakaas, halvarine, banaan, ei(?)","unique":"Nee","quantity":2},{"name":"Banaan, kiwi, avocado, amandelen, walnoten","unique":"Nee","quantity":4},{"name":"Handdoek (x2)","unique":"Nee","quantity":1},{"name":"Sokken","unique":"Nee","quantity":1},{"name":"Onderbroek","unique":"Nee","quantity":1},{"name":"Fitness shirt","unique":"Ja","quantity":1},{"name":"Fitness broek","unique":"Ja","quantity":1},{"name":"Shampoo","unique":"Ja","quantity":1},{"name":"Zeep","unique":"Ja","quantity":1},{"name":"Deo","unique":"Ja","quantity":1},{"name":"Parfum","unique":"Ja","quantity":1},{"name":"Gezichtscreme","unique":"Ja","quantity":1},{"name":"Oortjes","unique":"Ja","quantity":1},{"name":"Fitness pas","unique":"Ja","quantity":1},{"name":"Een euromunt","unique":"Ja","quantity":1},{"name":"Wax","unique":"Ja","quantity":1},{"name":"Fohn","unique":"Ja","quantity":1},{"name":"Haarlak","unique":"Ja","quantity":1},{"name":"Haar wave spray","unique":"Ja","quantity":1}]};
var compiledPrepList = JSON.parse(global('%COMPILED_PREP_LIST'));

function formatToHtml(prepList) {
    var result = "<table>";
    var iteration = 0;
    prepList.items.forEach(item => {
        iteration ++;
        result += `<tr><td>
                        <input type="checkbox" id="${iteration}" name="${iteration}" value="${iteration}">
                        `;
        if (typeof item === 'string' || item instanceof String) {
            result += `<label for="${iteration}" data-content="${item}">${item}</label>
                        </td>
                    </tr>`;
        } else {
            result += `<label for="${iteration}" data-content="${item.quantity}x ${item.name}">${item.quantity}x ${item.name}</label>
                        </td>
                    </tr>`;
        }
    });
    result += "</table>";
    return result;
}

var htmlTable = formatToHtml(compiledPrepList);

//console.log(htmlTable)
setGlobal("HTML_ROWS_COMPILED_PREP_LIST", htmlTable);
