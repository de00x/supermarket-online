import { IHeaderMControllersProps, IProductBySearch } from '../types/HeaderM.types'
import { useNavigate } from 'react-router-dom'

const HeaderMControllers = ({
  inputRef,
  valueSearch,
  setOpenSearch,
  setValueSearch,
  setOpenFlySearch,
  headerAuthorization,
  setHeaderAuthorization,
}: IHeaderMControllersProps) => {
  const navigate = useNavigate()
  const openHeaderAuthorization = (): void => {
    setHeaderAuthorization(!headerAuthorization)
  }
  const onClickFlySearch = (obj: IProductBySearch): void => {
    setTimeout(() => {
      navigate(obj.url)
    }, 100)
  }
  const onClickInput = (): void => {
    if (valueSearch.length === 0) {
      setOpenSearch(false)
      setOpenFlySearch(false)
    }
    setValueSearch('')
    inputRef.current?.focus()
  }
  return { openHeaderAuthorization, onClickFlySearch, onClickInput }
}
export default HeaderMControllers
