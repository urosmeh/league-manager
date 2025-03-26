import { League } from 'src/leagues/entities/league.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  leagueId: number;

  @ManyToOne(() => League, (league) => league.teams)
  league: League;
}
