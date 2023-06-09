import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import axios from 'axios';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto[]) {
    const insertData = {
      ...createTagDto[0],
      tagName: createTagDto[0].location_name,
    };
    await this.tagRepository.save(insertData);
    return 'This action adds a new tag';
  }

  async findAll() {
    const data = await this.tagRepository.find();

    return data.slice(0, 3);
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }

  @Cron('0 */1 * * * *')
  async apiCall() {
    const res = await axios.get(
      'http://apis.data.go.kr/1741000/DisasterMsg3/getDisasterMsg1List?ServiceKey=dsZ2sw5C1Iea6jKCZ%2BFW6H7jj1vBHbjICLisYxIUPAH%2B2Ko%2FkYDajkB%2BCDIzM3cR953ljQPeUS1gWgMtLG0aSg%3D%3D&type=json&pageNo=1&numOfRows=3',
    );

    const parsedRes: CreateTagDto[] = res.data.DisasterMsg[1].row;
    // console.log(parsedRes);
    // return res.data;

    if (this.hasResponseChanged(parsedRes)) {
      // 변화가 있는 경우에만 DB에 삽입 작업 수행
      await this.create(parsedRes);
    }

    this.previousResponse = parsedRes;
  }

  private previousResponse: any = null;

  hasResponseChanged(currentResponse: any): boolean {
    if (this.previousResponse === null) {
      return true;
    }

    // 이전 응답값과 현재 응답값 비교 로직 작성
    // 변화가 있는 경우 true 반환, 그렇지 않으면 false 반환
    if (this.previousResponse !== currentResponse) {
      console.log('prev : ', this.previousResponse);
      console.log('current : ', currentResponse);
      return true;
    } else return false;
  }
}
