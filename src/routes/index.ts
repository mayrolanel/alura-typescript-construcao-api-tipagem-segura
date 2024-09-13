import express from "express";
import petRouter from "../routes/petRouter"
import adotanteRouter from "../routes/adotanteRouter"

const router = (app: express.Router) => {
    app.use('/', petRouter)
    app.use('/', adotanteRouter)
};

export default router;