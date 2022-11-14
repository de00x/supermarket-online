export interface CartSliceState {
  totalPrice: number
  items: ISets[]
}
export interface ISets {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
  url?: string
}
