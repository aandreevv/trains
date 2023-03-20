import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { StationsModule } from './stations/stations.module';
import {ConfigModule} from "@nestjs/config";
import {Station} from "./stations/stations.model";
import { TrafficModule } from './traffic/traffic.module';
import {Traffic} from "./traffic/traffic.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [Station, Traffic],
            synchronize: true,
        }),
        StationsModule,
        TrafficModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
