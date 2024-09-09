import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let listaDePets: Array<TipoPet> = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}
export default class PetController {

    constructor(private repository: PetRepository){}

    criaPet(req: Request, res: Response) {
        const { adotado, dataNascimento, especie, nome } = <PetEntity>req.body;

        if(!adotado || !dataNascimento || !nome || !especie){
            return res.status(404).json({ error: "todos os campos são obrigatórios" })
        }

        if(!Object.values(EnumEspecie).includes(especie)){
            return res.status(404).json({ error: "Especie inválida" })
        }

        const novoPet: PetEntity = new PetEntity();
        novoPet.id = geraId();
        novoPet.adotado = adotado;
        novoPet.especie = especie;
        novoPet.dataNascimento = dataNascimento;
        novoPet.nome = nome;
        this.repository.create(novoPet);
        return res.status(201).json(novoPet)
    }

    async lista(req: Request, res: Response) {
        const pets = await this.repository.list()
        return res.status(200).json(pets)
    }

    async atualiza(req: Request, res: Response) {
        const { id } = req.params;
        const payload = <TipoPet>req.body; 

        const { success, message } = await this.repository.update(Number(id), payload);

        if(!success) {
            return res.sendStatus(404).json({ message });
        }

        return res.sendStatus(204)

    }

    async deleta(req: Request, res: Response){
        const { id } = req.params;

        const { success, message } = await this.repository.delete(Number(id))

        if(!success) {
            return res.sendStatus(404).json({ message });
        }

        return res.sendStatus(204)
    }
}