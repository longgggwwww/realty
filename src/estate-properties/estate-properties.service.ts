import { Injectable } from '@nestjs/common';
import { CreateEstatePropertyDto } from './dto/create-estate-property.dto';
import { UpdateEstatePropertyDto } from './dto/update-estate-property.dto';

@Injectable()
export class EstatePropertiesService {
  create(createEstatePropertyDto: CreateEstatePropertyDto) {
    return 'This action adds a new estateProperty';
  }

  findAll() {
    return `This action returns all estateProperties`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estateProperty`;
  }

  update(id: number, updateEstatePropertyDto: UpdateEstatePropertyDto) {
    return `This action updates a #${id} estateProperty`;
  }

  remove(id: number) {
    return `This action removes a #${id} estateProperty`;
  }
}
