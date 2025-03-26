import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { LeaguesModule } from './leagues/leagues.module';
import { League } from './leagues/entities/league.entity';
import { TeamsModule } from './teams/teams.module';
import { Team } from './teams/entities/team.entity';

@Module({
  imports: [
    UsersModule,
    LeaguesModule,
    TeamsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, League, Team],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
