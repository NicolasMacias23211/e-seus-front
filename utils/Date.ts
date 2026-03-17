export function parseBackendDate(dateStr: string): string {
  // 1. Separar fecha y hora
  const [datePart, timePart] = dateStr.split('T');
  // 2. Limpiar la hora (quitar milisegundos y Z)
  const time = (timePart ?? '').split('.')[0]?.replace('Z', '') ?? '';

  return `${datePart} ${time}`;
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