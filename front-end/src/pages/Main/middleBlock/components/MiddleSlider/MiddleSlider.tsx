import { ReactComponent as Arrow } from '../img/arrowLeft.svg'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  middleSlider1,
  middleSlider2,
  middleSlider3,
  middleSlider4,
  middleSlider5,
  middleSlider6,
  middleSlider7,
  middleSlider8,
} from '../img/img'
import styles from './styles.module.scss'

export const MiddleSlider: FC = () => {
  const [initialState, setInitialState] = useState(false)

  useEffect(() => {
    localStorage.setItem('location', 'main')
  }, [])

  return (
    <>
      <div className={styles.middleSlider}>
        <div className={styles.header}>Новинки</div>
        {!initialState && (
          <>
            <div className={styles.slider}>
              <div className={styles.item1}>
                <img
                  src={middleSlider1}
                  alt="middleSlider1"
                  width={'222px'}
                  height={'178px'}
                />
                <div className={styles.setName}>Саломон сет</div>
                <div className={styles.setInfo}>1050 грамм, 30 кусочков</div>
                <div className={styles.vector}></div>
                <span className={styles.setPrice}>1500 ₽</span>
                <span className={styles.clickBuy}>
                  <Link to={'/sets'}>Хочу!</Link>
                </span>
              </div>
              <div className={styles.item2}>
                <img
                  src={middleSlider2}
                  alt="middleSlider2"
                  width={'222px'}
                  height={'178px'}
                />
                <div className={styles.setName}>Филадельфия и лосось сет</div>
                <div className={styles.setInfo}>1260 грамм, 36 кусочков</div>
                <div className={styles.vector}></div>
                <span className={styles.setPrice}>1150 ₽</span>
                <span className={styles.clickBuy}>
                  <Link to={'/sets'}>Хочу!</Link>
                </span>
              </div>
              <div className={styles.item3}>
                <img
                  src={middleSlider3}
                  alt="middleSlider3"
                  width={'222px'}
                  height={'178px'}
                />
                <div className={styles.setName}>Самая большая филадельфия</div>
                <div className={styles.setInfo}>2050 грамм, 45 кусочков</div>
                <div className={styles.vector}></div>
                <span className={styles.setPrice}>2100 ₽</span>
                <span className={styles.clickBuy}>
                  <Link to={'/sets'}>Хочу!</Link>
                </span>
              </div>
              <div className={styles.item4}>
                <img
                  src={middleSlider4}
                  alt="middleSlider4"
                  width={'222px'}
                  height={'178px'}
                />
                <div className={styles.setName}>Саммер хит сет</div>
                <div className={styles.setInfo}>750 грамм, 28 кусочков</div>
                <div className={styles.vector}></div>
                <span className={styles.setPrice}>1500 ₽</span>
                <span className={styles.clickBuy}>
                  <Link to={'/sets'}>Хочу!</Link>
                </span>
              </div>
            </div>
          </>
        )}
        {initialState && (
          <>
            <div className={styles.slider}>
              <div className={styles.item1}>
                <img
                  src={middleSlider5}
                  alt="middleSlider5"
                  width={'222px'}
                  height={'178px'}
                />
                <div className={styles.setName}>Нагасаки сет</div>
                <div className={styles.setInfo}>1140 грамм, 40 кусочков</div>
                <div className={styles.vector}></div>
                <span className={styles.setPrice}>1390 ₽</span>
                <span className={styles.clickBuy}>
                  <Link to={'/sets'}>Хочу!</Link>
                </span>
              </div>
              <div className={styles.item2}>
                <img
                  src={middleSlider6}
                  alt="middleSlider6"
                  width={'222px'}
                  height={'178px'}
                />
                <div className={styles.setName}>Сакура сет</div>
                <div className={styles.setInfo}>1035 грамм, 41 кусочков</div>
                <div className={styles.vector}></div>
                <span className={styles.setPrice}>1190 ₽</span>
                <span className={styles.clickBuy}>
                  <Link to={'/sets'}>Хочу!</Link>
                </span>
              </div>
              <div className={styles.item3}>
                <img
                  src={middleSlider7}
                  alt="middleSlider7"
                  width={'222px'}
                  height={'178px'}
                />
                <div className={styles.setName}>Такеши сет</div>
                <div className={styles.setInfo}>400 грамм, 20 кусочков</div>
                <div className={styles.vector}></div>
                <span className={styles.setPrice}>740 ₽</span>
                <span className={styles.clickBuy}>
                  <Link to={'/sets'}>Хочу!</Link>
                </span>
              </div>
              <div className={styles.item4}>
                <img
                  src={middleSlider8}
                  alt="middleSlider8"
                  width={'222px'}
                  height={'178px'}
                />
                <div className={styles.setName}>Легкая классика</div>
                <div className={styles.setInfo}>450 грамм, 20 кусочков</div>
                <div className={styles.vector}></div>
                <span className={styles.setPrice}>950 ₽</span>
                <span className={styles.clickBuy}>
                  <Link to={'/sets'}>Хочу!</Link>
                </span>
              </div>
            </div>
          </>
        )}
        <div className={styles.sliderBtnLeft}>
          <Arrow onClick={() => setInitialState(!initialState)} />
        </div>
      </div>
      <div className={styles.sliderBtnRight}>
        <Arrow onClick={() => setInitialState(!initialState)} />
      </div>
    </>
  )
}
