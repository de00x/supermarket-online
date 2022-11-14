import { ReactComponent as ReviewsLogo } from './img/reviewsLogo.svg'
import { FC, SyntheticEvent, useEffect, useState } from 'react'
import { ReactComponent as Star } from './img/star.svg'
import { SkeletonReviews } from '../../../../Skeletons'
import { IResponse, IReviewsData } from './types'
import axios, { AxiosResponse } from 'axios'
import cn from 'classnames'
import styles from './styles.module.scss'

export const Main: FC = () => {
  const [addNewReviewSuccessText, setAddNewReviewSuccessText] = useState(false)
  const [repeatUserOfNewReview, setRepeatUserOfNewReview] = useState(false)
  const [formAddNewReview, setFormAddNewReview] = useState(false)
  const [currentProblem, setCurrentProblem] = useState('')
  const [userNotAuth, setUserNotAuth] = useState(false)
  const [counterStars, setCounterStars] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [responseReviews, setResponseReviews] = useState<IResponse[]>([])
  const [reviewsData, setReviewsData] = useState<IReviewsData>({
    name: '',
    reviews: '',
    stars: 0,
  })

  useEffect(() => {
    axios
      .get('/reviews')
      .then((res) => onResponseAllreviews(res))
      .catch((err) => console.log('err', err))
  }, [formAddNewReview])
  useEffect(() => {
    localStorage.setItem('location', 'reviews')
  }, [])

  /// onClick ///
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

  /// onClick ///

  /// styles ///
  const stylesStarsContainer = cn(styles.starsContainer, {
    [styles.starsActiveOne]: counterStars === 1 || reviewsData.stars === 1,
    [styles.starsActiveTwo]: counterStars === 2 || reviewsData.stars === 2,
    [styles.starsActiveThree]: counterStars === 3 || reviewsData.stars === 3,
    [styles.starsActiveThour]: counterStars === 4 || reviewsData.stars === 4,
    [styles.starsActiveFive]: counterStars === 5 || reviewsData.stars === 5,
    [styles.starsContainerErr]: currentProblem === 'errStars',
  })
  const stylesAddReviewsBtn = cn(styles.addReviewsBtn, {
    [styles.addReviewsBtnActive]: formAddNewReview,
  })
  const stylesFormTextarea = cn(styles.formTextarea, {
    [styles.formTextareaErrData]: currentProblem === 'errReviews',
  })
  const stylesFormHeader = cn(styles.formHeader, {
    [styles.formHeaderInputErrData]: currentProblem === 'errName',
  })
  /// styles ///

  return (
    <div className={styles.container}>
      {/* blockAuthorization, if not authorization  */}
      {localStorage.getItem('login') == null && (
        <div className={styles.notAuthorizationContainer}>
          <div>Что бы оставить свой отзыв, Вам необходимо авторизоваться.</div>
          <div>Сделать это можно в меню справа или на главной странице.</div>
        </div>
      )}
      {/* blockAuthorization, if not authorization  */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <ReviewsLogo /> Отзывы
        </div>
        <button onClick={openFormAddNewReview} className={stylesAddReviewsBtn}>
          Добавить отзыв
        </button>
      </div>
      {addNewReviewSuccessText ? (
        <div className={styles.addNewReviewSuccessText}>
          Благодарим вас за оставленный Bами отзыв. <div>Всего хорошего!</div>
        </div>
      ) : null}
      {repeatUserOfNewReview ? (
        <div className={styles.repeatUserOfNewReview}>
          Вы уже оставляли свой отзыв ранее.
        </div>
      ) : null}
      {userNotAuth ? (
        <div className={styles.repeatUserOfNewReview}>
          Что бы оставить свой отзыв, Вам необходимо авторизоваться.
        </div>
      ) : null}
      {formAddNewReview ? (
        <div className={styles.formAddNewReviewContainer}>
          <form onSubmit={submit}>
            <div className={styles.formContainer}>
              <div className={stylesFormHeader}>
                <input
                  value={reviewsData.name}
                  onChange={(e) =>
                    setReviewsData({ ...reviewsData, name: e.target.value })
                  }
                  placeholder="Ваше имя"
                />
                <div
                  onMouseOut={() => setCounterStars(0)}
                  className={stylesStarsContainer}
                >
                  <Star
                    onClick={onFirstStar}
                    onMouseOver={() => setCounterStars(1)}
                  />
                  <Star
                    onClick={onSecondStar}
                    onMouseOver={() => setCounterStars(2)}
                  />
                  <Star
                    onClick={onThirdStar}
                    onMouseOver={() => setCounterStars(3)}
                  />
                  <Star
                    onClick={onFourthStar}
                    onMouseOver={() => setCounterStars(4)}
                  />
                  <Star
                    onClick={onFifthStar}
                    onMouseOver={() => setCounterStars(5)}
                  />
                </div>
              </div>
              <div className={stylesFormTextarea}>
                <textarea
                  value={reviewsData.reviews}
                  onChange={(e) =>
                    setReviewsData({ ...reviewsData, reviews: e.target.value })
                  }
                  placeholder="Введите отзыв"
                />
              </div>
            </div>
            <div className={styles.formFooterBtnContainer}>
              <button className={styles.footerBtnSubmit} type="submit">
                Оставить отзыв
              </button>
              <button onClick={onExitForm} className={styles.footerBtnCancel}>
                Отменить
              </button>
            </div>
          </form>
        </div>
      ) : null}
      <div className={styles.main}>
        {!isLoading ? (
          <>
            {responseReviews.map((review: IResponse) => (
              <div key={review.id} className={styles.reviews}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerNameText}>{review.name}</div>
                  <div className={styles.reviewerDateText}>{review.date}</div>
                  <div
                    className={cn(styles.reviewerStars, {
                      [styles.reviewerStarsOne]: review.stars === 1,
                      [styles.reviewerStarsTwo]: review.stars === 2,
                      [styles.reviewerStarsThree]: review.stars === 3,
                      [styles.reviewerStarsThour]: review.stars === 4,
                      [styles.reviewerStarsFive]: review.stars === 5,
                    })}
                  >
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                </div>
                <div className={styles.reviewText}>{review.reviews}</div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className={styles.reviewsSkeletonContainer}>
              <div className={styles.reviewsSkeleton}>
                <SkeletonReviews />
              </div>
              <div className={styles.reviewsSkeleton}>
                <SkeletonReviews />
              </div>
              <div className={styles.reviewsSkeleton}>
                <SkeletonReviews />
              </div>
              <div className={styles.reviewsSkeleton}>
                <SkeletonReviews />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
