import { ConfigService } from '@nestjs/config';

export default (configService: ConfigService) => ({
  saltRounds: configService.get('SALT'),
});
