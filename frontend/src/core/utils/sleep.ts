export const sleep = (sec: number): Promise<void> => {
  return new Promise((res, rej) => setTimeout(res, sec * 1000));
};
