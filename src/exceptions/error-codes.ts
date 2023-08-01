import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  LoginOrPasswordIncorrect = 401,
  UserAlreadyExists = 409,
  UserNotFound,
}

export const code2message = new Map<ErrorCode, string>([
  [ErrorCode.LoginOrPasswordIncorrect, 'Некорректная пара логин и пароль'],
  [
    ErrorCode.UserAlreadyExists,
    'Пользователь с таким email или username уже зарегистрирован',
  ],
  [ErrorCode.UserNotFound, 'Пользователь не найден'],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.LoginOrPasswordIncorrect, HttpStatus.UNAUTHORIZED],
  [ErrorCode.UserAlreadyExists, HttpStatus.CONFLICT],
  [ErrorCode.UserNotFound, HttpStatus.NOT_FOUND],
]);
