import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import configuration from 'config/configuration';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { AmenitiesModule } from './amenities/amenities.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { PermissionsGuard } from './auth/permission.guard';
import { PermissionGroupsModule } from './permission-groups/permission-groups.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PropertiesModule } from './properties/properties.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt.access_token.secret'),
          signOptions: {
            expiresIn: configService.get('jwt.access_token.expired_in'),
          },
        };
      },
      inject: [ConfigService],
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory(configService: ConfigService) {
        return {
          prismaOptions: {
            datasourceUrl: configService.get('db.mongo.url'),
          },
          middlewares: [loggingMiddleware()],
        };
      },
      inject: [ConfigService],
    }),
    MulterModule.registerAsync({
      useFactory(configService: ConfigService) {
        return {
          limits: {
            fieldSize: configService.get('upload.max_number_file_size'),
            files: configService.get('upload.max_number_file_upload'),
          },
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    PermissionGroupsModule,
    PermissionsModule,
    RolesModule,
    PropertiesModule,
    AmenitiesModule,
    // UsersModule,
    // EventsModule,
    // FirebaseModule,
    // GgdriveModule,
    // CloudinaryModule,
    // PostsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
