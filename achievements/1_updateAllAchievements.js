var isDevelopmentEnvironment = null;

// ===========================================================================================
// Step 1: Parse the data, store it in `data`.
// ===========================================================================================
var data = undefined;
if (typeof http_data === "undefined") {
    // We're developing locally, initialize sample data.
    isDevelopmentEnvironment = true;
    data = {
          "range": "'Prep Lists & Event Lists'!G17:J242", "majorDimension": "ROWS", "values": [ [ "Douchen", "nvt", "nvt" ], [ "", "T: Zeep gebruiken" ], [ "", "T: Shampoo gebruiken" ], [ "", "N: Gezicht scrubben", "Max 2x per week, het liefst maandag & donderdag" ], [ "", "N: Gezichtscreme gebruiken", "Elke keer" ],
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
class Achievement {
    constructor(description, days) {
        this.description = description;
        this.days = days;
    }
}

// ===========================================================================================
// Step 3: Parse the data into the models.
// ===========================================================================================
var achievements = [];

data.values.forEach(function(row) {
    var description = row[0];
    var days = row[2];
    var achievement = new Achievement(description, days);
    achievements.push(achievement);
});

// ===========================================================================================
// Step 5: Generate a table.
// ===========================================================================================
function renderAchievementsToHtml(eventList) {
    var result = "<table>";

    var iteration = 0;
    achievements.forEach(achievement => {
        var achievementRow = "<tr>";
        achievementRow += "<td align=\"right\">" + achievement.days + " days </td>";
        achievementRow += "<td align=\"left\">" + achievement.description + "</td>";
        achievementRow += "</tr>";
        result += achievementRow;
    });

    result += "</table>";
    return result;
}

var achievementsRenderedValue = renderAchievementsToHtml(achievements);

if (isDevelopmentEnvironment) {
    console.log(achievementsRenderedValue);
} else {
    setGlobal('ACHIEVEMENTS', achievementsRenderedValue);
}
