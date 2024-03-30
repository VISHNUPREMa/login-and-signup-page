const User = require("../models/userModel");


const loadAdminHome = async (req,res) =>{
    try{
        if(req.session.admin){
            const [adminData, userData] = await Promise.all([

                (async (req,res)=>{
                    try{
                        return await User.findOne({_id:req.session.admin});
                    }
                    catch(error){
                        console.log(error.message);
                    }

                })(req,res),
                (async (req,res)=>{
                    try{
                        return await User.find({isAdmin:0});
                    }
                    catch(error){
                        console.log(error.message);
                    }

                })(req,res)

            ])

            res.render("adminhome",{name: adminData.name     , user:userData})
            
        }
        else{
            log("cookie not found")
            res.redirect("/");
        }
    }
catch(error){
    console.log(error.message);

}
}

const editUserLoad = async(req,res)=>{
    try{
        if(req.session.admin){
            const userId = req.query.userid
            const userDetails = await User.findById({_id:userId});
            res.render("adminuseredit",{edituser:userDetails})

        }
    }
    catch(error){
        console.log(error.message);
    }
}


const editUser = async(req,res)=>{
    try{
        if(req.session.admin){
        
       
            const newname = req.body.name
            const newemail = req.body.email
            const newmobile = req.body.mobile
            const userId = req.body.id

            const updateUser = await User.findByIdAndUpdate({_id:userId},{$set:{name:newname, email:newemail, mobile:newmobile}});
          

            res.redirect("/adminhome")
            console.log(updateUser);

            
        }else{
            res.redirect("/");
            console.log("didnot find admin session");
        }
       
    }
    catch(error){
        console.log(error.message);
    }
}


const deleteUser = async(req,res)=>{
    try{
        if(req.session.admin){
            const id = req.query.userid
            const deleteUser = await User.deleteOne({_id:id});
           
            res.redirect("/adminhome");


        }
        else{
            res.redirect("/")
        }
    }
    catch(error){
        console.log(error.message);
    }
}



const searchUser = async(req,res)=>{

    try{
        if(req.session.admin){
            const searchData = req.body.search
            const [adminData,userData]= await Promise.all([
                (async(req,res)=>{
                    try{
                        return await User.findById({_id:req.session.admin})

                    }
                    catch(error){
                        console.log(error.message);
                    }
                })(req,res),

            (async (req,res)=>{
                try{
                    return await User.find({$and:[{name:{$regex:new RegExp(searchData,'i')}},{isAdmin:0}]})
                    


                }
                catch(eror){
                    console.log(error.message);
                }
            })(req,res)

            ])

            res.render("adminhome",{name:adminData.name,user:userData})
        }
        else{
            res.redirect("/")
        }
    }
    catch(error){
        console.log(error.message);
    }
}


const createUserLoad = async (req,res)=>{
    try{
        if(req.session.admin){
            const adminData = await User.findById({_id:req.session.admin})
            res.render("adminusercreate",{name:adminData.name})
        }else{
            res.redirect("/")
        }

    }
    catch(error){
        console.log(error.message);
    }

}


const createUser = async(req,res)=>{
    try{
        if(req.session.admin){
            const newUserName = req.body.name
            const newUserEmail = req.body.email
            const newUserMobile = req.body.mobile
            const newUserPassword = req.body.password
            const newUserData = await User.create({name:newUserName , email:newUserEmail , mobile:newUserMobile , password:newUserPassword , isAdmin:0});
            res.redirect("/adminhome")
            

        }else{
            res.redirect("/")
        }

    }
    catch(error){
        console.log(error.message);
    }
}








module.exports = {loadAdminHome , editUserLoad, editUser , deleteUser , searchUser,createUserLoad , createUser}