import { Injectable } from '@nestjs/common';
import { UpdateProfileInput } from './dto/update-profile.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async find() {
    return await this.profileRepository.find();
  }


  async update(id: string, updateProfileInput: UpdateProfileInput) {
    return await this.profileRepository.update(id, updateProfileInput);
  }
}
