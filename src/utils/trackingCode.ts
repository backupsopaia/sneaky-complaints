
/**
 * Utility for generating and managing tracking codes for reports
 */

/**
 * Generates a unique tracking code for a report
 * Format: AAA-1234-BBB (where AAA and BBB are random uppercase letters, and 1234 is a random number)
 */
export const generateTrackingCode = (): string => {
  const getRandomLetter = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters.charAt(Math.floor(Math.random() * letters.length));
  };
  
  const getRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };
  
  const prefix = Array(3).fill(0).map(() => getRandomLetter()).join('');
  const middle = getRandomNumber();
  const suffix = Array(3).fill(0).map(() => getRandomLetter()).join('');
  
  return `${prefix}-${middle}-${suffix}`;
};

/**
 * Validates if a tracking code is in the correct format
 */
export const isValidTrackingCode = (code: string): boolean => {
  const regex = /^[A-Z]{3}-\d{4}-[A-Z]{3}$/;
  return regex.test(code);
};
