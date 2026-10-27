import { Injectable, computed, effect, signal } from '@angular/core';
import { JobApplication, Status } from '../models/application.model';

const KEY = 'job-tracker-data';

@Injectable({ providedIn: 'root' })
export class ApplicationsService {
  private readonly _items = signal<JobApplication[]>(this.load());

  readonly items = this._items.asReadonly();
  readonly total = computed(() => this._items().length);
  readonly counts = computed(() => {
    const c: Record<Status, number> = { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
    for (const a of this._items()) c[a.status]++;
    return c;
  });

  constructor() {
    // Har change par browser ki localStorage me save karo
    effect(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify(this._items()));
      } catch {
        // storage blocked ho to ignore
      }
    });
  }

  add(data: Omit<JobApplication, 'id'>): void {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    this._items.update((list) => [{ ...data, id }, ...list]);
  }

  setStatus(id: string, status: Status): void {
    this._items.update((list) => list.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  remove(id: string): void {
    this._items.update((list) => list.filter((a) => a.id !== id));
  }

  private load(): JobApplication[] {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as JobApplication[]) : [];
    } catch {
      return [];
    }
  }
}
