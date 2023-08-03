import { Module } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [FirebaseModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AccountsService],
})
export class AuthModule {}
