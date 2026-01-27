export const successResponse = (
  message: string,
  data: any = null,
) => ({
  success: true,
  message,
  data,
});

export const parseTemplate = (
  template: string,
  data: Record<string, any>,
): string => {
  let html = template;

  Object.keys(data).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, String(data[key]));
  });

  return html;
};
export const formatDateTime = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};