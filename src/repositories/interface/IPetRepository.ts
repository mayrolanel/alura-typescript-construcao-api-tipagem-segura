import PetEntity from "../../entities/PetEntity";

interface InterfacePetRepository {
    create(pet: PetEntity): void;
    list(): Array<PetEntity> | Promise<PetEntity[]>;
    update(id: number, pet: PetEntity): Promise<{ success: boolean; message?: string }> | void;
    delete(id: number): Promise<{ success: boolean; message?: string }> | void;
}

export default InterfacePetRepository;