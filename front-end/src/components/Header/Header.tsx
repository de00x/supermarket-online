import { InputSearch } from '../../pages/Main/middleBlock/components/InputSearch'
import { ReactComponent as Account } from './img/personalAccount.svg'
import { ReactComponent as SuccessBtn } from './img/successBtn.svg'
import { ReactComponent as Logout } from './img/accountLogout.svg'
import { ReactComponent as CancelBtn } from './img/cancelBtn.svg'
import { ReactComponent as Clock } from './img/wallClock.svg'
import { ReactComponent as Search } from './img/search.svg'
import { selectCart } from '../../redux/slices/selectors'
import { ReactComponent as Cart } from './img/cart.svg'
import { useAppSelector } from '../../hooks/hooks'
import { Link } from 'react-router-dom'
import { FC, useState } from 'react'
import styles from './styles/styles.module.scss'
import HeaderControllers from './services/HeaderControllers'

export const Header: FC = () => {
  const [personalAccountExit, setPersonalAccountExit] = useState(false)
  const { items, totalPrice } = useAppSelector(selectCart)
  const [searchOpen, setSearchOpen] = useState(true)
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )

  /// functions ///
  const { successExitOnAccount } = HeaderControllers()
  /// functions ///

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.contacts}>
          <h3>Наш телефон</h3>
          <div className={styles.tel}>+999 999 88 77</div>
          <div className={styles.tel}>+999 888 55 44</div>
          <div className={styles.workHours}>
            <Clock />
            работаем с 10:00 до 00:00
          </div>
        </div>
        <div className={styles.headerRightBlockContainer}>
          <div className={styles.headerRightBlock}>
            <div className={styles.RightBlockCitysHeaderContainer}>
              Город: <div>Compton</div>
            </div>
            <div className={styles.RightBlockReviewsHeaderContainer}>
              <Link to={'/reviews'}>
                <div>Отзывы</div>
              </Link>
              <Link to={'/delivery'}>
                <div>Доставка и оплата</div>
              </Link>
            </div>
          </div>
          <div className={styles.headerRightBlockSearchContainer}>
            {searchOpen ? (
              <>
                <>
                  {localStorage.getItem('login') !== null ? (
                    <>
                      <div className={styles.cartWrapper}>
                        <Link to={'/basket'}>
                          <div className={styles.cartContainer}>
                            <div className={styles.cartAllPrice}>{totalPrice} ₽</div>
                            <div className={styles.cartAllProduct}>
                              <Cart />
                              {totalCount}
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className={styles.personalAreaContainer}>
                        {!personalAccountExit ? (
                          <>
                            <Link className={styles.personalAccount} to={'/personal'}>
                              <Account />
                            </Link>
                            <div className={styles.accountLogout}>
                              <Logout onClick={() => setPersonalAccountExit(true)} />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className={styles.personalAccount}>
                              <SuccessBtn onClick={() => successExitOnAccount()} />
                            </div>
                            <div className={styles.accountLogout}>
                              <CancelBtn onClick={() => setPersonalAccountExit(false)} />
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  ) : null}
                </>
                <div className={styles.searchTrue}>
                  <Search onClick={() => setSearchOpen(false)} />
                </div>
              </>
            ) : (
              <div className={styles.searchFalse}>
                <InputSearch setSearchOpen={setSearchOpen} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.rightMenu}>
          {/* {searchOpen && (
          )}
          {!searchOpen && <InputSearch setSearchOpen={setSearchOpen} />}
          {searchOpen && (
            <div className={styles.search}>
              <Search onClick={() => setSearchOpen(false)} />
            </div>
          )} */}
        </div>
      </div>
    </>
  )
}
