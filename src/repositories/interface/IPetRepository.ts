import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

interface InterfacePetRepository {
    create(pet: PetEntity): void;
    list(): Array<PetEntity> | Promise<PetEntity[]>;
    update(id: number, pet: PetEntity): Promise<{ success: boolean; message?: string }> | void;
    delete(id: number): Promise<{ success: boolean; message?: string }> | void;
    adota(idPet: number, idAdotante: number): Promise<{ success: boolean; message?: string }> | void;
    searchByPorte(porte: EnumPorte): Promise<PetEntity[]> | PetEntity[];
    searchByGenericData<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[]> | PetEntity[];
}

export default InterfacePetRepository;