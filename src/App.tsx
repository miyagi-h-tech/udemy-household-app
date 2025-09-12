import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types/index';
import { db } from './firebase';
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';


function App() {

  // Firestoreエラーかどうかを判定する型ガード
  function isFireStoreError(err: unknown): err is {
    code: string, message: string
  } {
    return typeof err === "object" && err !== null && "code" in err
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  format(currentMonth, "yyyy-MM");

  useEffect(() => {
    const fetchTransactions = async () => {

      try {

        const querySnapshot = await getDocs(collection(db, "Transactions"))
        const transactionsData = querySnapshot.docs.map((doc) => {
          // console.log(doc.id, " => ", doc.data());
          return {
            ...doc.data(),
            id: doc.id
          } as Transaction // as　型定義をしてすることで、配列内に定義している要素がid以外にも含まれていることを明示する
        })

        setTransactions(transactionsData,);
      } catch (err) {
        //error
        if (isFireStoreError(err)) {
          console.log(`FireStoreの${err}`);
        } else {
          console.log(`一般的な${err}`);
        }
      }
    }

    fetchTransactions();

  }, [])

  // ひと月文のデータのみ取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth))
  })

  // 取引を保存する
  const handleSaveTransaction = async (transaction: Schema) => {
    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log("Document written with ID: ", docRef.id);

      const newTransactions = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      console.log(newTransactions);
      setTransactions((prevTansactions) => [...prevTansactions, newTransactions]);
    } catch (err) {
      //error
      if (isFireStoreError(err)) {
        console.log(`FireStoreの${err}`);
      } else {
        console.log(`一般的な${err}`);
      }
    }
  }

  const handleDeleteTransaction = async (transactionId: string) => {
    // firestoreのデータ削除
    try {
      await deleteDoc(doc(db, "Transactions", transactionId));
      // 削除したID以外の取引データを抽出
      const filterdTransactions = transactions.filter((transaction) => transaction.id !== transactionId);
      
      // 格納
      setTransactions(filterdTransactions);
    } catch (err) {
      //error
      if (isFireStoreError(err)) {
        console.log(`FireStoreの${err}`);
      } else {
        console.log(`一般的な${err}`);
      }
    }
  }

  // console.log(monthlyTransactions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                />}>
            </Route>
            <Route path="/report" element={<Report />}></Route>
            <Route path="*" element={<NoMatch />}></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
