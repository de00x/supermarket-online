import { FC } from 'react'
// eslint-disable-next-line import/named
import { PathRouteProps, Route, Routes } from 'react-router-dom'

interface IRouting {
  config: PathRouteProps[]
}

export const Routing: FC<IRouting> = ({ config }) => {
  return (
    <Routes>
      {config.map((rout) => (
        <Route key={rout.path} {...rout} />
      ))}
    </Routes>
  )
}
