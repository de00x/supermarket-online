import { ReactComponent as Lock } from '../../img/lock.svg'
import { FC } from 'react'
import styles from '../../styles/styles.module.scss'

export const LockPage: FC = () => {
  return (
    <div className={styles.lockPageContainer}>
      <div>
        Для доступа к данной информации.<div>Вам требуется авторизоваться.</div>
        <Lock />
      </div>
    </div>
  )
}
