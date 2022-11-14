import { FC, useEffect } from 'react'
import {
  middleItem1,
  middleItem10,
  middleItem11,
  middleItem12,
  middleItem13,
  middleItem2,
  middleItem3,
  middleItem4,
  middleItem5,
  middleItem6,
  middleItem7,
  middleItem8,
  middleItem9,
} from './img/img'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

export const Middle: FC = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className={styles.middleContainer}>
      <div className={styles.middleItemContainer1}>
        <Link to={'/pizzas'}>
          <img src={middleItem1} alt="item1" />
        </Link>
        <Link to={'/sets'}>
          <img src={middleItem2} alt="item2" />
        </Link>
        <Link to={'/wok'}>
          <img src={middleItem3} alt="item3" />
        </Link>
      </div>
      {/* if max-width < 530px  */}
      <div className={styles.middleItemContainerLittle1}>
        <Link to={'/pizzas'}>
          <img src={middleItem1} alt="item1" />
        </Link>
        <Link to={'/sets'}>
          <img src={middleItem2} alt="item2" />
        </Link>
      </div>
      <div className={styles.middleItemContainerLittle2}>
        <Link to={'/wok'}>
          <img src={middleItem3} alt="item3" />
        </Link>
        <Link to={'/rolls'}>
          <img src={middleItem4} alt="item4" />
        </Link>
      </div>
      <div className={styles.middleItemContainerLittle3}>
        <Link to={'/sushi'}>
          <img src={middleItem5} alt="item5" />
        </Link>
        <Link to={'/beverages'}>
          <img src={middleItem8} alt="item6" />
        </Link>
      </div>
      {/* if max-width < 530px  */}
      <div className={styles.middleItemContainer2}>
        <Link to={'/rolls'}>
          <img src={middleItem4} alt="item4" />
        </Link>
        <Link to={'/sushi'}>
          <img src={middleItem5} alt="item5" />
        </Link>
        <Link to={'/beverages'}>
          <img src={middleItem8} alt="item6" />
        </Link>
      </div>
      <div className={styles.middleItemContainer6}>
        <Link to={'/cornDogs'}>
          <img src={middleItem12} alt="item12" />
        </Link>
      </div>
      <div className={styles.middleItemContainer3}>
        <div className={styles.soon1}>СКОРО</div>
        <div className={styles.soon2}>СКОРО</div>
        <img src={middleItem7} alt="item7" />
        <img src={middleItem6} alt="item8" />
      </div>
      <div className={styles.middleItemContainer4}>
        <Link to={'/sets'}>
          <img src={middleItem9} alt="item9" />
        </Link>
      </div>
      <div className={styles.middleItemContainer5}>
        <Link to={'/sushi'}>
          <img src={middleItem10} alt="item10" />
        </Link>
        <Link to={'/cornDogs'}>
          <img src={middleItem11} alt="item11" />
        </Link>
      </div>
      <div className={styles.middleItemContainer7}>
        <Link to={'/stocks'}>
          <img src={middleItem13} alt="item12" />
        </Link>
      </div>
    </div>
  )
}
