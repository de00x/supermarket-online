export interface IProductBySearch {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
  types: [number]
  sizes: [number]
  url: string
}
export interface IAuthorizationData {
  login: string
  password: string
}

export type PopupClick = MouseEvent & {
  path: Node[]
}
