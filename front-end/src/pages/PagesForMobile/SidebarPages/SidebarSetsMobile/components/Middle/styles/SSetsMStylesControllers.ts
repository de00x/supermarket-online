import cn from 'classnames'
import styles from '../styles/styles.module.scss'

const SSetsMStylesControllers = (sortBy: string) => {
  const classSortFlyOpenTextDefault = cn({
    [styles.sortFlyOpenTextActive]: sortBy === 'По умолчанию',
  })
  const classSortFlyOpenTextWeight = cn({
    [styles.sortFlyOpenTextActive]: sortBy === 'По весу',
  })
  const classSortFlyOpenTextHigh = cn({
    [styles.sortFlyOpenTextActive]: sortBy === 'Сначала дороже',
  })
  const classSortFlyOpenTextLow = cn({
    [styles.sortFlyOpenTextActive]: sortBy === 'Сначала дешевле',
  })
  return {
    classSortFlyOpenTextLow,
    classSortFlyOpenTextHigh,
    classSortFlyOpenTextWeight,
    classSortFlyOpenTextDefault,
  }
}
export default SSetsMStylesControllers
