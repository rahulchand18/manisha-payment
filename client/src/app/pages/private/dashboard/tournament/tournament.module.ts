import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { PointsTableComponent } from './points-table/points-table.component';


@NgModule({
  declarations: [
    PointsTableComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule
  ]
})
export class TournamentModule { }
