import { FC } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Middle } from './components/Middle'

export const PersonalMobile: FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <Middle />
      <Footer />
    </>
  )
}
