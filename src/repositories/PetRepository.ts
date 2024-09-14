import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interface/IPetRepository";
import AdotanteRepository from "./AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";

class PetRepository implements InterfacePetRepository {
    private repository: Repository<PetEntity>;
    private adotanteRepository: Repository<AdotanteEntity>;

    constructor(repository: Repository<PetEntity>, adotanteRepository: Repository<AdotanteEntity>) {
        this.repository = repository;
        this.adotanteRepository = adotanteRepository

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

    async adota(idPet: number, idAdotante: number): Promise<{ success: boolean; message?: string }> {
        const pet = await this.repository.findOne({ where: { id: idPet }});

        if(!pet){
            return { success: false, message: "Pet não encontrado" };
        }

        const adotante = await this.adotanteRepository.findOne({ where: { id: idAdotante }});

        if(!adotante){
            return { success: false, message: "Adotante não encontrado" };
        }

        pet.adotante = adotante;
        pet.adotado = true;

        await this.repository.save(pet);
        return { success: true }
    }

    async searchByPorte(porte: EnumPorte): Promise<PetEntity[]> {
        const pets = await this.repository.find({ where: { porte }})

        return pets;
    }

    async searchByGenericData<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[]> {
        const pets = await this.repository.find({ where: { [campo]:valor } })

        return pets;
    }

}

export default PetRepository;