interface IBeverages {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
  url?: string
}
interface ISBevMSControllersProps {
  sortBy: string
}

interface ISBevMControllersProps {
  allBeverages: IBeverages[]
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setSortFly: React.Dispatch<React.SetStateAction<boolean>>
  setErrNotAuth: React.Dispatch<React.SetStateAction<boolean>>
  setAllBeverages: React.Dispatch<React.SetStateAction<IBeverages[]>>
}
export type { IBeverages, ISBevMControllersProps, ISBevMSControllersProps }
