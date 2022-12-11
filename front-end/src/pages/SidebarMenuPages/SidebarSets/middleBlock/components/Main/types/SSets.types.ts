interface ISets {
  id: string
  img: string
  name: string
  url?: string
  info: string
  price: number
  count: number
}
interface CartSliceState {
  items: ISets[]
  totalPrice: number
}
interface ISSStylesControllersProps {
  sortFly: boolean
  errAuth: boolean
}
interface ISSetsControllersProps {
  allSets: ISets[]
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setErrAuth: React.Dispatch<React.SetStateAction<boolean>>
  setSortFly: React.Dispatch<React.SetStateAction<boolean>>
  setAllSets: React.Dispatch<React.SetStateAction<ISets[]>>
}
export type { ISets, CartSliceState, ISSetsControllersProps, ISSStylesControllersProps }
