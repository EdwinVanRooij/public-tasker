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
              "07:42", "Ochtend", "nvt", "00:17:15", "Ja", "", "Zorgen dat ik om 8:30 weg ben, tijd = 8:30 - duratie van routine." ],
              [ "", "", "Tanden poetsen" ], [ "", "", "Gesundheit: 1", "00:02:00" ], [ "", "", "Deo opdoen" ], [ "", "", "Parfum opdoen" ], [ "", "", "Aankleden", "00:01:00"
            ], [ "", "", "Eten (zie Project Gesundheit)", "00:10:00" ], [ "", "", "Pet opdoen", "00:02:00" ], [ "", "", "Mobiel, beurs, sleutels" ], [ "", "", "Prep: Werk" ], [], [], [ "07:41", "Ochtend voor fitness", "nvt", "00:18:24", "Ja", "Ochtend"
            ], [ "", "", "Prep: Werk", "00:01:00" ], [], [], [ "22:11", "Avond", "nvt", "00:03:27", "Ja", "", "Zorgen dat ik om 23:30 ga slapen, tijd = 23:30 - duratie van routine." ], [ "", "", "Kamer opruimen", "00:02:00" ], [ "", "", "Thermostaat lager zetten" ], [ "",
              "", "WC" ], [ "", "", "Lenzen uit doen" ], [ "", "", "Tanden poetsen" ], [ "", "", "Wekker(s) zetten", "00:01:00" ], [ "", "", "Gezichtscreme opdoen" ], [], [
              "22:08", "Avond voor fitness", "nvt", "00:06:16", "Ja", "Avond" ], [ "", "", "P: Fitness items klaarzetten", "00:02:00" ] ]
        };
    gesundheitData = JSON.parse("[{\"identifier\":1,\"time\":\"09:00\",\"foods\":[{\"quantity\":\"75\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"75\",\"name\":\"Brinta\"},{\"quantity\":\"30\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"30\",\"name\":\"Eiwitpoeder\"},{\"quantity\":\"230\",\"unit\":\"ml\",\"portion_size\":\"\",\"total_quantity\":\"200\",\"name\":\"Melk\"},{\"quantity\":\"1\",\"unit\":\"stuk\",\"portion_size\":\"20\",\"total_quantity\":\"20\",\"name\":\"Vitamine D pil (kruidvat)\"}]},{\"identifier\":2,\"time\":\"10:30\",\"foods\":[{\"quantity\":\"40\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"83\",\"name\":\"Wortel\/Waspeen\"},{\"quantity\":\"120\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"83\",\"name\":\"Tomaat\"},{\"quantity\":\"1\",\"unit\":\"stuk\",\"portion_size\":\"150\",\"total_quantity\":\"150\",\"name\":\"Appel (Jonagold)\"},{\"quantity\":\"1\",\"unit\":\"schepje\",\"portion_size\":\"3\",\"total_quantity\":\"3\",\"name\":\"Creatine\"},{\"quantity\":\"1\",\"unit\":\"stuk\",\"portion_size\":\"100\",\"total_quantity\":\"100\",\"name\":\"Kiwi (groene)\"}]},{\"identifier\":3,\"time\":\"12:00\",\"foods\":[{\"quantity\":\"6\",\"unit\":\"stuk\",\"portion_size\":\"30\",\"total_quantity\":\"180\",\"name\":\"Brood (volkoren)\"},{\"quantity\":\"2\",\"unit\":\"stuk\",\"portion_size\":\"15\",\"total_quantity\":\"30\",\"name\":\"Pindakaas (gemiddeld)\"},{\"quantity\":\"2\",\"unit\":\"stuk\",\"portion_size\":\"5\",\"total_quantity\":\"10\",\"name\":\"Jumbo Halvarine\"},{\"quantity\":\"1\",\"unit\":\"stuk\",\"portion_size\":\"125\",\"total_quantity\":\"125\",\"name\":\"Banaan\"},{\"quantity\":\"0.5\",\"unit\":\"stuk\",\"portion_size\":\"53\",\"total_quantity\":\"26.5\",\"name\":\"Ei (gekookt)\"}]},{\"identifier\":4,\"time\":\"15:00\",\"foods\":[{\"quantity\":\"1\",\"unit\":\"stuk\",\"portion_size\":\"125\",\"total_quantity\":\"125\",\"name\":\"Banaan\"},{\"quantity\":\"25\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"25\",\"name\":\"Avocado\"},{\"quantity\":\"20\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"20\",\"name\":\"Amandelen\"},{\"quantity\":\"10\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"10\",\"name\":\"Walnoten\"}]},{\"identifier\":5,\"time\":\"18:00\",\"foods\":[{\"quantity\":\"65\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"65\",\"name\":\"Kipfilet\"},{\"quantity\":\"50\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"50\",\"name\":\"Meergranenrijst (gekookt)\"},{\"quantity\":\"50\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"50\",\"name\":\"Broccoli (gekookt)\"},{\"quantity\":\"50\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"50\",\"name\":\"Aardappelen (gekookt)\"},{\"quantity\":\"25\",\"unit\":\"ml\",\"portion_size\":\"\",\"total_quantity\":\"25\",\"name\":\"Mayonaise\"}]},{\"identifier\":6,\"time\":\"21:00\",\"foods\":[{\"quantity\":\"500\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"500\",\"name\":\"Franse magere kwark\"},{\"quantity\":\"15\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"15\",\"name\":\"Lijnzaad\"},{\"quantity\":\"15\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"15\",\"name\":\"Chiazaad\"},{\"quantity\":\"10\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"10\",\"name\":\"Zonnebloempitten\"},{\"quantity\":\"2\",\"unit\":\"kop\",\"portion_size\":\"200\",\"total_quantity\":\"400\",\"name\":\"Groene thee\"}]},{\"identifier\":7,\"time\":\"nvt\",\"foods\":[{\"quantity\":\"1500\",\"unit\":\"ml\",\"portion_size\":\"\",\"total_quantity\":\"1500\",\"name\":\"Water\"},{\"quantity\":\"0\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"0\",\"name\":\"Snoep (zuur, gem.)\"}]}]");
    preppingData = JSON.parse( "[{\"name\":\"Werk\",\"items\":[{\"name\":\"Wortels, tomaten, appel\",\"unique\":\"Nee\",\"quantity\":2},{\"name\":\"Gesundheit: 1\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Brood, pindakaas, halvarine, banaan, ei(?)\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Gesundheit: 2\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Banaan, kiwi, avocado, amandelen, walnoten\",\"unique\":\"Nee\",\"quantity\":1}]},{\"name\":\"Fitness\",\"items\":[{\"name\":\"Handdoek (x2)\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Sokken\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Onderbroek\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Fitness shirt\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Fitness broek\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Shampoo\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Zeep\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Deo\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Parfum\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Gezichtscreme\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Oortjes\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Fitness pas\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Een euromunt\",\"unique\":\"Ja\",\"quantity\":1}]},{\"name\":\"Haarproducten\",\"items\":[{\"name\":\"Wax\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Fohn\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Haarlak\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Haar wave spray\",\"unique\":\"Ja\",\"quantity\":1}]},{\"name\":\"Op stap\",\"inheritsFrom\":\"Haarproducten, Douchen\",\"items\":[{\"name\":\"Oordopjes\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Listerine\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Tandenborstel\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Tandpasta\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Kauwgom\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Ketting + poets spul\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Mobiel + oplader\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Scheergel\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Scheermesje\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Scheerapparaat\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Parfum\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Deo\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"ID, geld\/pinpas\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Fancy shirt\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Broek\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Sokken\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Stapschoenen\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Lenzendoosje + vloeistof\",\"quantity\":1},{\"name\":\"Wax\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Fohn\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Haarlak\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Haar wave spray\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Zeep\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Gezichtscreme\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Shampoo\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Scrubgel\",\"unique\":\"Ja\",\"quantity\":1}]},{\"name\":\"Douchen\",\"items\":[{\"name\":\"Zeep\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Gezichtscreme\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Shampoo\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Scrubgel\",\"unique\":\"Ja\",\"quantity\":1}]},{\"name\":\"Festival\",\"inheritsFrom\":\"Op stap\",\"items\":[{\"name\":\"Powerbank\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Nuts\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Kwark\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Bananen\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Oplader mobiel\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Zonnebrillen \/ gekke ook\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Eten\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Drinken\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Tandenborstel\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Tandpasta\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Snoep\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Waaier(s)\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Pet\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Waterzak(ken)\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Paraplu\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"OV chipkaart\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Oordopjes\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Listerine\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Kauwgom\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Ketting + poets spul\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Mobiel + oplader\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Scheergel\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Scheermesje\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Scheerapparaat\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Parfum\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Deo\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"ID, geld\/pinpas\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Fancy shirt\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Broek\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Sokken\",\"unique\":\"Nee\",\"quantity\":1},{\"name\":\"Stapschoenen\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Lenzendoosje + vloeistof\",\"quantity\":1},{\"name\":\"Wax\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Fohn\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Haarlak\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Haar wave spray\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Zeep\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Gezichtscreme\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Shampoo\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Scrubgel\",\"unique\":\"Ja\",\"quantity\":1}]},{\"name\":\"Zwemmen\",\"items\":[{\"name\":\"Tas om zooi in te doen\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Speaker (bluetooth)\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Strand handdoek\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Powerbank\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"USB kabel van powerbank naar speaker\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Zonnebril\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Beurs (met pinpas\/geld)\",\"unique\":\"Ja\",\"quantity\":1},{\"name\":\"Zonnebrand\",\"unique\":\"Ja\",\"quantity\":1}]}]" );
} else {
    //  We're in tasker, use the real data.
    data = JSON.parse(http_data);
    setGlobal("RETINE_DATA", data);
    isDevelopmentEnvironment = false;
    gesundheitData = JSON.parse(global('%MEALS'));
    preppingData = JSON.parse(global('%ALL_PREP_LISTS'));
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
var totalMealKeywordPrefix = mealKeyword + ": ";

var prepKeyword = "Prep";
var totalPrepListKeywordPrefix = prepKeyword + ": ";

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

function getPrepListByName(name) {
    var result = null;
    preppingData.forEach((prepList) => {
        if (prepList.name == name) {
            result = prepList;
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

function prepListItemToActionString(prepListItem) {
    var prefix = "&nbsp;&nbsp;&nbsp;&nbsp;";
    return prefix + prepListItem.quantity + "x " + prepListItem.name;
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

        if (actionName.startsWith(totalMealKeywordPrefix)) {
            var mealIdentifier = actionName.split(totalMealKeywordPrefix)[1];
            var meal = getMealByIdentifier(mealIdentifier);
            meal.foods.forEach((food) => {
                currentRoutine.actions.push(new Action(foodToActionString(food)));
            });
        } else if (actionName.startsWith(totalMealKeywordPrefix)) {
            var prepListName = actionName.split(totalPrepListKeywordPrefix)[1];
            var prepList = getPrepListByName(prepListName);
            prepList.items.forEach((item) => {
                currentRoutine.actions.push(new Action(prepListItemToActionString(item)));
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
