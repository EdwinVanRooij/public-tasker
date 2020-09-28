var isDevelopmentEnvironment = null;

// ===========================================================================================
// Step 1: Parse the data, store it in `data`.
// ===========================================================================================
var data = undefined;
if (typeof http_data === "undefined") {
    // We're developing locally, initialize sample data.
    isDevelopmentEnvironment = true;
    var data = {
      "values": [
        [ "09:00", "90", "g", "", "75", "Brinta" ],
        [ "", "22", "g", "", "22", "Eiwitpoeder" ],
        [ "", "230", "ml", "", "200", "Melk" ],
        [],
        [],
        [ "10:30", "40", "g", "", "83", "Wortel/Waspeen" ],
        [ "", "120", "g", "", "83", "Tomaat" ],
        [ "", "1", "stuk", "150", "150", "Appel (Jonagold)" ],
        [],
        [],
        [ "12:00", "8", "stuk", "35", "280", "Brood (volkoren)" ],
        [ "", "2", "stuk", "15", "30", "Pindakaas (gemiddeld)" ],
        [ "", "2", "stuk", "5", "10", "Jumbo Halvarine" ],
        [ "", "1", "stuk", "125", "125", "Banaan" ],
        [ "", "0.5", "stuk", "53", "26.5", "Ei (gekookt)" ],
        [], [], [ "15:00", "1", "stuk", "125", "125", "Banaan" ], [ "", "1", "stuk", "100", "100", "Kiwi (groene)" ], [ "", "30", "g", "", "25", "Avocado" ], [ "", "20", "g", "", "20", "Amandelen" ], [ "", "10", "g", "", "10", "Walnoten" ], [], [], [ "18:00", "200", "g", "", "100", "Kipfilet" ], [ "", "125", "g", "", "125", "Meergranenrijst (gekookt)" ], [ "", "50", "g", "", "50", "Broccoli (gekookt)" ], [ "", "25", "g", "", "25", "Aardappelen (gekookt)" ], [ "", "25", "ml", "", "25", "Mayonaise" ], [], [], [ "21:00", "500", "g", "", "500", "Franse magere kwark" ], [ "", "15", "g", "", "15", "Lijnzaad" ], [ "", "15", "g", "", "15", "Chiazaad" ], [ "", "10", "g", "", "10", "Zonnebloempitten" ], [], [], [ "nvt", "1200", "ml", "", "1200", "Water" ], [ "", "50", "g", "", "50", "Snoep (zuur, gem.)" ], [ "", "1", "stuk", "20", "20", "Vitamine D pil (kruidvat)" ]
      ]
    }
} else {
    //  We're in tasker, use the real data.
    isDevelopmentEnvironment = false;
    data = JSON.parse(http_data);
    setGlobal("MEALS_DATA", data);
}

class Meal {
    constructor(identifier, time) {
        this.identifier = identifier;
        this.time = time;
        this.foods = [];
    }

    toHtmlTable() {
        var result = "<table>";
        this.foods.forEach((food) => {
            result += food.toTableRow();
        });
        return result + "</table>";
    }
}

class Food {
    constructor(quantity, unit, portion_size, total_quantity, name) {
        this.quantity = quantity;
        this.unit = unit;
        this.portion_size = portion_size;
        this.total_quantity = total_quantity;
        this.name = name;
    }

    toTableRow() {
        if (this.portion_size) {
            // This is a 'portie', so treat it as such
            var result = "<tr>";
            result += "<td align=\"right\">" + this.quantity + "x</td>";
            result += "<td align=\"left\">" + this.name + "</td>";
            result += "</tr>";
            return result;
        } else {
            var result = "<tr>";
            result += "<td align=\"right\">" + this.total_quantity + this.unit + "</td>";
            result += "<td align=\"left\">" + this.name + "</td>";
            result += "</tr>";
            return result;
        }
    }
}

var timeRegex = /\d*:\d*/;
var mealNumber = 0;
var meals = [];

function parseMealFromRow(identifier, row) {
    return new Meal(identifier, row[0]);
}

function parseFoodFromRow(row) {
    var quantity = row[1];
    var unit = row[2];
    var portion_size = row[3];
    var total_quantity = row[4];
    var name = row[5];
    return new Food(quantity, unit, portion_size, total_quantity, name)
}

data.values.forEach(function(row) {
    if (row[0]) {
        // We have a time here, so this is a header row.
        mealNumber++;
        meals.push(parseMealFromRow(mealNumber, row));
        meals[mealNumber - 1].foods.push(parseFoodFromRow(row));
    } else if (row[1]) {
        // We have no time, but we do have food here.
        meals[mealNumber - 1].foods.push(parseFoodFromRow(row));
    }
});

for (var i = 0; i < meals.length; i++) {
    if (isDevelopmentEnvironment) {
        console.log('MEAL_' + (i + 1) + '_TIME  ' +  meals[i].time)
        console.log('MEAL_' + (i + 1) + '_VALUE  ' + meals[i].toHtmlTable());
        console.log('MEALS' + JSON.stringify(meals));
    } else {
        setGlobal('MEAL_' + (i + 1) + '_TIME', meals[i].time);
        setGlobal('MEAL_' + (i + 1) + '_VALUE', meals[i].toHtmlTable());
        setGlobal('MEALS', JSON.stringify(meals));
    }
}

