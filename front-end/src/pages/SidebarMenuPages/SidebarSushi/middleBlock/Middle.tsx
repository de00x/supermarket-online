import { Footer } from '../../../../components/Footer'
import { Header } from '../../../../components/Header'
import { Main } from './components/Main'
import { FC } from 'react'
import styles from './styles/styles.module.scss'

export const Middle: FC = () => {
  return (
    <>
      <div className={styles.middle}>
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  )
}
