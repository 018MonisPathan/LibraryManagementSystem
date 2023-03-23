
import { Link } from "react-router-dom";
const Success = () => {
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
              
            </div>
        </div>
      </body>
    );
}


export default Success;