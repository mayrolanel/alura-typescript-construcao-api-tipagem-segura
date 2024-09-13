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

    async criaPet(req: Request, res: Response) {
        const { adotado, dataNascimento, especie, nome } = <PetEntity>req.body;

        if(!adotado || !dataNascimento || !nome || !especie){
            return res.status(404).json({ error: "todos os campos são obrigatórios" })
        }

        if(!Object.values(EnumEspecie).includes(especie)){
            return res.status(404).json({ error: "Especie inválida" })
        }

        const novoPet: PetEntity = new PetEntity(nome, especie, dataNascimento, adotado);
        
        await this.repository.create(novoPet);
        return res.status(201).json(novoPet)
    }

    async lista(req: Request, res: Response) {
        const pets = await this.repository.list()
        return res.status(200).json(pets)
    }

    async atualiza(req: Request, res: Response) {
        const { id } = req.params;
        const payload = <PetEntity>req.body; 

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

    async adota(req: Request, res: Response) {
        const { pet_id, adotante_id} = req.params;

        const { success, message } = await this.repository.adota(Number(pet_id), Number(adotante_id));

        if(!success) {
            return res.sendStatus(404).json({ message });
        }

        return res.sendStatus(204)
    }
}