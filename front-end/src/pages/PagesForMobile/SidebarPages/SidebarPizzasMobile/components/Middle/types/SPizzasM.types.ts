interface IPizzas {
  id: string
  img: string
  name: string
  url?: string
  price: number
  count: number
  info: string
  types?: number[]
  sizes?: number[]
}
interface ISPStyleControllersProps {
  sortBy: string
}
interface ISPMControllersProps {
  allPizzas: IPizzas[]
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setSortFly: React.Dispatch<React.SetStateAction<boolean>>
  setErrNotAuth: React.Dispatch<React.SetStateAction<boolean>>
  setAllPizzas: React.Dispatch<React.SetStateAction<IPizzas[]>>
}
export type { IPizzas, ISPStyleControllersProps, ISPMControllersProps }
