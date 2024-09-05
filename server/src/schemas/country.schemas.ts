import { z } from 'zod'

export const ContryInfoSchema = z.object({
  countryCode: z
    .string({ required_error: 'please inform the country code' })
    .max(2, 'The country code must be only two letters long'),
})
