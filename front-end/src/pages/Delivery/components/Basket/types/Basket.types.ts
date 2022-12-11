// eslint-disable-next-line import/named
import { AnyAction } from '@reduxjs/toolkit'
import { Dispatch } from 'react'

interface BasketItemsProps {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
}
interface IBControllersProps {
  count: number
  dispatch: Dispatch<AnyAction>
}

export type { BasketItemsProps, IBControllersProps }
