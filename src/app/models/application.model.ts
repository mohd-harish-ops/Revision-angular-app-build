export const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'] as const;
export type Status = (typeof STATUSES)[number];

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: Status;
  date: string; // YYYY-MM-DD
  notes: string;
}

export const todayISO = (): string => new Date().toISOString().slice(0, 10);
