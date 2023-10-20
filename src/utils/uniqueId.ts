export const uniqueId = () => {
  let counter = Date.now() % 1000;

  const generateNumericUniqueId = () => {
    counter += 1;
    const randomDigits = Math.floor(Math.random() * 1000); // Generates a random three-digit number
    // Combines the counter and random number
    return counter * 1000 + randomDigits;
  };

  return generateNumericUniqueId();
};
