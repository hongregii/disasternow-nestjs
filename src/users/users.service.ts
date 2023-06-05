import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from 'src/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isDuplicatedUser = await this.findOneByEmail({
      email: createUserDto.email,
      password: createUserDto.password,
    });

    if (isDuplicatedUser) {
      throw new BadRequestException('중복된 email입니다');
    }

    const hashedpw = await bcrypt.hash(createUserDto.password, 10);
    const user = { ...createUserDto, password: hashedpw };
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOneByEmail(loginDto: LoginDto) {
    const foundUser = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!foundUser) {
      throw new BadRequestException('Invalid email');
    }

    const comparePw = await bcrypt.compare(
      loginDto.password,
      foundUser.password,
    );

    if (!comparePw) {
      throw new BadRequestException('Invalid password');
    }

    return foundUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
