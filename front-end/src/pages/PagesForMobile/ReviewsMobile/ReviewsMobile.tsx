import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Middle } from './components/Middle'
import { FC } from 'react'

export const ReviewsMobile: FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <Middle />
      <Footer />
    </>
  )
}
