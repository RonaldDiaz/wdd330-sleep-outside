import { jest } from '@jest/globals';
import { getProductDiscount } from '../js/ProductDetails.mjs';
import ProductData from '../js/ProductData.mjs';
import ProductList from '../js/ProductList.mjs';
import Alert from '../js/Alert.js';

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

describe('ProductList sorting', () => {
  test('sorts products by name and price', () => {
    const list = new ProductList('tents', null, document.createElement('ul'));
    const products = [
      { NameWithoutBrand: 'Zebra Tent', FinalPrice: 220 },
      { NameWithoutBrand: 'Alpha Tent', FinalPrice: 120 },
      { NameWithoutBrand: 'Beta Tent', FinalPrice: 180 },
    ];

    expect(list.sortProducts(products, 'name').map((product) => product.NameWithoutBrand)).toEqual([
      'Alpha Tent',
      'Beta Tent',
      'Zebra Tent',
    ]);
    expect(list.sortProducts(products, 'price').map((product) => product.FinalPrice)).toEqual([
      120,
      180,
      220,
    ]);
  });

  test('searches products using the API query string', async () => {
    const originalFetch = global.fetch;
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ Result: [{ Id: '456', NameWithoutBrand: 'Search Tent' }] }),
    });

    global.fetch = mockFetch;

    try {
      const dataSource = new ProductData();
      const result = await dataSource.searchProducts('tent');

      expect(result).toEqual([{ Id: '456', NameWithoutBrand: 'Search Tent' }]);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://wdd330-backend-osp8.onrender.com/products/search/tent'
      );
    } finally {
      global.fetch = originalFetch;
    }
  });
});

describe('Alert', () => {
  test('shows a compact cart confirmation message', () => {
    document.body.innerHTML = '<main></main>';

    const alert = new Alert();
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
