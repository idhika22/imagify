export function isRegistrationDataValid(data) {
  return Boolean( data?.email && data?.password);
}
