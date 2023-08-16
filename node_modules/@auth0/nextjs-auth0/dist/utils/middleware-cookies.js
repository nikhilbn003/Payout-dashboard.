"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitCookiesString = void 0;
var tslib_1 = require("tslib");
var cookies_1 = require("../auth0-session/utils/cookies");
var MiddlewareCookies = /** @class */ (function (_super) {
    tslib_1.__extends(MiddlewareCookies, _super);
    function MiddlewareCookies() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MiddlewareCookies.prototype.getSetCookieHeader = function (res) {
        var value = res.headers.get('set-cookie');
        return splitCookiesString(value);
    };
    MiddlewareCookies.prototype.setSetCookieHeader = function (res, cookies) {
        var e_1, _a;
        res.headers.delete('set-cookie');
        try {
            for (var cookies_2 = tslib_1.__values(cookies), cookies_2_1 = cookies_2.next(); !cookies_2_1.done; cookies_2_1 = cookies_2.next()) {
                var cookie = cookies_2_1.value;
                res.headers.append('set-cookie', cookie);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (cookies_2_1 && !cookies_2_1.done && (_a = cookies_2.return)) _a.call(cookies_2);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    MiddlewareCookies.prototype.getAll = function (req) {
        var cookies = req.cookies;
        if (typeof cookies.getAll === 'function') {
            return req.cookies.getAll().reduce(function (memo, _a) {
                var _b;
                var name = _a.name, value = _a.value;
                return (tslib_1.__assign(tslib_1.__assign({}, memo), (_b = {}, _b[name] = value, _b)));
            }, {});
        }
        // Edge cookies before Next 13.0.1 have no `getAll` and extend `Map`.
        var legacyCookies = cookies;
        return Array.from(legacyCookies.keys()).reduce(function (memo, key) {
            memo[key] = legacyCookies.get(key);
            return memo;
        }, {});
    };
    return MiddlewareCookies;
}(cookies_1.Cookies));
exports.default = MiddlewareCookies;
/* eslint-disable max-len */
/**
 * Handle cookies with commas, eg `foo=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
 * @source https://github.com/vercel/edge-runtime/blob/90160abc42e6139c41494c5d2e98f09e9a5fa514/packages/cookies/src/response-cookies.ts#L128
 */
function splitCookiesString(cookiesString) {
    if (!cookiesString)
        return [];
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== '=' && ch !== ';' && ch !== ',';
    }
    while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
            ch = cookiesString.charAt(pos);
            if (ch === ',') {
                // ',' is a cookie separator if we have later first '=', not ';' or ','
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while (pos < cookiesString.length && notSpecialChar()) {
                    pos += 1;
                }
                // currently special character
                if (pos < cookiesString.length && cookiesString.charAt(pos) === '=') {
                    // we found cookies separator
                    cookiesSeparatorFound = true;
                    // pos is inside the next cookie, so back up and return it.
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                    /* c8 ignore next 5 */
                }
                else {
                    // in param ',' or param separator ';',
                    // we continue from that comma
                    pos = lastComma + 1;
                }
            }
            else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
exports.splitCookiesString = splitCookiesString;
//# sourceMappingURL=middleware-cookies.js.map