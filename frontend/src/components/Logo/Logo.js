import React from 'react'
import classes from './Logo.module.css'

const logo = () => (
  <div className={classes.Logo}>
    <img
      className="h-100 w-auto"
      width="280"
      height="280"
      src={'./img/Logo.png'}
      alt="shop"
    />
  </div>
)

export default logo
