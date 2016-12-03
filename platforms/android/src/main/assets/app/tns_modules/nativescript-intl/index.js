import { DateTimeFormat, NumberFormat } from "./nativescript-intl";
export { DateTimeFormat, NumberFormat } from "./nativescript-intl";
if (!global.Intl) {
    global.Intl = {};
}
global.Intl.DateTimeFormat = DateTimeFormat;
global.Intl.NumberFormat = NumberFormat;
