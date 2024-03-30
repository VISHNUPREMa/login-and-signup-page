const User = require("../models/userModel");


const loginPageLoad = function(req,res){
    if(req.session.user){
        res.redirect("/userhome");
    }
    else if(req.session.admin){
        res.redirect("/adminhome");
    }
    else{
        res.render("login")
    }
};



const logUser = async (req,res)=>{
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;

    try{
        const loggedUser = await User.findOne({
            email:loginEmail,
            password:loginPassword
        });

        if(loggedUser){
            if(loggedUser.isAdmin === 1){
                req.session.admin = loggedUser._id;
                res.redirect("/adminhome");
            }
            else if(loggedUser.isAdmin === 0){
                req.session.user = loggedUser._id;
                res.redirect("/userhome");
            }
            else{
                

                res.render("login",{errmessage: "Login Failed !!!"})
            }
        }
    }
    catch(error){
        console.log(error.message);

    }

}

const registerPageLoad = function(req,res){
    if(req.session.admin){
        res.redirect("/adminhome");
    }
    else if(req.session.user){
        res.redirect("/userhome")
    }
    else{
        res.render("register");
    }
}

const insertUser = async (req, res) => {
    try {
        const userDetails = {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile, 
            password: req.body.password,
            isAdmin: 0
        }

        const result = await User.create(userDetails);

        if (result) {
            res.render("login", { message: "Registered successfully !!!" })
        }

    } catch (error) {
        console.log(error);
        res.render("register", { message: "Registration Failed !!!" });
    }
}


const logoutUser = (req,res)=>{
    if(req.session.user || req.session.admin){
        req.session.destroy((error)=>{
            if(error){
                console.log("error in logging out !!!");
            }else{
                res.redirect("/");
            }
        });
    }
    else{
        res.redirect("/");
    }
}

const loadUserHome = async (req,res)=>{

    try{
        if(req.session.user){
            const userData = await User.findOne({_id:req.session.user});
            res.render("userhome",{name:userData.name})

        }
        else{
            res.redirect("/");
        }
    }
    catch(error){
        
            console.log(error.message);
        
    }
}


const viewProfile = async (req,res)=>{
    try{
        if(req.session.user){
            const userData = await User.findOne({_id:req.session.user});
            res.render("userprofile",{name:userData.name,user:userData})
        }
        else{
            res.redirect("/")
        }
    }
    catch(error){
        console.log(error.message);
    }
}


const editProfileLoad = async(req,res)=>{

    try{
        if(req.session.user){
            const userData = await User.findOne({_id:req.session.user});
            res.render("userprofileedit",{name:userData.name,user:userData})
        }
        else{
            res.redirect("/");
        }
    }
    catch(error){
        console.log(error.message);
    }
};


const editProfile = async (req,res)=>{
  
try{
    const userName = req.body.name
    const userEmail = req.body.email
    const userMobile = req.body.mobile
    const currentPassword = req.body.pass1
    const newPassword = req.body.pass2

    if(req.session.user){
        const userData = await User.findById({ _id: req.session.user })
      
         
        if (currentPassword === userData.password){
            
            const data = {name:userName , email:userEmail , mobile:userMobile , password:newPassword}
             const result = async (req,res)=>{
                try{
                    return await User.findByIdAndUpdate({_id:req.session.user} , {$set:data})
                }
                catch(error){
                    console.log("Data didnot updated",error.message);
                }
             }
             const resdata = result(req,res)
             if(resdata){
                res.redirect("/userhome/viewprofile");
             }
             else{
                res.redirect("/userhome/editprofile");
                console.log("updation didnot work");
             }

           }
           else{
            res.redirect("/userhome/editprofile");
            console.log("password incorrect");
           }
    }else{
        res.redirect('/');
        console.log("session not found");
    }

}
catch(error){
    console.log(error.message);
}




}

















module.exports ={
    loginPageLoad,
    logUser,
    registerPageLoad,
    insertUser,
    logoutUser,
    loadUserHome,
    viewProfile,
    editProfileLoad,
    editProfile
}


