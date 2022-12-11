import axios from 'axios'
import { useEffect } from 'react'
import { IProductBySearch, PopupClick } from '../types/types'

const ISearchService = {
  GetSearchProduct(setSearchProduct: React.Dispatch<React.SetStateAction<IProductBySearch[]>>) {
    useEffect(() => {
      axios
        .get('/search-product')
        .then((res) => setSearchProduct(res.data))
        .catch((err) => console.log('err', err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  },
  GetClickOutsideInput(
    refCloseFlySearch: React.RefObject<HTMLDivElement>,
    inputRef: React.RefObject<HTMLInputElement>,
    setFlySearch: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent): void => {
        const _event = event as PopupClick
        if (refCloseFlySearch.current != null && !_event.path.includes(refCloseFlySearch.current)) {
          if (inputRef.current != null && !_event.path.includes(inputRef.current)) {
            setFlySearch(false)
          }
        }
      }
      document.body.addEventListener('click', handleClickOutside)
      return () => document.body.removeEventListener('click', handleClickOutside)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  },
}
export default ISearchService
