export const formatCardNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
  // If is not a number or a whitelisted key, prevent key down
  stripNonNumeric(e);

  // Add space between every four digits
  const target = e.target as HTMLInputElement;
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
  const numbers = target.value.replace(/[^\d]/g, '');

  target.value = numbers.replace(regex, (regex, $1, $2, $3, $4) =>
    [$1, $2, $3, $4].filter((group) => !!group).join(' ')
  );
};

export const formatDate = (e: React.KeyboardEvent<HTMLInputElement>) => {
  // If is not a number or a whitelisted key, prevent key down
  stripNonNumeric(e);

  // Add space between every four digits
  const target = e.target as HTMLInputElement;
  const regex = /^(\d{0,2})(\d{0,2})$/g;
  const numbers = target.value.replace(/[^\d]/g, '');

  target.value = numbers.replace(regex, (regex, $1, $2) =>
    [$1, $2].filter((group) => !!group).join('/')
  );
};

export const formatZipCode = (e: React.KeyboardEvent<HTMLInputElement>) => {
  // If is not a number or a whitelisted key, prevent key down
  stripNonNumeric(e);

  // Add space between every four digits
  const target = e.target as HTMLInputElement;
  const regex = /^(\d{0,5})(\d{0,4})$/g;
  const numbers = target.value.replace(/[^\d]/g, '');

  target.value = numbers.replace(regex, (regex, $1, $2) =>
    [$1, $2].filter((group) => !!group).join('-')
  );
};

export const stripNonNumeric = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const isNumber = !isNaN(Number(e.key));
  const whitelist = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Meta',
    'Tab'
  ];

  if (!e.metaKey && !isNumber && whitelist.indexOf(e.key) < 0) {
    e.preventDefault();
  }
};
