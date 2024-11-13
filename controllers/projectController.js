const projects = require('../model/projectModel')


exports.addProjectController = async (req,res)=>{
    console.log('inside add project controller');
    const {title, language , github , website,  overview} =req.body
    console.log(title, language , github , website,  overview);

    const projectImage = req.file.filename
    console.log(projectImage);

    const userId = req.payload  

    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('project already exisit')
        }
        else{
            const newProject = new projects({
                title, language , github , website,  overview ,projectImage , userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(error){
        res.status(401).json('Project added failed due to',error)
    }
      
}

//to get all projects
exports.getAllProjectController= async(req, res)=>{

    //path parameter = req.param
    // query parameter = req.query
    const searchKey = req.query.search
    console.log(searchKey);

    const query ={
        language:{
            $regex:searchKey,$options:'i'
        }
    }
    

    
    try{
        const  allproject= await projects.find(query)
        res.status(200).json(allproject)
    }catch(error)
    {
      res.status(401).json(error)  
    }
}

// to get home projects
exports.getHomeProjectController = async(req,res)=>{
    try{
        const allproject = await projects.find().limit(3)
        res.status(200).json(allproject)
    }catch(error){
        res.status(401).json(error)
    }
}

//to get user projects
exports.getUserProjectController = async(req,res)=>{
    try{
        const userId = req.payload
        const allproject = await projects.find({userId})
        res.status(200).json(allproject)
    }catch(error){
        res.status(401).json(error)
    }
}

// remove user
exports.removeUserProjectController = async(req,res)=>{
    const {id} = req.params

    try{
        await projects.findByIdAndDelete({_id:id})
        res.status(200).json('deleted successfully')
    }
    catch(error){
        res.status(401).json(error)
    }
}

//update project details

exports.editProjectController = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const {title , language, github , website , overview , projectImage } = req.body

    const uploadedImage = req.file ? req.file.filename : projectImage
    
    try {
        const existingProject = await projects.findByIdAndUpdate({_id:id},{
            title,
            language,
            github,
            website,
            overview,
            projectImage:uploadedImage,
            userId
        },{new:true})
        await existingProject.save()
        res.status(200).json(existingProject)
        
    } catch (error) {
        res.status(401).json(error)
    }
}