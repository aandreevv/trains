import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {StationsDto} from "./stations.dto";
import {StationsService} from "./stations.service";

@Controller('api/stations')
export class StationsController {
    constructor(private stationsService: StationsService) {}

    @Post()
    create(@Body() stationDto: StationsDto) {
        return this.stationsService.create(stationDto);
    }

    @Get()
    get() {
        return this.stationsService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.stationsService.findOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.stationsService.remove(id);
    }
}
