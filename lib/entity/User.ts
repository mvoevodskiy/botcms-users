import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: "varchar";

    @Column()
    username: "varchar";

    @Column()
    full_name: "varchar";

    @Column()
    first_name: "varchar";

    @Column()
    last_name: "varchar";

    @Column()
    bridge: "varchar";

    @Column()
    driver: "varchar";

    @Column()
    type: "varchar";

    @Column()
    createdon: "int";

}