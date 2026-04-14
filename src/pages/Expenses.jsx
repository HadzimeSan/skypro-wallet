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

function sumByCategory(items) {
  return items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount
    return acc
  }, {})
}

export default function ExpensesPage() {
  const [filterCategory, setFilterCategory] = useState('Все')
  const [sortMode, setSortMode] = useState('date-desc')

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

  const visibleExpenses = useMemo(() => {
    let items = expenses

    if (filterCategory !== 'Все') {
      items = items.filter((i) => i.category === filterCategory)
    }

    items = [...items]
    items.sort((a, b) => {
      if (sortMode === 'date-desc') return b.date.localeCompare(a.date)
      if (sortMode === 'date-asc') return a.date.localeCompare(b.date)
      if (sortMode === 'amount-desc') return b.amount - a.amount
      if (sortMode === 'amount-asc') return a.amount - b.amount
      return 0
    })

    return items
  }, [expenses, filterCategory, sortMode])

  const totalSum = visibleExpenses.reduce((acc, item) => acc + item.amount, 0)
  const categorySums = sumByCategory(visibleExpenses)

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

          <div className="row" style={{ marginBottom: 8 }}>
            <div className="field select">
              <label htmlFor="filter-category">Категория</label>
              <select
                id="filter-category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="Все">Все</option>
                {CATEGORIES.map((c) => (
                  <option key={c.label} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field select">
              <label htmlFor="sort-mode">Сортировка</label>
              <select id="sort-mode" value={sortMode} onChange={(e) => setSortMode(e.target.value)}>
                <option value="date-desc">Сначала новые</option>
                <option value="date-asc">Сначала старые</option>
                <option value="amount-desc">Сумма (больше)</option>
                <option value="amount-asc">Сумма (меньше)</option>
              </select>
            </div>
          </div>

          <div className="expenses-metrics">
            <div>
              <div className="metric-caption">Общая сумма</div>
              <div className="metric-value">{totalSum} ₽</div>
            </div>
            <div className="metric-categories">
              {CATEGORIES.map((c) => (
                <span key={c.label}>
                  {c.label}: {categorySums[c.label] || 0} ₽
                </span>
              ))}
            </div>
          </div>

          <table className="table">
          <thead>
            <tr>
              <th>Категория</th>
              <th>Описание</th>
              <th>Дата</th>
              <th>Сумма</th>
              <th className="cell-icon-header"></th>
            </tr>
          </thead>
          <tbody>
            {visibleExpenses.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
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

