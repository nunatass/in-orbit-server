import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getWeekPendingGoals } from '../../services/get-week-pending-goals'

const CompletionsSchema = z.object({
  goalId: z.string(),
})

type CompletionsRequest = z.infer<typeof CompletionsSchema>

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/pending-goals', async request => {
    const { pendingGoals } = await getWeekPendingGoals()

    return { pendingGoals }
  })
}
