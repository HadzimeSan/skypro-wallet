import { useMemo, useState } from 'react'

const dummyData = [
  { label: 'Еда', value: 12 },
  { label: 'Транспорт', value: 6 },
  { label: 'Другое', value: 9 },
]

function CalendarStub({ periodType }) {
  const days = useMemo(() => {
    const base = new Date('2026-03-01T00:00:00.000Z')
    return Array.from({ length: 20 }).map((_, i) => {
      const d = new Date(base)
      d.setUTCDate(d.getUTCDate() + i)
      return d.toISOString().slice(0, 10)
    })
  }, [])

  return (
    <div className="calendar" aria-label="Календарь периода (заглушка)">
      <div style={{ fontWeight: 800, marginBottom: 6 }}>Период: {periodType}</div>
      <div className="calendar__radio">
        <div style={{ fontWeight: 700, opacity: 0.85 }}>Быстрый выбор</div>
      </div>
      <div className="calendar__scroll">
        {days.map((date, idx) => (
          <div key={date} className={idx === 2 ? 'calendar__day calendar__day--active' : 'calendar__day'}>
            <span style={{ minWidth: 76 }}>{date}</span>
            <span style={{ color: '#0f5132', fontWeight: 700 }}>•</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AnalysisPage() {
  const [periodType, setPeriodType] = useState('По дням')

  return (
    <div className="page">
      <h1 className="section-title">Анализ расходов</h1>

      <section>
        <div className="calendar__radio" aria-label="Выбор периода">
          {['По дням', 'По неделям', 'По месяцам', 'По годам'].map((t) => (
            <button
              key={t}
              type="button"
              className={t === periodType ? 'app-btn app-btn--active' : 'app-btn app-btn--ghost'}
              onClick={() => setPeriodType(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <CalendarStub periodType={periodType} />
      </section>

      <section style={{ marginTop: 26 }}>
        <h2 className="section-title" style={{ fontSize: 20, marginBottom: 10 }}>
          Диаграмма (заглушка)
        </h2>

        <div className="diagram" aria-label="Диаграмма по категориям (заглушка)">
          {(() => {
            const max = Math.max(...dummyData.map((d) => d.value))
            return dummyData.map((d) => {
              const height = Math.round((d.value / max) * 100)
              return (
                <div key={d.label} style={{ flex: '1 1 0', textAlign: 'center' }}>
                  <div className="bar" style={{ height: `${height}%` }} />
                  <div style={{ marginTop: 8, fontWeight: 700 }}>{d.label}</div>
                </div>
              )
            })
          })()}
        </div>
      </section>
    </div>
  )
}

