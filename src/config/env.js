// Server-only environment, validated when first imported. Never import this from a client component.
const read = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
};

export const env = Object.freeze({
  SUPABASE_URL: read('SUPABASE_URL'),
  SUPABASE_PUBLISHABLE_KEY: read('SUPABASE_PUBLISHABLE_KEY'),
});
