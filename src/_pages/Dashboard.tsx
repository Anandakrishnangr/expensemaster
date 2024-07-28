import React from 'react'
import CreateTransaction from './createTransactions'
import CreateCategory from './createCategory'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { openCreateTransactinModal } from '../redux/modalSlice'

const Dashboard = () => {
  let Dispatch = useDispatch()
  const handleCreateTransaction = () => {
    Dispatch(openCreateTransactinModal({ open: true, id: null, data: null }))
  }
  return (
    <div>
      <Button onClick={handleCreateTransaction}>Create Trasaction</Button>
      <CreateCategory />
    </div>
  )
}

export default Dashboard
