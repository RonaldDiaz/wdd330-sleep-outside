import { getProductDiscount } from '../js/ProductDetails.mjs';
import ProductData from '../js/ProductData.mjs';

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

describe('Alert', () => {
  test('shows a compact cart confirmation message', () => {
    document.body.innerHTML = '<main></main>';

    const alert = new (require('../js/Alert').default)();
    alert.showMessage('Added to cart.', {
      background: '#2e7d32',
      color: '#fff',
    });

    const message = document.querySelector('.alert-item');
    expect(message).not.toBeNull();
    expect(message.textContent).toContain('Added to cart.');
    expect(document.querySelector('.alert-list')).not.toBeNull();
  });
});

describe('ProductData', () => {
  test('uses the backend base URL when the environment variable is missing', async () => {
    const originalFetch = global.fetch;
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ Result: [{ Id: '123' }] }),
    });

    global.fetch = mockFetch;

    try {
      const dataSource = new ProductData();
      const result = await dataSource.getData('tents');

      expect(result).toEqual([{ Id: '123' }]);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://wdd330-backend-osp8.onrender.com/products/search/tents'
      );
    } finally {
      global.fetch = originalFetch;
    }
  });
});
