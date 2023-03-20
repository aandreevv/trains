import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Station} from "../stations/stations.model";

@Entity()
export class Traffic {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Station, (station) => station.departures)
    from: Station

    @ManyToOne(() => Station, (station) => station.arrivals)
    to: Station

    @Column({type: "timestamptz"})
    departureTime: Date

    @Column({type: "timestamptz"})
    arrivalTime: Date
}
