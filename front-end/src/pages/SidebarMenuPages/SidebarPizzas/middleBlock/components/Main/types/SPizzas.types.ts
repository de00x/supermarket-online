interface IPizzas {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
  types?: number[]
  sizes?: number[]
}
interface CartSliceState {
  items: IPizzas[]
  totalPrice: number
}
interface ISPizzasSSControllersProps {
  sortFly: boolean
  errAuth: boolean
}
interface ISPizzasControllersProps {
  setErrAuth: React.Dispatch<React.SetStateAction<boolean>>
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setSortFly: React.Dispatch<React.SetStateAction<boolean>>
  setAllPizzas: React.Dispatch<React.SetStateAction<IPizzas[]>>
  allPizzas: IPizzas[]
}
export type { IPizzas, CartSliceState, ISPizzasControllersProps, ISPizzasSSControllersProps }
