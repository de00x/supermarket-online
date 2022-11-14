import { FC } from 'react'
import ContentLoader from 'react-content-loader'
import styles from './styles.module.scss'

export const SkeletonSetsMobile: FC = (): JSX.Element => (
  <div className={styles.skeletonSetsMobile}>
    <ContentLoader
      speed={2}
      backgroundColor="#e6e2e2"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="3" ry="3" width="250%" height="250%" />
    </ContentLoader>
  </div>
)
