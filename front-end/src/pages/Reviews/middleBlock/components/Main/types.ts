import { Key } from 'react'

export interface IReviewsData {
  name: string
  reviews: string
  stars: number
}
export interface IResponse {
  id: Key
  name: string
  reviews: string
  stars: number
  date: string
}
