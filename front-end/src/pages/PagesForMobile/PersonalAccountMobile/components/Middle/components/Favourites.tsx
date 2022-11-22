import { ReactComponent as FavouritesIcon } from '../img/heartIcon.svg'
import { Link } from 'react-router-dom'
import { FC } from 'react'
import styles from '../styles.module.scss'

export const Favourites: FC = (): JSX.Element => {
  return (
    <div className={styles.favouritesInfoContainer}>
      <div className={styles.favouritesInfoHeader}>
        <FavouritesIcon /> Избранное
      </div>
      <div className={styles.favouritesInfoText}>У вас в избранном 0 товаров</div>
      <Link to={'/main'}>
        <div className={styles.favouritesInfoBtn}>Изменить</div>
      </Link>
    </div>
  )
}
