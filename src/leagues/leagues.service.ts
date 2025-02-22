import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { Like, Repository } from 'typeorm';
import { League } from './entities/league.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LeaguesService {
  constructor(@InjectRepository(League) private repo: Repository<League>) {}

  create(createLeagueDto: CreateLeagueDto) {
    return this.repo.save(createLeagueDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOneById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  findOneByName(name: string) {
    return this.repo.find({ where: { name: Like(`%${name}%`) } });
  }

  async update(id: number, updateLeagueDto: UpdateLeagueDto) {
    const league = await this.findOneById(id);

    if (!league) {
      throw new NotFoundException('League not found');
    }

    return this.repo.save({ ...league, ...updateLeagueDto });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
