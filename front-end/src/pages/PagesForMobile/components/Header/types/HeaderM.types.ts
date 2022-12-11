interface IProductBySearch {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
  types: [number]
  sizes: [number]
  url: string
}
type PopupClick = MouseEvent & {
  path: Node[]
}
interface IHeaderMControllersProps {
  valueSearch: string
  headerAuthorization: boolean
  inputRef: React.RefObject<HTMLInputElement>
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>
  setValueSearch: React.Dispatch<React.SetStateAction<string>>
  setOpenFlySearch: React.Dispatch<React.SetStateAction<boolean>>
  setHeaderAuthorization: React.Dispatch<React.SetStateAction<boolean>>
}
export type { IProductBySearch, PopupClick, IHeaderMControllersProps }
