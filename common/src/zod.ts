import z from "zod"


export const signupSchema = z.object({
    email: z.string().email(),
    name : z.string().optional(),
    password: z.string().min(6).max(18)
});

export type SignupSchemaType = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
    email: z.string().email(),
    name : z.string().optional(),
    password: z.string().min(6).max(18)
});

export type SigninSchemaType = z.infer<typeof signupSchema>;



export const blogCreateSchema = z.object({
    title: z.string(),
    content: z.string(),

});

export type BlogCreateSchemaType = z.infer<typeof blogCreateSchema>

export const blogUpdateSchema = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
});

export type BlogUpdateSchemaType = z.infer<typeof blogUpdateSchema>