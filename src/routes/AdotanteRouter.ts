import express, { RequestHandler } from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import { validadorBodyAdotante } from "../middlewares/validadores/adotanteRequestBody";
import { validadorBodyEndreco } from "../middlewares/validadores/enderecoRequestBody";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("AdotanteEntity"));
const adotanteController = new AdotanteController(adotanteRepository);
const validadorAdotante: RequestHandler = (req, res, next) => validadorBodyAdotante(req, res, next);
const validadorEndereco: RequestHandler = (req, res, next) => validadorBodyEndreco(req, res, next);

router.post("/", validadorAdotante, (req, res) => adotanteController.criaAdotante(req, res));
router.get("/", (req, res) => adotanteController.listaAdotantes(req, res));
router.put("/", (req, res) => adotanteController.atualizaAdotante(req, res));
router.delete("/", (req, res) => adotanteController.deletaAdotante(req, res));
router.patch("/:id", validadorEndereco,(req, res) => adotanteController.atualizaEnderecoAdotante(req, res));

export default router;