"use strict";
exports.WEATHER_URL = 'http://api.openweathermap.org/data/2.5/';
exports.WEATHER_APIKEY = '782b433405088b411f8cc3111176398a';
exports.CURRENT_WEATHER_PATH = 'weather/';
exports.WEATHER_FORECAST_PATH = 'forecast/daily/';
exports.WEATHER_ICONS = {
    day: {
        'clear': 0xf00d,
        'clouds': 0xf002,
        'drizzle': 0xf009,
        'rain': 0xf008,
        'thunderstorm': 0x010,
        'snow': 0xf00a,
        'mist': 0xf0b6
    },
    night: {
        'clear': 0xf02e,
        'clouds': 0xf086,
        'drizzle': 0xf029,
        'rain': 0xf028,
        'thunderstorm': 0xf02d,
        'snow': 0xf02a,
        'mist': 0xf04a
    },
    neutral: {
        'temperature': 0xf055,
        'wind': 0xf050,
        'cloud': 0xf041,
        'pressure': 0xf079,
        'humidity': 0xf07a,
        'rain': 0xf019,
        'sunrise': 0xf046,
        'sunset': 0xf052
    }
};
exports.WIND_DIRECTIONS = [
    "North", "North-northeast", "Northeast",
    "East-northeast", "East", "East-southeast", "Southeast",
    "South-southeast", "South", "South-southwest", "Southwest",
    "West-southwest", "West", "West-northwest", "Northwest", "North-northwest"
];
//# sourceMappingURL=constants.js.map