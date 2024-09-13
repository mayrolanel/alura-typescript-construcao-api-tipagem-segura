import express from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();

const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("AdotanteEntity"));
const adotanteController = new AdotanteController(adotanteRepository);

router
    .post('/adotantes', (req, res) => adotanteController.create(req, res))
    .get('/adotantes', (req, res) => adotanteController.list(req, res))
    .put('/adotantes/:id', (req, res) => adotanteController.update(req, res))
    .delete('/adotantes/:id', (req, res) => adotanteController.delete(req, res))
    .patch('/adotantes/:id', (req, res) => adotanteController.updadeAddressAdotante(req, res))

export default router;