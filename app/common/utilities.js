"use strict";
var constants = require('./constants');
function degreeToDirection(num) {
    var val = Math.floor((num / 22.5) + .5);
    return constants.WIND_DIRECTIONS[(val % 16)];
}
exports.degreeToDirection = degreeToDirection;
function describeWindSpeed(speed) {
    if (speed < 0.3) {
        return 'calm';
    }
    else if (speed >= 0.3 && speed < 1.6) {
        return 'light air';
    }
    else if (speed >= 1.6 && speed < 3.4) {
        return 'light breeze';
    }
    else if (speed >= 3.4 && speed < 5.5) {
        return 'gentle breeze';
    }
    else if (speed >= 5.5 && speed < 8) {
        return 'moderate breeze';
    }
    else if (speed >= 8 && speed < 10.8) {
        return 'fresh breeze';
    }
    else if (speed >= 10.8 && speed < 13.9) {
        return 'strong breeze';
    }
    else if (speed >= 13.9 && speed < 17.2) {
        return 'moderate gale';
    }
    else if (speed >= 17.2 && speed < 20.8) {
        return 'gale';
    }
    else if (speed >= 20.8 && speed < 24.5) {
        return 'strong gale';
    }
    else if (speed >= 24.5 && speed < 28.5) {
        return 'storm';
    }
    else if (speed >= 28.5 && speed < 32.7) {
        return 'violent storm';
    }
    else if (speed >= 32.7 && speed < 42) {
        return 'hurricane force';
    }
    return 'super typhoon';
}
exports.describeWindSpeed = describeWindSpeed;
function describeHumidity(humidity) {
    if (humidity >= 0 && humidity <= 40) {
        return 'very dry';
    }
    else if (humidity >= 40 && humidity <= 70) {
        return 'dry';
    }
    else if (humidity >= 85 && humidity <= 95) {
        return 'humid';
    }
    return 'very humid';
}
exports.describeHumidity = describeHumidity;
function describeTemperature(temp) {
    var celsius = convertKelvinToCelsius(temp);
    if (celsius >= -5 && celsius < 6) {
        return 'pretty cool, you should wear a jacket';
    }
    else if (celsius >= 6 && celsius < 13) {
        return 'almost like summer';
    }
    else if (celsius >= 13 && celsius < 18) {
        return 'bearable.';
    }
    else if (celsius >= 18 && celsius < 23) {
        return "wow, it's hot";
    }
    else if (celsius >= 23 && celsius < 28) {
        return 'this burns';
    }
    else if (celsius >= 28) {
        return 'hot as h*ll';
    }
    return "it's freezing, no climate change here";
}
exports.describeTemperature = describeTemperature;
function convertKelvinToCelsius(celsius) {
    return celsius - 273.15;
}
exports.convertKelvinToCelsius = convertKelvinToCelsius;
function getTimeOfDay() {
    var hour = (new Date()).getHours();
    var time_of_day = 'night';
    if (hour >= 5 && hour <= 18) {
        time_of_day = 'day';
    }
    return time_of_day;
}
exports.getTimeOfDay = getTimeOfDay;
function getIcons(icon_names) {
    var icons = icon_names.map(function (name) {
        return {
            'name': name,
            'icon': String.fromCharCode(constants.WEATHER_ICONS.neutral[name])
        };
    });
    return icons;
}
exports.getIcons = getIcons;
function replaceUmlauts(string) {
    var value = string.toLowerCase();
    value = value.replace(/\u00e4/g, 'a');
    value = value.replace(/\u00f6/g, 'o');
    value = value.replace(/\u00fc/g, 'u');
    return value;
}
exports.replaceUmlauts = replaceUmlauts;
//# sourceMappingURL=utilities.js.map