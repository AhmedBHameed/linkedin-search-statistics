export const callTryCatch = async <E = Error, T = any>(
  fn: () => Promise<T>,
  finallyfn?: () => void
) => {
  try {
    const response: T = await fn();
    return [null, response];
  } catch (error) {
    return [error as E, null];
  } finally {
    finallyfn?.();
  }
};
