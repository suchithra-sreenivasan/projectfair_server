//import mongodb
const mongoose= require('mongoose')

const connectionstring = process.env.DATABASE 

mongoose.connect(connectionstring).then(()=>{
    console.log(process.env);
    
    console.log('mongodb succcessfully connected');
    
}).catch((err)=>{
    console.log(` mongodb connection failed ${err}`);
    
})