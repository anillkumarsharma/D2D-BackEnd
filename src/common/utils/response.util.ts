import CryptoJS from "crypto-js";


const secretKey = "12345"

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

export function generateRandomCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";

  const randomLetters = Array.from({ length: 3 }, () =>
    letters.charAt(Math.floor(Math.random() * letters.length))
  ).join("");

  const randomDigits = Array.from({ length: 3 }, () =>
    digits.charAt(Math.floor(Math.random() * digits.length))
  ).join("");

  return randomLetters + randomDigits;
}

export function encryptValue(value) {
  return CryptoJS.AES.encrypt(value, secretKey).toString();
}
export const generateHash=(input)=> {
  return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
}

export function decryptValue(value) {
  const bytes = CryptoJS.AES.decrypt(value, secretKey);
  const plainText = bytes.toString(CryptoJS.enc.Utf8);
  return plainText;
}