import { FC } from 'react'
import ContentLoader from 'react-content-loader'
import styles from './styles.module.scss'

export const SkeletonReviewsMobile: FC = (): JSX.Element => (
  <div className={styles.skeletonReviewsMobile}>
    <ContentLoader
      speed={2}
      backgroundColor="#e6e2e2"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
    </ContentLoader>
  </div>
)
