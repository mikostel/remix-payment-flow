import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  id: string;
  validationHandler(value: string): boolean;
  validationMessage?: string;
}

export const TextInput = ({
  label,
  name,
  id,
  className,
  validationHandler,
  validationMessage,
  defaultValue,
  ...rest
}: TextInputProps) => {
  const [isValid, setIsValid] = useState<boolean>();

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;

    // Check if input value is valid
    setIsValid(validationHandler(value));

    // If keyUp event is passed down from above, make sure to fire.
    // This will never happen in this demo, but could in the wild
    if (rest.onKeyUp) {
      rest.onKeyUp(e);
    }
  };

  useEffect(() => {
    // Check if default value is valid on mount
    if (defaultValue) {
      setIsValid(validationHandler(defaultValue.toString()));
    }
  }, [defaultValue, validationHandler]);

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <label className="text-sm text-abc-grey-80 font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        {...rest}
        type="text"
        id={id}
        name={name}
        onKeyUp={handleKeyUp}
        defaultValue={defaultValue}
        className={clsx(
          'border rounded-lg px-4 py-3 bg-no-repeat bg-[center_right_0.75rem]',
          {
            'border-abc-grey-80': !validationMessage,
            'border-abc-error bg-error pr-10': validationMessage,
            'bg-success pr-10': isValid
          }
        )}
      />
      {validationMessage ? (
        <div className="text-abc-error text-sm">{validationMessage}</div>
      ) : null}
    </div>
  );
};
