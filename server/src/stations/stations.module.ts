import {Module} from '@nestjs/common';
import {StationsController} from './stations.controller';
import {StationsService} from './stations.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Station} from "./stations.model";

@Module({
    imports: [
        TypeOrmModule.forFeature([Station])
    ],
    controllers: [StationsController],
    providers: [StationsService],
    exports: [StationsService]
})
export class StationsModule {
}
