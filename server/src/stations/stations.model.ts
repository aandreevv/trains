import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Traffic} from "../traffic/traffic.model";

@Entity()
export class Station {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @OneToMany(() => Traffic, (traffic) => traffic.from)
    departures: Array<Traffic>

    @OneToMany(() => Traffic, (traffic) => traffic.to)
    arrivals: Array<Traffic>
}
