exports.passwordGenerator = async (req)=>{
    // let user = AuthUser.findById(req.body.id)
    
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let string_length = 8;
    let randomstring = '';
    for (let i=0; i<string_length; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    const updation = await AuthUser.findByIdAndUpdate(req.body.id, {password:randomstring}, {new:true})
    // console.log(randomstring)
    // console.log(updation.password);
    // return(updation.password)
    
}