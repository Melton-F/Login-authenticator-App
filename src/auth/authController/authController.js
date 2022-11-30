import AuthUser from '../authModel/authModel'
import {passwordGenerator} from '../../function/functionality'
import cron from "node-cron";

exports.register = async(req, res)=>{
    try {

        //generate random password

        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let string_length = 8;
        let randomstring = '';
        for (let i=0; i<string_length; i++) {
            let rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        // let user = await AuthUser.create(req.body)

        let user = await new AuthUser({
            userName:req.body.userName,
            fullName:req.body.fullName,
            passport_number:req.body.passport_number,
            Gender:req.body.Gender,
            Date_Of_birth:req.body.Date_Of_birth,
            upload_passport_file:req.body.upload_passport_file,
            password: randomstring
        })
        user.save()

        res.status(201).json({
            message:"user signed up successfully, Here is your new password. kindly remember your new password",
            newPassword: user.password
        })
    } catch (error) {
        res.send(error)
    }
}


exports.showUsers = async (req, res)=>{
    try {
        const users = await AuthUser.find()
        if(users<1){
            return res.status(404).json({
                message:"data not found" 
            })
        }
        res.status(404).json({
            message:"all users",
            users:users
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}


exports.createPassword = async (req, res)=>{
    try {
        let user = await AuthUser.findOne({_id:req.body.id})
        let oldPass = user.password
        oldPass.push(req.body.newPassword)
        console.log(oldPass);
        const updation = await AuthUser.findByIdAndUpdate(req.body.id, {password:oldPass}, {new:true})
        res.status(200).json({
            updation:user
        })
    } catch (error) {
        res.send(error)
    }
}


exports.validateUser = async (req, res)=>{
    const user = await AuthUser.findOne({userName:req.body.name})
    if(user){
        return res.status(200).json({
            Alert:"User has already registered, Please Log in"
        })
    }
    else{
        return res.status(200).json({
            message:"New name...!, Please Register"
        })
    }
}


exports.login = async (req, res)=>{
    try {
        const findUser = await AuthUser.findOne({userName:req.body.userName})
        if (findUser.permanent_Ban) {
            return res.status(200).json({
                message:"Sorry you are not eligible to login, your account has been banned permanently"
            })
        }
        if (findUser.logginReject === "reject") {
            return res.status(400).json({
                status:"Rejected",
                message:"Verification Rejected"
            })
        } else {
            const user = await AuthUser.findOne({userName:req.body.userName})
            if(user){
                let userPaswrds = user.password
                // const checkPassword = userPaswrds.includes(req.body.password)
                if(userPaswrds === req.body.password){
                    res.status(200).json({
                        status:"Success",
                        message:"Successfully logged in"
                    })
                }
                else{
                    return res.send("Invalid name or password, Please enter a valid Name and password")
                }
            }
            else{
                res.send("Invalid name or password, Please enter a valid Name and password")
            }
        }
    } catch (error) {
        res.send(error)
    }
}


exports.adminCheck = async (req, res)=>{
    try {
        let user = await AuthUser.findById(req.body.id)
        if(req.body.adminKeyWord==="saamiyar thaadila fire"){
            if(req.body.accept){
                res.status(200).json({
                    status:"Success",
                    message:"Your passport has been verified"
                })
            }else if(req.body.reject === "rejected"){
                let user = await AuthUser.findById(req.body.id)
                let no_Of_rejection = user.no_Of_rejection
                no_Of_rejection.push(req.body.reject)

                const updation = await AuthUser.findByIdAndUpdate(req.body.id, {logginReject:"reject",no_Of_rejection:no_Of_rejection}, {new:true})
                console.log(updation);
                if(updation.no_Of_rejection.length === 2){
                    return res.status(400).json({
                        message:"ban for 3 months"
                    })
                }
                if(updation.no_Of_rejection.length === 3){
                    return res.status(400).json({
                        message:"ban for 6 months"
                    })
                }
                if(updation.no_Of_rejection.length === 4){
                    return res.status(400).json({
                        message:"ban for 12 months"
                    })
                }
                if(updation.no_Of_rejection.length >= 5){
                    const forPermanentBan = await AuthUser.findByIdAndUpdate(req.body.id, {permanent_Ban:true}, {new:true})
                    return res.status(400).json({
                        message:"your account has been banned permanently"
                    })
                }


                // res.status(200).json({
                //     message:"You have been logged out, Please login and resubmit passport proof again"
                // })
            }
        }
        else{
            res.send("not an admin");
        }
    } catch (error) {
        res.send(error)
    }
}


// const passwordGenerator = async (req)=>{
//     // let user = AuthUser.findById(req.body.id)
    
//     let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//     let string_length = 8;
//     let randomstring = '';
//     for (let i=0; i<string_length; i++) {
//         let rnum = Math.floor(Math.random() * chars.length);
//         randomstring += chars.substring(rnum,rnum+1);
//     }
//     const updation = await AuthUser.findByIdAndUpdate(req.body.id, {password:randomstring}, {new:true})
//     // console.log(randomstring)
//     // console.log(updation.password);
//     // return(updation.password)
    
// }

exports.authPassword = async (req, res)=>{
    try {
        // let authPass;
        cron.schedule(" */1 * * * * ", ()=>{
            passwordGenerator(req)
        })
        // console.log(authPass);
        // res.send(authPass)
        let user = await AuthUser.findById(req.body.id)
        res.status(200).json({
            message:` ${user.password} :this is your authApp password, this will expire within one min, Kindly login within 1 min`
        })
    } catch (error) {
        res.status(400).json({
            error:error
        })
    }
}
