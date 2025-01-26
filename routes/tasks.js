import express from "express"
import TasksPractise from "../model/tasksModel.js"
import sendRes from "../helper/sendResponse.js"


   let router =express.Router()

   router.post('/',async(req,res)=>{
                 
        let  tasker= new TasksPractise({ 
         task:req.body?.task , 
         createdBy :  req.user?._id
      }
      )
          console.log("req.user=>>>",req.user);
          
            tasker= await tasker.save()
       sendRes(res,200,"task done" ,false,tasker )
   })


   router.get('/',async(req,res)=>{
       
    const data = await TasksPractise.find({createdBy :req.user?._id})
    if(data) return sendRes(res,200," tasks availabele " ,false,data )
    if(!data) return sendRes(res,404," no tasks availabele " ,true,null )         

   })


   router.get('/:id',async(req,res)=>{
       
      const data = await TasksPractise.find({_id : req.params.id})
      if(data) return sendRes(res,200," tasks availabele " ,false,data )
      if(!data) return sendRes(res,404," no tasks availabele " ,true,null )         
  
     })
  
     router.delete('/:id',async(req,res)=>{
       
      await TasksPractise.deleteOne({_id : req.params.id})
     let data =await TasksPractise.find() 
      if(data) return sendRes(res,200," tasks availabele " ,false,data )
      if(!data) return sendRes(res,404," no tasks availabele " ,true,null )         
  
     })


     router.put('/:id',async(req,res)=>{
                         const {task,completed}=req.body
      const data=  await TasksPractise.findOne({_id : req.params.id})
      console.log(data);
      
      if(!data) return sendRes(res,404," no tasks availabele " ,true,null )         
         if(task)  {   
            data.task=task;
         }  
         if(completed){   
            data.completed=completed;
         } 
         await data.save()
         
      sendRes(res,200," tasks availabele " ,false,data )
  
     }) 

export default router