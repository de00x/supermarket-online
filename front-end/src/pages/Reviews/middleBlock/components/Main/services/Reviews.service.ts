import axios, { AxiosResponse } from 'axios'
import { useEffect } from 'react'

const ReviewsService = {
  GetAllReviews(
    onResponseAllreviews: (res: AxiosResponse<any, any>) => void,
    formAddNewReview: boolean
  ) {
    useEffect(() => {
      axios
        .get('/reviews')
        .then((res) => onResponseAllreviews(res))
        .catch((err) => console.log('err', err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formAddNewReview])
    useEffect(() => {
      localStorage.setItem('location', 'reviews')
    }, [])
  },
}
export default ReviewsService
