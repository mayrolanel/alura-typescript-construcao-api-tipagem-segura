import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interface/InterfacePetRepository";

class PetRepository implements InterfacePetRepository {
    private repository: Repository<PetEntity>;

    constructor(repository: Repository<PetEntity>) {
        this.repository = repository;
    }

    create(pet: PetEntity): void {
        this.repository.save(pet);
    }
    async list(): Promise<PetEntity[]> {
        return await this.repository.find();
    }

    async update(id: number, pet: PetEntity): Promise<{ success: boolean; message?: string }> {


        try {
            const petToUpdate = await this.repository.findOne({ where: { id } })

            if (!petToUpdate) {
                return { success: false, message: "Pet não encontrado" };
            }

            Object.assign(petToUpdate, pet);

            await this.repository.save(petToUpdate);
            return { success: true };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Ocorreu um erro ao tentar atualizar o pet.",
            };
        }

    }
    async delete(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const petToRemove = await this.repository.findOne({ where: { id } })

            if (!petToRemove) {
                return { success: false, message: "Pet não encontrado" };
            }

            await this.repository.remove(petToRemove)
            return { success: true };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Ocorreu um erro ao tentar excluir o pet.",
            };
        }
    }

}

export default PetRepository;