/// Информация о пользователе
export interface ICurrentPersonalInfo {
  id: string;
}
export interface ICoincidencePassword {
  id: string;
  oldPassword: string;
}
export interface IPersonalInfo {
  id: string;
  name: string;
  lastName: string;
  email: string;
  telefone: string;
}

/// Информация о новом адресе доставки
export interface IDeliveryAddress {
  id: string;
  newAddress: string;
}

// Отзывы
export interface IReview {
  id: string;
  name: string;
  reviews: string;
  stars: number;
  date: string;
}

// Корзина
export interface ICard {
  id: string;
  img: string;
  name: string;
  info: string;
  price: string;
}

// Пользователи
export interface IUser {
  id: number;
  login: string;
  password: string;
}
