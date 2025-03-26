import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(@InjectRepository(Team) private repo: Repository<Team>) {}

  create(createTeamDto: CreateTeamDto) {
    return this.repo.save(createTeamDto);
  }

  findAll() {
    return this.repo.find();
  }

  findBy(params: Partial<Team>) {
    return this.repo.find({ where: params });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const team = await this.findOne(id);

    if (!team) {
      throw new BadRequestException('Team not found');
    }

    const res = await this.repo.update(id, updateTeamDto);

    if (!res.affected) {
      throw new BadRequestException('Team not updated');
    }

    return { ...team, ...updateTeamDto };
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
