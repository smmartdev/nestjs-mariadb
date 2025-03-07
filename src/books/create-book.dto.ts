import { IsString, IsNotEmpty, IsDateString, IsInt } from 'class-validator';


export class CreateBookDto {
  
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDateString()
    publishedDate: Date;
  
    @IsString()
    @IsNotEmpty()
    author: string;

    @IsInt()
    @IsNotEmpty()
    authorId: number;  // Only the authorId is required here

  }



  
  
  