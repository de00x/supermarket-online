import styles from '../styles/styles.module.scss'
import cn from 'classnames'
import { IRSControllersProps } from '../types/Reviews.types'

const ReviewsSControllers = ({
  reviewsData,
  counterStars,
  currentProblem,
  formAddNewReview,
}: IRSControllersProps) => {
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
  return { stylesStarsContainer, stylesAddReviewsBtn, stylesFormTextarea, stylesFormHeader }
}
export default ReviewsSControllers
