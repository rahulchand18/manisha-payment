import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { PointsTableComponent } from './points-table/points-table.component';
import { SeasonPointsTableComponent } from './season-points-table/season-points-table.component';


@NgModule({
  declarations: [
    PointsTableComponent,
    SeasonPointsTableComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule
  ]
})
export class TournamentModule { }
