var isDevelopmentEnvironment = null;

// ===========================================================================================
// Step 1: Parse the data, store it in `data`.
// ===========================================================================================
var data = undefined;
if (typeof http_data === "undefined") {
    // We're developing locally, initialize sample data.
    isDevelopmentEnvironment = true;
    data = {
          "range": "'Prep Lists & Event Lists'!G17:J242", "majorDimension": "ROWS", "values": [
          [ "Douchen", "nvt", "nvt" ],
          [ "", "T: Zeep gebruiken" ],
          [ "", "T: Shampoo gebruiken" ],
          [ "", "N: Gezicht scrubben", "Max 2x per week, het liefst maandag & donderdag" ],
          [ "", "N: Gezichtscreme gebruiken", "Elke keer" ],
            [], [ "Naar fitness gaan", "nvt", "nvt" ], [ "", "V: Oortjes meenemen" ], [ "", "V: Euro meenemen" ], [ "", "V: Fitness pas meenemen" ], [], [ "Op stap gaan", "nvt", "nvt", "Douchen" ], [ "", "V: Oordopjes meenemen" ], [ "", "V: Tanden poetsen" ], [ "", "V: Listerine gebruiken" ], [ "", "V: Ketting poetsen & omdoen" ], [ "", "V: Mobiel opladen" ], [ "", "V: P/E: Douchen" ], [ "", "V: Scheerapparaat opladen" ], [ "", "V: Oksels, beneden, gezicht (scheren/trimmen)" ],
            [ "", "V: Haren doen" ], [ "", "V: Deo & parfum opdoen" ], [ "", "V: ID, geld/pinpas meenemen" ], [ "", "V: Stapschoenen aandoen" ], [ "", "V: Lenzendoosje + vloeistof meenemen" ], [], [], [ "Naar festival gaan", "nvt", "nvt", "Op stap gaan" ], [ "", "V: Powerbank opladen" ], [ "", "V: Nuts eten" ], [ "", "V: Bananen eten" ], [ "", "V: Powerbank meenemen" ], [ "", "V: Mobiel opladen" ], [ "", "V: Haren doen" ], [ "", "V: Zonnebrillen meenemen" ], [ "", "V/T: Eten" ], [ "",
              "V/T: Drinken" ], [ "", "V: Tanden poetsen" ], [ "", "V: Snoep meenemen" ], [ "", "V: Waaier(s) meenemen" ], [ "", "V: Pet meenemen" ], [ "", "V: Waterzak(ken) meenemen" ], [ "", "V: Paraplu meenemen" ], [ "", "V: OV chipkaart meenemen"
            ]]
    };
} else {
    //  We're in tasker, use the real data.
    isDevelopmentEnvironment = false;
    data = JSON.parse(http_data);
}

// ===========================================================================================
// Step 2: Define models.
// ===========================================================================================
class EventList {
    constructor(name, inheritsFrom) {
        this.name = name;
        this.inheritsFrom = inheritsFrom;
        this.actions = [];
    }
}

class Action {
    constructor(name) {
        this.name = name;
    }
}

// ===========================================================================================
// Step 3: Parse the data into the models.
// ===========================================================================================
var eventLists = [];

var currentEventList = null;
data.values.forEach(function(row) {
    if (row[0]) {
        if (currentEventList != null) {
            // We're at the next EventList, add the previous one to the list.
            eventLists.push(currentEventList);
        }

        // We have a name, create a new EventList.
        var name = row[0];
        currentEventList = new EventList(name);
        if (row[3]) {
            // We have inheritance, set it on the current event list.
            currentEventList.inheritsFrom = row[3];
        }
    } else if (row[1]) {
        // We have an action name, create a new Action.
        var actionName  = row[1];
        var action = new Action(actionName);
        currentEventList.actions.push(action);
    }
});

// The last EventList didn't get added because there was no new one to override it, so add it here as well.
eventLists.push(currentEventList);

// ===========================================================================================
// Step 4: Expand inheritance (add all actions from the other EventList to the current).
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

function getActionsFromEventListsByName(eventLists, inheritName){
    var result = [];
    eventLists.forEach(function (eventList){
        if (eventList.name == inheritName) {
            result = result.concat(eventList.actions);
        }
    });
    return result;
}

function expandInheritance(eventLists) {
    eventLists.forEach(function(eventList) {
        if (eventList.inheritsFrom) {
            // The current event list has inheritance. Parse all inherits into a list.
            var inherits = turnCommaSeparatedIntoArray(eventList.inheritsFrom);
            inherits.forEach(function (inheritName){
                var newActions = getActionsFromEventListsByName(eventLists, inheritName);
                eventList.actions = eventList.actions.concat(newActions);
            });
        }
    });
}

// Expand inheritance on all event lists.
expandInheritance(eventLists);

// ===========================================================================================
// Step 5: Generate all variables for each EventList.
// ===========================================================================================
function renderEventListToHtml(eventList) {
    var result = "<table>";

    var iteration = 0;
    eventList.actions.forEach(action => {
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

for (var i = 0; i < eventLists.length; i++) {
    // Result variables for each event will be:
    // 1: EVENT_DOUCHEN_NAME = "Douchen"
    // 2: EVENT_DOUCHEN_OBJECT = JSON string representation of EventList
    // 3: EVENT_DOUCHEN_RENDERED = EventList rendered to html, presentable in a popup
    var currentEventList = eventLists[i];
    var currentEventNameAsKey = currentEventList.name.replace(/\s+/g, '_').toUpperCase();

    // 1:
    var currentEventListNameKey = `EVENT_${currentEventNameAsKey}_NAME`;
    var currentEventListNameValue = `${currentEventList.name}`;

    // 2:
    var currentEventListObjectKey = `EVENT_${currentEventNameAsKey}_OBJECT`;
    var currentEventListObjectValue = JSON.stringify(currentEventList);

    // 3:
    var currentEventListRenderedKey = `EVENT_${currentEventNameAsKey}_RENDERED`;
    var currentEventListRenderedValue = renderEventListToHtml(currentEventList);

    if (isDevelopmentEnvironment) {
        console.log(`${currentEventListNameKey}: ${currentEventListNameValue}`);
        console.log(`${currentEventListObjectKey}: ${currentEventListObjectValue}`);
        console.log(`${currentEventListRenderedKey}: ${currentEventListRenderedValue}`);
    } else {
        setGlobal(currentEventListNameKey, currentEventListNameValue);
        setGlobal(currentEventListObjectKey, currentEventListObjectValue);
        setGlobal(currentEventListRenderedKey, currentEventListRenderedValue);
    }
}
