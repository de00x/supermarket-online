import { ReactComponent as SearchInput } from '../img/searchInput.svg'
import { IProductBySearch, IInputProps, PopupClick } from './types'
import { ReactComponent as CloseInput } from '../img/close.svg'
import { useEffect, FC, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import cn from 'classnames'
import axios from 'axios'

export const InputSearch: FC<IInputProps> = ({ setSearchOpen }) => {
  const [searchProduct, setSearchProduct] = useState<IProductBySearch[]>([])
  const refCloseFlySearch = useRef<HTMLDivElement>(null)
  const [searchValue, setSearchValue] = useState('')
  const [flySearch, setFlySearch] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('/search-product')
      .then((res) => setSearchProduct(res.data))
      .catch((err) => console.log('err', err))
  }, [])
  //
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
  }, [])
  //

  /// onCLick ///
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
  /// onCLick ///

  /// styles ///
  const stylesInputForm = cn(styles.inputForm, {
    [styles.inputFormActive]: flySearch,
  })
  /// styles ///

  return (
    <>
      <form className={styles.containerForm}>
        <SearchInput className={styles.searchInput} />
        <CloseInput onClick={onClickClear} className={styles.closeInput} />
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClick={() => setFlySearch(true)}
          className={stylesInputForm}
          placeholder="Глобальный поиск"
          ref={inputRef}
        ></input>
        {flySearch && (
          <div ref={refCloseFlySearch} className={styles.activeFlySearchContainer}>
            <div className={styles.activeFlySearch}>
              {searchProduct
                .filter((obj) =>
                  obj.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase())
                )
                .map((obj) => (
                  <div
                    onClick={() => onClickFlySearch(obj)}
                    key={obj.id}
                    className={styles.flySearch}
                  >
                    <div className={styles.flySearchImg}>
                      <img src={obj.img} alt="imgSearch" />
                    </div>
                    <div className={styles.flySearchName}>{obj.name}</div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </form>
    </>
  )
}
