"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../module/user/user.route");
const cow_route_1 = require("../module/cow/cow.route");
const order_route_1 = require("../module/order/order.route");
const admin_route_1 = require("../module/admin/admin.route");
const auth_route_1 = require("../module/auth/auth.route");
const router = express_1.default.Router();
const moduleRoutes = [
    { path: "/auth", route: auth_route_1.AuthRoute },
    { path: "/users", route: user_route_1.UserRoute },
    { path: "/admins", route: admin_route_1.AdminRoute },
    { path: "/cows", route: cow_route_1.CowRoute },
    { path: "/orders", route: order_route_1.OrderRoute },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.applicationRoutes = router;
