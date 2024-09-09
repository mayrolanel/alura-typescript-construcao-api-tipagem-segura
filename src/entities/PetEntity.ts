import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";

@Entity()
class PetEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nome: string;
    @Column()
    especie: EnumEspecie;
    @Column()
    dataNascimento: Date;
    @Column()
    adotado: boolean;
}

export default PetEntity;