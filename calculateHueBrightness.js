var isDevelopmentEnvironment = null;

var hueMinValue = null;
var hueMaxValue = null;
var hueStartTimeMorning = null;
var hueEndTimeMorning = null;
var hueStartTimeEvening = null;
var hueEndTimeEvening = null;
var time = null;

// ===========================================================================================
// Step 1: Parse variables
// ===========================================================================================
var data = undefined;
if (typeof setGlobal === "undefined") {
    // We're developing locally, initialize sample data.
    isDevelopmentEnvironment = true;
    hueMinValue = 75;
    hueMaxValue = 254;
    hueStartTimeMorning = "9.00";
    hueEndTimeMorning = "11.30";
    hueStartTimeEvening = "21.30";
    hueEndTimeEvening = "23.59";
    time = "10.07";
} else {
    //  We're in tasker, use the real data.
    isDevelopmentEnvironment = false;
    hueMinValue = parseInt(global("%HUE_MIN_VALUE"));
    hueMaxValue = parseInt(global("%HUE_MAX_VALUE"));
    hueStartTimeMorning = global("%HUE_START_TIME_MORNING");
    hueEndTimeMorning = global("%HUE_END_TIME_MORNING");
    hueStartTimeEvening = global("%HUE_START_TIME_EVENING");
    hueEndTimeEvening = global("%HUE_END_TIME_EVENING");
    time = global("%TIME");
}

function log(string) {
    if (isDevelopmentEnvironment) {
        console.log(string)
    } else {
        flash(string);
    }
}

function getTimeInMinutes(stringTime) {
    return parseInt(stringTime.split('.', 2)[0]) * 60 + parseInt(stringTime.split('.', 2)[1]);
}

// Currently only supports single-day time values (so not overlapping times over 2 days)
function getHueBrightnessValue(minValue, maxValue, startTimeMorning, endTimeMorning, startTimeEvening, endTimeEvening, currentTime) {
    var currentTimeInMinutes = getTimeInMinutes(currentTime);

    // Determine `isEvening`. We'll say evening is between 18:00 and 3:00, otherwise not.
    var sixInTheEvening = getTimeInMinutes("18.00");
    var threeInTheMorning = getTimeInMinutes("3.00") + getTimeInMinutes("24.00");
    var isEvening = false;
    if (currentTimeInMinutes >= sixInTheEvening && currentTimeInMinutes < threeInTheMorning) { isEvening = true; }

    if (isEvening === true) {
        var startTimeInMinutes = getTimeInMinutes(startTimeEvening);
        var endTimeInMinutes = getTimeInMinutes(endTimeEvening);
        if (endTimeInMinutes < getTimeInMinutes("3.00")) { endTimeInMinutes += getTimeInMinutes("24.00"); } // Add a day if it's a time from the next day
        var startAndEndDeltaInMinutes = endTimeInMinutes - startTimeInMinutes;
        var startAndCurrentDeltaInMinutes = currentTimeInMinutes - startTimeInMinutes;
        var brightnessValuePerMinute = (maxValue - minValue) / startAndEndDeltaInMinutes;

        // It's evening, so we should get a gradually lower brightness, from a maximum down to a minimum.
        var brightnessToSubtract = brightnessValuePerMinute * startAndCurrentDeltaInMinutes;
        var result = Math.floor(maxValue - brightnessToSubtract);

        if (result < minValue) { return minValue; } else if (result > maxValue) { return maxValue; } else { return result; }
    } else {
        var startTimeInMinutes = getTimeInMinutes(startTimeMorning);
        var endTimeInMinutes = getTimeInMinutes(endTimeMorning);
        var startAndEndDeltaInMinutes = endTimeInMinutes - startTimeInMinutes;
        var startAndCurrentDeltaInMinutes = currentTimeInMinutes - startTimeInMinutes;
        var brightnessValuePerMinute = (maxValue - minValue) / startAndEndDeltaInMinutes;

        // It's morning, so we should get a gradually higher brightness, from a minimum up to a maximum.
        var brightnessToAdd = brightnessValuePerMinute * startAndCurrentDeltaInMinutes;
        var result = Math.floor(minValue + brightnessToAdd);

        if (result < minValue) { return minValue; } else if (result > maxValue) { return maxValue; } else { return result; }
    }
}

var brightnessValue = getHueBrightnessValue(hueMinValue, hueMaxValue, hueStartTimeMorning, hueEndTimeMorning, hueStartTimeEvening, hueEndTimeEvening, time);

//log('Dev: ' + isDevelopmentEnvironment + ', min: ' + hueMinValue + ', max: ' + hueMaxValue + ', startMorning: ' + hueStartTimeMorning + ', endMorning: ' + hueEndTimeMorning + ', startEvening: ' + hueStartTimeEvening + ', endEvening: ' + hueEndTimeEvening + ', time: ' + time + ', brightness: ' + brightnessValue);
//log('Dev: ' + typeof(isDevelopmentEnvironment) + ', min: ' + typeof(hueMinValue) + ', max: ' + typeof(hueMaxValue) + ', startMorning: ' + typeof(hueStartTimeMorning) + ', endMorning: ' + typeof(hueEndTimeMorning) + ', startEvening: ' + typeof(hueStartTimeEvening) + ', endEvening: ' + typeof(hueEndTimeEvening) + ', time: ' + typeof(time) + ', brightness: ' + typeof(brightnessValue));

if (!isDevelopmentEnvironment) {
    setGlobal("%BRIGHTNESS_HUE", brightnessValue);
}
