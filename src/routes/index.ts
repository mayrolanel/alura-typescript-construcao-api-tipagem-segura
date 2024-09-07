import express from "express";
import petRouter from "../routes/petRouter"

const router = (app: express.Router) => {
    app.use('/', petRouter)
};

export default router;