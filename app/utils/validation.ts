export const validateCreditCard = (value: string) => {
  // Ensure credit card number is numeric and contains
  // 4 sets of numbers, 4 digits per set
  const regex = /^\d{4} \d{4} \d{4} \d{4}$/;
  return regex.test(value);
};

export const validateDate = (value: string) => {
  const currentYear = new Date().getFullYear();
  const currentYearLastTwoDigits = currentYear % 100;

  // Check if YY is less than current year
  if (Number(value.slice(-2)) < currentYearLastTwoDigits) {
    return false;
  }

  // Ensure date matches MM/YY format.
  // MM must be a value between 0-12.
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return regex.test(value);
};

export const validateZipCode = (value: string) => {
  // Ensure zip code is 5 digits and only made of numeric values
  const regex = /^\d{5}$/;
  return regex.test(value);
};

export const validateSecurityCode = (value: string) => {
  // Ensure CCV is 3 digits and only made of numeric values
  const regex = /^\d{3}$/;
  return regex.test(value);
};

export const validateName = (value: string) => {
  // Ensure name string contains only alphabetical characters.
  // String must also contain two words and a space.
  const regex =
    /^[A-Za-zÀ-ÿ]+(?:[-'][A-Za-zÀ-ÿ]+)*\s[A-Za-zÀ-ÿ]+(?:[-'][A-Za-zÀ-ÿ]+)*$/;
  return regex.test(value);
};
