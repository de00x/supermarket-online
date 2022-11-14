import { FC } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { Middle } from './middleBlock'
import { RightBlock } from '../../components/RightBlock'
import styles from './styles.module.scss'
import { ReviewsMobile } from '../PagesForMobile/ReviewsMobile'

export const Reviews: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <Middle />
        <RightBlock />
      </div>
      <div className={styles.containerMobile}>
        <ReviewsMobile />
      </div>
    </>
  )
}
