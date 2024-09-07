import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";

let listaDePets: Array<TipoPet> = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}
export default class PetController {
    criaPet(req: Request, res: Response) {
        const { adotado, dataNascimento, especie, nome } = <TipoPet>req.body;

        if(!adotado || !dataNascimento || !nome || !especie){
            return res.status(404).json({ error: "todos os campos são obrigatórios" })
        }

        if(!Object.values(EnumEspecie).includes(especie)){
            return res.status(404).json({ error: "Especie inválida" })
        }

        const novoPet: TipoPet = { id: geraId(), adotado, dataNascimento, especie, nome }
        listaDePets.push(novoPet);
        return res.status(201).json(novoPet)
    }

    lista(req: Request, res: Response) {
        return res.status(200).json(listaDePets)
    }

    atualiza(req: Request, res: Response) {
        console.log('atualizar: ')
        const { id } = req.params;
        const { adotado, especie, dataNascimento, nome } = <TipoPet>req.body; 

        const pet = listaDePets.find((pet) => pet.id === Number(id));

        if(!pet) {
            return res.status(404).json({ erro: "Pet não encontrado" });
        }

        pet.nome = nome;
        pet.especie = especie;
        pet.dataNascimento = dataNascimento;
        pet.adotado = adotado;
        return res.status(201).json(pet)

    }

    deleta(req: Request, res: Response){
        const { id } = req.params;

        const pet = listaDePets.find((pet) => pet.id === Number(id));

        if(!pet) {
            return res.status(404).json({ erro: "Pet não encontrado"});
        }

        const index = listaDePets.indexOf(pet);
        listaDePets.splice(index, 1)
        return res.status(200).json({ mensagem: "Pet deletado com sucesso"});
    }
}