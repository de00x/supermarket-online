import { ReactComponent as Search } from './img/search.svg'
import { AuthorizationWindow } from './AuthorizationWindow'
import { ReactComponent as Clock } from './img/clock.svg'
import { ReactComponent as Close } from './img/close.svg'
import { FC, useEffect, useRef, useState } from 'react'
import { IProductBySearch, PopupClick } from './types'
import { Link, useNavigate } from 'react-router-dom'
import { logoImg } from './img/img'
import cn from 'classnames'
import axios from 'axios'
import styles from './styles.module.scss'

export const Header: FC = (): JSX.Element => {
  const [searchProduct, setSearchProduct] = useState<IProductBySearch[]>([])
  const [headerAuthorization, setHeaderAuthorization] = useState(false)
  const [openFlySearch, setOpenFlySearch] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [valueSearch, setValueSearch] = useState('')
  const refCloseFlySearch = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

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
  }, [])

  /// onClick ///
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
  /// onClick ///

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
