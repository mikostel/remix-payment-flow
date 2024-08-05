import clsx from 'clsx';

export enum ButtonStyle {
  PRIMARY = 'bg-red-100',
  SECONDARY = 'bg-blue-100'
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonStyle;
}

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        rest.className,
        'w-full py-3 px-10 bg-abc-active hover:bg-abc-primary focus:bg-abc-primary rounded-lg font-bold text-white transition'
      )}
    >
      {children}
    </button>
  );
};
