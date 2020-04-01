// Save whether or not we're in a development environment, or in Tasker.
var isDevelopmentEnvironment = null;

// Make sure data is initalized into `data`.
var data = undefined;
if (typeof http_data === "undefined") {
    // We're developing locally, initialize sample data.
    isDevelopmentEnvironment = true;
    data = {
      "range": "'Prep Lists & Event Lists'!G17:J242",
      "majorDimension": "ROWS",
      "values": [
        [
          "Douchen",
          "nvt",
          "nvt"
        ],
        [
          "",
          "T: Zeep gebruiken"
        ],
        [
          "",
          "T: Shampoo gebruiken"
        ],
        [
          "",
          "N: Gezicht scrubben",
          "Max 2x per week, het liefst maandag & donderdag"
        ],
        [
          "",
          "N: Gezichtscreme gebruiken",
          "Elke keer"
        ],
        [],
        [
          "Naar fitness gaan",
          "nvt",
          "nvt"
        ],
        [
          "",
          "V: Oortjes meenemen"
        ],
        [ "", "V: Euro meenemen" ], [ "", "V: Fitness pas meenemen" ], [], [ "Op stap gaan", "nvt", "nvt", "Douchen" ], [ "", "V: Oordopjes meenemen" ], [ "", "V: Tanden poetsen" ], [ "", "V: Listerine gebruiken" ], [ "", "V: Ketting poetsen & omdoen" ], [ "", "V: Mobiel opladen"
        ], [ "", "V: P/E: Douchen" ], [ "", "V: Scheerapparaat opladen" ], [ "", "V: Oksels, beneden, gezicht (scheren/trimmen)" ], [ "", "V: Haren doen" ], [ "", "V: Deo & parfum opdoen" ], [ "", "V: ID, geld/pinpas meenemen" ], [ "", "V: Stapschoenen aandoen" ], [ "", "V: Lenzendoosje + vloeistof meenemen" ], [], [], [ "Naar festival gaan", "nvt", "nvt", "Op stap gaan" ], [ "", "V: Powerbank opladen" ], [ "", "V: Nuts eten" ], [ "", "V: Bananen eten" ], [ "", "V: Powerbank meenemen" ], [
          "", "V: Mobiel opladen" ], [ "", "V: Haren doen" ], [ "", "V: Zonnebrillen meenemen" ], [ "", "V/T: Eten" ], [ "", "V/T: Drinken" ], [ "", "V: Tanden poetsen" ], [ "", "V: Snoep meenemen" ], [ "", "V: Waaier(s) meenemen" ], [ "", "V: Pet meenemen" ], [ "", "V: Waterzak(ken) meenemen" ],
        [ "", "V: Paraplu meenemen" ], [ "", "V: OV chipkaart meenemen" ]
      ]
    };
} else {
    //  We're in Tasker, use the real data.
    isDevelopmentEnvironment = false;
    data = JSON.parse(http_data);
}

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

class PrepList {
    constructor(name, inheritsFrom) {
        this.name = name;
        this.inheritsFrom = inheritsFrom;
        this.items = [];
    }
}

class PrepListItem {
    constructor(name, unique){
        this.name = name;
        this.unique = unique;
        this.quantity = 1; // Once by default, add when necessary.
    }
}

// Search through the given prep lists until found by inheritName, then return its items.
function getItemsFromPrepListsByName(prepLists, inheritName){
    var result = [];
    prepLists.forEach(function (prepList){
        if (prepList.name == inheritName) {
            result = result.concat(prepList.items);
        }
    });
    return result;
}

// Expands inheritance for all given prep lists
function expandInheritance(prepLists) {
    prepLists.forEach(function(prepList) {
        if (prepList.inheritsFrom) {
            // The current prep lists has inheritance. Parse it into a list.
            var inherits = turnCommaSeparatedIntoArray(prepList.inheritsFrom);
            if (Array.isArray(inherits)) {
                // We have an array of inherits, loop over it.
                inherits.forEach(function (inheritName){
                    var newItems = getItemsFromPrepListsByName(prepLists, inheritName);
                    prepList.items = prepList.items.concat(newItems);
                });
            }
        }
    });
}

// Checks if the given PrepListItem exists in the given array of PrepListItems.
function itemIsInArrayYet(prepListItems, prepListItemToMatch) {
    var resultBoolean = false;
    prepListItems.forEach(function (prepListItem) {
        if (prepListItem.name == prepListItemToMatch.name) {
            // The given item exists in the given array. Return true.
            resultBoolean = true;
        }
    });
    return resultBoolean;
}

function setItemQuantityHigher(prepListItems, item) {
    prepListItems.forEach(function (prepListItem) {
        if (prepListItem.name == item.name) {
            prepListItem.quantity += item.quantity;
        }
    });
}

// Remove all duplicate unique items.
function removeDuplicateUniqueItems(prepLists) {
    prepLists.forEach(function(prepList) {
        var resultItems = [];
        prepList.items.forEach(function(item) {
            if (item.unique === "Nee") {
                // The item is not unique.
                // Check if it's already in our list.
                if (itemIsInArrayYet(resultItems, item)) {
                    setItemQuantityHigher(resultItems, item);
                } else {
                    // Item is not in the list. Just add it.
                    resultItems.push(item);
                }
            } else if (item.unique === "Ja") {
                // The item is unique. Only add it if it's not in there yet.
                if (!itemIsInArrayYet(resultItems, item)) {
                    resultItems.push(item);
                } else {
                    // Ignore it, because it should be in the list only once.
                }
            } else {
                // The item has no 'unique' value, just add it.
                resultItems.push(item);
            }
        });
        prepList.items = resultItems;
    });
}

// Initialize an array that will contain all PrepLists.
var allPrepLists = [];

// Keep track of which prepList we're at.
var currentPrepListIndex = -1;

// Loop over all received rows.
data.values.forEach(function(row) {
    var prepListName = row[0];
    if (prepListName) {
        // We're at a new prep list, so up the current prep list index.
        currentPrepListIndex++;

        // We have a prep list name, so this is a header row.
        // Create a new `PrepList`.
        var inheritsFrom = row[3];
        var prepList = new PrepList(prepListName, inheritsFrom);
        allPrepLists.push(prepList);
    } else {
        // This is not a header row.
        var itemName = row[1];
        if (itemName) {
            // We're at a new item. Add it to the current PrepList.
            var unique = row[2];
            var prepListItem = new PrepListItem(itemName, unique);
            allPrepLists[currentPrepListIndex].items.push(prepListItem);
        } else {
            // This row is not a header row, nor an item row. Do nothing.
        }
    }
});

// Now expand all inheritance.
expandInheritance(allPrepLists);

// Now remove all duplicate unique items.
removeDuplicateUniqueItems(allPrepLists);

//console.log(allPrepLists);
var globalKey = "ALL_PREP_LISTS";
if (isDevelopmentEnvironment) {
    console.log("Setting global variable " + globalKey);
    console.log(allPrepLists);
} else {
    // We're in Tasker, set the global variable.
    setGlobal(globalKey, JSON.stringify(allPrepLists));
}
