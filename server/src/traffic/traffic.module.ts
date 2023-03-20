import { Module } from '@nestjs/common';
import { TrafficController } from './traffic.controller';
import { TrafficService } from './traffic.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Traffic} from "./traffic.model";
import {StationsModule} from "../stations/stations.module";

@Module({
  imports: [
      StationsModule,
      TypeOrmModule.forFeature([Traffic]),
  ],
  controllers: [TrafficController],
  providers: [TrafficService]
})
export class TrafficModule {}
