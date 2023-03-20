import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {TrafficService} from "./traffic.service";
import {UpsertTrafficDto} from "./traffic.dto";

@Controller('api/traffic')
export class TrafficController {
    constructor(private trafficService: TrafficService) {
    }

    @Get()
    get() {
        return this.trafficService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.trafficService.findOne(id);
    }

    @Post()
    create(@Body() trafficDto: UpsertTrafficDto) {
        return this.trafficService.create(trafficDto);
    }

    @Patch(':id')
    update(@Param('id') id: number,
           @Body() trafficDto: UpsertTrafficDto) {
        return this.trafficService.update(trafficDto, id);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.trafficService.remove(id);
    }
}
