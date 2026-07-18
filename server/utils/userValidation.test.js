import test from 'node:test';
import assert from 'node:assert';
import { isRegistrationDataValid } from './userValidation.js';

test('returns true when all registration fields are present', () => {
  const input = {  email: 'alice@example.com', password: 'secret' };
  assert.strictEqual(isRegistrationDataValid(input), true);
});


test('returns false when email is missing', () => {
  const input = { password: 'secret' };
  assert.strictEqual(isRegistrationDataValid(input), false);
});

test('returns false when password is missing', () => {
  const input = {  email: 'carol@example.com' };
  assert.strictEqual(isRegistrationDataValid(input), false);
});
