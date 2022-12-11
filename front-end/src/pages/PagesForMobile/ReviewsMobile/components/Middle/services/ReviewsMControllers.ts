import { IResponse, IRMControllersProps } from '../types/ReviewsM.types'
import axios, { AxiosResponse } from 'axios'

const ReviewsMControllers = ({
  formAddReview,
  newReviewData,
  responseReviews,
  setIsLoadingPage,
  setNewReviewData,
  setFormAddReview,
  setResponseReviews,
  setCountActiveStar,
  setAddReviewErrData,
  setCheckedActiveStar,
  setAddReviewErrRepeat,
  setAddReviewErrDataText,
  setConfirmationClosedForm,
  setSuccessCreateNewReviewText,
  setAddReviewErrNotAuthorization,
}: IRMControllersProps) => {
  const onResponseAllReviews = (res: AxiosResponse): void => {
    const allReviewsReverse = res.data.reverse()
    setResponseReviews(allReviewsReverse)
    setIsLoadingPage(false)
  }
  const confirmationClosedFormCancel = (): void => {
    setConfirmationClosedForm(false)
  }
  const confirmationClosedFormDelete = (): void => {
    setConfirmationClosedForm(false)
    setFormAddReview(false)
    setCheckedActiveStar(0)
    setNewReviewData({ ...newReviewData, name: '', reviewText: '' })
  }
  const successCreateNewReview = (): void => {
    setFormAddReview(false)
    window.scrollTo(0, 0)
    setSuccessCreateNewReviewText(true)
    setTimeout(() => {
      setSuccessCreateNewReviewText(false)
    }, 7000)
  }
  const onFormAddReview = (): void => {
    const idIsNoRepeat = responseReviews.find(
      (userId: IResponse) => userId.id === localStorage.getItem('id')
    )
    if (localStorage.getItem('login') === null) {
      setAddReviewErrNotAuthorization(true)
      setTimeout(() => {
        setAddReviewErrNotAuthorization(false)
      }, 10000)
    } else {
      if (!formAddReview) {
        if (idIsNoRepeat != null) {
          setAddReviewErrRepeat(true)
          setTimeout(() => {
            setAddReviewErrRepeat(false)
          }, 10000)
        } else setFormAddReview(true)
      } else {
        if (checkErrReqNewReview) {
          axios
            .post('/review', {
              id: localStorage.getItem('id'),
              name: newReviewData.name,
              reviews: newReviewData.reviewText,
              stars: newReviewData.stars,
            })
            .then(successCreateNewReview)
            .catch((err) => console.log(err))
        } else {
          if (newReviewData.name.length < 2) {
            setAddReviewErrDataText('Введите корректное имя')
          }
          if (newReviewData.reviewText.length < 9) {
            setAddReviewErrDataText('Введите корректный отзыв')
          }
          if (newReviewData.stars < 1) {
            setAddReviewErrDataText('Минимальное количество звезд - 1')
          }
          setAddReviewErrData(true)
          setTimeout(() => {
            setAddReviewErrData(false)
          }, 7000)
        }
      }
    }
  }
  const activeStarThree = (): void => {
    setCheckedActiveStar(3)
    setNewReviewData({ ...newReviewData, stars: 3 })
  }
  const activeStarThour = (): void => {
    setCheckedActiveStar(4)
    setNewReviewData({ ...newReviewData, stars: 4 })
  }
  const mouseOverThree = (): void => {
    setCountActiveStar(3)
  }
  const mouseOverThour = (): void => {
    setCountActiveStar(4)
  }
  const activeStarFive = (): void => {
    setCheckedActiveStar(5)
    setNewReviewData({ ...newReviewData, stars: 5 })
  }
  const mouseOverFive = (): void => {
    setCountActiveStar(5)
  }
  const activeStarOne = (): void => {
    setCheckedActiveStar(1)
    setNewReviewData({ ...newReviewData, stars: 1 })
  }
  const activeStarTwo = (): void => {
    setCheckedActiveStar(2)
    setNewReviewData({ ...newReviewData, stars: 2 })
  }
  const mouseOverOne = (): void => {
    setCountActiveStar(1)
  }
  const mouseOverTwo = (): void => {
    setCountActiveStar(2)
  }
  const closedForm = (): void => {
    if (newReviewData.name.length === 0 && newReviewData.reviewText.length === 0) {
      setFormAddReview(false)
    } else setConfirmationClosedForm(true)
  }
  const mouseOut = (): void => {
    setCountActiveStar(0)
  }
  const newReviewDataLengthError =
    newReviewData.reviewText.length === 500 || newReviewData.name.length === 15
  const checkErrReqNewReview =
    newReviewData.name.length > 1 && newReviewData.reviewText.length > 9 && newReviewData.stars > 0

  return {
    mouseOut,
    closedForm,
    mouseOverTwo,
    mouseOverOne,
    activeStarTwo,
    activeStarOne,
    mouseOverFive,
    activeStarFive,
    mouseOverThour,
    mouseOverThree,
    activeStarThour,
    activeStarThree,
    onFormAddReview,
    onResponseAllReviews,
    newReviewDataLengthError,
    confirmationClosedFormCancel,
    confirmationClosedFormDelete,
  }
}
export default ReviewsMControllers
