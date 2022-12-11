interface IStocks {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
  url?: string
}
interface ISStocksMControllersProps {
  allStocks: IStocks[]
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setSortFly: React.Dispatch<React.SetStateAction<boolean>>
  setErrNotAuth: React.Dispatch<React.SetStateAction<boolean>>
  setAllStocks: React.Dispatch<React.SetStateAction<IStocks[]>>
}
export type { IStocks, ISStocksMControllersProps }
