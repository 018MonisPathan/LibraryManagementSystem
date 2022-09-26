import React, { useState, useEffect } from 'react';

const { VerifyToken } = require('../AuthGuard');

const ManageCategory = () => {

    const[category,setCategory] = useState("");

    useEffect(()=>{
        VerifyToken();
        getAllCategory();
    },[])

    //Get All Category

    const getAllCategory = async () =>{
        try{

            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

            //return console.log(token.replace(/['"]+/g, ''));

            let result = await fetch("http://localhost:5000/category/SelectAllCategory",{
                headers:{
                    "authorization": token
                }
            });

            result = await result.json();

            //return console.log(result.data);

            if(result)
            {
                setCategory(result.data);
            }else{
                console.log("Something went wrong");
            }
        }catch(err){
            console.log("Server Error");
        }
    }

    return(
        <div className="managecategory container">

        <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
                <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

                <div class="breadcrumb-title bottom-left">
                    <h2>Manage Category</h2>
                    <ul class="breadcrumb">
                        <li className="breadcrumb-item">Category</li>
                        <li className="breadcrumb-item">ManageCategory</li>
                    </ul>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Manage Category
                </div>

                <div className="card-body">

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SR No.</th>
                                <th>Category Name</th>
                                <th>Category Description</th>
                                <center>
                                    <th>Option</th>
                                </center>
                            </tr>
                        </thead>
                        
                        <tbody>
                        {
                                            category.length > 0 ? category.map((item, index) => (
                                                <tr key={item._id}>
                                                    <th scope="row" style={{width: "8%"}}>{index + 1}</th>
                                                    <td style={{width: "20%"}}>{item.category_name}</td>
                                                    <td style={{width: "50%"}}>{item.description}</td>
                                                    <td style={{width: "8%"}}>
                                                        <center>
                                                            <i className="fa fa-trash" style={{ marginRight: 10, color: "#3f6ad" }} />
                                                            {/* <Link to={"/admin/application/edit/" + item.catgeory_name}><i className="fa fa-edit" /></Link> */}
                                                        </center>
                                                    </td>
                                                </tr>
                                            ))
                                                : <tr> <td colspan="3" style={{ textAlign: "center" }}><strong>No Records
                                                    Founds!</strong></td></tr>
                                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageCategory;