import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider, useCart } from '@/components/cart/cart-provider'
import { MarketplaceProduct } from '@/lib/constants'

const mockProduct: MarketplaceProduct = {
  id: 'test-product-1',
  slug: 'handcrafted-mug-abc123',
  name: 'Handcrafted Mug',
  price: 24.99,
  seller: 'Earth & Co',
  city: 'Austin',
  category: 'Home Goods',
  description: 'A beautiful handcrafted mug.',
  stock: 10,
  rating: 4.5,
}

const mockProduct2: MarketplaceProduct = {
  id: 'test-product-2',
  slug: 'linen-shirt-xyz789',
  name: 'Linen Shirt',
  price: 49.99,
  seller: 'Urban Artisan',
  city: 'New York',
  category: 'Apparel',
  description: 'A breathable linen shirt.',
  stock: 5,
  rating: 4.0,
}

// Test consumer component
function TestConsumer() {
  const { cartProducts, totalItems, totalPrice, addItem, removeItem, clearCart } = useCart()
  return (
    <div>
      <div data-testid="total-items">{totalItems}</div>
      <div data-testid="total-price">{totalPrice.toFixed(2)}</div>
      <div data-testid="cart-count">{cartProducts.length}</div>
      <button onClick={() => addItem(mockProduct)}>Add Product 1</button>
      <button onClick={() => addItem(mockProduct2)}>Add Product 2</button>
      <button onClick={() => removeItem(mockProduct.id)}>Remove Product 1</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
    </div>
  )
}

function renderCart() {
  return render(
    <CartProvider>
      <TestConsumer />
    </CartProvider>
  )
}

describe('CartProvider', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('starts with an empty cart', () => {
    renderCart()
    expect(screen.getByTestId('total-items').textContent).toBe('0')
    expect(screen.getByTestId('total-price').textContent).toBe('0.00')
    expect(screen.getByTestId('cart-count').textContent).toBe('0')
  })

  it('adds an item to the cart', async () => {
    renderCart()
    await act(() => userEvent.click(screen.getByText('Add Product 1')))
    expect(screen.getByTestId('total-items').textContent).toBe('1')
    expect(screen.getByTestId('cart-count').textContent).toBe('1')
  })

  it('increments quantity when the same item is added twice', async () => {
    renderCart()
    await act(() => userEvent.click(screen.getByText('Add Product 1')))
    await act(() => userEvent.click(screen.getByText('Add Product 1')))
    expect(screen.getByTestId('total-items').textContent).toBe('2')
    // Only one unique product entry
    expect(screen.getByTestId('cart-count').textContent).toBe('1')
  })

  it('computes the correct total price', async () => {
    renderCart()
    await act(() => userEvent.click(screen.getByText('Add Product 1')))
    await act(() => userEvent.click(screen.getByText('Add Product 2')))
    const expected = (mockProduct.price + mockProduct2.price).toFixed(2)
    expect(screen.getByTestId('total-price').textContent).toBe(expected)
  })

  it('removes an item from the cart', async () => {
    renderCart()
    await act(() => userEvent.click(screen.getByText('Add Product 1')))
    await act(() => userEvent.click(screen.getByText('Add Product 2')))
    await act(() => userEvent.click(screen.getByText('Remove Product 1')))
    expect(screen.getByTestId('total-items').textContent).toBe('1')
    expect(screen.getByTestId('cart-count').textContent).toBe('1')
  })

  it('clears all cart items', async () => {
    renderCart()
    await act(() => userEvent.click(screen.getByText('Add Product 1')))
    await act(() => userEvent.click(screen.getByText('Add Product 2')))
    await act(() => userEvent.click(screen.getByText('Clear Cart')))
    expect(screen.getByTestId('total-items').textContent).toBe('0')
    expect(screen.getByTestId('cart-count').textContent).toBe('0')
  })

  it('persists cart to localStorage after adding a product', async () => {
    renderCart()
    await act(() => userEvent.click(screen.getByText('Add Product 1')))
    const stored = window.localStorage.getItem('ecommerce-cart')
    expect(stored).not.toBeNull()
    const parsed = JSON.parse(stored!)
    expect(parsed).toHaveLength(1)
    expect(parsed[0].productId).toBe(mockProduct.id)
    expect(parsed[0].quantity).toBe(1)
  })
})
