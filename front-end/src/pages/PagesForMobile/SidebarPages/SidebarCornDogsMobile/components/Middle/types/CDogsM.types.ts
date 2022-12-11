interface ICornDogs {
  id: string
  img: string
  name: string
  info: string
  price: number
  count: number
  url?: string
}
interface ICDStyleControllersProps {
  sortBy: string
}
interface ICDogsMControllersProps {
  allCornDogs: ICornDogs[]
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setSortFly: React.Dispatch<React.SetStateAction<boolean>>
  setErrNotAuth: React.Dispatch<React.SetStateAction<boolean>>
  setAllCornDogs: React.Dispatch<React.SetStateAction<ICornDogs[]>>
}
export type { ICornDogs, ICDogsMControllersProps, ICDStyleControllersProps }
