import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interface/IAdotanteRepository";
import EnderecoEntity from "../entities/EnderecoEntity";

class AdotanteRepository implements InterfaceAdotanteRepository {
    private repository: Repository<AdotanteEntity>;

    constructor(repository: Repository<AdotanteEntity>) {
        this.repository = repository;
    }

    async create(adotante: AdotanteEntity): Promise<void> {
        await this.repository.save(adotante);
    }

    async list(): Promise<AdotanteEntity[]> {
        return await this.repository.find();
    }

    async update(id: number, adotante: AdotanteEntity): Promise<{ success: boolean; message?: string }> {
        try {
            const adotanteToUpdate = await this.repository.findOne({ where: { id } });

            if (!adotanteToUpdate) {
                return { success: false, message: "Adotante não encontrado" };
            }

            Object.assign(adotanteToUpdate, adotante);

            await this.repository.save(adotanteToUpdate);

            return { success: true };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Ocorreu um erro ao tentar atualizar o adotante.",
            };
        }
    }

    async delete(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const adotanteToRemove = await this.repository.findOne({ where: { id } });

            if (!adotanteToRemove) {
                return { success: false, message: "Adotante não encontrado" };
            }

            await this.repository.remove(adotanteToRemove);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: "Ocorreu um erro ao tentar excluir o adotante.",
            };
        }
    }

    async updadeAddressAdotante(idAdotante: number, endereco: EnderecoEntity ): Promise<{ success: boolean; message?: string }> {
        const adotante = await this.repository.findOne({ where: { id: idAdotante } });

        if(!adotante) {
            return { success: false, message: "Adotante não encontrado" }
        }

        const newAddress = new EnderecoEntity(endereco.cidade, endereco.estado);
        adotante.endereco = newAddress;
        await this.repository.save(adotante);
        return { success: true };
    }
}

export default AdotanteRepository;