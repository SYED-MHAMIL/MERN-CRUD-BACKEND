import mongoose  from "mongoose";
const {Schema}  = mongoose
 const authshcema=new Schema({
       name : String ,
       fullname :  String ,
       email : String ,
       password : String                  
 })

 const  User=mongoose.model("Userpractise" , authshcema)
export default User