import { SetMetadata } from '@nestjs/common';
import { Role } from '../users/user.entity'; // Assuming you use Role enum

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
