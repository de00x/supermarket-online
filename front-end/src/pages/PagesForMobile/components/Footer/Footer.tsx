import { ReactComponent as Instagramm } from './img/instagrammIcon.svg'
import { ReactComponent as Telegramm } from './img/telegrammIcon.svg'
import { ReactComponent as Whatsapp } from './img/whatsappIcon.svg'
import { footerBasket, footerMenu, footerReviews } from './img/img'
import { ReactComponent as Peronal } from './img/personalIcon.svg'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import styles from './styles/styles.module.scss'

export const Footer: FC = (): JSX.Element => {
  const [moreDetailsOpen, setMoreDetailsOpen] = useState(false)

  /// styles ///
  const styleMoreDetails = cn(styles.moreDetails, {
    [styles.moreDetailsActive]: moreDetailsOpen,
  })
  /// styles ///

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerInfoContainer}>
        <div className={styles.footerInfoHeader}>Заказать суши в Дубаи</div>
        <div className={styles.footerInfoText}>
          Ресторан “Relax” предлагаем своим клиентам самые вкусные суши с доставкой на дом,
          приготовленные по классическим и адаптированным к европейской аудитории рецептам, а также
          собственным наработкам наших поваров. Мы ценим время наших клиентов, поэтому вы можете
          заказать суши в Дубаи с доставкой на дом или в офис.
        </div>
        <div onClick={() => setMoreDetailsOpen(!moreDetailsOpen)} className={styleMoreDetails}>
          {!moreDetailsOpen ? 'Подробнее ▼' : 'Скрыть ▲'}
        </div>
        {moreDetailsOpen && (
          <div className={styles.moreDetailsOpen}>
            Оформляя заказ суши, вы также можете добавить в список блюд китайскую лапшу, доставка
            которой на дом выполняется в специальной удобной коробочке. Почему стоит заказать суши в
            ресторане «Релакс»? Наше заведение предлагает исключительно свежие блюда, приготовленные
            из тщательно отобранных продуктов непосредственно после принятия вашей заявки. Мы
            закупаем ингредиенты у ответственных поставщиков, с которыми успешно сотрудничаем не
            один год. Решив купить еду в нашем ресторане, вы будете приятно удивлены не только
            доступными ценами, но и высоким уровнем обслуживания. Выполняя каждый заказ суши,
            наборов роллов и других угощений, мы быстро доставляем вам на дом или в офис
            свежеприготовленное блюдо. Оплатить еду вы можете как банковской картой, так и наличными
            курьеру — и у него всегда найдется сдача! Для комфортной трапезы мы сопровождаем каждый
            заказ суши набором всех необходимых аксессуаров: одноразовыми палочками, зубочистками,
            салфетками, жевательными резинками. В дополнение к роллам и другим блюдам японской кухни
            мы предлагаем маринованный имбирь, васаби и прочие приправы и соусы. Все это уже входит
            в цену вашего заказа суши и предоставляется в расчете на каждого участника трапезы.
            Оформить заявку на ароматное блюдо из нашего меню вы можете непосредственно на сайте или
            по телефону. Обращайтесь к нам, и мы с удовольствием порадуем вас и ваших гостей
            аппетитным и оригинальным угощением!
          </div>
        )}
        <div className={styles.changeMessengers}>Выберите удобный мессенджер для общения</div>
        <div className={styles.messengersImg}>
          <Whatsapp />
          <Telegramm />
          <Instagramm />
        </div>
        <div className={styles.footerContacts}>
          <div>
            Тел: <span>+7 999 888 77 55</span>
          </div>
          <div>
            Тел: <span>+7 999 777 66 33</span>
          </div>
          <div>Адрес: Центральная 14</div>
        </div>
      </div>
      <div className={styles.footerBarContainer}>
        <Link to={'/main'}>
          <img src={footerMenu} alt="footerMenu" />
        </Link>
        <Link to={'/basket'}>
          <img src={footerBasket} alt="footerBasket" />
        </Link>
        <Link to={'/reviews'}>
          <img src={footerReviews} alt="footerReviews" />
        </Link>
        <Link to={'/personal'}>
          <Peronal />
        </Link>
      </div>
    </div>
  )
}
