import { SkeletonProductSets } from '../../../../../../Skeletons'
import { FC } from 'react'
import styles from '../styles/styles.module.scss'

export const SkeletonBeveragesLoading: FC = (): JSX.Element => {
  const skeletonProdSetsArray = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <>
      {skeletonProdSetsArray.map((skeleton, i) => (
        <div className={styles.item} key={i}>
          <SkeletonProductSets />
        </div>
      ))}
    </>
  )
}
