import { describe, it, expect } from 'vitest';
import { canPlaceBid } from '../js/api/listings/bid';

describe('canPlaceBid()', () => {
  it('rejects bid larger than balance', () => {
    expect(canPlaceBid(2000, 1000)).toBe(false);
  });
  it('accepts bid within balance', () => {
    expect(canPlaceBid(500, 1000)).toBe(true);
  });
});
