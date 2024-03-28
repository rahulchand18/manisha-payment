import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentComponent } from './tournament.component';
import { TournamentConfigurationComponent } from '../tournament-configuration/tournament-configuration.component';
import { PredictionComponent } from './prediction/prediction.component';
import { PointsTableComponent } from './points-table/points-table.component';
import { SeasonPointsTableComponent } from './season-points-table/season-points-table.component';

const routes: Routes = [
  {
    path: '',
    component: TournamentComponent,
    data: { title: 'Tournament' },
    title: 'Dashboard',
    children: [
      {
        path: 'prediction',
        component: PredictionComponent,
      },
      {
        path: 'points-table',
        component: PointsTableComponent,
      },
      {
        path: 'season-points-table',
        component: SeasonPointsTableComponent,
      },
    ],
  },
  {
    path: 'configuration',
    component: TournamentConfigurationComponent,
    data: { title: 'Tournament' },
    title: 'Dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentRoutingModule {}
