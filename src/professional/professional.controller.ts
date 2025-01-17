import { Controller,Post, Body, Req,Res, Param, ValidationPipe, Get, Put, Delete } from "@nestjs/common";
import { Request,response,Response } from "express";
import { ProfessionalService } from "./professional.service";
import { UsePipes } from "@nestjs/common";
import { CreateProfessionalDto, UpdateProfileProfessionalDto } from "./dto/professional.dto";
import { UsersService } from "src/users/users.service";

@Controller('professional')
export class ProfessionalControllers {

    constructor(
        private professionalService: ProfessionalService,
        private userService: UsersService,
    ){}


    @Post()
    @UsePipes(new ValidationPipe({whitelist: true}))
    async createProfessional(@Body() data: CreateProfessionalDto, @Res() response : Response,) {
        try {
            const professional = await this.professionalService.create(data);
            return response.json({ success: true, professional });
        } catch (error) {
            return response.status(500).json({ success: false, message: error.message });
        };
    };

    @Get()
    async getAllProfessional(@Req() _request: Request, @Res() response: Response){
        try {
            response.status(200).json(await this.professionalService.findAll());
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to get all professionals"})
        }
    };

    @Get('user/:userId')
    async findProfessionalByUserId(@Req() _request: Request, @Res() response: Response, @Param('userId') userId: string){
        try {            
            response.status(200).json(await this.professionalService.findOneByUserId(Number(userId)))
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to find the professional"})
            
        }
    }


    @Get(':professionalId')
    async findProfessionalById(@Req() _request: Request, @Res() response: Response, @Param('professionalId') professionalId: string){
        try {
            const professional = await this.professionalService.findOne(Number(professionalId));
            if (!professional) {
                return response.status(404).json({ success: false, message: 'No se encontró el profesional' });
            }
            return response.json({ success: true, professional });
        } catch (error) {
            return response.status(500).json({ success: false, message: error.message });
        }
    } 

    @Get('/token/:token')
    async findProfessionalOneHospital(@Req() _request:Request, @Res() response:Response, @Param('token') token: string){
        try {
            const user = await this.userService.findOneByToken(token);
            if (!user) {
                return response.status(404).json({ success: false, message: 'No se encontró el usuario' });
            }
            const professionals = await this.professionalService.finAllByHospitalId(user.hospital.id);
            if (!professionals) {
                return response.status(404).json({ success: false, message: 'No se encontraron profesionales' });
            }
            return response.json({ success: true, professionals });
        } catch (err) {
            return response.status(500).json({ success: false, message: err.message });
        }
    }

    @Get('patient/:patientId')
    async findProfessionalsByPatient(@Req() _request: Request, @Res() response: Response, @Param('patientId') patientId: string){
        try {
            response.status(200).json(await this.professionalService.findBypatient(Number(patientId)))
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg:"Error to find all professionals by patient"
            })
        }
    };

    @Get('profile/professional/:professionalId')
    async findOneProfileByProfessionalId(@Req() _request: Request, @Res() response: Response, @Param('professionalId') professionalId: string){
        try {
            response.status(200).json(await this.professionalService.findOneProfileByProfessionalId(Number(professionalId)));
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to get one profile"})
        }
    };

    @Get('profile/:profileId')
    async findOneProfile(@Req() _request: Request, @Res() response: Response, @Param('profileId') profileId: string){
        try {
            response.status(200).json(await this.professionalService.findOneProfile(Number(profileId)));
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to get one professional"})
        }
    };

    @Put('profile/:professionalId')
    async updateProfile(@Req() _request: Request, @Res() response: Response,@Param('professionalId') professionalId: string, @Body() data: UpdateProfileProfessionalDto){
        try {
            response.status(200).json(await this.professionalService.updateProfile(Number(professionalId), data))
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to update profile"})
        }
    }

    @Delete(':professionalId')
    async deleteProfessional(@Req() _request: Request, @Res() response: Response, @Param('professionalId') professionalId: string){
        try {
            const professional = await this.professionalService.findOne(Number(professionalId));
            if (!professional) {
                return response.status(404).json({ success: false, message: 'No se encontró el profesional' });
            }
            await this.professionalService.deleteProfessional(professional.user.id)

            return response.json({ success: true });
        } catch (error) {
            return response.status(500).json({ success: false, message: error.message });
        }
    }

    @Delete('desvincular/:professionalId/:patientId')
    async desvincular(@Req() _request: Request, @Res() response:Response, @Param('professionalId') professionalId: string,
        @Param('patientId') patientId: string){
        try {
            response.status(200).json(await this.professionalService.desvincular(Number(professionalId),Number(patientId)))
        } catch (error) {
            console.log();
            response.status(500).json({
                msg: 'Error to desvincular the patient'
            })
        };
    };
};