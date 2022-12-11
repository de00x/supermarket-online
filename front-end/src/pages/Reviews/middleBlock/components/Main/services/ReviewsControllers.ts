import { IResponse, IReviewsControllersProps } from '../types/Reviews.types'
import axios, { AxiosResponse } from 'axios'
import { SyntheticEvent } from 'react'

const ReviewsControllers = ({
  reviewsData,
  setIsLoading,
  setUserNotAuth,
  setReviewsData,
  responseReviews,
  setCurrentProblem,
  setResponseReviews,
  setFormAddNewReview,
  setRepeatUserOfNewReview,
  setAddNewReviewSuccessText,
}: IReviewsControllersProps) => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const submit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (reviewsData.name.length > 1) {
      if (reviewsData.reviews.length > 9) {
        if (reviewsData.stars > 0) {
          axios
            .post('/review', {
              id: localStorage.getItem('id'),
              name: reviewsData.name,
              reviews: reviewsData.reviews,
              stars: reviewsData.stars,
            })
            .then(() => successCreatedNewReview())
            .catch((err) => console.log('err', err))
        } else errStart()
      } else setCurrentProblem('errReviews')
    } else setCurrentProblem('errName')
  }
  const onResponseAllreviews = (res: AxiosResponse): void => {
    const allReviewsReverse = res.data.reverse()
    setResponseReviews(allReviewsReverse)
    setIsLoading(false)
  }
  const successCreatedNewReview = (): void => {
    setFormAddNewReview(false)
    setAddNewReviewSuccessText(true)
    setTimeout(() => {
      setAddNewReviewSuccessText(false)
    }, 5000)
  }
  const openFormAddNewReview = (): void => {
    const isRepeatUser = responseReviews.find(
      (userId: IResponse) => userId.id === localStorage.getItem('id')
    )
    if (localStorage.getItem('login') === null) {
      setUserNotAuth(true)
      setTimeout(() => {
        setUserNotAuth(false)
      }, 5000)
    } else if (isRepeatUser != null) {
      setRepeatUserOfNewReview(true)
      setTimeout(() => {
        setRepeatUserOfNewReview(false)
      }, 5000)
    } else setFormAddNewReview(true)
  }
  const onSecondStar = (): void => {
    setCurrentProblem('')
    setReviewsData({ ...reviewsData, stars: 2 })
  }
  const onFourthStar = (): void => {
    setCurrentProblem('')
    setReviewsData({ ...reviewsData, stars: 4 })
  }
  const onFirstStar = (): void => {
    setCurrentProblem('')
    if (reviewsData.stars === 1) {
      setReviewsData({ ...reviewsData, stars: 0 })
    } else setReviewsData({ ...reviewsData, stars: 1 })
  }
  const onThirdStar = (): void => {
    setCurrentProblem('')
    setReviewsData({ ...reviewsData, stars: 3 })
  }
  const onFifthStar = (): void => {
    setCurrentProblem('')
    setReviewsData({ ...reviewsData, stars: 5 })
  }
  const onExitForm = (): void => {
    setCurrentProblem('')
    setFormAddNewReview(false)
    setReviewsData({ ...reviewsData, name: '', reviews: '', stars: 0 })
  }
  const errStart = (): void => {
    setCurrentProblem('errStars')
    setTimeout(() => {
      setCurrentProblem('')
    }, 150)
    setTimeout(() => {
      setCurrentProblem('errStars')
    }, 300)
    setTimeout(() => {
      setCurrentProblem('')
    }, 450)
    setTimeout(() => {
      setCurrentProblem('errStars')
    }, 600)
    setTimeout(() => {
      setCurrentProblem('')
    }, 750)
    setTimeout(() => {
      setCurrentProblem('errStars')
    }, 900)
    setTimeout(() => {
      setCurrentProblem('')
    }, 1050)
    setTimeout(() => {
      setCurrentProblem('errStars')
    }, 1200)
    setTimeout(() => {
      setCurrentProblem('')
    }, 1350)
    setTimeout(() => {
      setCurrentProblem('errStars')
    }, 1500)
  }
  return {
    submit,
    onExitForm,
    onFirstStar,
    onThirdStar,
    onFifthStar,
    onFourthStar,
    onSecondStar,
    openFormAddNewReview,
    onResponseAllreviews,
  }
}
export default ReviewsControllers
