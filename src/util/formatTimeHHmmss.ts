export const formatTimeHHmmss = (seconds: number): string => {
  const pad = (num: number) => String(num).padStart(2, '0');

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
};
