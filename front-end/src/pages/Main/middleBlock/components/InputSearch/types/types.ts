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
interface IInputProps {
  setSearchOpen: Function
}
interface IInputSearchVProps {
  searchValue: string
  stylesInputForm: string
  inputRef: React.RefObject<HTMLInputElement>
  setFlySearch: React.Dispatch<React.SetStateAction<boolean>>
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}
interface IISControllersProps {
  searchValue: string
  setSearchOpen: Function
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

export type { IProductBySearch, PopupClick, IInputProps, IISControllersProps, IInputSearchVProps }
