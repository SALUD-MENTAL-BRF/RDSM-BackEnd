import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SpecialityHospitalService } from './speciality-hospital.service';
import { CreateSpecialityHospital } from './dto/createSpecialityHospital';

@Controller('specialityHospital')
export class SpecialityHospitalController {
  constructor(private readonly specialityHospitalService: SpecialityHospitalService) {}

  @Post('/')
  async createSpecialityHospital(@Body() specialityHospital: CreateSpecialityHospital){
    try {

      await this.specialityHospitalService.createSpecialityHospital(specialityHospital)
      return { success: true };
    } catch (err) {
      if(err instanceof Error) {
        console.error(`Error creating speciality hospital: ${err.message}`);
      } else {
        console.error(`Unknown error creating speciality hospital: ${err}`);
      }
    }
  }

  @Get('/')
  async getAllSpecialitiesHospital() {
    try {
      return await this.specialityHospitalService.getAllSpecialitiesHospital();
    } catch (err) {
      if(err instanceof Error) {
        console.error(`Error getting all specialities hospital: ${err.message}`);
      } else {
        console.error(`Unknown error getting all specialities hospital: ${err}`);
      }
    }
  }

  @Delete('/:id')
  async deltedSpecialityHospital(@Param('id') id: string) {
    try {

      const numericId = parseInt(id);
  
      if (isNaN(numericId)) {
        throw new BadRequestException('ID inválido');
      }

      const response = await this.specialityHospitalService.deleteSpecialtyHospital(numericId);
      return response;

    } catch (err) {
      if(err instanceof Error) {
        console.error(`Error deleting speciality hospital: ${err.message}`);
      } else {
        console.error(`Unknown error deleting speciality hospital: ${err}`);
      }
    }
  }

}
