import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Traffic} from "./traffic.model";
import {UpsertTrafficDto} from "./traffic.dto";
import {StationsService} from "../stations/stations.service";

@Injectable()
export class TrafficService {
    constructor(
        @InjectRepository(Traffic)
        private trafficRepository: Repository<Traffic>,
        private stationsService: StationsService
    ) {
    }

    async findAll(): Promise<Array<Traffic>> {
        return await this.trafficRepository.find({
            relations: {
                from: true,
                to: true
            }
        });
    }

    async findOne(id: number): Promise<Traffic> {
        return await this.trafficRepository.findOne({
            where: {
                id
            },
            relations: {
                from: true,
                to: true
            }
        })
    }

    async remove(id: number): Promise<number> {
        await this.trafficRepository.delete(id);
        return id;
    }

    async create(trafficDto: UpsertTrafficDto): Promise<Traffic> {
        const from = await this.stationsService.findOne(trafficDto.fromId);
        const to = await this.stationsService.findOne(trafficDto.toId);
        return await this.trafficRepository.save({
            from,
            to,
            arrivalTime: trafficDto.arrivalTime,
            departureTime: trafficDto.departureTime
        });
    }

    async update(trafficDto: UpsertTrafficDto, id: number) {
        const from = await this.stationsService.findOne(trafficDto.fromId);
        const to = await this.stationsService.findOne(trafficDto.toId);
        await this.trafficRepository.update({id}, {
            from,
            to,
            arrivalTime: trafficDto.arrivalTime,
            departureTime: trafficDto.departureTime,
        });
        return await this.trafficRepository.findOne({
            where: {
                id
            },
            relations: {
                to: true,
                from: true
            }
        })
    }
}
