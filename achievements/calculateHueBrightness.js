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
    hueMinValue = 30;
    hueMaxValue = 254;
    hueStartTimeMorning = "8.00";
    hueEndTimeMorning = "10.00";
    hueStartTimeEvening = "22.00";
    hueEndTimeEvening = "23.00";
    time = "9.30";
} else {
    //  We're in tasker, use the real data.
    isDevelopmentEnvironment = false;
    hueMinValue = global("%HUE_MIN_VALUE");
    hueMaxValue = global("%HUE_MAX_VALUE");
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
        log("It's evening");
        var startTimeInMinutes = getTimeInMinutes(startTimeEvening);
        var endTimeInMinutes = getTimeInMinutes(endTimeEvening);
        var startAndEndDeltaInMinutes = endTimeInMinutes - startTimeInMinutes;
        var startAndCurrentDeltaInMinutes = currentTimeInMinutes - startTimeInMinutes;
        var brightnessValuePerMinute = (maxValue - minValue) / startAndEndDeltaInMinutes;

        // It's evening, so we should get a gradually lower brightness, from a maximum down to a minimum.
        var brightnessToSubtract = brightnessValuePerMinute * startAndCurrentDeltaInMinutes;
        log("Brightness to subtract: " + brightnessToSubtract);
        return Math.floor(maxValue - brightnessToSubtract);
    } else {
        log("It's morning");
        var startTimeInMinutes = getTimeInMinutes(startTimeMorning);
        var endTimeInMinutes = getTimeInMinutes(endTimeMorning);
        var startAndEndDeltaInMinutes = endTimeInMinutes - startTimeInMinutes;
        var startAndCurrentDeltaInMinutes = currentTimeInMinutes - startTimeInMinutes;
        var brightnessValuePerMinute = (maxValue - minValue) / startAndEndDeltaInMinutes;
        // It's morning, so we should get a gradually higher brightness, from a minimum up to a maximum.
        var brightnessToAdd = brightnessValuePerMinute * startAndCurrentDeltaInMinutes;
        log("Brightness to add: " + brightnessToAdd);
        return Math.floor(minValue + brightnessToAdd);
    }
}

var brightnessValue = getHueBrightnessValue(hueMinValue, hueMaxValue, hueStartTimeMorning, hueEndTimeMorning, hueStartTimeEvening, hueEndTimeEvening, time);

if (isDevelopmentEnvironment) {
    console.log('Brightness value will be ' + brightnessValue);
} else {
    setGlobal("%BRIGHTNESS_HUE", brightnessValue);
}
