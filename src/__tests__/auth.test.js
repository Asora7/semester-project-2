import { describe, it, expect } from 'vitest';
import { isValidEmail } from '../js/api/auth/login';

describe('isValidEmail()', () => {
  it('accepts stud.noroff.no', () => {
    expect(isValidEmail('anna@stud.noroff.no')).toBe(true);
  });
  it('rejects other domains', () => {
    expect(isValidEmail('user@gmail.com')).toBe(false);
  });
});
