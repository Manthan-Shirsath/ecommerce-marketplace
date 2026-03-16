import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Automatically cleanup DOM after each test
afterEach(() => {
  cleanup()
})

// Mock useRouter and generic Next.js hooks if any tests use them
vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation')
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  }
})
