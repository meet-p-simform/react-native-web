export interface CustomModalTypes {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactElement;
}
