// sum.test.js
import { expect, test } from 'vitest';
import {
  validateCreditCard,
  validateZipCode,
  validateName,
  validateDate,
  validateSecurityCode
} from './validation';

test('Validate Credit Card', () => {
  expect(validateCreditCard('1234 1234 1234 123')).toBe(false); // Input is short 1 digit
  expect(validateCreditCard('1234123412341234')).toBe(false); // Input has no spaces
  expect(validateCreditCard('1234 1234 1234 1234')).toBe(true); // Input has 16 digits and spaces
});

test('Validate MM/YY', () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // Months are 0-indexed, so add 1
  const currentYear = now.getFullYear();
  const currentYearLastTwoDigits = currentYear % 100;

  expect(validateDate('12/20')).toBe(false); // Year is in the past
  expect(validateDate(`12/${currentYearLastTwoDigits}`)).toBe(true); // Date is current year
  expect(validateDate(`12/${currentYearLastTwoDigits + 1}`)).toBe(true); // Date is in future
  expect(validateDate(`12/${currentYearLastTwoDigits}`)).toBe(true); // MM is not between 01 and 12
  expect(validateDate(`${currentMonth - 1}/${currentYearLastTwoDigits}`)).toBe(
    false
  ); // Month is in the past
});

test('Validate Security Code', () => {
  expect(validateSecurityCode('1234')).toBe(false); // Input is not 3 digits
  expect(validateSecurityCode('123')).toBe(true); // Input is 3 digits
});

test('Validate Name', () => {
  expect(validateName('Mitch 1234')).toBe(false); // Input contains numbers
  expect(validateName('Mitch')).toBe(false); // Input has first name only
  expect(validateName('MitchKostelecky')).toBe(false); // Input has no spaces
  expect(validateName('Mitch Kostelecky')).toBe(true); // Input has first name and last name
});

test('Validate Zip Code', () => {
  expect(validateZipCode('12345')).toBe(true); // Input has 5 digits
  expect(validateZipCode('1234')).toBe(false); // Input is short 1 digit
});
