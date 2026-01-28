export function getPostgresTimestamp(): string {
  const date = new Date();

  const pad = (n: number) => n.toString().padStart(2, '0');

  const yyyy = date.getUTCFullYear();
  const mm = pad(date.getUTCMonth() + 1);
  const dd = pad(date.getUTCDate());

  const hh = pad(date.getUTCHours());
  const mi = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}+00`;
}
