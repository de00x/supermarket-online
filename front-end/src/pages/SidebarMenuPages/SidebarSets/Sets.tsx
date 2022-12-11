import { SidebarSetsMobile } from '../../PagesForMobile/SidebarPages/SidebarSetsMobile'
import { RightBlock } from '../../../components/RightBlock'
import { Sidebar } from '../../../components/Sidebar'
import { Middle } from './middleBlock'
import { FC } from 'react'
import styles from './styles/styles.module.scss'

export const Sets: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <Middle />
        <RightBlock />
      </div>
      <div className={styles.containerMobile}>
        <SidebarSetsMobile />
      </div>
    </>
  )
}
