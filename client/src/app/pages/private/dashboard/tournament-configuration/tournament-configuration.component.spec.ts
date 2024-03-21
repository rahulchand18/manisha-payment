import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentConfigurationComponent } from './tournament-configuration.component';

describe('TournamentConfigurationComponent', () => {
  let component: TournamentConfigurationComponent;
  let fixture: ComponentFixture<TournamentConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TournamentConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
