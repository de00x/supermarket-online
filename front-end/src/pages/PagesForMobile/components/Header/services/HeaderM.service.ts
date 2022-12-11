import { IProductBySearch, PopupClick } from '../types/HeaderM.types'
import { useEffect } from 'react'
import axios from 'axios'

const HeaderMService = {
  GetSearchProduct(
    setSearchProduct: React.Dispatch<React.SetStateAction<IProductBySearch[]>>,
    refCloseFlySearch: React.RefObject<HTMLDivElement>,
    inputRef: React.RefObject<HTMLInputElement>,
    setOpenFlySearch: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    useEffect(() => {
      axios
        .get('/search-product')
        .then((res) => setSearchProduct(res.data))
        .catch((err) => console.log('err', err))
      const handleClickOutside = (event: MouseEvent): void => {
        const _event = event as PopupClick
        if (refCloseFlySearch.current != null && !_event.path.includes(refCloseFlySearch.current)) {
          if (inputRef.current != null && !_event.path.includes(inputRef.current)) {
            setOpenFlySearch(false)
          }
        }
      }
      document.body.addEventListener('click', handleClickOutside)
      return () => document.body.removeEventListener('click', handleClickOutside)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  },
}
export default HeaderMService
