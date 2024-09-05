import z from 'zod'
import 'dotenv/config'

const EnvSchema = z.object({
  PORT: z.coerce.number(),
  DATE_NAGER_URL: z.string().url(),
  COUNTRIES_NOW_URL: z.string().url(),
})

export const env = EnvSchema.parse(process.env)
