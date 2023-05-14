import { SetMetadata } from '@nestjs/common';

export const Role = (...permissions: string[]) =>
  SetMetadata('permission', permissions);
