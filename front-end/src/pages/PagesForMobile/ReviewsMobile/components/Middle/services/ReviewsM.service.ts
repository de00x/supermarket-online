import axios, { AxiosResponse } from 'axios'
import { useEffect } from 'react'

const ReviewsMService = {
  GetReviews(onResponseAllReviews: (res: AxiosResponse<any, any>) => void, formAddReview: boolean) {
    useEffect(() => {
      window.scrollTo(0, 0)
      axios
        .get('/reviews')
        .then((res) => {
          onResponseAllReviews(res)
        })
        .catch((err) => console.log('errReviewsMobile', err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formAddReview])
  },
}
export default ReviewsMService
