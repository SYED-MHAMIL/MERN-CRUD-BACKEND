import mongoose  from "mongoose";
const {Schema}  = mongoose
 const taskshcema=new Schema({
    task :String ,
    completed: { type: Boolean, default: false },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'Userpractise' }
   
 },{ timestamps: true})

 const  TasksPractise=mongoose.model("TasksPractise" , taskshcema)
export default TasksPractise