export default interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  expectedToBeDone: string | null;
  concludedAt: Date | null;
  notes?: string;
}
