import fastify from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import z from 'zod'
import { createGoalCompletion } from '../services/create-goal-completion'
import { createGoal } from '../services/create-goals'
import { getWeekPendingGoals } from '../services/get-week-pending-goals'

const GoalSchema = z.object({
  title: z.string(),
  desiredWeeklyFrequency: z.number().int().min(1).max(7),
})

const CompletionsSchema = z.object({
  goalId: z.string(),
})

type GoalRequest = z.infer<typeof GoalSchema>
type CompletionsRequest = z.infer<typeof CompletionsSchema>

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

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

app.get('/pending-goals', async request => {
  const { pendingGoals } = await getWeekPendingGoals()

  return { pendingGoals }
})

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

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Running')
})
