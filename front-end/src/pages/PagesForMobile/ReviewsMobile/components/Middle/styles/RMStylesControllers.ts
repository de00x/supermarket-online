import { IRMStylesControllersProps } from '../types/ReviewsM.types'
import styles from '../styles/styles.module.scss'
import cn from 'classnames'

const RMStylesControllers = ({
  newReviewData,
  countActiveStar,
  checkedActiveStar,
  addReviewErrRepeat,
}: IRMStylesControllersProps) => {
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
      [styles.countStarsActiveOne]: countActiveStar === 1 || checkedActiveStar === 1,
    },
    {
      [styles.countStarsActiveTwo]: countActiveStar === 2 || checkedActiveStar === 2,
    },
    {
      [styles.countStarsActiveThree]: countActiveStar === 3 || checkedActiveStar === 3,
    },
    {
      [styles.countStarsActiveThour]: countActiveStar === 4 || checkedActiveStar === 4,
    },
    {
      [styles.countStarsActiveFive]: countActiveStar === 5 || checkedActiveStar === 5,
    }
  )
  return { stylesFormAddReviewText, stylesFormAddReviewName, stylesAddReview, stylesCounterStars }
}
export default RMStylesControllers
