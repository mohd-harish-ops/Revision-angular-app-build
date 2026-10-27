import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { STATUSES } from '../../models/application.model';
import { ApplicationsService } from '../../services/applications.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  protected readonly service = inject(ApplicationsService);
  protected readonly statuses = STATUSES;
  protected readonly recent = computed(() => this.service.items().slice(0, 5));
}
