interface IWok {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
  url?: string
}
interface ISWokMControllersProps {
  allWok: IWok[]
  setAllWok: React.Dispatch<React.SetStateAction<IWok[]>>
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setSortFly: React.Dispatch<React.SetStateAction<boolean>>
  setErrNotAuth: React.Dispatch<React.SetStateAction<boolean>>
}
export type { IWok, ISWokMControllersProps }
