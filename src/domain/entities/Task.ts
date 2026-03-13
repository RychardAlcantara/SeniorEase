export default interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  concludedAt: Date | null;
  notes?: string;
}
