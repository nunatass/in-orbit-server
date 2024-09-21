import { getWeekSummary } from '@/services/get-week-summary'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get('/summary', async request => {
    const { summary } = await getWeekSummary()

    return { summary }
  })
}
