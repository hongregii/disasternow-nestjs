import { IsNumber, IsOptional, IsString } from 'class-validator';
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
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  lng?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  lat?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  img?: string;

  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;
}
