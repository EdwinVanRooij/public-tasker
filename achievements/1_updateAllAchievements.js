var isDevelopmentEnvironment = null;

// ===========================================================================================
// Step 1: Parse the data, store it in `data`.
// ===========================================================================================
var data = undefined;
if (typeof http_data === "undefined") {
    // We're developing locally, initialize sample data.
    isDevelopmentEnvironment = true;
    data = {
          "values": [
              [ "description 1", "date", "2", "toelichting", "keyword" ],
              [ "description 2", "date", "3", "toelichting", "keyword" ],
              [ "description 3", "date", "4", "toelichting", "keyword" ],
              [ "description 4", "date", "5", "toelichting", "keyword" ],
            ]
    };
} else {
    //  We're in tasker, use the real data.
    isDevelopmentEnvironment = false;
    data = JSON.parse(http_data);
    setGlobal("RAW_DATA_ACHIEVEMENTS", JSON.stringify(data));
}

// ===========================================================================================
// Step 2: Define models.
// ===========================================================================================
class Achievement {
    constructor(description, days, keyWords) {
        this.description = description;
        this.days = days;
        this.keyWords = keyWords;
    }
}

// ===========================================================================================
// Step 3: Parse the data into the models.
// ===========================================================================================
var achievements = [];

data.values.forEach(function(row) {
    var description = row[0];
    var days = row[2];
    var keyWords = row[4];
    var achievement = new Achievement(description, days, keyWords);
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
        achievementRow += "<td align=\"left\">" + achievement.description + " (<i>"+achievement.keyWords+"</i>)</td>";
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
