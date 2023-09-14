import { Module } from '@nestjs/common';
import { AccountsModule } from 'src/accounts/accounts.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [FirebaseModule, UsersModule, AccountsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
