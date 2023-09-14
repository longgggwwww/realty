import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { ServiceAccount } from 'firebase-admin';
import * as credentials from 'firebase-admin.json';
import { FirebaseModule } from 'nestjs-firebase';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { AccountsModule } from './accounts/accounts.module';
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
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRED_TIME'),
          },
        };
      },
      inject: [ConfigService],
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory() {
        return {
          middlewares: [loggingMiddleware()],
        };
      },
    }),
    FirebaseModule.forRootAsync({
      useFactory() {
        return {
          googleApplicationCredential: credentials as ServiceAccount,
        };
      },
    }),
    MulterModule.registerAsync({
      useFactory(configService: ConfigService) {
        return {
          limits: {
            fileSize: configService.get<number>('MAX_SIZE_PER_FILE_UPLOAD'),
            files: configService.get<number>('MAX_NUMBER_FILE_UPLOAD'),
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
    AccountsModule,
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
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: PermissionsGuard },
  ],
})
export class AppModule {}
