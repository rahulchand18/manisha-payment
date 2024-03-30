import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { PointsTableComponent } from './points-table/points-table.component';
import { SeasonPointsTableComponent } from './season-points-table/season-points-table.component';
import { ResultsComponent } from './results/results.component';


@NgModule({
  declarations: [
    PointsTableComponent,
    SeasonPointsTableComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule
  ]
})
export class TournamentModule { }
