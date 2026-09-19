import { getProductDiscount } from '../js/ProductDetails.mjs';

describe('getProductDiscount', () => {
  test('returns discount details when a product is discounted', () => {
    const result = getProductDiscount({
      FinalPrice: 129.99,
      SuggestedRetailPrice: 199.99,
    });

    expect(result.isDiscounted).toBe(true);
    expect(result.discountAmount).toBe(70);
    expect(result.discountPercentage).toBe(35);
  });

  test('returns no discount when final price is not lower', () => {
    const result = getProductDiscount({
      FinalPrice: 199.99,
      SuggestedRetailPrice: 199.99,
    });

    expect(result.isDiscounted).toBe(false);
    expect(result.discountAmount).toBe(0);
    expect(result.discountPercentage).toBe(0);
  });
});
