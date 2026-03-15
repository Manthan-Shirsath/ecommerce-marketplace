"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import { featuredProducts } from "@/lib/data"

const CART_STORAGE_KEY = "ecommerce-cart"

type CartItem = {
  productId: string
  quantity: number
}

type CartProduct = {
  productId: string
  quantity: number
  product: (typeof featuredProducts)[number]
}

type CartContextValue = {
  items: CartItem[]
  cartProducts: CartProduct[]
  totalItems: number
  totalPrice: number
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY)
      if (storedCart) {
        setItems(JSON.parse(storedCart) as CartItem[])
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

  const addItem = (productId: string) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === productId)

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentItems, { productId, quantity: 1 }]
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
    const cartProducts = items.flatMap((item) => {
      const product = featuredProducts.find(
        (candidate) => candidate.id === item.productId
      )

      return product ? [{ productId: item.productId, quantity: item.quantity, product }] : []
    })

    const totalItems = cartProducts.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
    const totalPrice = cartProducts.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )

    return {
      items,
      cartProducts,
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
