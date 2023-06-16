import express from "express";
import { UserRoute } from "../module/user/user.route";
const router = express.Router();

const moduleRoutes = [{ path: "/users", route: UserRoute }];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const applicationRoutes = router;
