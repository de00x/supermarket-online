import { FC } from 'react'
import { ReactComponent as Beverages } from './img/beverages.svg'
import { ReactComponent as FoodSets } from './img/foodSets.svg'
import { ReactComponent as CornDogs } from './img/cornDogs.svg'
import { ReactComponent as Salads } from './img/salads.svg'
import { ReactComponent as Stocks } from './img/stocks.svg'
import { ReactComponent as Rolls } from './img/rolls.svg'
import { ReactComponent as Pizza } from './img/pizza.svg'
import { ReactComponent as Sushi } from './img/sushi.svg'
import { ReactComponent as Soups } from './img/soups.svg'
import { ReactComponent as WOK } from './img/WOK.svg'
import { Link } from 'react-router-dom'
import logo from './img/logo.svg'
import vector from './img/vector.svg'
import styles from './styles.module.scss'

export const Sidebar: FC = () => {
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <Link to={'/main'}>
            <img
              onClick={() => localStorage.removeItem('location')}
              src={logo}
              alt="Logo"
              width={'100px'}
              height={'100px'}
            />
          </Link>
        </div>
        <div className={styles.logoText}>
          <Link to={'/main'}>
            <h3 onClick={() => localStorage.removeItem('location')}>RELAX</h3>
          </Link>
        </div>
        <div className={styles.vector}>
          <img src={vector} alt="vector" width={'160px'} />
        </div>
        <div className={styles.menu}>
          <ul>
            <li
              onClick={() => localStorage.setItem('location', 'pizzas')}
              className={
                localStorage.getItem('location') === 'pizzas'
                  ? styles.sidebarChoiceActive
                  : styles.sidebarChoice
              }
            >
              <Link to={'/pizzas'}>
                <Pizza />
                Пицца
              </Link>
            </li>
            <li
              onClick={() => localStorage.setItem('location', 'sets')}
              className={
                localStorage.getItem('location') === 'sets'
                  ? styles.sidebarChoiceActive
                  : styles.sidebarChoice
              }
            >
              <Link to={'/sets'}>
                <FoodSets /> Сеты
              </Link>
            </li>
            <li
              onClick={() => localStorage.setItem('location', 'WOK')}
              className={
                localStorage.getItem('location') === 'WOK'
                  ? styles.sidebarChoiceActive
                  : styles.sidebarChoice
              }
            >
              <Link to={'/wok'}>
                <WOK /> WOK
              </Link>
            </li>
            <li
              onClick={() => localStorage.setItem('location', 'rolls')}
              className={
                localStorage.getItem('location') === 'rolls'
                  ? styles.sidebarChoiceActive
                  : styles.sidebarChoice
              }
            >
              <Link to={'/rolls'}>
                <Rolls /> Роллы
              </Link>
            </li>
            <li
              onClick={() => localStorage.setItem('location', 'Sushi')}
              className={
                localStorage.getItem('location') === 'Sushi'
                  ? styles.sidebarChoiceActive
                  : styles.sidebarChoice
              }
            >
              <Link to={'/sushi'}>
                <Sushi />
                Суши
              </Link>
            </li>
            <li className={styles.sidebarChoice}>
              <Link to={'#'}>
                <Salads /> Салаты
              </Link>
            </li>
            <div className={styles.menuSoon}>
              <span>СКОРО</span>
            </div>
            <li className={styles.sidebarChoice}>
              <Link to={'#'}>
                <Soups /> Супы
              </Link>
            </li>
            <div className={styles.menuSoon}>
              <span>СКОРО</span>
            </div>
            <li
              onClick={() => localStorage.setItem('location', 'CornDogs')}
              className={
                localStorage.getItem('location') === 'CornDogs'
                  ? styles.sidebarChoiceActive
                  : styles.sidebarChoice
              }
            >
              <Link to={'/cornDogs'}>
                <CornDogs /> Корн доги
              </Link>
            </li>
            <li
              onClick={() => localStorage.setItem('location', 'Beverages')}
              className={
                localStorage.getItem('location') === 'Beverages'
                  ? styles.sidebarChoiceActive
                  : styles.sidebarChoice
              }
            >
              <Link to={'/beverages'}>
                <Beverages /> Напитки
              </Link>
            </li>
            <li
              onClick={() => localStorage.setItem('location', 'Stocks')}
              className={
                localStorage.getItem('location') === 'Stocks'
                  ? styles.sidebarChoiceActive
                  : styles.sidebarChoice
              }
            >
              <Link to={'/stocks'}>
                <Stocks /> Акции
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
