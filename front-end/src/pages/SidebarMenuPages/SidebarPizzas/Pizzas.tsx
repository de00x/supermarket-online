import { SidebarPizzasMobile } from '../../PagesForMobile/SidebarPages/SidebarPizzasMobile'
import { RightBlock } from '../../../components/RightBlock'
import { Sidebar } from '../../../components/Sidebar'
import { Middle } from './middleBlock'
import { FC } from 'react'
import styles from './styles/styles.module.scss'

export const Pizzas: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <Middle />
        <RightBlock />
      </div>
      <div className={styles.containerMobile}>
        <SidebarPizzasMobile />
      </div>
    </>
  )
}
