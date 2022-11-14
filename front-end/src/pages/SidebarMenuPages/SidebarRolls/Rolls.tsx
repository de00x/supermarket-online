import { SidebarRollsMobile } from '../../PagesForMobile/SidebarPages/SidebarRollsMobile'
import { RightBlock } from '../../../components/RightBlock'
import { Sidebar } from '../../../components/Sidebar'
import { Middle } from './middleBlock'
import { FC } from 'react'
import styles from './styles.module.scss'

export const Rolls: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <Middle />
        <RightBlock />
      </div>
      <div className={styles.containerMobile}>
        <SidebarRollsMobile />
      </div>
    </>
  )
}
