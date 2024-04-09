import { Router } from "express";
import {controllers} from "../controllers/VideoGamesControllers.js";

const videoGameRouter = Router ();

videoGameRouter.route("/").get(controllers.getAllVideoGames);

export default videoGameRouter;