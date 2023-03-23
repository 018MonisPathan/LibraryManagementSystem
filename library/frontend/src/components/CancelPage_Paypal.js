
import { Link } from "react-router-dom";
const Cancel = () => {
    return(
    <body className="PaymentForm-body ">
        <div>
          <div className="PaymentForm-card">
            <div className="styling">
              <i className="PaymentForm-i-X">X</i>
            </div>
              <h1 className="PaymentForm-h1-X">Cancelled</h1> 
              <p className="PaymentForm-p">Late Fees Payment Cancelled<br/> </p>
              <Link to='/home' className="nav-link">Go back</Link>
              
            </div>
        </div>
      </body>
    );
}


export default Cancel;