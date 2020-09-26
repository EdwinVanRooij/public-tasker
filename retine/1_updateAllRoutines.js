var isDevelopmentEnvironment = null;

// ===========================================================================================
// Step 1: Parse the data, store it in `data`.
// ===========================================================================================
var data = undefined;
if (typeof http_data === "undefined") {
    // We're developing locally, initialize sample data.
    isDevelopmentEnvironment = true;
    var data = {
          "range": "Retine!A24:G101",
          "majorDimension": "ROWS",
          "values": [
            [
              "07:42", "Ochtend", "nvt", "00:17:15", "Ja", "", "Zorgen dat ik om 8:30 weg ben, tijd = 8:30 - duratie van routine." ], [ "", "", "Tanden poetsen" ], [ "", "", "Lenzen indoen ", "00:02:00" ], [ "", "", "Deo opdoen" ], [ "", "", "Parfum opdoen" ], [ "", "", "Aankleden", "00:01:00"
            ], [ "", "", "Eten (zie Project Gesundheit)", "00:10:00" ], [ "", "", "Pet opdoen", "00:02:00" ], [ "", "", "Mobiel, beurs, sleutels" ], [ "", "", "Prepping: Ochtend & middag" ], [], [], [ "07:41", "Ochtend voor fitness", "nvt", "00:18:24", "Ja", "Ochtend"
            ], [ "", "", "P: Fitness items meenemen", "00:01:00" ], [], [], [ "22:11", "Avond", "nvt", "00:03:27", "Ja", "", "Zorgen dat ik om 23:30 ga slapen, tijd = 23:30 - duratie van routine." ], [ "", "", "Kamer opruimen", "00:02:00" ], [ "", "", "Thermostaat lager zetten" ], [ "",
              "", "WC" ], [ "", "", "Lenzen uit doen" ], [ "", "", "Tanden poetsen" ], [ "", "", "Wekker(s) zetten", "00:01:00" ], [ "", "", "Gezichtscreme opdoen" ], [], [
              "22:08", "Avond voor fitness", "nvt", "00:06:16", "Ja", "Avond" ], [ "", "", "P: Fitness items klaarzetten", "00:02:00" ] ]
        };
    gesundheitData = JSON.parse("[{\"identifier\":1,\"time\":\"09:00\",\"foods\":[{\"quantity\":\"75\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"75\",\"name\":\"Brinta\"},{\"quantity\":\"30\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"30\",\"name\":\"Eiwitpoeder\"},{\"quantity\":\"230\",\"unit\":\"ml\",\"portion_size\":\"\",\"total_quantity\":\"200\",\"name\":\"Melk\"},{\"quantity\":\"1\",\"unit\":\"stuk\",\"portion_size\":\"20\",\"total_quantity\":\"20\",\"name\":\"Vitamine D pil (kruidvat)\"}]},{\"identifier\":2,\"time\":\"10:30\",\"foods\":[{\"quantity\":\"40\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"83\",\"name\":\"Wortel\/Waspeen\"},{\"quantity\":\"120\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"83\",\"name\":\"Tomaat\"},{\"quantity\":\"1\",\"unit\":\"stuk\",\"portion_size\":\"150\",\"total_quantity\":\"150\",\"name\":\"Appel (Jonagold)\"},{\"quantity\":\"1\",\"unit\":\"schepje\",\"portion_size\":\"3\",\"total_quantity\":\"3\",\"name\":\"Creatine\"},{\"quantity\":\"1\",\"unit\":\"stuk\",\"portion_size\":\"100\",\"total_quantity\":\"100\",\"name\":\"Kiwi (groene)\"}]},{\"identifier\":3,\"time\":\"12:00\",\"foods\":[{\"quantity\":\"6\",\"unit\":\"stuk\",\"portion_size\":\"30\",\"total_quantity\":\"180\",\"name\":\"Brood (volkoren)\"},{\"quantity\":\"2\",\"unit\":\"stuk\",\"portion_size\":\"15\",\"total_quantity\":\"30\",\"name\":\"Pindakaas (gemiddeld)\"},{\"quantity\":\"2\",\"unit\":\"stuk\",\"portion_size\":\"5\",\"total_quantity\":\"10\",\"name\":\"Jumbo Halvarine\"},{\"quantity\":\"1\",\"unit\":\"stuk\",\"portion_size\":\"125\",\"total_quantity\":\"125\",\"name\":\"Banaan\"},{\"quantity\":\"0.5\",\"unit\":\"stuk\",\"portion_size\":\"53\",\"total_quantity\":\"26.5\",\"name\":\"Ei (gekookt)\"}]},{\"identifier\":4,\"time\":\"15:00\",\"foods\":[{\"quantity\":\"1\",\"unit\":\"stuk\",\"portion_size\":\"125\",\"total_quantity\":\"125\",\"name\":\"Banaan\"},{\"quantity\":\"25\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"25\",\"name\":\"Avocado\"},{\"quantity\":\"20\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"20\",\"name\":\"Amandelen\"},{\"quantity\":\"10\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"10\",\"name\":\"Walnoten\"}]},{\"identifier\":5,\"time\":\"18:00\",\"foods\":[{\"quantity\":\"65\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"65\",\"name\":\"Kipfilet\"},{\"quantity\":\"50\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"50\",\"name\":\"Meergranenrijst (gekookt)\"},{\"quantity\":\"50\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"50\",\"name\":\"Broccoli (gekookt)\"},{\"quantity\":\"50\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"50\",\"name\":\"Aardappelen (gekookt)\"},{\"quantity\":\"25\",\"unit\":\"ml\",\"portion_size\":\"\",\"total_quantity\":\"25\",\"name\":\"Mayonaise\"}]},{\"identifier\":6,\"time\":\"21:00\",\"foods\":[{\"quantity\":\"500\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"500\",\"name\":\"Franse magere kwark\"},{\"quantity\":\"15\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"15\",\"name\":\"Lijnzaad\"},{\"quantity\":\"15\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"15\",\"name\":\"Chiazaad\"},{\"quantity\":\"10\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"10\",\"name\":\"Zonnebloempitten\"},{\"quantity\":\"2\",\"unit\":\"kop\",\"portion_size\":\"200\",\"total_quantity\":\"400\",\"name\":\"Groene thee\"}]},{\"identifier\":7,\"time\":\"nvt\",\"foods\":[{\"quantity\":\"1500\",\"unit\":\"ml\",\"portion_size\":\"\",\"total_quantity\":\"1500\",\"name\":\"Water\"},{\"quantity\":\"0\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"0\",\"name\":\"Snoep (zuur, gem.)\"}]}]");
} else {
    //  We're in tasker, use the real data.
    isDevelopmentEnvironment = false;
    data = JSON.parse(http_data);
    gesundheitData = JSON.parse(global('%MEALS'));
}

// ===========================================================================================
// Step 2: Define models.
// ===========================================================================================
class Routine {
    constructor(time, name, duration, isActive, inheritsFrom) {
        this.time = time;
        this.name = name;
        this.duration = duration;
        this.isActive = isActive;
        this.inheritsFrom = inheritsFrom;
        this.actions = [];
    }
}

class Action {
    constructor(name) {
        this.name = name;
        this.duration = undefined;
    }
}

var mealKeyword = "Gesundheit";
var totalKeywordPrefix = mealKeyword + ": ";

class Meal {
    constructor(identifier, time) {
        this.identifier = identifier;
        this.time = time;
        this.foods = [];
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
}

// ===========================================================================================
// Step 3: Parse the data into the models.
// ===========================================================================================
var routines = [];

function getMealByIdentifier(identifier) {
    var result = null;
    gesundheitData.forEach((meal) => {
        if (meal.identifier == identifier) {
            result = meal;
        };
    })
    return result;
}

function foodToActionString(food) {
    var prefix = "&nbsp;&nbsp;&nbsp;&nbsp;";
    if (food.portion_size) {
        // This is a 'portie', so treat it as such
        return prefix + food.quantity + "x " + food.name;
    } else {
        // This is a 'portie', so treat it as such
        return prefix + food.total_quantity + food.unit + " " + food.name;
    }
}

var currentRoutine = null;
data.values.forEach(function(row) {
    if (row[0]) {
        if (currentRoutine != null) {
            // We're at the next Routine, add the previous one to the list.
            routines.push(currentRoutine);
        }

        // We have a time, create a new Routine.
        var time = row[0];
        var name = row[1];
        var duration = row[3];
        var isActive = row[4];
        var inheritsFrom = row[5];
        currentRoutine = new Routine(time, name, duration, isActive, inheritsFrom);
        if (row[5]) {
            // We have inheritance, set it on the current routine.
            currentRoutine.inheritsFrom = row[5];
        }
    } else if (row[2]) {
        // We have an action name, create a new Action.
        var actionName = row[2];

        if (actionName.startsWith(totalKeywordPrefix)) {
            var meal = getMealByIdentifier(mealIdentifier);
            meal.foods.forEach((food) => {
                currentRoutine.actions.push(foodToPrepItemRowString(food));
            });
        } else {
            var action = new Action(actionName);
            if (row[3]) {
                // We have a duration, set it on the current action.
                action.duration = row[3];
            }
            currentRoutine.actions.push(action);
        }
    }
});

// The last Routine didn't get added because there was no new one to override it, so add it here as well.
routines.push(currentRoutine);

// ===========================================================================================
// Step 4: Expand inheritance (add all actions from the other Routine to the current).
// ===========================================================================================

// Turns a string like "One, Two, Three" into ["One", "Two", "Three"].
// Always returns an array, even if it contains a single item, or nothing.
function turnCommaSeparatedIntoArray(inputString) {
    if (inputString) {
        if (inputString.includes(",")) {
            return inputString.split(",").map(function(item) { return item.trim(); });
        } else {
            return [ inputString ];
        }
    } else {
        return [];
    }
}

function getActionsFromRoutinesByName(routines, inheritName){
    var result = [];
    routines.forEach(function (routine){
        if (routine.name == inheritName) {
            result = result.concat(routine.actions);
        }
    });
    return result;
}

function expandInheritance(routines) {
    routines.forEach(function(routine) {
        if (routine.inheritsFrom) {
            // The current routine has inheritance. Parse all inherits into a list.
            var inherits = turnCommaSeparatedIntoArray(routine.inheritsFrom);
            inherits.forEach(function (inheritName){
                var newActions = getActionsFromRoutinesByName(routines, inheritName);
                routine.actions = routine.actions.concat(newActions);
            });
        }
    });
}

// Expand inheritance on all routines lists.
expandInheritance(routines);

// ===========================================================================================
// Step 5: Generate all variables for each Routine.
// ===========================================================================================

function renderRoutineToHtml(routine) {
    var result = "<table>";

    var iteration = 0;
    routine.actions.forEach(action => {
        iteration ++;
        result += `<tr><td>
                        <input type="checkbox" id="${iteration}" name="${iteration}" value="${iteration}">
                        <label for="${iteration}" data-content="${action.name}">${action.name}</label>
                    </td>
                </tr>`;
        });

    result += "</table>";
    return result;
}

for (var i = 0; i < routines.length; i++) {
    // Result variables for each routine will be:
    // 1: ROUTINE_OCHTEND_NAME = "Ochtend"
    // 2: ROUTINE_OCHTEND_TIME = "07:42"
    // 3: ROUTINE_OCHTEND_OBJECT = JSON string representation of Routine
    // 4: ROUTINE_OCHTEND_RENDERED = Routine rendered to html, presentable in a popup
    var currentRoutine = routines[i];
    var currentRoutineNameAsKey = currentRoutine.name.replace(/\s+/g, '_').toUpperCase();

    // 1:
    var currentRoutineNameKey = `ROUTINE_${currentRoutineNameAsKey}_NAME`;
    var currentRoutineNameValue = `${currentRoutine.name}`;

    // 2:
    var currentRoutineTimeKey = `ROUTINE_${currentRoutineNameAsKey}_TIME`;
    var currentRoutineTimeValue = `${currentRoutine.time}`;

    // 3:
    var currentRoutineObjectKey = `ROUTINE_${currentRoutineNameAsKey}_OBJECT`;
    var currentRoutineObjectValue = JSON.stringify(currentRoutine);

    // 4:
    var currentRoutineRenderedKey = `ROUTINE_${currentRoutineNameAsKey}_RENDERED`;
    var currentRoutineRenderedValue = renderRoutineToHtml(currentRoutine);

    if (isDevelopmentEnvironment) {
        console.log(`${currentRoutineNameKey}: ${currentRoutineNameValue}`);
        console.log(`${currentRoutineTimeKey}: ${currentRoutineTimeValue}`);
        console.log(`${currentRoutineObjectKey}: ${currentRoutineObjectValue}`);
        console.log(`${currentRoutineRenderedKey}: ${currentRoutineRenderedValue}`);
    } else {
        setGlobal(currentRoutineNameKey, currentRoutineNameValue);
        setGlobal(currentRoutineTimeKey, currentRoutineTimeValue);
        setGlobal(currentRoutineObjectKey, currentRoutineObjectValue);
        setGlobal(currentRoutineRenderedKey, currentRoutineRenderedValue);
    }
}
