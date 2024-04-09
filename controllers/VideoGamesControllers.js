import mongoose from "mongoose";
import VideoGamesModel from "../models/VideoGamesModel.js";
import { log } from "../logs/index.js";

async function getAllVideoGames(req, res, next) {
    try{
        const videogames = await VideoGamesModel.find();
        res.status(200).send({status: "success", data: videogames, hello: "hello"});
    }catch(error) {
        log.error(error);
    }
};

async function postOneVideoGame(req, res, next){
    try{
        const videoGame = await
        VideoGamesModel.create(req.body);
        res.status(201).send({status:
        "success", data: videoGame});
    }catch(error){
        log.error(error);
    }
};

export const controllers = {getAllVideoGames, postOneVideoGame};