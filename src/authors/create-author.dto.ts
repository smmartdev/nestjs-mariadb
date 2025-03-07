import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAuthorDto {
  
  @IsString() // Ensures it's a string
  @IsNotEmpty() // Ensures it's not empty
  firstName: string;

  @IsString() // Ensures it's a string
  @IsNotEmpty() // Ensures it's not empty
  lastName: string;

  @IsEmail() // Ensures it's a valid email format
  @IsNotEmpty() // Ensures it's not empty
  email: string;
}
