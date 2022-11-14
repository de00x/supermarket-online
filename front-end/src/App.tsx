import { FC } from 'react'
import { Routing } from './routing'
import { mainRouts } from './routing/routes'

const App: FC = (): JSX.Element => {
  return <Routing config={mainRouts} />
}
export default App
