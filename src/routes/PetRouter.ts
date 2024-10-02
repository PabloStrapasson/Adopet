import express, { RequestHandler } from "express";
import PetController from './../controller/PetController';
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";
import { validadorBodyPet } from "../middlewares/validadores/PetRequestBody";
import { verificaIdMiddleware } from "../middlewares/verificaID";

const router = express.Router();
const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"),
    AppDataSource.getRepository("AdotanteEntity")
); 
const petController = new PetController(petRepository);
const validadorPet: RequestHandler = (req, res, next) => validadorBodyPet(req, res, next);

router.post("/", validadorPet, (req, res) => petController.criaPet(req, res));
router.get("/", (req, res) => petController.listaPets(req, res));
router.get("/search", (req, res) => petController.buscaPetGenerico(req, res));
router.put("/:id", verificaIdMiddleware,(req, res) => petController.atualizaPets(req, res));
router.put("/:pet_id/:adotante_id", verificaIdMiddleware, (req, res) => petController.adotaPet(req, res));
router.delete("/:id", verificaIdMiddleware, (req, res) => petController.deletaPet(req, res));

export default router;