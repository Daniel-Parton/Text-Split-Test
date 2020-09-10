export const roundTo = (val: number, round: number) => {
  if (!val || !round) return 0;
  const first: any = val + (`e+${round}`);
  const second: any = `e-${round}`;
  return +(Math.round(first) + second);
};