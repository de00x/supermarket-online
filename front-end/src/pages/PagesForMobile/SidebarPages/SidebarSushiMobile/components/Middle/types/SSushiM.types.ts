interface ISushi {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
  url?: string
}
interface ISSushiMControllersProps {
  allSushi: ISushi[]
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setSortFly: React.Dispatch<React.SetStateAction<boolean>>
  setAllSushi: React.Dispatch<React.SetStateAction<ISushi[]>>
  setErrNotAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export type { ISushi, ISSushiMControllersProps }
