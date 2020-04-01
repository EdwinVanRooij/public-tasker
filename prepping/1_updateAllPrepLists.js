var isDevelopmentEnvironment = null;

var data = undefined;
if (typeof http_data === "undefined") {
    // We're developing locally, initialize sample data.
    isDevelopmentEnvironment = true;
    data = { "range": "'Prep Lists'!A17:D126", "majorDimension": "ROWS", "values": [ [ "Werk", "nvt", "nvt" ], [ "", "Wortels, tomaten, appel", "Nee" ], [ "", "Wortels, tomaten, appel", "Nee" ], [ "", "Brood, pindakaas, halvarine, banaan, ei(?)", "Nee" ], [ "", "Banaan, kiwi, avocado, amandelen, walnoten", "Nee" ], [], [], [ "Fitness", "nvt", "nvt" ], [ "", "Handdoek (x2)", "Nee" ], [ "", "Sokken", "Nee" ], [ "", "Onderbroek", "Nee" ], [ "", "Fitness shirt", "Ja" ], [ "", "Fitness broek", "Ja" ], [ "", "Shampoo", "Ja" ], [ "", "Zeep", "Ja" ], [ "", "Deo", "Ja" ], [ "", "Parfum", "Ja" ], [ "", "Gezichtscreme", "Ja" ], [ "", "Oortjes", "Ja" ], [ "", "Fitness pas", "Ja" ], [ "", "Een euromunt", "Ja" ], [], [], [ "Haarproducten", "nvt", "nvt" ], [ "", "Wax", "Ja" ], [ "", "Fohn", "Ja" ], [ "", "Haarlak", "Ja" ], [ "", "Haar wave spray", "Ja" ], [], [], [], [], [ "Op stap", "nvt", "nvt", "Haarproducten, Douchen" ], [ "", "Oordopjes", "Ja" ], [ "", "Listerine", "Ja" ], [ "", "Tandenborstel", "Ja" ], [ "", "Tandpasta", "Ja" ], [ "", "Kauwgom", "Ja" ], [ "", "Ketting + poets spul", "Ja" ], [ "", "Mobiel + oplader", "Ja" ], [ "", "Scheergel", "Ja" ], [ "", "Scheermesje", "Ja" ], [ "", "Scheerapparaat", "Ja" ], [ "", "Parfum", "Ja" ], [ "", "Deo", "Ja" ], [ "", "ID, geld/pinpas", "Ja" ], [ "", "Fancy shirt", "Nee" ], [ "", "Broek", "Nee" ], [ "", "Sokken", "Nee" ], [ "", "Stapschoenen", "Ja" ], [ "", "Lenzendoosje + vloeistof"], [], [], [ "Douchen", "nvt", "nvt" ], [ "", "Zeep", "Ja" ], [ "", "Gezichtscreme", "Ja" ], [ "", "Shampoo", "Ja" ], [ "", "Scrubgel", "Ja" ], [], [], [], [ "Festival", "nvt", "nvt", "Op stap" ], [ "", "Powerbank", "Ja" ], [ "", "Nuts", "Nee" ], [ "", "Kwark", "Nee" ], [ "", "Bananen", "Nee" ], [ "", "Oplader mobiel", "Ja" ], [ "", "Zonnebrillen / gekke ook", "Ja" ], [ "", "Eten", "Nee" ], [ "", "Drinken", "Nee" ], [ "", "Tandenborstel", "Ja" ], [ "", "Tandpasta", "Ja" ], [ "", "Snoep", "Nee" ], [ "", "Waaier(s)", "Ja" ], [ "", "Pet", "Ja" ], [ "", "Waterzak(ken)", "Ja" ], [ "", "Paraplu", "Ja" ], [ "", "OV chipkaart", "Ja" ], [], [], [], [ "Zwemmen", "nvt", "nvt" ], [ "", "Tas om zooi in te doen", "Ja" ], [ "", "Speaker (bluetooth)", "Ja" ], [ "", "Strand handdoek", "Ja" ], [ "", "Powerbank", "Ja" ], [ "", "USB kabel van powerbank naar speaker", "Ja" ], [ "", "Zonnebril", "Ja" ], [ "", "Beurs (met pinpas/geld)", "Ja" ], [ "", "Zonnebrand", "Ja" ] ] }
} else {
    //  We're in tasker, use the real data.
    isDevelopmentEnvironment = false;
    data = = JSON.parse(http_data);
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
