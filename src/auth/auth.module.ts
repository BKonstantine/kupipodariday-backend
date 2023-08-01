import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashModule } from 'src/hash/hash.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    HashModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalGuard, JwtGuard],
  exports: [AuthService],
})
export class AuthModule {}
