import { FC, useState } from 'react'
import { IPizzas } from '../types'
import styles from '../styles.module.scss'

export const SortByTypeAndSize: FC<IPizzas> = ({ types, sizes }) => {
  const [activeSize, setActiveSize] = useState(0)
  const [activeType, setActiveType] = useState(0)
  const typeNames = ['тонкое', 'среднее']

  return (
    <div className={styles.setInfo}>
      <ul className={styles.typesUl}>
        {types?.map((typeId) => (
          <li
            key={typeId}
            onClick={() => setActiveType(typeId)}
            className={activeType === typeId ? styles.activeTypePizza : ''}
          >
            {typeNames[typeId]}
          </li>
        ))}
      </ul>
      <ul className={styles.sizesUl}>
        {sizes?.map((size, i) => (
          <li
            key={size}
            onClick={() => setActiveSize(i)}
            className={activeSize === i ? styles.activeTypeSize : ''}
          >
            {size} см
          </li>
        ))}
      </ul>
    </div>
  )
}
