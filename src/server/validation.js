const MAX_TEXT_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const cleanText = (value, max = MAX_TEXT_LENGTH) => String(value ?? '').trim().slice(0, max);

export const isEmail = (value) => EMAIL_PATTERN.test(value);
