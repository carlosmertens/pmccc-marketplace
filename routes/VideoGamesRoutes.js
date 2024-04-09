import { Router } from "express";
import {controllers} from "../controllers/VideoGamesControllers.js";

const videoGameRouter = Router ();


videoGameRouter.route("/")
.get(controllers.getAllVideoGames)
.post(controllers.postOneVideoGame);
// .delete(controllers.deleteOneVideoGame);

videoGameRouter.route("/:id")
.get(controllers.getOneVideoGameId)
.put(controllers.putOneVideoGameId);
// .put(controllers.updateOneVideoGameId);
// .patch(controllers.patchOneVideoGame)
// .delete(controllers.deleteOneVideoGame);


export default videoGameRouter;