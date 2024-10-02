import express, { RequestHandler } from "express";
import AbrigoController from "../controller/AbrigoController";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { AppDataSource } from "../config/dataSource";
import { validadorBodyAbrigo } from "../middlewares/validadores/abrigoRequestBody";
import { validadorBodyEndereco } from "../middlewares/validadores/enderecoRequestBody";
import { verificaIdMiddleware } from "../middlewares/verificaID";

const router = express.Router();
const abrigoRepository = new AbrigoRepository(AppDataSource.getRepository("AbrigoEntity"));
const abrigoController = new AbrigoController(abrigoRepository);
const validadorAbrigo: RequestHandler = (req, res, next) => validadorBodyAbrigo(req, res, next);
const validadorEndereco: RequestHandler = (req, res, next) => validadorBodyEndereco(req, res, next);

router.post("/", validadorAbrigo, (req, res) => abrigoController.criaAbrigo(req, res));
router.get("/", (req, res) => abrigoController.listaAbrigos(req, res));
router.put("/:id", verificaIdMiddleware, (req, res) => abrigoController.atualizaAbrigo(req, res));
router.delete("/:id", verificaIdMiddleware, (req, res) => abrigoController.deletaAbrigo(req, res));
router.patch("/:id", verificaIdMiddleware, validadorEndereco,(req, res) => abrigoController.atualizaEnderecoAbrigo(req, res));

export default router;