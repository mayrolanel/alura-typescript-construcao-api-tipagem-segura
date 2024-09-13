import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";

class AdotanteController {
    constructor(private repository: AdotanteRepository) { }

    async create(req: Request, res: Response) {
        try {
            const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;
            const adotante = new AdotanteEntity(nome, celular, senha, foto, endereco);

            await this.repository.create(adotante);
            return res.status(201).json(adotante);
        } catch (error) {
            console.log('error: ', error)
            return res.status(404).json({ error: "Erro ao criar adotante!" })
        }
    }

    async list(req: Request, res: Response) {
        const adotantes = await this.repository.list();
        return res.status(200).json(adotantes)
    }

    async update(req: Request, res: Response) {

        const { id } = req.params
        const adotante = <AdotanteEntity>req.body;
        const { success, message } = await this.repository.update(Number(id), adotante);

        if (!success) {
            return res.status(404).json({ message });
        }

        return res.status(200).json({ message: "Adotante atualizado com sucesso" });

    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const adotante = <AdotanteEntity>req.body;
        const { success, message } = await this.repository.delete(Number(id));

        if (!success) {
            return res.status(404).json({ message });
        }

        return res.status(200).json({ message: "Adotante deletado com sucesso" });
    }

    async updadeAddressAdotante(req: Request, res: Response) {
        const { id } = req.params;
        const adotante = <EnderecoEntity>req.body;
        const { success, message } = await this.repository.updadeAddressAdotante(Number(id), adotante);

        if (!success) {
            return res.status(404).json({ message });
        }

        return res.status(200).json({ message: "Endereço do Adotante atualizado com sucesso" });
    }
}

export default AdotanteController;