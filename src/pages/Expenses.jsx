import { useMemo, useState } from 'react'

import bagIcon from '../../../bag.png'
import carIcon from '../../../car.png'
import houseIcon from '../../../house.png'
import gameboyIcon from '../../../gameboy.png'
import educationIcon from '../../../Vector.png'
import otherIcon from '../../../message-text.png'
import selectedCategoryIcon from '../../../Frame 1511838850.png'

const CATEGORIES = [
  { label: 'Еда', icon: bagIcon },
  { label: 'Транспорт', icon: carIcon },
  { label: 'Жилье', icon: houseIcon },
  { label: 'Развлечения', icon: gameboyIcon },
  { label: 'Образование', icon: educationIcon },
  { label: 'Другое', icon: otherIcon },
]

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2026-03-01', category: 'Еда', description: 'Обед', amount: 650 },
    { id: 2, date: '2026-03-03', category: 'Транспорт', description: 'Проезд', amount: 120 },
    { id: 3, date: '2026-03-10', category: 'Другое', description: 'Покупка', amount: 980 },
  ])

  const [newExpense, setNewExpense] = useState({
    date: '2026-03-23',
    category: 'Еда',
    description: '',
    amount: '',
  })

  const visibleExpenses = useMemo(
    () => [...expenses].sort((a, b) => b.date.localeCompare(a.date)),
    [expenses],
  )

  const submitNew = (e) => {
    e.preventDefault()
    const amount = Number(newExpense.amount)
    if (!newExpense.description.trim() || !Number.isFinite(amount)) return

    setExpenses((prev) => [
      ...prev,
      {
        id: prev.reduce((m, x) => Math.max(m, x.id), 0) + 1,
        date: newExpense.date,
        category: newExpense.category,
        description: newExpense.description.trim(),
        amount,
      },
    ])

    setNewExpense({ date: newExpense.date, category: newExpense.category, description: '', amount: '' })
  }

  return (
    <div className="page expenses-page">
      <h1 className="section-title expenses-title">Мои расходы</h1>
      <div className="expenses-layout">
        <section className="card card--table">
          <h2 className="card-title">Таблица расходов</h2>

          <table className="table">
          <thead>
            <tr>
              <th>Описание</th>
              <th>Категория</th>
              <th>Дата</th>
              <th>Сумма</th>
              <th className="cell-icon-header"></th>
            </tr>
          </thead>
          <tbody>
            {visibleExpenses.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
                  <td>{`${item.amount} ₽`}</td>
                  <td>
                    <div className="cell-icon-wrap">
                      <img src={selectedCategoryIcon} alt="" className="cell-icon" />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </section>

        <section className="card card--form">
          <h2 className="card-title">Новый расход</h2>
          <form className="form" onSubmit={submitNew}>
            <div className="field">
              <label htmlFor="new-description">Описание</label>
              <input
                id="new-description"
                type="text"
                value={newExpense.description}
                placeholder="Введите описание"
                onChange={(e) => setNewExpense((p) => ({ ...p, description: e.target.value }))}
              />
            </div>

            <div className="field">
              <label htmlFor="new-category">Категория</label>
              <div id="new-category" className="category-chips" role="radiogroup" aria-label="Категория">
                {CATEGORIES.map((category) => {
                  const isActive = newExpense.category === category.label
                  return (
                    <button
                      key={category.label}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      className={isActive ? 'category-chip category-chip--active' : 'category-chip'}
                      onClick={() => setNewExpense((p) => ({ ...p, category: category.label }))}
                    >
                      <img src={category.icon} alt="" className="category-chip__icon" />
                      <span>{category.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="field">
              <label htmlFor="new-date">Дата</label>
              <input
                id="new-date"
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense((p) => ({ ...p, date: e.target.value }))}
              />
            </div>

            <div className="field">
              <label htmlFor="new-amount">Сумма</label>
              <input
                id="new-amount"
                type="number"
                value={newExpense.amount}
                placeholder="Введите сумму"
                onChange={(e) => setNewExpense((p) => ({ ...p, amount: e.target.value }))}
              />
            </div>

            <div className="form__actions">
              <button className="app-btn app-btn--primary" type="submit">
                Добавить новый расход
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

