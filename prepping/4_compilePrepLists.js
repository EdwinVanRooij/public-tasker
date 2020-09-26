//var ALL_PREP_LISTS = `[{"name":"Werk","items":[{"name":"Wortels, tomaten, appel","unique":"Nee","quantity":1},{"name":"Brood, pindakaas, halvarine, banaan, ei(?)","unique":"Nee","quantity":1},{"name":"Banaan, kiwi, avocado, amandelen, walnoten","unique":"Nee","quantity":2}]},{"name":"Fitness","items":[{"name":"Handdoek (x2)","unique":"Nee","quantity":1},{"name":"Sokken","unique":"Nee","quantity":1},{"name":"Onderbroek","unique":"Nee","quantity":1},{"name":"Fitness shirt","unique":"Ja","quantity":1},{"name":"Fitness broek","unique":"Ja","quantity":1},{"name":"Shampoo","unique":"Ja","quantity":1},{"name":"Zeep","unique":"Ja","quantity":1},{"name":"Deo","unique":"Ja","quantity":1},{"name":"Parfum","unique":"Ja","quantity":1},{"name":"Gezichtscreme","unique":"Ja","quantity":1},{"name":"Oortjes","unique":"Ja","quantity":1},{"name":"Fitness pas","unique":"Ja","quantity":1},{"name":"Een euromunt","unique":"Ja","quantity":1}]},{"name":"Haarproducten","items":[{"name":"Wax","unique":"Ja","quantity":1},{"name":"Fohn","unique":"Ja","quantity":1},{"name":"Haarlak","unique":"Ja","quantity":1},{"name":"Haar wave spray","unique":"Ja","quantity":1}]},{"name":"Op stap","inheritsFrom":"Haarproducten, Douchen","items":[{"name":"Oordopjes","unique":"Ja","quantity":1},{"name":"Listerine","unique":"Ja","quantity":1},{"name":"Tandenborstel","unique":"Ja","quantity":1},{"name":"Tandpasta","unique":"Ja","quantity":1},{"name":"Kauwgom","unique":"Ja","quantity":1},{"name":"Ketting + poets spul","unique":"Ja","quantity":1},{"name":"Mobiel + oplader","unique":"Ja","quantity":1},{"name":"Scheergel","unique":"Ja","quantity":1},{"name":"Scheermesje","unique":"Ja","quantity":1},{"name":"Scheerapparaat","unique":"Ja","quantity":1},{"name":"Parfum","unique":"Ja","quantity":1},{"name":"Deo","unique":"Ja","quantity":1},{"name":"ID, geld/pinpas","unique":"Ja","quantity":1},{"name":"Fancy shirt","unique":"Nee","quantity":1},{"name":"Broek","unique":"Nee","quantity":1},{"name":"Sokken","unique":"Nee","quantity":1},{"name":"Stapschoenen","unique":"Ja","quantity":1},{"name":"Lenzendoosje + vloeistof","quantity":1},{"name":"Wax","unique":"Ja","quantity":1},{"name":"Fohn","unique":"Ja","quantity":1},{"name":"Haarlak","unique":"Ja","quantity":1},{"name":"Haar wave spray","unique":"Ja","quantity":1},{"name":"Zeep","unique":"Ja","quantity":1},{"name":"Gezichtscreme","unique":"Ja","quantity":1},{"name":"Shampoo","unique":"Ja","quantity":1},{"name":"Scrubgel","unique":"Ja","quantity":1}]},{"name":"Douchen","items":[{"name":"Zeep","unique":"Ja","quantity":1},{"name":"Gezichtscreme","unique":"Ja","quantity":1},{"name":"Shampoo","unique":"Ja","quantity":1},{"name":"Scrubgel","unique":"Ja","quantity":1}]},{"name":"Festival","inheritsFrom":"Op stap","items":[{"name":"Powerbank","unique":"Ja","quantity":1},{"name":"Nuts","unique":"Nee","quantity":1},{"name":"Kwark","unique":"Nee","quantity":1},{"name":"Bananen","unique":"Nee","quantity":1},{"name":"Oplader mobiel","unique":"Ja","quantity":1},{"name":"Zonnebrillen / gekke ook","unique":"Ja","quantity":1},{"name":"Eten","unique":"Nee","quantity":1},{"name":"Drinken","unique":"Nee","quantity":1},{"name":"Tandenborstel","unique":"Ja","quantity":1},{"name":"Tandpasta","unique":"Ja","quantity":1},{"name":"Snoep","unique":"Nee","quantity":1},{"name":"Waaier(s)","unique":"Ja","quantity":1},{"name":"Pet","unique":"Ja","quantity":1},{"name":"Waterzak(ken)","unique":"Ja","quantity":1},{"name":"Paraplu","unique":"Ja","quantity":1},{"name":"OV chipkaart","unique":"Ja","quantity":1},{"name":"Oordopjes","unique":"Ja","quantity":1},{"name":"Listerine","unique":"Ja","quantity":1},{"name":"Kauwgom","unique":"Ja","quantity":1},{"name":"Ketting + poets spul","unique":"Ja","quantity":1},{"name":"Mobiel + oplader","unique":"Ja","quantity":1},{"name":"Scheergel","unique":"Ja","quantity":1},{"name":"Scheermesje","unique":"Ja","quantity":1},{"name":"Scheerapparaat","unique":"Ja","quantity":1},{"name":"Parfum","unique":"Ja","quantity":1},{"name":"Deo","unique":"Ja","quantity":1},{"name":"ID, geld/pinpas","unique":"Ja","quantity":1},{"name":"Fancy shirt","unique":"Nee","quantity":1},{"name":"Broek","unique":"Nee","quantity":1},{"name":"Sokken","unique":"Nee","quantity":1},{"name":"Stapschoenen","unique":"Ja","quantity":1},{"name":"Lenzendoosje + vloeistof","quantity":1},{"name":"Wax","unique":"Ja","quantity":1},{"name":"Fohn","unique":"Ja","quantity":1},{"name":"Haarlak","unique":"Ja","quantity":1},{"name":"Haar wave spray","unique":"Ja","quantity":1},{"name":"Zeep","unique":"Ja","quantity":1},{"name":"Gezichtscreme","unique":"Ja","quantity":1},{"name":"Shampoo","unique":"Ja","quantity":1},{"name":"Scrubgel","unique":"Ja","quantity":1}]},{"name":"Zwemmen","items":[{"name":"Tas om zooi in te doen","unique":"Ja","quantity":1},{"name":"Speaker (bluetooth)","unique":"Ja","quantity":1},{"name":"Strand handdoek","unique":"Ja","quantity":1},{"name":"Powerbank","unique":"Ja","quantity":1},{"name":"USB kabel van powerbank naar speaker","unique":"Ja","quantity":1},{"name":"Zonnebril","unique":"Ja","quantity":1},{"name":"Beurs (met pinpas/geld)","unique":"Ja","quantity":1},{"name":"Zonnebrand","unique":"Ja","quantity":1}]}]`;
var allPrepLists = JSON.parse(global('%ALL_PREP_LISTS'));

// Step 0: Prepare fake global data.
var gesundheitData = JSON.parse(global('%MEALS'));
//var gesundheitData = JSON.parse("[{\"identifier\":1,\"time\":\"09:00\",\"foods\":[{\"quantity\":\"90\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"75\",\"name\":\"Brinta\"},{\"quantity\":\"22\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"22\",\"name\":\"Eiwitpoeder\"},{\"quantity\":\"230\",\"unit\":\"ml\",\"portion_size\":\"\",\"total_quantity\":\"200\",\"name\":\"Melk\"}]},{\"identifier\":2,\"time\":\"10:30\",\"foods\":[{\"quantity\":\"40\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"83\",\"name\":\"Wortel\/Waspeen\"},{\"quantity\":\"120\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"83\",\"name\":\"Tomaat\"},{\"quantity\":\"1\",\"unit\":\"stuk\",\"portion_size\":\"150\",\"total_quantity\":\"150\",\"name\":\"Appel (Jonagold)\"}]},{\"identifier\":3,\"time\":\"12:00\",\"foods\":[{\"quantity\":\"8\",\"unit\":\"stuk\",\"portion_size\":\"35\",\"total_quantity\":\"280\",\"name\":\"Brood (volkoren)\"},{\"quantity\":\"2\",\"unit\":\"stuk\",\"portion_size\":\"15\",\"total_quantity\":\"30\",\"name\":\"Pindakaas (gemiddeld)\"},{\"quantity\":\"2\",\"unit\":\"stuk\",\"portion_size\":\"5\",\"total_quantity\":\"10\",\"name\":\"Jumbo Halvarine\"},{\"quantity\":\"1\",\"unit\":\"stuk\",\"portion_size\":\"125\",\"total_quantity\":\"125\",\"name\":\"Banaan\"},{\"quantity\":\"0.5\",\"unit\":\"stuk\",\"portion_size\":\"53\",\"total_quantity\":\"26.5\",\"name\":\"Ei (gekookt)\"}]},{\"identifier\":4,\"time\":\"15:00\",\"foods\":[{\"quantity\":\"1\",\"unit\":\"stuk\",\"portion_size\":\"125\",\"total_quantity\":\"125\",\"name\":\"Banaan\"},{\"quantity\":\"1\",\"unit\":\"stuk\",\"portion_size\":\"100\",\"total_quantity\":\"100\",\"name\":\"Kiwi (groene)\"},{\"quantity\":\"30\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"25\",\"name\":\"Avocado\"},{\"quantity\":\"20\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"20\",\"name\":\"Amandelen\"},{\"quantity\":\"10\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"10\",\"name\":\"Walnoten\"}]},{\"identifier\":5,\"time\":\"18:00\",\"foods\":[{\"quantity\":\"200\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"100\",\"name\":\"Kipfilet\"},{\"quantity\":\"125\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"125\",\"name\":\"Meergranenrijst (gekookt)\"},{\"quantity\":\"50\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"50\",\"name\":\"Broccoli (gekookt)\"},{\"quantity\":\"25\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"25\",\"name\":\"Aardappelen (gekookt)\"},{\"quantity\":\"25\",\"unit\":\"ml\",\"portion_size\":\"\",\"total_quantity\":\"25\",\"name\":\"Mayonaise\"}]},{\"identifier\":6,\"time\":\"21:00\",\"foods\":[{\"quantity\":\"500\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"500\",\"name\":\"Franse magere kwark\"},{\"quantity\":\"15\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"15\",\"name\":\"Lijnzaad\"},{\"quantity\":\"15\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"15\",\"name\":\"Chiazaad\"},{\"quantity\":\"10\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"10\",\"name\":\"Zonnebloempitten\"}]},{\"identifier\":7,\"time\":\"nvt\",\"foods\":[{\"quantity\":\"1200\",\"unit\":\"ml\",\"portion_size\":\"\",\"total_quantity\":\"1200\",\"name\":\"Water\"},{\"quantity\":\"50\",\"unit\":\"g\",\"portion_size\":\"\",\"total_quantity\":\"50\",\"name\":\"Snoep (zuur, gem.)\"},{\"quantity\":\"1\",\"unit\":\"stuk\",\"portion_size\":\"20\",\"total_quantity\":\"20\",\"name\":\"Vitamine D pil (kruidvat)\"}]}]");

var userSelection = JSON.parse(global('%PREP_LIST_USER_SELECTION'))
//var userSelection = {
//    "Werk": 2,
//    "Fitness": 1,
//    "Haarproducten": 1,
//    "Douchen": 2
//};

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
function removeDuplicateUniqueItems(prepList) {
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
        this.quantity = 1; // 1 time by default, add when necessary.
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

function getMealByIdentifier(identifier) {
    var result = null;
    gesundheitData.forEach((meal) => {
        if (meal.identifier == identifier) {
            result = meal;
        };
    })
    return meal;
}

function foodToPrepItemRowString(food) {
    var prefix = "   ";
    if (food.portion_size) {
        // This is a 'portie', so treat it as such
        return prefix + food.name + food.quantity + "x";
    } else {
        // This is a 'portie', so treat it as such
        return prefix + food.name + food.total_quantity + food.unit;
    }
}

// Combines the given prep lists into one huge prep list, according to the user selection.
function compilePrepList(allPrepLists, userSelection) {
    var compiledPrepList = new PrepList("Compiled Prep List");

    for (const [name, quantity] of Object.entries(userSelection)) {
        // name == "Fitness"
        // quantity == 1
        allPrepLists.forEach(function(prepList) {
            if (prepList.name == name) {
                // Found a matching prep list, add all its items to the final prep list (accounting for quantity as well).
                for (let i = 0; i < quantity; i++) {
                    prepList.items.forEach((item) => {
                        if (item.name.startsWith(totalKeywordPrefix)) {
                            var mealIdentifier = item.split(totalKeywordPrefix)[1];
                            // Add all items from this meal instead of this identifier item.
                            var meal = getMealByIdentifier(mealIdentifier);
                            meal.foods.forEach((food) => {
                                compiledPrepList.items.push(foodToPrepItemRowString(food));
                            });
                        } else {
                            // Doesn't start with identifier, just add this item.
                            compiledPrepList.items.push(item);
                        }
                    });
                }
            }
        });
    }

    // Now remove duplicates (adding to quantity if non-unique).
    removeDuplicateUniqueItems(compiledPrepList);

    return compiledPrepList;
}

// Create one huge PrepList, accounting for the quantities selected by the user.
var compiledPrepList = compilePrepList(allPrepLists, userSelection);

//console.log(compiledPrepList);
setGlobal("COMPILED_PREP_LIST", JSON.stringify(compiledPrepList));
