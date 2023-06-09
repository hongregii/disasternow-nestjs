import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsString()
  lng?: string;

  @ApiProperty()
  @IsString()
  lat?: string;

  @ApiProperty()
  @IsString()
  img?: string;

  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  password?: string;
}
