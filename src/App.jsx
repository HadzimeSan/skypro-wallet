import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import LoginPage from './pages/Login.jsx'
import RegisterPage from './pages/Register.jsx'
import MainPage from './pages/Main.jsx'
import ExpensesPage from './pages/Expenses.jsx'
import AnalysisPage from './pages/Analysis.jsx'

function AppLayout() {
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<AppLayout />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/main" replace />} />
    </Routes>
  )
}
