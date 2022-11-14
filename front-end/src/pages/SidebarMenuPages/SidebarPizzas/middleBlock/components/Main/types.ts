export interface IPizzas {
  id: string;
  img: string;
  name: string;
  info: string;
  price: number;
  count: number;
  types?: number[];
  sizes?: number[];
}

export interface CartSliceState {
  totalPrice: number;
  items: IPizzas[];
}
