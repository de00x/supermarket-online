import { SkeletonReviewsMobile } from '../../../../Skeletons'
import { ReactComponent as Star } from './img/star.svg'
import { IResponse, IReviewData } from './types'
import { FC, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import cn from 'classnames'
import styles from './styles.module.scss'

export const Middle: FC = (): JSX.Element => {
  const [responseReviews, setResponseReviews] = useState<IResponse[]>([])
  const [addReviewErrDataText, setAddReviewErrDataText] = useState('')
  const [addReviewErrNotAuthorization, setAddReviewErrNotAuthorization] =
    useState(false)
  const [confirmationClosedForm, setConfirmationClosedForm] = useState(false)
  const [addReviewErrRepeat, setAddReviewErrRepeat] = useState(false)
  const [addReviewErrData, setAddReviewErrData] = useState(false)
  const [formAddReview, setFormAddReview] = useState(false)
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [successCreateNewReviewText, setSuccessCreateNewReviewText] =
    useState(false)
  const [countActiveStar, setCountActiveStar] = useState(0)
  const [checkedActiveStar, setCheckedActiveStar] = useState(0)
  const [newReviewData, setNewReviewData] = useState<IReviewData>({
    name: '',
    reviewText: '',
    stars: 0,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    axios
      .get('/reviews')
      .then((res) => {
        onResponseAllReviews(res)
      })
      .catch((err) => console.log('errReviewsMobile', err))
  }, [formAddReview])

  /// styles ///
  const stylesFormAddReviewText = cn(styles.formAddReviewText, {
    [styles.formAddReviewTextErr]: newReviewData.reviewText.length === 500,
  })
  const stylesFormAddReviewName = cn(styles.formAddReviewHeader, {
    [styles.formAddReviewHeaderErr]: newReviewData.name.length === 15,
  })
  const stylesAddReview = cn(styles.addReview, {
    [styles.addReviewActive]: addReviewErrRepeat,
  })
  const stylesCounterStars = cn(
    styles.countStarsContainer,
    {
      [styles.countStarsActiveOne]:
        countActiveStar === 1 || checkedActiveStar === 1,
    },
    {
      [styles.countStarsActiveTwo]:
        countActiveStar === 2 || checkedActiveStar === 2,
    },
    {
      [styles.countStarsActiveThree]:
        countActiveStar === 3 || checkedActiveStar === 3,
    },
    {
      [styles.countStarsActiveThour]:
        countActiveStar === 4 || checkedActiveStar === 4,
    },
    {
      [styles.countStarsActiveFive]:
        countActiveStar === 5 || checkedActiveStar === 5,
    }
  )
  /// styles ///

  /// onClick ///
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
    if (
      newReviewData.name.length === 0 &&
      newReviewData.reviewText.length === 0
    ) {
      setFormAddReview(false)
    } else setConfirmationClosedForm(true)
  }
  const mouseOut = (): void => {
    setCountActiveStar(0)
  }
  /// onClick ///

  /// longLogic ///
  const newReviewDataLengthError =
    newReviewData.reviewText.length === 500 || newReviewData.name.length === 15
  const checkErrReqNewReview =
    newReviewData.name.length > 1 &&
    newReviewData.reviewText.length > 9 &&
    newReviewData.stars > 0
  /// longLogic ///

  return (
    <div className={styles.middleContainer}>
      <div className={styles.middleHeader}>Отзывы</div>
      {successCreateNewReviewText ? (
        <div className={styles.successReviewText}>
          Благодарим Вас за оставленный Вами отзыв, желаем всего хорошего !
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
            <div className={styles.newReviewHeaderText}>Новый отзыв</div>
            <div onClick={closedForm} className={styles.formReviewClosed}>
              X
            </div>
          </div>
          {confirmationClosedForm && (
            <div className={styles.confirmationClosedFormContainer}>
              <div className={styles.confirmationClosedFormText}>
                Все заполненные данные будут удалены
              </div>
              <div className={styles.confirmationClosedFormBtn}>
                <button onClick={confirmationClosedFormDelete}>Удалить</button>
                <button onClick={confirmationClosedFormCancel}>Отмена</button>
              </div>
            </div>
          )}
          <div className={styles.formAddReview}>
            <div className={stylesFormAddReviewName}>
              <input
                value={newReviewData.name}
                onChange={(e) =>
                  setNewReviewData({ ...newReviewData, name: e.target.value })
                }
                maxLength={15}
                placeholder="Ваше имя"
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
                placeholder="Введите отзыв"
              />
            </div>
          </div>
          {newReviewDataLengthError ? (
            <div className={styles.reviewTextLengthErrContainer}>
              <div className={styles.reviewTextLengthErr}>
                Вы ввели максимальное количество символов
              </div>
            </div>
          ) : null}
        </>
      ) : null}
      <div onClick={onFormAddReview} className={stylesAddReview}>
        Добавить отзыв
      </div>
      {addReviewErrNotAuthorization ? (
        <div className={styles.addReviewErrNotAuthorization}>
          Что бы оставить свой отзыв, вам необходимо авторизоваться.
          <div>Сделать это можно в шапке сайта.</div>
        </div>
      ) : null}
      {addReviewErrRepeat ? (
        <div className={styles.addReviewErrRepeat}>
          Вы уже оставляли свой отзыв ранее
        </div>
      ) : null}
      {addReviewErrData ? (
        <div className={styles.addReviewErrData}>{addReviewErrDataText}</div>
      ) : null}
    </div>
  )
}
