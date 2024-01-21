import { z } from 'zod'


export const LoginUser = z.object({
    email: z.string().email(),
    password: z.string()
})

export type TLoginUser = z.infer<typeof LoginUser>;