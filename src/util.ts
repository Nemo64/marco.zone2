/**
 * This is a workaround for the requirement of next.js
 * that static props must not contain undefined.
 *
 * @see https://github.com/vercel/next.js/discussions/11209
 */
export function removeUndefined<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * This function can be used in a Promise.catch
 * to fall back to a fixed value if some error occurs.
 *
 * The error message will be logged.
 */
export function fallback<T>(fallback: T): (error: any) => T {
  return (error) => {
    console.error(error);
    return fallback;
  };
}
