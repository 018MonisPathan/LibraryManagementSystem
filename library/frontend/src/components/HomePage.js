import React from "react";

const HomePage=()=>{

    return(
        <div className="home-page container">

            <h1 className="mt-5">What is Online Library Management System</h1>
               
            <div className="block-1">

                <div className="row mt-5">
                    
                    <div className="col-md-6">
                        <p className="content-1"><i class="fa fa-arrow-right" aria-hidden="true"></i> Online Library Management System is an <b>Automated Library System</b> that handles the various functions of the library.</p>

                        <p className="content-1"><i class="fa fa-arrow-right" aria-hidden="true"></i> It provides a complete solution to the library management software/website. </p>

                        <p className="content-1"><i class="fa fa-arrow-right" aria-hidden="true"></i> Library plays an important role in all schools and colleges, no educational institution can exist without Library Administration Software/website. </p>

                        <p className="content-1"><i class="fa fa-arrow-right" aria-hidden="true"></i> It is an important part of every school and college and it helps the librarian to keep records of available books as well as issued books. </p>

                        <p className="content-1"><i class="fa fa-arrow-right" aria-hidden="true"></i>  Library Management System software helps in different ways by providing students the facility to learn, gather resources, promote group learning and improve knowledge and skills.</p>
                    </div>

                    <div className="col-md-6">
                        <img src={process.env.PUBLIC_URL + "/image/img1.jpg"} height={370} width={570} className="img1"/>
                    </div>
                </div>
            </div>

            <div className="block-2">

                <div className="row mt-5">
                    
                    <div className="col-md-6">
                        <img src={process.env.PUBLIC_URL + "/image/img3.jpg"} height={350} width={550} className="img2"/>
                    </div>
                    <div className="col-md-6">
                        <h4 className="content-2">Advatnages Of Online Library Management System</h4>
                        <p className="content-2"><span><i class="fa fa-check-square-o" aria-hidden="true"></i></span>It is user-friendly</p>

                        <p className="content-2"><span><i class="fa fa-check-square-o" aria-hidden="true"></i></span>It is cost-effective and easy to install</p>

                        <p className="content-2"><span><i class="fa fa-check-square-o" aria-hidden="true"></i></span>It helps in maintaining records</p>

                        <p className="content-2"><span><i class="fa fa-check-square-o" aria-hidden="true"></i></span>It can track information online</p>

                        <p className="content-2"><span><i class="fa fa-check-square-o" aria-hidden="true"></i></span>It saves human efforts and time</p>

                        <p className="content-2"><span><i class="fa fa-check-square-o" aria-hidden="true"></i></span>It reduce the chances of loss the records</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HomePage;