import cn from 'classnames'
import styles from '../styles/styles.module.scss'

const SStocksSControllers = (sortBy: string) => {
  const classSortFlyOpenTextDefault = cn({
    [styles.sortFlyOpenTextActive]: sortBy === 'По умолчанию',
  })
  const classSortFlyOpenTextHigh = cn({
    [styles.sortFlyOpenTextActive]: sortBy === 'Сначала дороже',
  })
  const classSortFlyOpenTextLow = cn({
    [styles.sortFlyOpenTextActive]: sortBy === 'Сначала дешевле',
  })
  return { classSortFlyOpenTextDefault, classSortFlyOpenTextHigh, classSortFlyOpenTextLow }
}
export default SStocksSControllers
