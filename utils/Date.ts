export function parseBackendDate(dateStr: string): string {
  // 1. Separar fecha y hora
  const [datePart, timePart] = dateStr.split('T');
  // 2. Limpiar la hora (quitar milisegundos y Z)
  const time = (timePart ?? '').split('.')[0]?.replace('Z', '') ?? '';

  return `${datePart} ${time}`;
}

export function timeAgo(dateStr: string): string {
  const diff = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 1000,
  );
  if (diff < 60) return "Ahora mismo";
  if (diff < 3600) {
    const m = Math.floor(diff / 60);
    return m === 1 ? "Hace 1 minuto" : `Hace ${m} minutos`;
  }
  if (diff < 86400) {
    const h = Math.floor(diff / 3600);
    return h === 1 ? "Hace 1 hora" : `Hace ${h} horas`;
  }
  const d = Math.floor(diff / 86400);
  if (d === 1) return "Ayer";
  if (d < 7) return `Hace ${d} días`;
  const w = Math.floor(d / 7);
  return w === 1 ? "Hace 1 semana" : `Hace ${w} semanas`;
}

export function formatDateISOS(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}