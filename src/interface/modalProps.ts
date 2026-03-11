export default interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
