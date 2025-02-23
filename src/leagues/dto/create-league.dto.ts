import { IsString } from 'class-validator';

export class CreateLeagueDto {
  @IsString()
  name: string;
}
