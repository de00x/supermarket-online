import { FC } from 'react'
import { PathRouteProps, Route, Routes } from 'react-router-dom'

type TRouting = {
  config: PathRouteProps[]
}

export const Routing: FC<TRouting> = ({ config }) => {
  return (
    <Routes>
      {config.map((rout) => (
        <Route key={rout.path} {...rout} />
      ))}
    </Routes>
  )
}
