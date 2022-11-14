export interface ISushi {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
  url?: string
}

export interface CartSliceState {
  totalPrice: number
  items: ISushi[]
}
