var isDevelopmentEnvironment = null;

// ===========================================================================================
// Step 1: Parse the data, store it in `data`.
// ===========================================================================================
var data = undefined;
if (typeof http_data === "undefined") {
    // We're developing locally, initialize sample data.
    isDevelopmentEnvironment = true;
    data = {
      "range": "'Timed Checklists'!A10:F28",
        "majorDimension": "ROWS",
          "values": [
              [ "09:00", "Ochtend routine", "nvt", "00:16:10", "Ja" ], [ "", "", "Lenzen indoen", "00:00:30" ], [ "", "", "Tanden poetsen", "00:02:00" ], [ "", "", "Aankleden", "00:01:00" ], [ "", "", "Eten (zie Project Gesundheit)", "00:10:00" ], [ "", "", "P: Overdag meal prep", "00:02:00" ], [ "", "", "Deo opdoen", "00:00:10" ], [ "", "", "Parfum opdoen", "00:00:10" ], [], [ "07:00", "Extra routine", "nvt", "00:00:10", "Ja" ], [ "", "", "Extra ding", "00:00:10" ], [], [], [ "08:45", "Ochtend fitness routine", "nvt", "00:02:00", "Ja", "Ochtend routine, Extra routine" ], [ "", "", "P: Fitness prep", "00:02:00" ] ] };
} else {
    //  We're in tasker, use the real data.
    isDevelopmentEnvironment = false;
    data = JSON.parse(http_data);
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
        this.name = duration;
    }
}

// ===========================================================================================
// Step 3: Parse the data into the models.
// ===========================================================================================
var routines = [];

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
        currentRoutine = new Routine(time, name, duration, isActive, inheritsFrom);
        if (row[5]) {
            // We have inheritance, set it on the current event list.
            currentRoutine.inheritsFrom = row[5];
        }
    } else if (row[2]) {
        // We have an action name, create a new Action.
        var actionName = row[2];
        var action = new Action(actionName);
        if (row[3]) {
            // We have a duration, set it on the current action.
            action.duration = row[3];
        }
        currentRoutine.actions.push(action);
    }
});

// The last Routine didn't get added because there was no new one to override it, so add it here as well.
routines.push(currentRoutine);

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
            // The current event list has inheritance. Parse all inherits into a list.
            var inherits = turnCommaSeparatedIntoArray(routine.inheritsFrom);
            inherits.forEach(function (inheritName){
                var newActions = getActionsFromRoutinesByName(routines, inheritName);
                routine.actions = routine.actions.concat(newActions);
            });
        }
    });
}

// Expand inheritance on all event lists.
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
    // Result variables for each event will be:
    // 1: ROUTINE_OCHTEND_NAME = "Ochtend"
    // 2: ROUTINE_OCHTEND_TIME = "07:42"
    // 3: ROUTINE_OCHTEND_OBJECT = JSON string representation of Routine
    // 4: ROUTINE_OCHTEND_RENDERED = Routine rendered to html, presentable in a popup
    var currentRoutine = routines[i];
    var currentRoutineNameAsKey = currentRoutine.name.replace(/\s+/g, '_').toUpperCase();

    // 1:
    var currentRoutineNameKey = `EVENT_${currentRoutineNameAsKey}_NAME`;
    var currentRoutineNameValue = `${currentRoutine.name}`;

    // 2:
    var currentRoutineTimeKey = `EVENT_${currentRoutineNameAsKey}_TIME`;
    var currentRoutineTimeValue = `${currentRoutine.duration}`;

    // 3:
    var currentRoutineObjectKey = `EVENT_${currentRoutineNameAsKey}_OBJECT`;
    var currentRoutineObjectValue = JSON.stringify(currentRoutine);

    // 4:
    var currentRoutineRenderedKey = `EVENT_${currentRoutineNameAsKey}_RENDERED`;
    var currentRoutineRenderedValue = renderEventListToHtml(currentRoutine);

    if (isDevelopmentEnvironment) {
        console.log(`${currentRoutineNameKey}: ${currentRoutineNameValue}`);
        console.log(`${currentRoutineObjectKey}: ${currentRoutineObjectValue}`);
        console.log(`${currentRoutineRenderedKey}: ${currentRoutineRenderedValue}`);
    } else {
        setGlobal(currentRoutineNameKey, currentRoutineNameValue);
        setGlobal(currentRoutineObjectKey, currentRoutineObjectValue);
        setGlobal(currentRoutineRenderedKey, currentRoutineRenderedValue);
    }
}
