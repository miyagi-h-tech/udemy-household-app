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
import { collection, getDocs } from 'firebase/firestore';


function App() {

  // Firestoreエラーかどうかを判定する型ガード
  function isFireStoreError(err: unknown): err is {
    code: string, message: string
  } {
    return typeof err === "object" && err !== null && "code" in err
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);

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

        console.log(transactionsData);
        setTransactions(transactionsData,);
      } catch (err) {
        //error
        if (isFireStoreError(err)) {
          console.log(err);
          console.log(err.message);
          console.log(err.code);
        } else {
          console.log(`一般的な${err}`);
        }
      }
    }

    fetchTransactions();

  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="/report" element={<Report />}></Route>
            <Route path="*" element={<NoMatch />}></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
