import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";

let listaDePets: Array<TipoPet> = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}
export default class PetController {

    constructor(private repository: PetRepository){}

    async criaPet(req: Request, res: Response) {
        const { adotado, dataNascimento, especie, nome, porte } = <PetEntity>req.body;

        if(!dataNascimento || !nome || !especie){
            return res.status(404).json({ error: "todos os campos são obrigatórios" })
        }

        if(!Object.values(EnumEspecie).includes(especie)){
            return res.status(404).json({ error: "Especie inválida" })
        }

        console.log('Porte', (porte && (porte in EnumPorte)))

        if(porte && !(porte in EnumPorte)){
            return res.status(404).json({ error: "Porte inválido" })
        }

        const novoPet: PetEntity = new PetEntity(nome, especie, dataNascimento, adotado, porte);

        
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

    async searchByPorte(req: Request, res: Response){
        const { porte } = req.query;

        const pets = await this.repository.searchByPorte(porte as EnumPorte);

        return res.status(200).json(pets);
    }

    async searchByGenericData(req: Request, res: Response){
        const { campo, valor } = req.query;
        const pets = await this.repository.searchByGenericData(campo as keyof PetEntity, valor as string)
        return res.status(200).json(pets);
    }
}