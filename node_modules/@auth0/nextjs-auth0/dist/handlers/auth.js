"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @ignore
 */
var defaultOnError = function (_req, res, error) {
    console.error(error);
    res.status(error.status || 500).end();
};
/**
 * This is a handler for use by {@link WithMiddlewareAuthRequired} when protecting an API route.
 * Middleware can't return a response body, so an unauthorized request for an API route
 * needs to rewrite to this handler.
 * @ignore
 */
var unauthorized = function (_req, res) {
    res.status(401).json({
        error: 'not_authenticated',
        description: 'The user does not have an active session or is not authenticated'
    });
};
/**
 * @ignore
 */
function handlerFactory(_a) {
    var _this = this;
    var handleLogin = _a.handleLogin, handleLogout = _a.handleLogout, handleCallback = _a.handleCallback, handleProfile = _a.handleProfile;
    return function (_a) {
        if (_a === void 0) { _a = {}; }
        var onError = _a.onError, handlers = tslib_1.__rest(_a, ["onError"]);
        var customHandlers = tslib_1.__assign({ login: handleLogin, logout: handleLogout, callback: handleCallback, me: handlers.profile || handleProfile, 401: unauthorized }, handlers);
        return function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var route, otherRoutes, handler, error_1;
            var _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        route = req.query.auth0;
                        if (Array.isArray(route)) {
                            otherRoutes = void 0;
                            _a = route, _b = tslib_1.__read(_a), route = _b[0], otherRoutes = _b.slice(1);
                            if (otherRoutes.length) {
                                res.status(404).end();
                                return [2 /*return*/];
                            }
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 7]);
                        handler = route && customHandlers.hasOwnProperty(route) && customHandlers[route];
                        if (!handler) return [3 /*break*/, 3];
                        return [4 /*yield*/, handler(req, res)];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(404).end();
                        _c.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        error_1 = _c.sent();
                        return [4 /*yield*/, (onError || defaultOnError)(req, res, error_1)];
                    case 6:
                        _c.sent();
                        if (!res.writableEnded) {
                            // 200 is the default, so we assume it has not been set in the custom error handler if it equals 200
                            res.status(res.statusCode === 200 ? 500 : res.statusCode).end();
                        }
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
    };
}
exports.default = handlerFactory;
//# sourceMappingURL=auth.js.map