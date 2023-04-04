// https://devdojo.com/eftykharrahman/snippet/create-a-random-token-in-javascript
const rand = () => {
  return Math.random().toString(36).substring(2);
};

export const generateToken = () => {
  return rand() + rand();
};
