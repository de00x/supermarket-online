import { Key } from 'react'

interface IResponse {
  id: Key
  name: string
  reviews: string
  stars: number
  date: string
}
interface IReviewData {
  name: string
  reviewText: string
  stars: number
}
interface IRMStylesControllersProps {
  newReviewData: IReviewData
  countActiveStar: number
  checkedActiveStar: number
  addReviewErrRepeat: boolean
}
interface IRMControllersProps {
  formAddReview: boolean
  newReviewData: IReviewData
  responseReviews: IResponse[]
  setIsLoadingPage: React.Dispatch<React.SetStateAction<boolean>>
  setFormAddReview: React.Dispatch<React.SetStateAction<boolean>>
  setCountActiveStar: React.Dispatch<React.SetStateAction<number>>
  setAddReviewErrData: React.Dispatch<React.SetStateAction<boolean>>
  setCheckedActiveStar: React.Dispatch<React.SetStateAction<number>>
  setNewReviewData: React.Dispatch<React.SetStateAction<IReviewData>>
  setAddReviewErrRepeat: React.Dispatch<React.SetStateAction<boolean>>
  setAddReviewErrDataText: React.Dispatch<React.SetStateAction<string>>
  setResponseReviews: React.Dispatch<React.SetStateAction<IResponse[]>>
  setConfirmationClosedForm: React.Dispatch<React.SetStateAction<boolean>>
  setSuccessCreateNewReviewText: React.Dispatch<React.SetStateAction<boolean>>
  setAddReviewErrNotAuthorization: React.Dispatch<React.SetStateAction<boolean>>
}
export type { IResponse, IReviewData, IRMControllersProps, IRMStylesControllersProps }
