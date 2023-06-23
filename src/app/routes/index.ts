import express from "express";
import { UserRoute } from "../module/user/user.route";
import { CowRoute } from "../module/cow/cow.route";
import { OrderRoute } from "../module/order/order.route";
import { AdminRoute } from "../module/admin/admin.route";
import { AuthRoute } from "../module/auth/auth.route";
const router = express.Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRoute },
  { path: "/users", route: UserRoute },
  { path: "/admins", route: AdminRoute },
  { path: "/cows", route: CowRoute },
  { path: "/orders", route: OrderRoute },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const applicationRoutes = router;
