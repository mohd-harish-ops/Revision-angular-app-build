import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { STATUSES, Status, todayISO } from '../../models/application.model';
import { ApplicationsService } from '../../services/applications.service';

type Filter = 'All' | Status;

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './applications.component.html',
})
export class ApplicationsComponent {
  private readonly fb = inject(FormBuilder);
  protected readonly service = inject(ApplicationsService);

  protected readonly statuses = STATUSES;
  protected readonly filters: Filter[] = ['All', ...STATUSES];

  protected readonly form = this.fb.nonNullable.group({
    company: ['', Validators.required],
    role: ['', Validators.required],
    status: ['Applied' as Status],
    date: [todayISO()],
    notes: [''],
  });

  protected readonly filter = signal<Filter>('All');
  protected readonly query = signal('');

  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const f = this.filter();
    return this.service
      .items()
      .filter((a) => (f === 'All' || a.status === f) && `${a.company} ${a.role}`.toLowerCase().includes(q));
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.service.add(this.form.getRawValue());
    this.form.reset({ company: '', role: '', status: 'Applied', date: todayISO(), notes: '' });
  }

  protected changeStatus(id: string, value: string): void {
    this.service.setStatus(id, value as Status);
  }

  protected remove(id: string): void {
    this.service.remove(id);
  }
}
