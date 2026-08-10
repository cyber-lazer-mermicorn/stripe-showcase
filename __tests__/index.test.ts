import { createCheckoutSession } from '../lib/stripe';

describe('createCheckoutSession', () => {
  it('should be defined', () => {
    expect(createCheckoutSession).toBeDefined();
  });

  it('should be a function', () => {
    expect(typeof createCheckoutSession).toBe('function');
  });
});
