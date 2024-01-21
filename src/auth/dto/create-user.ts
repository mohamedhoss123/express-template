import { z } from 'zod'


export const CreateUser = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string()
})

export type TCreateUser = z.infer<typeof CreateUser>;