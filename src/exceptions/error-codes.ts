import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  UpdateError = 400,
  LoginOrPasswordIncorrect = 401,
  UserNotFound = 404,
  WishNotFound = 404,
  UserAlreadyExists = 409,
  Forbidden = 403,
}

export const code2message = new Map<ErrorCode, string>([
  [ErrorCode.LoginOrPasswordIncorrect, 'Некорректная пара логин и пароль'],
  [
    ErrorCode.UserAlreadyExists,
    'Пользователь с таким email или username уже зарегистрирован',
  ],
  [ErrorCode.UserNotFound, 'Пользователь не найден'],
  [ErrorCode.WishNotFound, 'Подарки не найдены'],
  [ErrorCode.UpdateError, 'Ошибка обновления переданных значений'],
  [ErrorCode.Forbidden, 'Можно удалять только свои подарки'],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.LoginOrPasswordIncorrect, HttpStatus.UNAUTHORIZED],
  [ErrorCode.UserAlreadyExists, HttpStatus.CONFLICT],
  [ErrorCode.UserNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.WishNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.UpdateError, HttpStatus.BAD_REQUEST],
  [ErrorCode.Forbidden, HttpStatus.FORBIDDEN],
]);
