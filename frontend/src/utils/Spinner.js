import React from 'react'
import LoadingSpinner from '../../src/assets/images/spinner.png'
import styles from './Spinner.module.css'

export const Spinner = () => {
  return (
    <div className={styles.spinnerContainer} >
        <img src={LoadingSpinner} className={styles.spinner} alt="Loading Spinner" />
    </div>
  )
}
