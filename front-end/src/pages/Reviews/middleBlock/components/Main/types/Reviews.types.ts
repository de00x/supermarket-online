import { Key } from 'react'

interface IReviewsData {
  name: string
  stars: number
  reviews: string
}
interface IResponse {
  id: Key
  date: string
  name: string
  stars: number
  reviews: string
}
interface IRSControllersProps {
  counterStars: number
  currentProblem: string
  reviewsData: IReviewsData
  formAddNewReview: boolean
}
interface IReviewsControllersProps {
  reviewsData: IReviewsData
  responseReviews: IResponse[]
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setUserNotAuth: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentProblem: React.Dispatch<React.SetStateAction<string>>
  setFormAddNewReview: React.Dispatch<React.SetStateAction<boolean>>
  setReviewsData: React.Dispatch<React.SetStateAction<IReviewsData>>
  setResponseReviews: React.Dispatch<React.SetStateAction<IResponse[]>>
  setRepeatUserOfNewReview: React.Dispatch<React.SetStateAction<boolean>>
  setAddNewReviewSuccessText: React.Dispatch<React.SetStateAction<boolean>>
}

export type { IReviewsData, IResponse, IReviewsControllersProps, IRSControllersProps }
