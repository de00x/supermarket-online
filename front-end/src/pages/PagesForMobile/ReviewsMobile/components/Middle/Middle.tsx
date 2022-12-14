import { IResponse, IReviewData } from './types/ReviewsM.types'
import { SkeletonReviewsMobile } from '../../../../Skeletons'
import { ReactComponent as Star } from './img/star.svg'
import { FC, useState } from 'react'
import cn from 'classnames'
import styles from './styles/styles.module.scss'
import ReviewsMService from './services/ReviewsM.service'
import RMStylesControllers from './styles/RMStylesControllers'
import ReviewsMControllers from './services/ReviewsMControllers'

export const Middle: FC = (): JSX.Element => {
  const [responseReviews, setResponseReviews] = useState<IResponse[]>([])
  const [addReviewErrDataText, setAddReviewErrDataText] = useState('')
  const [addReviewErrNotAuthorization, setAddReviewErrNotAuthorization] = useState(false)
  const [confirmationClosedForm, setConfirmationClosedForm] = useState(false)
  const [addReviewErrRepeat, setAddReviewErrRepeat] = useState(false)
  const [addReviewErrData, setAddReviewErrData] = useState(false)
  const [formAddReview, setFormAddReview] = useState(false)
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [successCreateNewReviewText, setSuccessCreateNewReviewText] = useState(false)
  const [countActiveStar, setCountActiveStar] = useState(0)
  const [checkedActiveStar, setCheckedActiveStar] = useState(0)
  const [newReviewData, setNewReviewData] = useState<IReviewData>({
    name: '',
    reviewText: '',
    stars: 0,
  })

  /// controllers ///
  const {
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
  } = ReviewsMControllers({
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
  })
  /// controllers ///

  /// useEffects ///
  ReviewsMService.GetReviews(onResponseAllReviews, formAddReview)
  /// useEffects ///

  /// styles ///
  const { stylesFormAddReviewText, stylesFormAddReviewName, stylesAddReview, stylesCounterStars } =
    RMStylesControllers({ newReviewData, countActiveStar, checkedActiveStar, addReviewErrRepeat })
  /// styles ///

  return (
    <div className={styles.middleContainer}>
      <div className={styles.middleHeader}>????????????</div>
      {successCreateNewReviewText ? (
        <div className={styles.successReviewText}>
          ???????????????????? ?????? ???? ?????????????????????? ???????? ??????????, ???????????? ?????????? ???????????????? !
        </div>
      ) : null}
      {isLoadingPage ? (
        <>
          <div className={styles.reviewContainerLoading}>
            <SkeletonReviewsMobile />
          </div>
          <div className={styles.reviewContainerLoading}>
            <SkeletonReviewsMobile />
          </div>
          <div className={styles.reviewContainerLoading}>
            <SkeletonReviewsMobile />
          </div>
          <div className={styles.reviewContainerLoading}>
            <SkeletonReviewsMobile />
          </div>
        </>
      ) : (
        <>
          {responseReviews.map((review) => (
            <div className={styles.reviewContainer} key={review.id}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewName}>{review.name}</div>
                <div className={styles.reviewDate}>{review.date}</div>
                <div
                  className={cn(styles.reviewStars, {
                    [styles.reviewStarsActiveOne]: review.stars === 1,
                    [styles.reviewStarsActiveTwo]: review.stars === 2,
                    [styles.reviewStarsActiveThree]: review.stars === 3,
                    [styles.reviewStarsActiveThour]: review.stars === 4,
                    [styles.reviewStarsActiveFive]: review.stars === 5,
                  })}
                >
                  <div>
                    <Star />
                  </div>
                  <div>
                    <Star />
                  </div>
                  <div>
                    <Star />
                  </div>
                  <div>
                    <Star />
                  </div>
                  <div>
                    <Star />
                  </div>
                </div>
              </div>
              <div className={styles.reviewText}>{review.reviews}</div>
            </div>
          ))}
        </>
      )}
      {formAddReview ? (
        <>
          <div className={styles.newReviewHeaderContainer}>
            <div className={styles.newReviewHeaderText}>?????????? ??????????</div>
            <div onClick={closedForm} className={styles.formReviewClosed}>
              X
            </div>
          </div>
          {confirmationClosedForm && (
            <div className={styles.confirmationClosedFormContainer}>
              <div className={styles.confirmationClosedFormText}>
                ?????? ?????????????????????? ???????????? ?????????? ??????????????
              </div>
              <div className={styles.confirmationClosedFormBtn}>
                <button onClick={confirmationClosedFormDelete}>??????????????</button>
                <button onClick={confirmationClosedFormCancel}>????????????</button>
              </div>
            </div>
          )}
          <div className={styles.formAddReview}>
            <div className={stylesFormAddReviewName}>
              <input
                value={newReviewData.name}
                onChange={(e) => setNewReviewData({ ...newReviewData, name: e.target.value })}
                maxLength={15}
                placeholder="???????? ??????"
              />
              <div className={stylesCounterStars} onMouseOut={mouseOut}>
                <Star onClick={activeStarOne} onMouseOver={mouseOverOne} />
                <Star onClick={activeStarTwo} onMouseOver={mouseOverTwo} />
                <Star onClick={activeStarThree} onMouseOver={mouseOverThree} />
                <Star onClick={activeStarThour} onMouseOver={mouseOverThour} />
                <Star onClick={activeStarFive} onMouseOver={mouseOverFive} />
              </div>
            </div>
            <div className={stylesFormAddReviewText}>
              <textarea
                value={newReviewData.reviewText}
                onChange={(e) => {
                  setNewReviewData({
                    ...newReviewData,
                    reviewText: e.target.value,
                  })
                }}
                maxLength={500}
                placeholder="?????????????? ??????????"
              />
            </div>
          </div>
          {newReviewDataLengthError ? (
            <div className={styles.reviewTextLengthErrContainer}>
              <div className={styles.reviewTextLengthErr}>
                ???? ?????????? ???????????????????????? ???????????????????? ????????????????
              </div>
            </div>
          ) : null}
        </>
      ) : null}
      <div onClick={onFormAddReview} className={stylesAddReview}>
        ???????????????? ??????????
      </div>
      {addReviewErrNotAuthorization ? (
        <div className={styles.addReviewErrNotAuthorization}>
          ?????? ???? ???????????????? ???????? ??????????, ?????? ???????????????????? ????????????????????????????.
          <div>?????????????? ?????? ?????????? ?? ?????????? ??????????.</div>
        </div>
      ) : null}
      {addReviewErrRepeat ? (
        <div className={styles.addReviewErrRepeat}>???? ?????? ?????????????????? ???????? ?????????? ??????????</div>
      ) : null}
      {addReviewErrData ? (
        <div className={styles.addReviewErrData}>{addReviewErrDataText}</div>
      ) : null}
    </div>
  )
}
