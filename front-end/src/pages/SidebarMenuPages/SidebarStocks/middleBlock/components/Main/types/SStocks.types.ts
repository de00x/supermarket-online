interface IStocks {
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
  items: IStocks[]
}
interface ISSStylesControllersProps {
  sortFly: boolean
  errAuth: boolean
}
interface ISSControllersProps {
  allStocks: IStocks[]
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setSortFly: React.Dispatch<React.SetStateAction<boolean>>
  setErrAuth: React.Dispatch<React.SetStateAction<boolean>>
  setAllStocks: React.Dispatch<React.SetStateAction<IStocks[]>>
}

export type { IStocks, CartSliceState, ISSControllersProps, ISSStylesControllersProps }
