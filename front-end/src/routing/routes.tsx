import { Beverages } from '../pages/SidebarMenuPages/SidebarBeverages'
import { CornDog } from '../pages/SidebarMenuPages/SidebarCornDogs'
import { Stocks } from '../pages/SidebarMenuPages/SidebarStocks'
import { Pizzas } from '../pages/SidebarMenuPages/SidebarPizzas'
import { Rolls } from '../pages/SidebarMenuPages/SidebarRolls'
import { Sushi } from '../pages/SidebarMenuPages/SidebarSushi'
import { Sets } from '../pages/SidebarMenuPages/SidebarSets'
import { Wok } from '../pages/SidebarMenuPages/SidebarWok'
import { PersonalAccount } from '../pages/PersonalAccount'
// eslint-disable-next-line import/named
import { PathRouteProps } from 'react-router-dom'
import { Registered } from '../pages/Registered'
import { Delivery } from '../pages/Delivery'
import { Reviews } from '../pages/Reviews'
import { Basket } from '../pages/Basket'
import { Main } from '../pages/Main'

export const mainRouts: PathRouteProps[] = [
  {
    path: '*',
    element: <Main />,
  },
  {
    path: '/personal',
    element: <PersonalAccount />,
  },
  {
    path: '/registered',
    element: <Registered />,
  },
  {
    path: '/beverages',
    element: <Beverages />,
  },
  {
    path: '/delivery',
    element: <Delivery />,
  },
  {
    path: '/cornDogs',
    element: <CornDog />,
  },
  {
    path: '/reviews',
    element: <Reviews />,
  },
  {
    path: '/pizzas',
    element: <Pizzas />,
  },
  {
    path: '/stocks',
    element: <Stocks />,
  },
  {
    path: '/basket',
    element: <Basket />,
  },
  {
    path: '/sushi',
    element: <Sushi />,
  },
  {
    path: '/rolls',
    element: <Rolls />,
  },
  {
    path: '/main',
    element: <Main />,
  },
  {
    path: '/sets',
    element: <Sets />,
  },
  {
    path: '/wok',
    element: <Wok />,
  },
]
