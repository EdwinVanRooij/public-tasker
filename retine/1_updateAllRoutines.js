var data = JSON.parse(http_data);
//var data = {
//  "range": "'Timed Checklists'!A10:F28",
//    "majorDimension": "ROWS",
//      "values": [
//          [ "09:00", "Ochtend routine", "nvt", "00:16:10", "Ja" ], [ "", "", "Lenzen indoen", "00:00:30" ], [ "", "", "Tanden poetsen", "00:02:00" ], [ "", "", "Aankleden", "00:01:00" ], [ "", "", "Eten (zie Project Gesundheit)", "00:10:00" ], [ "", "", "P: Overdag meal prep", "00:02:00" ], [ "", "", "Deo opdoen", "00:00:10" ], [ "", "", "Parfum opdoen", "00:00:10" ], [], [ "07:00", "Extra routine", "nvt", "00:00:10", "Ja" ], [ "", "", "Extra ding", "00:00:10" ], [], [], [ "08:45", "Ochtend fitness routine", "nvt", "00:02:00", "Ja", "Ochtend routine, Extra routine" ], [ "", "", "P: Fitness prep", "00:02:00" ] ] };

function turnCommaSeparatedIntoArray(inputString) {
    if (inputString) {
        if (inputString.includes(",")) {
            return inputString.split(",").map(function(item) { return item.trim(); }); // Turns "One, Two, Three" into ["One", "Two", "Three"]
        } else {
            return [ inputString ];
        }
    } else {
        return "";
    }
}

function parseActionFromRow(row) {
    return { "description": row[2], "duration": row[3] };
}

var checkListNumber = 0;
var checkListsMap = {};
var currentCheckListName = "";
data.values.forEach(function(row) {
    if (row[0]) {
        // We have a time here, so this is a header row.
        // Create a new checkList object
        currentCheckListName = row[1];
        var checkList = {
            "time": row[0],
            "name": currentCheckListName,
            "total_duration": row[3],
            "is_active": row[4],
            "inherits_from": turnCommaSeparatedIntoArray(row[5]),
            "actions": []
        };

        // Add it to the list
        checkListsMap[currentCheckListName] = checkList;
    } else if (row[2]) {
        // We have no time, but we do have an action here.
        checkListsMap[currentCheckListName].actions.push(parseActionFromRow(row));
    }
});

function generateTaskerNameFromChecklistName(name) {
    return name.replace(/ /g,"_").toUpperCase();
}

// Make sure inheritance is fixed
function compileCheckLists(checkListsMap) {
    for (const [key, value] of Object.entries(checkListsMap)) {

        if (Array.isArray(value.inherits_from)) {
            value.inherits_from.forEach(inheritedCheckListName => {
                var inheritedCheckListActions = checkListsMap[inheritedCheckListName].actions;
                checkListsMap[key].actions.unshift(...inheritedCheckListActions); // Insert at the beginning
            });
        }
    }
}

compileCheckLists(checkListsMap);

function formatToHtml(checkList) {
    var result = "<table style=\"width:100%\">";
    var iteration = 0;
    checkList.actions.forEach(task => {
        iteration ++;
        result += `<tr><td>
                        <input type="checkbox" id="${iteration}" name="${iteration}" value="${iteration}">
                        <label for="${iteration}" data-content="${task.description}">${task.description}</label>
                    </td>
                </tr>`;
        });
    return result;
}

for (const [key, value] of Object.entries(checkListsMap)) {
    var keyTime = generateTaskerNameFromChecklistName(checkListsMap[key].name) + '_TIME';
    var valueTime = checkListsMap[key].time;
    var keyName = generateTaskerNameFromChecklistName(checkListsMap[key].name) + '_NAME';
    var valueName = checkListsMap[key].name;
    var keyValue = generateTaskerNameFromChecklistName(checkListsMap[key].name) + '_VALUE';
    var valueValue = formatToHtml(checkListsMap[key]);

//console.log(keyTime + ': ' + valueTime);
//console.log(keyName + ': ' + valueName);
//console.log(keyValue + ': ' + valueValue);
    setGlobal(keyTime, valueTime);
    setGlobal(keyName, valueName);
    setGlobal(keyValue, valueValue);
}
