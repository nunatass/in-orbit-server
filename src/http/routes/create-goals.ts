import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createGoal } from '../../services/create-goals'

const GoalSchema = z.object({
  title: z.string(),
  desiredWeeklyFrequency: z.number().int().min(1).max(7),
})

type GoalRequest = z.infer<typeof GoalSchema>

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post<{ Body: GoalRequest }>(
    '/goals',
    {
      schema: {
        body: GoalSchema,
      },
    },
    async (request, reply) => {
      const { title, desiredWeeklyFrequency } = request.body

      await createGoal({
        title,
        desiredWeeklyFrequency,
      })

      reply.send({ message: 'Goal created successfully' })
    }
  )
}
