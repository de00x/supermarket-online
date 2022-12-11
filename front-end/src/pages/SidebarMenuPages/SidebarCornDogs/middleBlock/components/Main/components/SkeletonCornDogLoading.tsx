import { SkeletonProductSets } from '../../../../../../Skeletons'
import { FC } from 'react'
import styles from '../styles/styles.module.scss'

export const SkeletonCornDogLoading: FC = (): JSX.Element => {
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <>
      {skeleton.map((skeleton, i) => (
        <div className={styles.item} key={i}>
          <SkeletonProductSets />
        </div>
      ))}
    </>
  )
}
