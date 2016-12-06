"use strict";
function get(url) {
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
        return json;
    });
}
exports.get = get;
//# sourceMappingURL=requestor.js.map