import { SkeletonProductSets } from '../../../../../../Skeletons'
import { FC } from 'react'
import styles from '../styles.module.scss'

export const SkeletonSushiLoading: FC = (): JSX.Element => {
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
