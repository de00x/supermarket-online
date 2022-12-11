import { ReactComponent as SearchInput } from '../img/searchInput.svg'
import { ReactComponent as CloseInput } from '../img/close.svg'
import { IProductBySearch, IInputProps } from './types/types'
import { FC, useState } from 'react'
import styles from './styles/styles.module.scss'
import ISearchService from './services/ISearch.service'
import ISearchControllers from './services/ISearchControllers'
import ISStylesControllers from './styles/ISStylesControllers'
import { InputSearchValue } from './inputs/InputSearchValue'

export const InputSearch: FC<IInputProps> = ({ setSearchOpen }) => {
  const [searchProduct, setSearchProduct] = useState<IProductBySearch[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [flySearch, setFlySearch] = useState(false)

  /// functions ///
  const { onClickFlySearch, onClickClear, inputRef, refCloseFlySearch } = ISearchControllers({
    searchValue,
    setSearchOpen,
    setSearchValue,
  })
  /// functions ///

  ///  useEffects ///
  ISearchService.GetSearchProduct(setSearchProduct)
  ISearchService.GetClickOutsideInput(refCloseFlySearch, inputRef, setFlySearch)
  ///  useEffects ///

  /// styles ///
  const { stylesInputForm } = ISStylesControllers(flySearch)
  /// styles ///

  return (
    <>
      <form className={styles.containerForm}>
        <SearchInput className={styles.searchInput} />
        <CloseInput onClick={onClickClear} className={styles.closeInput} />
        <InputSearchValue
          inputRef={inputRef}
          searchValue={searchValue}
          setFlySearch={setFlySearch}
          setSearchValue={setSearchValue}
          stylesInputForm={stylesInputForm}
        />
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
