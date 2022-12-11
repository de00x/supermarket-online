interface ISushi {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
  url?: string
}
interface CartSliceState {
  totalPrice: number
  items: ISushi[]
}
interface ISSStylesControllersProps {
  sortFly: boolean
  errAuth: boolean
}
interface ISSushiControllersProps {
  allSushi: ISushi[]
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setSortFly: React.Dispatch<React.SetStateAction<boolean>>
  setErrAuth: React.Dispatch<React.SetStateAction<boolean>>
  setAllSushi: React.Dispatch<React.SetStateAction<ISushi[]>>
}
export type { ISushi, CartSliceState, ISSushiControllersProps, ISSStylesControllersProps }
