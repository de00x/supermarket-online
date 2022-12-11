interface IWok {
  id: string
  img: string
  name: string
  info: string
  url?: string
  price: number
  count: number
}
interface CartSliceState {
  items: IWok[]
  totalPrice: number
}
interface ISWokStylesControllersProps {
  sortFly: boolean
  errAuth: boolean
}

interface ISWokControllersProps {
  allWoks: IWok[]
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setAllWok: React.Dispatch<React.SetStateAction<IWok[]>>
  setErrAuth: React.Dispatch<React.SetStateAction<boolean>>
  setSortFly: React.Dispatch<React.SetStateAction<boolean>>
}
export type { IWok, CartSliceState, ISWokControllersProps, ISWokStylesControllersProps }
