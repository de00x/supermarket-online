import { FC, useState } from 'react'
import instagramm from './img/instagrammIcon.svg'
import telegramm from './img/telegrammIcon.svg'
import whatsapp from './img/whatsappIcon.svg'
import styles from './styles.module.scss'

export const Footer: FC = () => {
  const [initialState, setInitialState] = useState(false)

  return (
    <div className={styles.footerContainer}>
      <div className={styles.header}>Заказать суши в Дубаи</div>
      <div className={styles.footerMain}>
        Ресторан “Суши и Лапша” предлагаем своим клиентам самые вкусные суши с доставкой на дом,
        приготовленные по классическим и адаптированным к европейской аудитории рецептам, а также
        собственным наработкам наших поваров. Мы ценим время наших клиентов, поэтому вы можете
        заказать суши в Дубаи с доставкой на дом или в офис.
        <div className={styles.footerTable}>
          В нашем меню более 20 видов суши:
          <ul>
            <li>Классические с сырым лососем, тунцом, окунем.</li>
            <li>Экзотические с тигровой креветкой, морским гребешком.</li>
            <li>Пикантные с копченым лососем, угрем.</li>
          </ul>
        </div>
        В меню также представлены гунканы: с начинкой из красной икры и тобико, а также феликсы, где
        японский майонез сочетается с рыбой, морепродуктами, угрем. Любители острых блюд могут
        купить суши с соусом спайси. Популярные начинки — копченая курица, снежный краб, креветки,
        гребешки, тунец, лосось и окунь.
        {!initialState && (
          <>
            <div className={styles.moreContainer}>
              <span onClick={() => setInitialState(!initialState)} className={styles.more}>
                Читать подробнее ▼
              </span>
            </div>
          </>
        )}
        {initialState && (
          <>
            <div className={styles.moreContainer}>
              <span onClick={() => setInitialState(!initialState)} className={styles.hidden}>
                Скрыть ▲
              </span>
            </div>
            <div>
              Оформляя заказ суши, вы также можете добавить в список блюд китайскую лапшу, доставка
              которой на дом выполняется в специальной удобной коробочке.
              <br />
              Почему стоит заказать суши в ресторане «Релакс»? Наше заведение предлагает
              исключительно свежие блюда, приготовленные из тщательно отобранных продуктов
              непосредственно после принятия вашей заявки. Мы закупаем ингредиенты у ответственных
              поставщиков, с которыми успешно сотрудничаем не один год.
              <br />
              Решив купить еду в нашем ресторане, вы будете приятно удивлены не только доступными
              ценами, но и высоким уровнем обслуживания. Выполняя каждый заказ суши, наборов роллов
              и других угощений, мы быстро доставляем вам на дом или в офис свежеприготовленное
              блюдо. Оплатить еду вы можете как банковской картой, так и наличными курьеру — и у
              него всегда найдется сдача!
              <br />
              Для комфортной трапезы мы сопровождаем каждый заказ суши набором всех необходимых
              аксессуаров: одноразовыми палочками, зубочистками, салфетками, жевательными резинками.
              В дополнение к роллам и другим блюдам японской кухни мы предлагаем маринованный
              имбирь, васаби и прочие приправы и соусы. Все это уже входит в цену вашего заказа суши
              и предоставляется в расчете на каждого участника трапезы.
              <br />
              Оформить заявку на ароматное блюдо из нашего меню вы можете непосредственно на сайте
              или по телефону. Обращайтесь к нам, и мы с удовольствием порадуем вас и ваших гостей
              аппетитным и оригинальным угощением!
            </div>
          </>
        )}
        <div className={styles.footer}>
          <div className={styles.footerContacts}>
            <div className={styles.about}>
              <div>О компании</div>
              <div>Доставка и оплата</div>
              <div>Лента материалов</div>
              <div>Политика возврата</div>
              <br />
              <br />
              <br />
              <br />
            </div>
            <div className={styles.connection}>
              <div>Введите номер</div>
              <div>+967___ __ __</div>
              <div>
                Выберите удобный <br /> мессенджер для общения
              </div>
              <div className={styles.footerImg}>
                <img src={whatsapp} alt="whatsapp" />
                <img src={telegramm} alt="telegramm" />
                <img src={instagramm} alt="instagramm" />
              </div>
            </div>
            <div className={styles.contacts}>
              <div>Тел: +996 325 98 32</div>
              <div>Тел: +987 872 92 72</div>
              <div>Адрес: Центральная 17</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
