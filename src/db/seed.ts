import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  const startOfWeek = dayjs().startOf('week')

  await db.delete(goalCompletions)
  await db.delete(goals)

  const goalsInserted = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Me exercitar', desiredWeeklyFrequency: 3 },
      { title: 'Meditar', desiredWeeklyFrequency: 1 },
    ])
    .returning()

  await db.insert(goalCompletions).values([
    { goalId: goalsInserted[0].id, createdAt: startOfWeek.toDate() },
    {
      goalId: goalsInserted[1].id,
      createdAt: startOfWeek.add(1, 'day').toDate(),
    },
  ])
}

seed().finally(() => {
  client.end()
})
