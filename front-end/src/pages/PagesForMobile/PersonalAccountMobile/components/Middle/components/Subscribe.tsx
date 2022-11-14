import { ReactComponent as MailIcon } from '../img/mailLogo.svg'
import { FC } from 'react'
import styles from '../styles.module.scss'

export const Subscribe: FC = (): JSX.Element => {
  return (
    <div className={styles.subscribeToSpamContainer}>
      <div className={styles.subscribeToSpamHeader}>
        <MailIcon /> Подписаться на рассылку
      </div>
      <input
        placeholder="Введите ваш Email"
        className={styles.subscribeToSpamInput}
      ></input>
      <div className={styles.spamCheckboxContainer}>
        <label>
          <div className={styles.subscribeToSpamCheckbox}>
            <input type="checkbox" />
            Хочу получать новости
          </div>
        </label>
        <label>
          <div className={styles.subscribeToSpamCheckbox}>
            <input type="checkbox" />
            Хочу получать акции
          </div>
        </label>
      </div>
      <div className={styles.subscribeToSpamBtn}>Сохранить изменения</div>
    </div>
  )
}
