// Imports
import React from 'react'
import clsx from 'clsx'

// UI imports
import style from './style.module.scss'

// Component
export const Wrapper = ({ children, className = '', ...props }) => {
  return (
    <div className={clsx(style.wrapper, className)} {...props}>
      {children}
    </div>
  )
}
