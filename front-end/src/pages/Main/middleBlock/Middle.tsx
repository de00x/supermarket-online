import { Header } from '../../../components/Header/Header'
import { MiddleSlider } from './components/MiddleSlider'
import { SliderMenu } from './components/SliderMenu'
import { MiddleMenu } from './components/MiddleMenu'
import { Footer } from '../../../components/Footer'
import { FC } from 'react'
import styles from './styles/styles.module.scss'

export const Middle: FC = () => {
  return (
    <div className={styles.middle}>
      <Header />
      <SliderMenu />
      <MiddleMenu />
      <MiddleSlider />
      <Footer />
    </div>
  )
}
