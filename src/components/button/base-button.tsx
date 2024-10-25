interface BaseButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const BaseButton = ({ onClick, children }: BaseButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};
