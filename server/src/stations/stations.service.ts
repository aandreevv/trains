import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Station} from "./stations.model";
import {Repository} from "typeorm";
import {StationsDto} from "./stations.dto";

@Injectable()
export class StationsService {
    constructor(
        @InjectRepository(Station)
        private stationsRepository: Repository<Station>
    ) {}

    async findAll(): Promise<Array<Station>>{
        return await this.stationsRepository.find();
    }

    async findOne(id: number): Promise<Station> {
        return await this.stationsRepository.findOneBy({id});
    }

    async remove(id: number): Promise<number> {
        await this.stationsRepository.delete(id);
        return id;
    }

    async create(stationsDto: StationsDto): Promise<Station> {
        return await this.stationsRepository.save({...stationsDto});
    }
}
