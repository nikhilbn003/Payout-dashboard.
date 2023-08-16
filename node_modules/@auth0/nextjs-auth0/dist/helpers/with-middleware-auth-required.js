"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var server_1 = require("next/server");
var middleware_cookies_1 = require("../utils/middleware-cookies");
/**
 * @ignore
 */
function withMiddlewareAuthRequiredFactory(_a, getSessionCache) {
    var login = _a.login, callback = _a.callback, unauthorized = _a.unauthorized;
    return function withMiddlewareAuthRequired(middleware) {
        return function wrappedMiddleware() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, req, _b, pathname, origin, search, ignorePaths, sessionCache, authRes, session, res, headers, authCookies, authCookies_1, authCookies_1_1, cookie;
                var e_1, _c;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = tslib_1.__read(args, 1), req = _a[0];
                            _b = req.nextUrl, pathname = _b.pathname, origin = _b.origin, search = _b.search;
                            ignorePaths = [login, callback, unauthorized, '/_next', '/favicon.ico'];
                            if (ignorePaths.some(function (p) { return pathname.startsWith(p); })) {
                                return [2 /*return*/];
                            }
                            sessionCache = getSessionCache();
                            authRes = server_1.NextResponse.next();
                            return [4 /*yield*/, sessionCache.get(req, authRes)];
                        case 1:
                            session = _d.sent();
                            if (!(session === null || session === void 0 ? void 0 : session.user)) {
                                if (pathname.startsWith('/api')) {
                                    return [2 /*return*/, server_1.NextResponse.rewrite(new URL(unauthorized, origin), { status: 401 })];
                                }
                                return [2 /*return*/, server_1.NextResponse.redirect(new URL("".concat(login, "?returnTo=").concat(encodeURIComponent("".concat(pathname).concat(search))), origin))];
                            }
                            return [4 /*yield*/, (middleware && middleware.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false)))];
                        case 2:
                            res = _d.sent();
                            if (res) {
                                headers = new Headers(res.headers);
                                authCookies = (0, middleware_cookies_1.splitCookiesString)(authRes.headers.get('set-cookie'));
                                if (authCookies.length) {
                                    try {
                                        for (authCookies_1 = tslib_1.__values(authCookies), authCookies_1_1 = authCookies_1.next(); !authCookies_1_1.done; authCookies_1_1 = authCookies_1.next()) {
                                            cookie = authCookies_1_1.value;
                                            headers.append('set-cookie', cookie);
                                        }
                                    }
                                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                    finally {
                                        try {
                                            if (authCookies_1_1 && !authCookies_1_1.done && (_c = authCookies_1.return)) _c.call(authCookies_1);
                                        }
                                        finally { if (e_1) throw e_1.error; }
                                    }
                                }
                                return [2 /*return*/, server_1.NextResponse.next(tslib_1.__assign(tslib_1.__assign({}, res), { status: res.status, headers: headers }))];
                            }
                            else {
                                return [2 /*return*/, authRes];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
    };
}
exports.default = withMiddlewareAuthRequiredFactory;
//# sourceMappingURL=with-middleware-auth-required.js.map