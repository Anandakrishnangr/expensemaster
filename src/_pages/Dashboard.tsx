import React from 'react'
import CreateTransaction from './createTransactions'
import CreateCategory from './createCategory'

const Dashboard = () => {
  return (
    <div>
       <CreateTransaction />
       <CreateCategory />
    </div>
  )
}

export default Dashboard
