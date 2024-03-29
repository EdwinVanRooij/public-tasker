var isDevelopmentEnvironment = null;
var allPrepLists = null;
var gesundheitData = null;
var userSelection = null;

// ===========================================================================================
// Step 1: Parse the data, store it in `data`.
// ===========================================================================================

if (typeof setGlobal === "undefined") {
  // We're developing locally, initialize sample data.
  isDevelopmentEnvironment = true;
  allPrepLists = JSON.parse(
    '[{"name":"Ochtend (eten)","items":[{"name":"Gesundheit: 1","unique":"Nee","quantity":1},{"name":"Gesundheit: 2","quantity":1}]},{"name":"Middag (eten)","items":[{"name":"Gesundheit: 3","unique":"Nee","quantity":1},{"name":"Gesundheit: 4","unique":"Nee","quantity":1}]},{"name":"Avond (eten)","items":[{"name":"Gesundheit: 6","unique":"Nee","quantity":1}]},{"name":"Nacht","items":[{"name":"C2 kleren: Onderbroek","unique":"Nee","quantity":1},{"name":"C2 kleren: Sokken","unique":"Nee","quantity":1},{"name":"C1 toilettas: Lenzendoosje","unique":"Ja","quantity":1},{"name":"C1 toilettas: Lenzenvloeistof","unique":"Ja","quantity":1},{"name":"C99 final: Eigen kussen","unique":"Ja","quantity":1}]},{"name":"Haren doen","items":[{"name":"C11 kapsel: Wax","unique":"Ja","quantity":1},{"name":"C11 kapsel: Fohn","unique":"Ja","quantity":1},{"name":"C11 kapsel: Haarlak","unique":"Ja","quantity":1},{"name":"C11 kapsel: Haar wave spray","unique":"Ja","quantity":1}]},{"name":"Tanden poetsen","items":[{"name":"C1 toilettas: Tandenborstel","unique":"Ja","quantity":1},{"name":"C1 toilettas: Tandpasta","unique":"Ja","quantity":1}]},{"name":"Douchen","items":[{"name":"C1 toilettas: Douchegel (zeep)","unique":"Ja","quantity":1},{"name":"C1 toilettas: Gezichtscreme","unique":"Ja","quantity":1},{"name":"C1 toilettas: Shampoo","unique":"Ja","quantity":1},{"name":"C1 toilettas: Scrubgel","unique":"Ja","quantity":1}]},{"name":"Fancy","inheritsFrom":"Tanden poetsen, Haren doen","items":[{"name":"C1 toilettas: Ketting + poets spul","unique":"Ja","quantity":1},{"name":"C9 elektronica: Mobiel + oplader","unique":"Ja","quantity":1},{"name":"C1 toilettas: Scheergel","unique":"Ja","quantity":1},{"name":"C1 toilettas: Scheermesje","unique":"Ja","quantity":1},{"name":"C1 toilettas: Scheerapparaat","unique":"Ja","quantity":1},{"name":"C1 toilettas: Parfum","unique":"Ja","quantity":1},{"name":"C1 toilettas: Deo","unique":"Ja","quantity":1},{"name":"C2 kleren: Fancy shirt","unique":"Nee","quantity":1},{"name":"C2 kleren: (Fancy broek)","unique":"Nee","quantity":1},{"name":"C2 kleren: Sokken","unique":"Nee","quantity":1},{"name":"C1 toilettas: Tandenborstel","unique":"Ja","quantity":1},{"name":"C1 toilettas: Tandpasta","unique":"Ja","quantity":1},{"name":"C11 kapsel: Wax","unique":"Ja","quantity":1},{"name":"C11 kapsel: Fohn","unique":"Ja","quantity":1},{"name":"C11 kapsel: Haarlak","unique":"Ja","quantity":1},{"name":"C11 kapsel: Haar wave spray","unique":"Ja","quantity":1}]},{"name":"Naar Giselle","inheritsFrom":"Fancy","items":[{"name":"C9 elektronica: Laptop","unique":"Ja","quantity":1},{"name":"C9 elektronica: Laptop oplader","unique":"Ja","quantity":1},{"name":"C1 toilettas: Condooms (2x)","unique":"Nee","quantity":1},{"name":"C99 final: Beurs","unique":"Ja","quantity":1},{"name":"C3 eten: Waterfles","unique":"Ja","quantity":1},{"name":"C99 final: Pet","unique":"Ja","quantity":1},{"name":"C1 toilettas: Rager","unique":"Ja","quantity":1},{"name":"C99 final: Kussen","unique":"Ja","quantity":1},{"name":"C1 toilettas: Ketting + poets spul","unique":"Ja","quantity":1},{"name":"C9 elektronica: Mobiel + oplader","unique":"Ja","quantity":1},{"name":"C1 toilettas: Scheergel","unique":"Ja","quantity":1},{"name":"C1 toilettas: Scheermesje","unique":"Ja","quantity":1},{"name":"C1 toilettas: Scheerapparaat","unique":"Ja","quantity":1},{"name":"C1 toilettas: Parfum","unique":"Ja","quantity":1},{"name":"C1 toilettas: Deo","unique":"Ja","quantity":1},{"name":"C2 kleren: Fancy shirt","unique":"Nee","quantity":1},{"name":"C2 kleren: (Fancy broek)","unique":"Nee","quantity":1},{"name":"C2 kleren: Sokken","unique":"Nee","quantity":1},{"name":"C1 toilettas: Tandenborstel","unique":"Ja","quantity":1},{"name":"C1 toilettas: Tandpasta","unique":"Ja","quantity":1},{"name":"C11 kapsel: Wax","unique":"Ja","quantity":1},{"name":"C11 kapsel: Fohn","unique":"Ja","quantity":1},{"name":"C11 kapsel: Haarlak","unique":"Ja","quantity":1},{"name":"C11 kapsel: Haar wave spray","unique":"Ja","quantity":1}]},{"name":"Fitness","items":[{"name":"C2 kleren: Handdoek (x2)","unique":"Nee","quantity":1},{"name":"C2 kleren: Sokken","unique":"Nee","quantity":1},{"name":"C2 kleren: Onderbroek","unique":"Nee","quantity":1},{"name":"C2 kleren: Fitness shirt","unique":"Ja","quantity":1},{"name":"C2 kleren: Fitness broek","unique":"Ja","quantity":1},{"name":"C1 toilettas: Shampoo","unique":"Ja","quantity":1},{"name":"C1 toilettas: Zeep","unique":"Ja","quantity":1},{"name":"C1 toilettas: Deo","unique":"Ja","quantity":1},{"name":"C1 toilettas: Parfum","unique":"Ja","quantity":1},{"name":"C99 final: Oortjes","unique":"Ja","quantity":1}]},{"name":"Op stap","inheritsFrom":"Fancy","items":[{"name":"C99 final: Oordopjes","unique":"Ja","quantity":1},{"name":"C99 final: Listerine","unique":"Ja","quantity":1},{"name":"C99 final: ID, geld/pinpas","unique":"Ja","quantity":1},{"name":"C2 kleren: Fancy shirt","unique":"Nee","quantity":3},{"name":"C99 final: Kauwgom","unique":"Ja","quantity":1},{"name":"C2 kleren: Stapschoenen","unique":"Ja","quantity":1},{"name":"C1 toilettas: Ketting + poets spul","unique":"Ja","quantity":1},{"name":"C9 elektronica: Mobiel + oplader","unique":"Ja","quantity":1},{"name":"C1 toilettas: Scheergel","unique":"Ja","quantity":1},{"name":"C1 toilettas: Scheermesje","unique":"Ja","quantity":1},{"name":"C1 toilettas: Scheerapparaat","unique":"Ja","quantity":1},{"name":"C1 toilettas: Parfum","unique":"Ja","quantity":1},{"name":"C1 toilettas: Deo","unique":"Ja","quantity":1},{"name":"C2 kleren: (Fancy broek)","unique":"Nee","quantity":1},{"name":"C2 kleren: Sokken","unique":"Nee","quantity":1},{"name":"C1 toilettas: Tandenborstel","unique":"Ja","quantity":1},{"name":"C1 toilettas: Tandpasta","unique":"Ja","quantity":1},{"name":"C11 kapsel: Wax","unique":"Ja","quantity":1},{"name":"C11 kapsel: Fohn","unique":"Ja","quantity":1},{"name":"C11 kapsel: Haarlak","unique":"Ja","quantity":1},{"name":"C11 kapsel: Haar wave spray","unique":"Ja","quantity":1}]},{"name":"Festival","inheritsFrom":"Op stap","items":[{"name":"C9 elektronica: Powerbank","unique":"Ja","quantity":1},{"name":"C3 eten: Nuts","unique":"Nee","quantity":1},{"name":"C3 eten: Kwark","unique":"Nee","quantity":1},{"name":"C3 eten: Bananen","unique":"Nee","quantity":1},{"name":"C9 elektronica: Oplader mobiel","unique":"Ja","quantity":1},{"name":"Zonnebrillen / gekke ook","unique":"Ja","quantity":1},{"name":"C3 eten: Eten","unique":"Nee","quantity":1},{"name":"C3 eten: Drinken","unique":"Nee","quantity":1},{"name":"C1 toilettas: Tandenborstel","unique":"Ja","quantity":1},{"name":"C1 toilettas: Tandpasta","unique":"Ja","quantity":1},{"name":"C99 final: Snoep","unique":"Nee","quantity":1},{"name":"Waaier(s)","unique":"Ja","quantity":1},{"name":"Pet","unique":"Ja","quantity":1},{"name":"C3 eten: Waterzak(ken)","unique":"Ja","quantity":1},{"name":"Paraplu","unique":"Ja","quantity":1},{"name":"C99 final: OV chipkaart","unique":"Ja","quantity":1},{"name":"C99 final: Oordopjes","unique":"Ja","quantity":1},{"name":"C99 final: Listerine","unique":"Ja","quantity":1},{"name":"C99 final: ID, geld/pinpas","unique":"Ja","quantity":1},{"name":"C2 kleren: Fancy shirt","unique":"Nee","quantity":3},{"name":"C99 final: Kauwgom","unique":"Ja","quantity":1},{"name":"C2 kleren: Stapschoenen","unique":"Ja","quantity":1},{"name":"C1 toilettas: Ketting + poets spul","unique":"Ja","quantity":1},{"name":"C9 elektronica: Mobiel + oplader","unique":"Ja","quantity":1},{"name":"C1 toilettas: Scheergel","unique":"Ja","quantity":1},{"name":"C1 toilettas: Scheermesje","unique":"Ja","quantity":1},{"name":"C1 toilettas: Scheerapparaat","unique":"Ja","quantity":1},{"name":"C1 toilettas: Parfum","unique":"Ja","quantity":1},{"name":"C1 toilettas: Deo","unique":"Ja","quantity":1},{"name":"C2 kleren: (Fancy broek)","unique":"Nee","quantity":1},{"name":"C2 kleren: Sokken","unique":"Nee","quantity":1},{"name":"C11 kapsel: Wax","unique":"Ja","quantity":1},{"name":"C11 kapsel: Fohn","unique":"Ja","quantity":1},{"name":"C11 kapsel: Haarlak","unique":"Ja","quantity":1},{"name":"C11 kapsel: Haar wave spray","unique":"Ja","quantity":1}]},{"name":"Zwemmen","items":[{"name":"Tas om zooi in te doen","unique":"Ja","quantity":1},{"name":"Speaker (bluetooth)","unique":"Ja","quantity":1},{"name":"Strand handdoek","unique":"Ja","quantity":1},{"name":"Powerbank","unique":"Ja","quantity":1},{"name":"USB kabel van powerbank naar speaker","unique":"Ja","quantity":1},{"name":"Zonnebril","unique":"Ja","quantity":1},{"name":"Beurs (met pinpas/geld)","unique":"Ja","quantity":1},{"name":"Zonnebrand","unique":"Ja","quantity":1}]},{"name":"Naar Werk","items":[{"name":"Pet","unique":"Ja","quantity":1}]},{"name":"Picknick","items":[{"name":"Klipje(s) (voor dichtmaken van zakken)","unique":"Nee","quantity":1},{"name":"Stoeltje(s) / zitzakken","unique":"Ja","quantity":1},{"name":"Kleed / deken","unique":"Ja","quantity":1},{"name":"Kussen(s)","unique":"Ja","quantity":1},{"name":"Water(flessen)","unique":"Ja","quantity":1},{"name":"Speaker","unique":"Ja","quantity":1},{"name":"Zonnebril","unique":"Ja","quantity":1},{"name":"Zonnebrand","unique":"Ja","quantity":1},{"name":"Picknickmand(/-tas)","unique":"Ja","quantity":1},{"name":"Bestek (messen, lepels, vorken, ...)","unique":"Nee","quantity":1},{"name":"Beker(s)","unique":"Nee","quantity":1},{"name":"Bord(en)","unique":"Nee","quantity":1},{"name":"Keukenrol","unique":"Ja","quantity":1},{"name":"Afvalzak","unique":"Nee","quantity":1},{"name":"Schoenen(/slippers)","unique":"Ja","quantity":1},{"name":"Eten","unique":"Nee","quantity":1},{"name":"Drinken","unique":"Nee","quantity":1}]}]\r\n'
  );
  gesundheitData = JSON.parse(
    '[{"identifier":1,"time":"09:00","foods":[{"quantity":"75","unit":"g","portion_size":"","total_quantity":"75","name":"Brinta"},{"quantity":"30","unit":"g","portion_size":"","total_quantity":"30","name":"Eiwitpoeder"},{"quantity":"230","unit":"ml","portion_size":"","total_quantity":"200","name":"Melk"},{"quantity":"1","unit":"stuk","portion_size":"20","total_quantity":"20","name":"Vitamine D pil (kruidvat)"}]},{"identifier":2,"time":"10:30","foods":[{"quantity":"40","unit":"g","portion_size":"","total_quantity":"83","name":"Wortel/Waspeen"},{"quantity":"120","unit":"g","portion_size":"","total_quantity":"83","name":"Tomaat"},{"quantity":"1","unit":"stuk","portion_size":"150","total_quantity":"150","name":"Appel (Jonagold)"},{"quantity":"1","unit":"schepje","portion_size":"3","total_quantity":"3","name":"Creatine"},{"quantity":"1","unit":"stuk","portion_size":"100","total_quantity":"100","name":"Kiwi (groene)"}]},{"identifier":3,"time":"12:00","foods":[{"quantity":"6","unit":"stuk","portion_size":"30","total_quantity":"180","name":"Brood (volkoren)"},{"quantity":"2","unit":"stuk","portion_size":"15","total_quantity":"30","name":"Pindakaas (gemiddeld)"},{"quantity":"2","unit":"stuk","portion_size":"5","total_quantity":"10","name":"Jumbo Halvarine"},{"quantity":"1","unit":"stuk","portion_size":"125","total_quantity":"125","name":"Banaan"},{"quantity":"0.5","unit":"stuk","portion_size":"53","total_quantity":"26.5","name":"Ei (gekookt)"}]},{"identifier":4,"time":"15:00","foods":[{"quantity":"1","unit":"stuk","portion_size":"125","total_quantity":"125","name":"Banaan"},{"quantity":"25","unit":"g","portion_size":"","total_quantity":"25","name":"Avocado"},{"quantity":"20","unit":"g","portion_size":"","total_quantity":"20","name":"Amandelen"},{"quantity":"10","unit":"g","portion_size":"","total_quantity":"10","name":"Walnoten"}]},{"identifier":5,"time":"18:00","foods":[{"quantity":"65","unit":"g","portion_size":"","total_quantity":"65","name":"Kipfilet"},{"quantity":"50","unit":"g","portion_size":"","total_quantity":"50","name":"Meergranenrijst (gekookt)"},{"quantity":"50","unit":"g","portion_size":"","total_quantity":"50","name":"Broccoli (gekookt)"},{"quantity":"50","unit":"g","portion_size":"","total_quantity":"50","name":"Aardappelen (gekookt)"},{"quantity":"25","unit":"ml","portion_size":"","total_quantity":"25","name":"Mayonaise"}]},{"identifier":6,"time":"21:00","foods":[{"quantity":"500","unit":"g","portion_size":"","total_quantity":"500","name":"Franse magere kwark"},{"quantity":"15","unit":"g","portion_size":"","total_quantity":"15","name":"Lijnzaad"},{"quantity":"15","unit":"g","portion_size":"","total_quantity":"15","name":"Chiazaad"},{"quantity":"10","unit":"g","portion_size":"","total_quantity":"10","name":"Zonnebloempitten"},{"quantity":"2","unit":"kop","portion_size":"200","total_quantity":"400","name":"Groene thee"}]},{"identifier":7,"time":"nvt","foods":[{"quantity":"1500","unit":"ml","portion_size":"","total_quantity":"1500","name":"Water"},{"quantity":"0","unit":"g","portion_size":"","total_quantity":"0","name":"Snoep (zuur, gem.)"}]}]'
  );
  userSelection = {
    Fancy: 1,
    //        "Fitness": 1,
    //        "Haarproducten": 1,
    //        "Douchen": 2
  };
} else {
  //  We're in tasker, use the real data.
  isDevelopmentEnvironment = false;
  allPrepLists = JSON.parse(global("%ALL_PREP_LISTS"));
  gesundheitData = JSON.parse(global("%MEALS"));
  userSelection = JSON.parse(global("%PREP_LIST_USER_SELECTION"));
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
function removeDuplicateUniqueItems(prepList) {
  var resultItems = [];
  prepList.items.forEach(function (item) {
    if (typeof item === "string" || item instanceof String) {
      // Don't check for duplicates on just strings.
      resultItems.push(item);
      return;
    }

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
  constructor(name, unique) {
    this.name = name;
    this.unique = unique;
    this.quantity = 1; // 1 time by default, add when necessary.
  }
}

var mealKeyword = "Gesundheit";
var totalKeywordPrefix = mealKeyword + ": ";

function getMealByIdentifier(identifier) {
  var result = null;
  gesundheitData.forEach((meal) => {
    if (meal.identifier == identifier) {
      result = meal;
    }
  });
  return result;
}

function foodToPrepItemRowString(food) {
  var prefix = "&nbsp;&nbsp;&nbsp;&nbsp;";
  if (food.portion_size) {
    // This is a 'portie', so treat it as such
    return prefix + food.quantity + "x " + food.name;
  } else {
    // This is a 'portie', so treat it as such
    return prefix + food.total_quantity + food.unit + " " + food.name;
  }
}

// Combines the given prep lists into one huge prep list, according to the user selection.
function compilePrepList(allPrepLists, userSelection) {
  var compiledPrepList = new PrepList("Compiled Prep List");

  for (const [name, quantity] of Object.entries(userSelection)) {
    // name == "Fitness"
    // quantity == 1
    allPrepLists.forEach(function (prepList) {
      if (prepList.name == name) {
        // Found a matching prep list, add all its items to the final prep list (accounting for quantity as well).
        for (let i = 0; i < quantity; i++) {
          prepList.items.forEach((item) => {
            if (item.name.startsWith(totalKeywordPrefix)) {
              var mealIdentifier = item.name.split(totalKeywordPrefix)[1];
              // Add all items from this meal instead of this identifier item.
              var meal = getMealByIdentifier(mealIdentifier);
              meal.foods.forEach((food) => {
                compiledPrepList.items.push(foodToPrepItemRowString(food));
              });
              compiledPrepList.items.push("---");
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

// ===========================================================================================
// Step 5: Prepare the data for sorting.
// ===========================================================================================
var categoryRegex = /^C\d+\s.*:\s/; // e.g. "C1 toilettas: Tandenborstel"
var uncategorisedPrefix = "zzzzz";
var uncategorisedSplitCharacter = " ";
var uncategorisedRegex = /^zzzzz\s/;

compiledPrepList.items.forEach(function (item) {
  if (typeof item === "string" || item instanceof String) {
    // Ignore simple strings, we only sort items.
    return;
  }

  var itemMatches = categoryRegex.test(item.name);
  if (itemMatches === true) {
    // This item will be categorised.
  } else {
    // This item will not be categorised. Add the prefix if it's not there yet.
    var prefixMatches = uncategorisedRegex.test(item.name);
    if (prefixMatches === false) {
      item.name = uncategorisedPrefix + uncategorisedSplitCharacter + item.name;
    }
  }
});

// ===========================================================================================
// Step 6: Sort the data.
// ===========================================================================================

compiledPrepList.items.sort(function (itemA, itemB) {
  if (
    typeof itemA === "string" ||
    itemA instanceof String ||
    typeof itemB === "string" ||
    itemB instanceof String
  ) {
    // Ignore simple strings, we only sort items.
    return -1;
  }

  if (itemA.name < itemB.name) {
    return -1;
  }
  if (itemA.name > itemB.name) {
    return 1;
  }
  return 0;
});

// ===========================================================================================
// Step 7: Cleanup the sort data.
// ===========================================================================================

compiledPrepList.items.forEach(function (item) {
  if (typeof item === "string" || item instanceof String) {
    // Ignore simple strings, we only sort items.
    return;
  }

  item.name = item.name.replace(categoryRegex, "");
  item.name = item.name.replace(uncategorisedRegex, "");
});

// ===========================================================================================
// Step 8: publish.
// ===========================================================================================

if (isDevelopmentEnvironment) {
  console.log(compiledPrepList);
} else {
  setGlobal("COMPILED_PREP_LIST", JSON.stringify(compiledPrepList));
}
