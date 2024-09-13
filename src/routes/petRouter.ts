import express from "express";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";
const router = express.Router();

const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"),
    AppDataSource.getRepository("AdotanteEntity")
);
const petController = new PetController(petRepository);

router
    .post('/pets', (req, res) => petController.criaPet(req, res))
    .get('/pets', (req, res) => petController.lista(req, res))
    .put('/pets/:id', (req, res) => petController.atualiza(req, res))
    .put('/pets/:pet_id/:adotante_id', (req, res) => petController.adota(req, res))
    .delete('/pets/:id', (req, res) => petController.deleta(req, res))


export default router;