interface CartSliceState {
  totalPrice: number
  items: ISets[]
}
interface ISets {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
  url?: string
}
interface ISRStylesControllersProps {
  sortFly: boolean
  errAuth: boolean
}
interface ISRollsControllersProps {
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setErrAuth: React.Dispatch<React.SetStateAction<boolean>>
  setSortFly: React.Dispatch<React.SetStateAction<boolean>>
  setAllRolls: React.Dispatch<React.SetStateAction<ISets[]>>
  allRolls: ISets[]
}
export type { CartSliceState, ISets, ISRollsControllersProps, ISRStylesControllersProps }
