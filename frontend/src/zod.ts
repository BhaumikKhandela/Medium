import z from "zod"


export const signupSchema = z.object({
    email: z.string().email(),
    name : z.string(),
    password: z.string().min(6).max(18)
});
export const signinSchema = z.object({
    email: z.string().email(),
   
    password: z.string().min(6).max(18)
});

export const blogCreateSchema = z.object({
    title: z.string(),
    content: z.string(),

});

export const blogUpdateSchema = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
});



export type SignupSchemaType = z.infer<typeof signupSchema>;
export type SigninSchemaType = z.infer<typeof signinSchema>;
export type BlogCreateSchemaType = z.infer<typeof blogCreateSchema>
export type BlogUpdateSchemaType = z.infer<typeof blogUpdateSchema>