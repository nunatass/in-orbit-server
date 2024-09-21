import fastify from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import fastifyCors from '@fastify/cors'
import { createCompletionsRoute } from './routes/create-completions'
import { createGoalRoute } from './routes/create-goals'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: '*',
})

app.register(createGoalRoute)
app.register(getPendingGoalsRoute)
app.register(createCompletionsRoute)
app.register(getWeekSummaryRoute)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Running')
})
