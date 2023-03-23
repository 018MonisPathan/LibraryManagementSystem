
import React ,{useState}  from "react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
const Fine = () => {

    const call_paypal = async (req,res) =>{
        console.log("paypal called ");
       
        let result = await fetch('http://localhost:5000/PaypalController/sendItem',{
            method: "POST"
          
        });

        result = await result.json();
        if(result){
            console.log("success");
            
           // console.log(result.forwardLink);
            window.location = result.forwardLink
        }else{
            console.log("Fail");
        }
    }


    return(
      <body className="PaymentForm-body ">
        <div>
          <div className="PaymentForm-card">
            <div className="styling">
              <i className="PaymentForm-i">✓</i>
            </div>
              <h1 className="PaymentForm-h1">Success</h1> 
              <p className="PaymentForm-p">Late Fees Payed<br/> Thank you!</p>
              <Link to='/home' className="nav-link">Go back</Link>
              
              <input type="button" onClick={call_paypal} value="Buy"/> 
            </div>
        </div>
      </body>
  
    );
}

export default Fine;