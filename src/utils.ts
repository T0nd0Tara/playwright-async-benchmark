
export function random_string({
  length = 10,
  uppercase = true,
  lowercase = true,
  digits = true,
}: {
  length?: number,
  uppercase?: boolean,
  lowercase?: boolean,
  digits?: boolean,
}) {
  let result = '';
  let characters = ''
  if (uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (lowercase) characters += 'abcdefghijklmnopqrstuvwxyz'
  if (digits) characters += '0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
