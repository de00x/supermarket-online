import { slider1, slider2, slider3, slider4, slider5 } from '../img/img'
import { Login } from '../../../../Login'
import { FC, useState } from 'react'
import './styles/index.scss'
import styles from './styles/styles.module.scss'
import Carousel from 'react-bootstrap/Carousel'

export const SliderMenu: FC = () => {
  const [blockAuthorization, setBlockAuthorization] = useState(false)

  return (
    <>
      {/* blockAuthorization, if max-width < 1500px  */}
      <div className={styles.personalMiddleContainer}>
        {localStorage.getItem('login') == null && (
          <>
            <div className={styles.personalTextOne}>Что бы сделать заказ</div>
            <div className={styles.personalTextTwo}>
              Вам необходимо
              <span onClick={() => setBlockAuthorization(!blockAuthorization)}>авторизоваться</span>
            </div>
            {/* blockAuthorization, if max-width < 1500px  */}
            {blockAuthorization && <Login setBlockAuthorization={setBlockAuthorization} />}
          </>
        )}
      </div>
      {/* blockAuthorization, if max-width > 1500px  */}
      {localStorage.getItem('login') === null ? (
        <div className={styles.needAuthText}>
          Что бы делать заказы и оставлять отзывы, Вам необходимо авторизоваться
          <div>Сделать это можно в меню справа.</div>
        </div>
      ) : null}
      {/* blockAuthorization, if max-width > 1500px  */}

      <div className={styles.sliderMenu}>
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={slider1} alt="1 slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={slider2} alt="2 slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={slider3} alt="3 slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={slider4} alt="4 slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={slider5} alt="5 slide" />
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  )
}
