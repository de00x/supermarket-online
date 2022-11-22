import { ReactComponent as MailLogo } from '../img/mailLogo.svg'
import { FC } from 'react'
import styles from '../styles.module.scss'

export const SubscribeToSpam: FC = () => {
  return (
    <div className={styles.additionallyInfoContainer}>
      <div className={styles.additionallyInfo}>
        <MailLogo /> Подписаться на рассылку
      </div>
      <input className={styles.additionallyInfoInput} placeholder="Введите ваш Email" />
      <label className={styles.checkedNews}>
        <input type="checkbox" />
        Хочу получать новости
      </label>
      <label className={styles.checkedStocks}>
        <input type="checkbox" />
        Хочу получать акции
      </label>
      <div className={styles.checkedSaveChanged}>Сохранить изменения</div>
    </div>
  )
}
