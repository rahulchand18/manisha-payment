import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonPointsTableComponent } from './season-points-table.component';

describe('SeasonPointsTableComponent', () => {
  let component: SeasonPointsTableComponent;
  let fixture: ComponentFixture<SeasonPointsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeasonPointsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeasonPointsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
