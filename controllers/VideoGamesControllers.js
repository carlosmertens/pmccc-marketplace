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

async function getOneVideoGameId(req, res, next){
    try{
        const videoGame = await
        VideoGamesModel.findById(req.params.id);
        res.status(201).send({status:
        "success", data: videoGame});
    }catch(error){
        log.error(error);
    }
};

async function putOneVideoGameId(req, res, next){
    try{
        const videoGame = await
        VideoGamesModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).send({status:
        "success", data: videoGame});
    }catch(error){
        log.error(error);
    }
};

async function deleteOneVideoGameId(req, res, next){
    try{
        const videoGame = await
        VideoGamesModel.findByIdAndDelete(req.params.id, req.body);
        res.status(201).send({status:
        "success", data: videoGame});
    }catch(error){
        log.error(error);
    }
};



export const controllers = {getAllVideoGames, postOneVideoGame, putOneVideoGameId, getOneVideoGameId, deleteOneVideoGameId};