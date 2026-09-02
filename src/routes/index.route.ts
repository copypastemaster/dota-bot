import { Router } from "express";
import playerRoute from "./players.route.js";

const indexRoutes = Router();

indexRoutes.use("/opendota", playerRoute);

export default indexRoutes;
