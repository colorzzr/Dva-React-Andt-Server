export function GenerateRandomNum(min, max) {
  const range = max - min;
  const rand = Math.random();
  return (min + Math.floor(range * rand));
}


const str = 'hello world!';
export default str;
