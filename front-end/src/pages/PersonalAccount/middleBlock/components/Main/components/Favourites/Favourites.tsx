import { ReactComponent as HeartIcon } from '../../img/heartIcon.svg'
import { Link } from 'react-router-dom'
import { FC } from 'react'
import styles from '../../styles/styles.module.scss'

export const Favourites: FC = () => {
  return (
    <div className={styles.favouritesInfoContainer}>
      <div className={styles.favouritesInfo}>
        <HeartIcon /> Избранное
      </div>
      <div className={styles.favouritesText}>У вас в избранном 0 товаров</div>
      <Link to={'/main'}>
        <div className={styles.changeFavourites}>Изменить</div>
      </Link>
    </div>
  )
}
