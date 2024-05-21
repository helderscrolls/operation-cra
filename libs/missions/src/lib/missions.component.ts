import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MissionsFacade } from './+state/missions.facade';

@Component({
  selector: 'lib-missions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.scss',
})
export class MissionsComponent implements OnInit {
  private readonly missionsFacade = inject(MissionsFacade);

  ngOnInit(): void {
    this.missionsFacade.init();
  }
}
