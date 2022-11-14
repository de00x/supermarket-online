import { DeliveryMobile } from '../PagesForMobile/DeliveryMobile'
import { Main } from './components/Main/Main'
import { Basket } from './components/Basket'
import { FC } from 'react'
import styles from './styles.module.scss'

export const Delivery: FC = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.mainContainer}>
          <Main />
        </div>
        <div className={styles.basketContainer}>
          <Basket />
        </div>
      </div>
      <div className={styles.containerMobile}>
        <DeliveryMobile />
      </div>
    </>
  )
}
