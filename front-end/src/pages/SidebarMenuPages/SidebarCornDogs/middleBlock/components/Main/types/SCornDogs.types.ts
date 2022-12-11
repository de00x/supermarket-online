interface ICornDog {
  id: string
  img: string
  name: string
  info: string
  url?: string
  price: number
  count: number
}
interface CartSliceState {
  items: ICornDog[]
  totalPrice: number
}
interface SCDStylesControllersProps {
  sortFly: boolean
  errAuth: boolean
}
interface ISCDogsControllersProps {
  allCornDogs: ICornDog[]
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setErrAuth: React.Dispatch<React.SetStateAction<boolean>>
  setSortFly: React.Dispatch<React.SetStateAction<boolean>>
  setAllCornDogs: React.Dispatch<React.SetStateAction<ICornDog[]>>
}

export type { ICornDog, CartSliceState, ISCDogsControllersProps, SCDStylesControllersProps }
