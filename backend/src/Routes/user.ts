import { Hono } from "hono";
import {PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import {decode ,sign, verify } from 'hono/jwt';

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL : string,
        SECRET_KEY : string
    }
}>();



userRouter.post('/signup', async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
  const body = await c.req.json();
  try{
    const user = await prisma.user.create({
      data: {
   email: body.email,
   password: body.password,
   name: body.name
      }
    })
  const token = await sign({id: user.id}, c.env.SECRET_KEY);
    return c.json({
      jwt: token
    })
  }catch(e){
    console.log(e);
    c.status(400);
    c.json({
      msg: "Couldn't create the blog"
    });
  }
   
  });
  userRouter.post('/signin', async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where:{
        email : body.email,
        password : body.password
      }
    });
    
    if(user==null){
      c.status(403);
      return c.json({error : "User not found"});
    }
    const token = await sign({id: user.id}, c.env.SECRET_KEY);
    return c.json({
      jwt : token
    })
  });