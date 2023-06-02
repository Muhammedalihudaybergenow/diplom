import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'languages'
})
export class LanguageEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'integer'
    })
    id:number;

    @Column({
        type: 'varchar',
        name: 'name',
        nullable: false,
        unique:true
    })
    name: string;
}
