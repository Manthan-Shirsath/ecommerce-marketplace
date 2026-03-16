"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import { MarketplaceProduct } from "@/lib/constants"

const CART_STORAGE_KEY = "ecommerce-cart"

type CartProduct = {
  productId: string
  quantity: number
  product: MarketplaceProduct
}

type CartContextValue = {
  cartProducts: CartProduct[]
  totalItems: number
  totalPrice: number
  addItem: (product: MarketplaceProduct) => void
  removeItem: (productId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartProduct[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY)
      if (storedCart) {
        setItems(JSON.parse(storedCart) as CartProduct[])
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY)
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) {
      return
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [isHydrated, items])

  const addItem = (product: MarketplaceProduct) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentItems, { productId: product.id, quantity: 1, product }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId)
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const value = useMemo(() => {
    const totalItems = items.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
    const totalPrice = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )

    return {
      cartProducts: items,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      clearCart,
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }

  return context
}
