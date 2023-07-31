import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { EventsModule } from './events/events.module';
import { AccountsService } from './accounts/accounts.service';
import { FirebaseModule } from './firebase/firebase.module';
import { EstatePropertiesModule } from './estate-properties/estate-properties.module';
import { EstateTypesModule } from './estate-types/estate-types.module';
import { GgdriveModule } from './ggdrive/ggdrive.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PermissionGroupsModule } from './permission-groups/permission-groups.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    PrismaModule,
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
  ],
  controllers: [AppController],
  providers: [AppService, AccountsService],
})
export class AppModule {}
