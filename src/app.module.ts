import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { PermissionsGuard } from './auth/permission.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { EventsModule } from './events/events.module';
import { FirebaseModule } from './firebase/firebase.module';
import { GgdriveModule } from './ggdrive/ggdrive.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PermissionGroupsModule } from './permission-groups/permission-groups.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { PropertiesModule } from './properties/properties.module';
import { AmenitiesModule } from './amenities/amenities.module';
import { AttributesModule } from './attributes/attributes.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory(...args) {
        return {
          middlewares: [loggingMiddleware()],
        };
      },
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory(...args) {
        return {
          secret: process.env.ACCESS_TOKEN_SECRET,
          signOptions: {
            expiresIn: '60d',
          },
        };
      },
    }),
    MulterModule.registerAsync({
      useFactory(...args) {
        return {
          limits: {
            fileSize: parseInt(process.env.MAX_SIZE_PER_FILE_UPLOAD),
            files: parseInt(process.env.MAX_NUMBER_FILE_UPLOAD),
          },
        };
      },
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    EventsModule,
    FirebaseModule,
    GgdriveModule,
    CloudinaryModule,
    PermissionGroupsModule,
    PostsModule,
    PropertiesModule,
    AmenitiesModule,
    AttributesModule,
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
