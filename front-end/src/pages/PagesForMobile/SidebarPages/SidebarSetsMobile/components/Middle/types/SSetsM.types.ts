interface ISets {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
  url?: string
}
interface ISSetsMControllersProps {
  allSets: ISets[]
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setSortFly: React.Dispatch<React.SetStateAction<boolean>>
  setAllSets: React.Dispatch<React.SetStateAction<ISets[]>>
  setErrNotAuth: React.Dispatch<React.SetStateAction<boolean>>
}
export type { ISets, ISSetsMControllersProps }
