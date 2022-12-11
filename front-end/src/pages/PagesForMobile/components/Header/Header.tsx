import { ReactComponent as Search } from './img/search.svg'
import { ReactComponent as Clock } from './img/clock.svg'
import { ReactComponent as Close } from './img/close.svg'
import { IProductBySearch } from './types/HeaderM.types'
import { FC, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { logoImg } from './img/img'
import cn from 'classnames'
import styles from './styles/styles.module.scss'
import HeaderMService from './services/HeaderM.service'
import { AuthorizationWindow } from './AuthorizationWindow'
import HeaderMControllers from './services/HeaderMControllers'

export const Header: FC = (): JSX.Element => {
  const [searchProduct, setSearchProduct] = useState<IProductBySearch[]>([])
  const [headerAuthorization, setHeaderAuthorization] = useState(false)
  const [openFlySearch, setOpenFlySearch] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [valueSearch, setValueSearch] = useState('')
  const refCloseFlySearch = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /// controllers ///
  const { openHeaderAuthorization, onClickFlySearch, onClickInput } = HeaderMControllers({
    inputRef,
    valueSearch,
    setOpenSearch,
    setValueSearch,
    setOpenFlySearch,
    headerAuthorization,
    setHeaderAuthorization,
  })
  /// controllers ///

  /// useEffects ///
  HeaderMService.GetSearchProduct(setSearchProduct, refCloseFlySearch, inputRef, setOpenFlySearch)
  /// useEffects ///

  /// styles ///
  const stylesHeaderContainer = cn(styles.headerContainer, {
    [styles.headerContainerActive]: openFlySearch,
  })
  /// styles ///

  return (
    <div className={stylesHeaderContainer}>
      {localStorage.getItem('login') != null ? (
        <>
          {!openSearch ? (
            <>
              <div className={styles.headerLogo}>
                <Link to={'/main'}>
                  <img src={logoImg} alt="logo" width={'80px'} />
                </Link>
              </div>
              <div className={styles.headerContacts}>
                <div>Наш телефон</div>
                <div>+7 999 888 77 66</div>
                <div>+7 999 555 66 11</div>
              </div>
              <div className={styles.headerWorkHourse}>
                <div>
                  <Clock />
                </div>
                <div>Работаем</div>
                <div>с 10:00 до 00:00</div>
              </div>
            </>
          ) : null}
          {!openSearch ? (
            <div className={styles.headerSearch}>
              <div>
                <Search
                  onClick={() => {
                    setOpenSearch(!openSearch)
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <div className={styles.headerSearchOpen}>
                <div>
                  <Search className={styles.headerImgInput} />
                  <input
                    ref={inputRef}
                    value={valueSearch}
                    onChange={(e) => setValueSearch(e.target.value)}
                    onClick={() => setOpenFlySearch(true)}
                    maxLength={17}
                    placeholder="Глобальный поиск"
                  />
                  <Close onClick={onClickInput} className={styles.headerCloseInput} />
                </div>
              </div>
              {openFlySearch ? (
                <div className={styles.flySearchContainer} ref={refCloseFlySearch}>
                  {searchProduct
                    .filter((obj) =>
                      obj.name.trim().toLowerCase().includes(valueSearch.trim().toLowerCase())
                    )
                    .map((obj) => (
                      <div
                        onClick={() => onClickFlySearch(obj)}
                        key={obj.id}
                        className={styles.searchItem}
                      >
                        <div className={styles.searchItemImg}>
                          <img src={obj.img} alt="imgSearch" />
                        </div>
                        <div className={styles.searchItemName}>{obj.name}</div>
                      </div>
                    ))}
                </div>
              ) : null}
            </>
          )}
        </>
      ) : (
        <div className={styles.notAuthorizationContainer}>
          <div className={styles.notAuthorizationText}>
            <div>Для того что бы делать заказы</div>
            <div>и оставлять отзывы,</div>
            <div>
              Вам необходимо
              <span onClick={openHeaderAuthorization}>авторизоваться</span>
            </div>
          </div>
          {headerAuthorization ? <AuthorizationWindow /> : null}
        </div>
      )}
    </div>
  )
}
