var data = JSON.parse(http_data);
//var data = {
//  "values": [
//    [ "09:00", "90", "g", "", "75", "Brinta" ],
//    [ "", "22", "g", "", "22", "Eiwitpoeder" ],
//    [ "", "230", "ml", "", "200", "Melk" ],
//    [],
//    [],
//    [ "10:30", "40", "g", "", "83", "Wortel/Waspeen" ],
//    [ "", "120", "g", "", "83", "Tomaat" ],
//    [ "", "1", "stuk", "150", "150", "Appel (Jonagold)" ],
//    [],
//    [],
//    [ "12:00", "8", "stuk", "35", "280", "Brood (volkoren)" ],
//    [ "", "2", "stuk", "15", "30", "Pindakaas (gemiddeld)" ],
//    [ "", "2", "stuk", "5", "10", "Jumbo Halvarine" ],
//    [ "", "1", "stuk", "125", "125", "Banaan" ],
//    [ "", "0.5", "stuk", "53", "26.5", "Ei (gekookt)" ],
//    [], [], [ "15:00", "1", "stuk", "125", "125", "Banaan" ], [ "", "1", "stuk", "100", "100", "Kiwi (groene)" ], [ "", "30", "g", "", "25", "Avocado" ], [ "", "20", "g", "", "20", "Amandelen" ], [ "", "10", "g", "", "10", "Walnoten" ], [], [], [ "18:00", "200", "g", "", "100", "Kipfilet" ], [ "", "125", "g", "", "125", "Meergranenrijst (gekookt)" ], [ "", "50", "g", "", "50", "Broccoli (gekookt)" ], [ "", "25", "g", "", "25", "Aardappelen (gekookt)" ], [ "", "25", "ml", "", "25", "Mayonaise" ], [], [], [ "21:00", "500", "g", "", "500", "Franse magere kwark" ], [ "", "15", "g", "", "15", "Lijnzaad" ], [ "", "15", "g", "", "15", "Chiazaad" ], [ "", "10", "g", "", "10", "Zonnebloempitten" ], [], [], [ "nvt", "1200", "ml", "", "1200", "Water" ], [ "", "50", "g", "", "50", "Snoep (zuur, gem.)" ], [ "", "1", "stuk", "20", "20", "Vitamine D pil (kruidvat)" ]
//  ]
//}

function generateFoodTableRowFromRow(row) {
// 0 = time
// 1 = hoeveelheid / portie(s)
// 2 = eenheid
// 3 = portie grootte
// 4 = totaal hoeveelheid
// 5 = naam
    if (row[3]) {
        // This is a 'portie', so treat it as such
        var result = "<tr>";
        result += "<td align=\"right\">" + row[1] + "x</td>";
        result += "<td align=\"left\">" + row[5] + "</td>";
        result += "</tr>";
        return result;
    } else {
        var result = "<tr>";
        result += "<td align=\"right\">" + row[4] + row[2] + "</td>";
        result += "<td align=\"left\">" + row[5] + "</td>";
        result += "</tr>";
        return result;
    }
}

function mergeFoods(foodTableRow) {
    return "<table>" + foodTableRow.join("") + "</table>";
}

var timeRegex = /\d*:\d*/;
var mealNumber = 0;
var meals = [];

data.values.forEach(function(row) {
    if (row[0]) {
        // We have a time here, so this is a header row.
        mealNumber++;
        meals.push({"time": row[0], "foods": []});
        meals[mealNumber - 1].foods.push(generateFoodTableRowFromRow(row));
    } else if (row[1]) {
        // We have no time, but we do have food here.
        meals[mealNumber - 1].foods.push(generateFoodTableRowFromRow(row));
    }
});

for (var i = 0; i < meals.length; i++) {
//console.log('MEAL_' + (i + 1) + '_TIME  ' +  meals[i].time)
//console.log('MEAL_' + (i + 1) + '_VALUE  ' + mergeFoods(meals[i].foods));
    setGlobal('MEAL_' + (i + 1) + '_TIME', meals[i].time);
    setGlobal('MEAL_' + (i + 1) + '_VALUE', mergeFoods(meals[i].foods));
}
