import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  ValidationError = 400,
  LoginOrPasswordIncorrect = 401,
  UserNotFound = 404,
  UserAlreadyExists = 409,
}

export const code2message = new Map<ErrorCode, string>([
  [ErrorCode.LoginOrPasswordIncorrect, 'Некорректная пара логин и пароль'],
  [
    ErrorCode.UserAlreadyExists,
    'Пользователь с таким email или username уже зарегистрирован',
  ],
  [ErrorCode.UserNotFound, 'Пользователь не найден'],
  [ErrorCode.ValidationError, 'Ошибка валидации переданных значений'],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.LoginOrPasswordIncorrect, HttpStatus.UNAUTHORIZED],
  [ErrorCode.UserAlreadyExists, HttpStatus.CONFLICT],
  [ErrorCode.UserNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.ValidationError, HttpStatus.BAD_REQUEST],
]);
