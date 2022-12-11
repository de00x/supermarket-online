import { SidebarCornDogsMobile } from '../../PagesForMobile/SidebarPages/SidebarCornDogsMobile'
import { RightBlock } from '../../../components/RightBlock'
import { Sidebar } from '../../../components/Sidebar'
import { Middle } from './middleBlock'
import { FC } from 'react'
import styles from './styles/styles.module.scss'

export const CornDog: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <Middle />
        <RightBlock />
      </div>
      <div className={styles.containerMobile}>
        <SidebarCornDogsMobile />
      </div>
    </>
  )
}
