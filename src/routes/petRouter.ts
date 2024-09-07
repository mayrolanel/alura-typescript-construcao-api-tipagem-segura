import express from "express";
import PetController from "../controller/PetController";

const router = express.Router();

const petController = new PetController();

router
    .post('/pets', petController.criaPet)
    .get('/pets', petController.lista)
    .put('/pets/:id', petController.atualiza)
    .delete('/pets/:id', petController.deleta)

export default router;