import { Module } from '@nestjs/common';
import { PreloadedData } from './prisma/data/preloaded';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { ProfessionalModule } from './professional/professional.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { RequestPatientModule } from './request_patient/request_patient.module';
import { RolesModule } from './roles/roles.module';
import { PatientModule } from './patient/patient.module';
import { ProvinceModule } from './provinces/provinces.module';
import { LocalityModule } from './locality/locality.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [UsersModule, AuthModule, NoteModule, ProfessionalModule, RolesModule, RequestPatientModule,PatientModule,
    ProvinceModule,LocalityModule, RecommendationModule,ActivityModule
  ],
  controllers: [],
  providers: [PreloadedData, PrismaService, CloudinaryService],
})
export class AppModule {}
