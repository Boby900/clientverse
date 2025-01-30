import { PolarEmbedCheckout } from '@polar-sh/checkout/embed'
import { useEffect } from 'react'

export const Pricing = () => {
  useEffect(() => {
    PolarEmbedCheckout.init()
  }, [])

  return (
    <a
      href="https://buy.polar.sh/polar_cl_dS7mshCAlVdCcNzS6G5cDgPftDqSwFkUxkZKT25oLl3"
      data-polar-checkout
      data-polar-checkout-theme="light"
    >
      Pricing
    </a>
  )
}

