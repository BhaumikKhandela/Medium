import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        SECRET_KEY : string
        DATABASE_URL : string
        
    },
    Variables:{
      userId : string
      
      
    }
}>();

blogRouter.use('/*', async(c,next) => { 
    try{
      const token = c.req.header("authorization")||"";
      if(!token){
        return c.json({msg: "authorization header missing"});
      }
      const header = token.split(" ")[1];
    const response = await verify(header,c.env.SECRET_KEY);
    //@ts-ignore
    c.set("userId", response.id );
     await next();  
    }catch(err){
      c.status(403);
      return c.json({
        msg: "jwt incorrect"
      });
    }
    
  });
  blogRouter.post('/', async (c)=>{
    const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
      const body = await c.req.json();

      const userId =  c.get("userId");
      if (!body.title || !body.content) {
        return c.json({ msg: "Title and content are required" }, 400);
    }

    const blog = await prisma.post.create({
        data:{
            title : body.title,
            content : body.content,
            published: true,
            authorId: userId

        }
    });
    console.log("The blog id is " + blog.id);
     return c.json({
      msg : "Blog created successfully",
      id : blog.id
     });
    
    }catch(e){
      return c.json({
        msg : "An error occurred",
        error: e
      })
    }
    
  });
  blogRouter.put('/', async(c)=>{
const prisma = new PrismaClient({
  datasourceUrl : c.env.DATABASE_URL
}).$extends(withAccelerate());
const body = await c.req.json();
try{
  const updatedUser = await prisma.post.update({
    where: {
      id : body.id
    } ,data:{
      title: body.title,
      content: body.content
    }
  });
  return c.json({
    msg: `Updated Successfully: ${updatedUser}`
  });
  } catch(e){
    return c.json({
      msg: `An error occurred ${e}`
    });
  }
  });
  blogRouter.get('/bulk', async(c)=> {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL 
    }).$extends(withAccelerate());
    try{
      const allBlogs = await prisma.post.findMany(
        {
          select: {
            content: true,
            title: true,
            id: true,
            author: {
              select:{
                name: true
              }
            }
          }
        }
      );

      
       return c.json({
        msg: "All posts:",
        data: allBlogs
       });
    }catch(e){
      c.status(411);
      return c.json({
        msg: "Can't get all post right now"
      });
    }
    });
  blogRouter.get('/:id', async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    });
const id =  c.req.param('id');
try{
  const blog = await  prisma.post.findUniqueOrThrow({
    where:{
      id: id
    }
  });
  return c.json({
    blog: `blog found: ${blog}`
  });
}catch(e){
  c.status(411);
  return c.json({
    msg: 'Blog not found'
  });
}
});
  