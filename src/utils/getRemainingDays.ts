export default function getRemainingDays(expirationDate: string): number {
  if (!expirationDate) return 0;

  const fmt = new Intl.DateTimeFormat("en-CA", { // formato YYYY-MM-DD
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const todayStr = fmt.format(new Date());
  const expiresStr = fmt.format(new Date(expirationDate));

  const today = new Date(todayStr);
  const expires = new Date(expiresStr);

  const diffTime = expires.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}