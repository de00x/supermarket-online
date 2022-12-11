import { ReactComponent as ReviewsLogo } from './img/reviewsLogo.svg'
import { IResponse, IReviewsData } from './types/Reviews.types'
import { ReactComponent as Star } from './img/star.svg'
import { SkeletonReviews } from '../../../../Skeletons'
import { FC, useState } from 'react'
import cn from 'classnames'
import styles from './styles/styles.module.scss'
import ReviewsService from './services/Reviews.service'
import ReviewsControllers from './services/ReviewsControllers'
import ReviewsSControllers from './styles/ReviewsSControllers'

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

  /// functions ///
  const {
    submit,
    onExitForm,
    onFirstStar,
    onThirdStar,
    onFifthStar,
    onFourthStar,
    onSecondStar,
    openFormAddNewReview,
    onResponseAllreviews,
  } = ReviewsControllers({
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
  })
  /// functions ///

  /// useEffects ///
  ReviewsService.GetAllReviews(onResponseAllreviews, formAddNewReview)
  /// useEffects ///

  /// styles ///
  const { stylesStarsContainer, stylesAddReviewsBtn, stylesFormTextarea, stylesFormHeader } =
    ReviewsSControllers({ counterStars, reviewsData, currentProblem, formAddNewReview })
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
        <div className={styles.repeatUserOfNewReview}>Вы уже оставляли свой отзыв ранее.</div>
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
                  onChange={(e) => setReviewsData({ ...reviewsData, name: e.target.value })}
                  placeholder="Ваше имя"
                />
                <div onMouseOut={() => setCounterStars(0)} className={stylesStarsContainer}>
                  <Star onClick={onFirstStar} onMouseOver={() => setCounterStars(1)} />
                  <Star onClick={onSecondStar} onMouseOver={() => setCounterStars(2)} />
                  <Star onClick={onThirdStar} onMouseOver={() => setCounterStars(3)} />
                  <Star onClick={onFourthStar} onMouseOver={() => setCounterStars(4)} />
                  <Star onClick={onFifthStar} onMouseOver={() => setCounterStars(5)} />
                </div>
              </div>
              <div className={stylesFormTextarea}>
                <textarea
                  value={reviewsData.reviews}
                  onChange={(e) => setReviewsData({ ...reviewsData, reviews: e.target.value })}
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
