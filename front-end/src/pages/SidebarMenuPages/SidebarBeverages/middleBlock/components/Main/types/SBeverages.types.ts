interface IBeverage {
  id: string
  img: string
  url?: string
  name: string
  info: string
  price: number
  count: number
}
interface CartSliceState {
  items: IBeverage[]
  totalPrice: number
}
interface ISBevSControllersProps {
  errAuth: boolean
  sortFly: boolean
}
interface ISBevControllersProps {
  allBeverages: IBeverage[]
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setSortFly: React.Dispatch<React.SetStateAction<boolean>>
  setErrAuth: React.Dispatch<React.SetStateAction<boolean>>
  setAllBeverages: React.Dispatch<React.SetStateAction<IBeverage[]>>
}

export type { IBeverage, CartSliceState, ISBevControllersProps, ISBevSControllersProps }
