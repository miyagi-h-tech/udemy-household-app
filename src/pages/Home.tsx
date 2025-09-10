import React, { useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calendar from '../components/Calendar'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Box } from '@mui/material'
import { Transaction } from '../types'
import { format } from 'date-fns';

interface HomeProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrowerOpen, setIsEntryDrowerOpen] = useState(false);

  // カレンダーで選択した日付のデータをfilterで取得
  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay
  });

  const closeForm = () => {
    setIsEntryDrowerOpen(!isEntryDrowerOpen)
  }

  // フォームの開閉処理
  const handleAddTransactionForm = () => {
    setIsEntryDrowerOpen(!isEntryDrowerOpen);
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* 左側コンテンツ */}
      <Box sx={{ flexGrow: 1, }}>
        <MonthlySummary
          monthlyTransactions={monthlyTransactions}
        />
        <Calendar
          monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          today={today}
        />
      </Box>
      {/* 右側コンテンツ */}
      <Box>
        <TransactionMenu
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
          onAddTransactionForm={handleAddTransactionForm}
        />
        <TransactionForm
          isEntryDrowerOpen={isEntryDrowerOpen}
          onCloseForm={closeForm}
          currentDay={currentDay}
        />
      </Box>
    </Box>
  )
}

export default Home