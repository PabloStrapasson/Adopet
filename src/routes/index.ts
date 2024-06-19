import express from "express";
import petRouter from "./PetRouter";
import adotanteRouter from "./AdotanteRouter";
import abrigoRouter from "./AbrigoRouter"

const router = (app:express.Router) => {
    app.use("/pets", petRouter);
    app.use("/adotantes", adotanteRouter);
    app.use("/abrigos", abrigoRouter);
};

export default router;