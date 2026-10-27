import { TestBed } from '@angular/core/testing';
import { ApplicationsService } from './applications.service';

describe('ApplicationsService', () => {
  let service: ApplicationsService;
  const sample = { company: 'Acme', role: 'Cloud Intern', status: 'Applied' as const, date: '2026-01-01', notes: '' };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationsService);
  });

  it('adds an application', () => {
    service.add(sample);
    expect(service.total()).toBe(1);
    expect(service.counts().Applied).toBe(1);
  });

  it('changes status', () => {
    service.add(sample);
    service.setStatus(service.items()[0].id, 'Offer');
    expect(service.counts().Offer).toBe(1);
    expect(service.counts().Applied).toBe(0);
  });

  it('removes an application', () => {
    service.add(sample);
    service.remove(service.items()[0].id);
    expect(service.total()).toBe(0);
  });
});
