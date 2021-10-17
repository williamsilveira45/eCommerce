export const TAB_HEIGHT_DEVICE_NOTCH = 65;
export const TAB_HEIGHT = 60;

export function randomName() {
  return Math.random().toString(36).substring(7);
}

export function validEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function currencyFormat(value) {
  return 'R$ ' + fixedValue(value).toString().replace('.', ',');
}
export function fixedValue(value) {
  if (value) {
    value = parseFloat(value);
    return value.toFixed(2);
  }

  return '0.00';
}
