import { IISControllersProps, IProductBySearch } from '../types/types'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

const ISearchControllers = ({
  searchValue,
  setSearchOpen,
  setSearchValue,
}: IISControllersProps) => {
  const navigate = useNavigate()
  const onClickFlySearch = (obj: IProductBySearch): void => {
    setTimeout(() => {
      navigate(obj.url)
    }, 100)
  }

  const onClickClear = (): void => {
    if (searchValue === '') {
      setSearchOpen(true)
    }
    setSearchValue('')
    inputRef.current?.focus()
  }
  const refCloseFlySearch = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  return { onClickFlySearch, onClickClear, inputRef, refCloseFlySearch }
}
export default ISearchControllers
