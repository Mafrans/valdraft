export const Second = 1000;
export const Minute = 60 * Second;
export const Hour = 60 * Minute;

export const UnixSecond = 1;
export const UnixMinute = 60 * UnixSecond;
export const UnixHour = 60 * UnixMinute;

export function unixNow() {
  return Date.now() / Second;
}
