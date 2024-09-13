import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

interface IAdotanteRepository{
    create(adotante: AdotanteEntity): void | Promise<void>;
    list(): Array<AdotanteEntity> | Promise<AdotanteEntity[]>;
    update(id: number, adotante: AdotanteEntity): Promise<{ success: boolean; message?: string }> | void;
    delete(id: number): Promise<{ success: boolean; message?: string }> | void;
    updadeAddressAdotante(idAdotante: number, endereco: EnderecoEntity): Promise<{ success: boolean; message?: string }> | void;
}

export default IAdotanteRepository;