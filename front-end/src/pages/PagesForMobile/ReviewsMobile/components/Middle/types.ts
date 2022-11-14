import { Key } from 'react'

export interface IResponse {
  id: Key
  name: string
  reviews: string
  stars: number
  date: string
}
export interface IReviewData {
  name: string
  reviewText: string
  stars: number
}
