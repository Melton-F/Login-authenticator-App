import cron from "node-cron"
import AuthModel from "../auth/authModel/authModel"

exports.passwordGenerator = async (req)=>{
    // let user = AuthUser.findById(req.body.id)
    
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let string_length = 8;
    let randomstring = '';
    for (let i=0; i<string_length; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    let id = req.body.id
    let updates = {password:randomstring}
    let options = {new:true}
    const updation = await AuthUser.findByIdAndUpdate(id, updates, options)
    // console.log(randomstring)
    // console.log(updation.password);
    // return(updation.password)
    
}

exports.unBan_3_months = async (req)=>{
    cron.schedule(" * * * */3 * ", async()=>{
        // const user = await AuthModel.find({id:req.body.id})
        let id = req.body.id
        let updates = {logginReject:"accept"}
        let options = {new:true}
        const updation = await AuthModel.findByIdAndUpdate(id, updates, options)
    })
}

exports.unBan_6_months = async (req)=>{
    cron.schedule(" * * * */6 * ", async()=>{
        // const user = await AuthModel.find({id:req.body.id})
        let id = req.body.id
        let updates = {logginReject:"accept"}
        let options = {new:true}
        const updation = await AuthModel.findByIdAndUpdate(id, updates, options)
    })
}

exports.unBan_12_months = async (req)=>{
    cron.schedule(" * * * */12 * ", async()=>{
        // const user = await AuthModel.find({id:req.body.id})
        let id = req.body.id
        let updates = {logginReject:"accept"}
        let options = {new:true}
        const updation = await AuthModel.findByIdAndUpdate(id, updates, options)
    })
}