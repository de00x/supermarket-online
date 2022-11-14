import { FC } from 'react'
import { SkeletonProductSets } from '../../../../../../Skeletons'
import styles from '../styles.module.scss'

export const SkeletonSetsLoading: FC = (): JSX.Element => {
  return (
    <>
      <div className={styles.item}>
        <SkeletonProductSets />
      </div>
      <div className={styles.item}>
        <SkeletonProductSets />
      </div>
      <div className={styles.item}>
        <SkeletonProductSets />
      </div>
      <div className={styles.item}>
        <SkeletonProductSets />
      </div>
      <div className={styles.item}>
        <SkeletonProductSets />
      </div>
      <div className={styles.item}>
        <SkeletonProductSets />
      </div>
      <div className={styles.item}>
        <SkeletonProductSets />
      </div>
      <div className={styles.item}>
        <SkeletonProductSets />
      </div>
    </>
  )
}
