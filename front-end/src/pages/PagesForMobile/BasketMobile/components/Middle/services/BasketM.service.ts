import { ISets } from '../../../../SidebarPages/SidebarRollsMobile/components/Middle/types/SRollsM.types'
import { useEffect } from 'react'

const BasketMService = {
  GetItemLS(isMounted: React.MutableRefObject<boolean>, items: ISets[]) {
    useEffect(() => {
      window.scrollTo(0, 0)
      if (isMounted.current) {
        const json = JSON.stringify(items)
        localStorage.setItem('cart', json)
      }
      isMounted.current = true
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])
  },
}
export default BasketMService
