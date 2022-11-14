import { FC } from 'react'
import { Link } from 'react-router-dom'
import {
  middleMenu1,
  middleMenu2,
  middleMenu3,
  middleMenu4,
  middleMenu5,
} from '../img/img'
import styles from './styles.module.scss'

export const MiddleMenu: FC = () => {
  return (
    <div className={styles.middleMenuContainer}>
      <div className={styles.middleMenu1}>
        <Link to={'/wok'}>
          <img src={middleMenu1} alt="middleMenu1" />
        </Link>
      </div>
      <div className={styles.middleMenu2}>
        <Link to={'/sushi'}>
          <img
            className={styles.middleMenuImg1}
            src={middleMenu2}
            alt="middleMenu2"
          />
        </Link>
        <Link to={'/cornDogs'}>
          <img
            className={styles.middleMenuImg}
            src={middleMenu3}
            alt="middleMenu3"
          />
        </Link>
      </div>
      <div className={styles.middleMenu3}>
        <Link to={'/pizzas'}>
          <img src={middleMenu4} alt="middleMenu4" />
        </Link>
      </div>
      <div className={styles.middleMenu4}>
        <Link to={'/stocks'}>
          <img src={middleMenu5} alt="middleMenu5" />
        </Link>
      </div>
    </div>
  )
}
