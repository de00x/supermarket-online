import styles from '../styles/styles.module.scss'
import cn from 'classnames'

const SWokStyleControllers = (sortBy: string) => {
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
export default SWokStyleControllers
