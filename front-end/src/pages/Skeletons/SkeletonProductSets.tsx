import { FC } from 'react'
import ContentLoader from 'react-content-loader'

export const SkeletonProductSets: FC = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        width={227}
        height={312}
        viewBox="0 0 227 312"
        backgroundColor="#e0dcdc"
        foregroundColor="#f3f3f3"
      >
        <rect x="0" y="0" rx="5" ry="5" width="227" height="312" />
      </ContentLoader>
    </>
  )
}
