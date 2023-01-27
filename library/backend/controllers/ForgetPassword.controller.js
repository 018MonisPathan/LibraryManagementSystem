const nodemailer = require('nodemailer');


module.exports={
   
    Send_Email:(receiver,subject,message) =>{
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "projectcollaboration00@gmail.com",
                pass: "bpyzdozqmzqzmjao",
            }
        })
        
        let details ={
            from:"projectcollaboration00@gmail.com",
            to:receiver,
            subject:subject,
            text:message
        }
        
        transporter.sendMail(details ,err =>{
            if(err){
                console.log("Error");
                console.log(err.message);
            }
            else{
                console.log("Mail sent");
            }
        }) 
    }
    
}


