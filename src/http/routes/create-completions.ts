import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createGoalCompletion } from '../../services/create-goal-completion'

const CompletionsSchema = z.object({
  goalId: z.string(),
})

type CompletionsRequest = z.infer<typeof CompletionsSchema>

export const createCompletionsRoute: FastifyPluginAsyncZod = async app => {
  app.post<{ Body: CompletionsRequest }>(
    '/completions',
    {
      schema: {
        body: CompletionsSchema,
      },
    },
    async (request, reply) => {
      const { goalId } = request.body

      await createGoalCompletion({ goalId })
    }
  )
}
