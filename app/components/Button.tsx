import clsx from 'clsx';

export const Button = ({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
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
