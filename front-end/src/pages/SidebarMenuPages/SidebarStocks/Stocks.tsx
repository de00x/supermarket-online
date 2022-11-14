import { SidebarStocksMobile } from '../../PagesForMobile/SidebarPages/SidebarStocksMobile'
import { RightBlock } from '../../../components/RightBlock'
import { Sidebar } from '../../../components/Sidebar'
import { Middle } from './middleBlock'
import { FC } from 'react'
import styles from './styles.module.scss'

export const Stocks: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <Middle />
        <RightBlock />
      </div>
      <div className={styles.containerMobile}>
        <SidebarStocksMobile />
      </div>
    </>
  )
}
