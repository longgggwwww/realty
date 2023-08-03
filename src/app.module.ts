import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
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
import { EstatePropertiesModule } from './estate-properties/estate-properties.module';
import { EstateTypesModule } from './estate-types/estate-types.module';
import { GgdriveModule } from './ggdrive/ggdrive.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PermissionGroupsModule } from './permission-groups/permission-groups.module';
import { PostsModule } from './posts/posts.module';
import { EstateUtilsModule } from './estate-utils/estate-utils.module';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
      },
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    EventsModule,
    FirebaseModule,
    EstatePropertiesModule,
    EstateTypesModule,
    GgdriveModule,
    CloudinaryModule,
    PermissionGroupsModule,
    PostsModule,
    EstateUtilsModule,
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
