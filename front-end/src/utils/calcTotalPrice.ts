import { ISets } from '../pages/SidebarMenuPages/SidebarSets/middleBlock/components/Main/types'

export const calcTotalPrice = (items: ISets[]): number => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}
