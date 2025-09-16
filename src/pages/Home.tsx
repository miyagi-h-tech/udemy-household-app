import React, { useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calendar from '../components/Calendar'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Box } from '@mui/material'
import { Transaction } from '../types'
import { format } from 'date-fns';
import { Schema } from '../validations/schema'

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  onDeleteTransaction: (transactionId: string) => Promise<void>;
  onUpdateTransaction: (Transaction: Schema, transactionId: string) => Promise<void>;
}

const Home = ({ monthlyTransactions, setCurrentMonth, onSaveTransaction, onDeleteTransaction, onUpdateTransaction }: HomeProps) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrowerOpen, setIsEntryDrowerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // カレンダーで選択した日付のデータをfilterで取得
  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay
  });

  const closeForm = () => {
    setIsEntryDrowerOpen(!isEntryDrowerOpen)
    setSelectedTransaction(null);
  }

  // フォームの開閉処理
  const handleAddTransactionForm = () => {
    if (selectedTransaction) {
      setSelectedTransaction(null);
    } else {
      setIsEntryDrowerOpen(!isEntryDrowerOpen);
    }
  }

  //取引が選択されたときの処理
  const handleSelectTransaction = (transaction: Transaction) => {
    setIsEntryDrowerOpen(true);
    setSelectedTransaction(transaction);
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
          onSelectTransaction={handleSelectTransaction}
        />
        <TransactionForm
          isEntryDrowerOpen={isEntryDrowerOpen}
          onCloseForm={closeForm}
          currentDay={currentDay}
          onSaveTransaction={onSaveTransaction}
          selectedTransaction={selectedTransaction}
          onDeleteTransaction={onDeleteTransaction}
          setSelectedTransaction={setSelectedTransaction}
          onUpdateTransaction={onUpdateTransaction}
        />
      </Box>
    </Box>
  )
}

export default Home