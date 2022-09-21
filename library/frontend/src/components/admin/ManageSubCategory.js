import React, { useState, useEffect } from 'react';

const { VerifyToken } = require('../AuthGuard');

const ManageSubCategory = () => {

    const [subcategory, setSubCategory] = useState("");

    useEffect(() => {
        VerifyToken();
        //getAllCategory();
        getAllSubCategory();
    }, [])

    //Get All Category

    // const getAllCategory = async () =>{
    //     try{
    //         let result = await fetch("http://localhost:5000/category/SelectAllCategory");

    //         result = await result.json();

    //         //return console.log(result.data);

    //         if(result)
    //         {
    //             setCategory(result.data);
    //         }else{
    //             console.log("Something went wrong");
    //         }
    //     }catch(err){
    //         console.log("Server Error");
    //     }
    // }

    //Get All SubCategory

    const getAllSubCategory = async () => {
        try {
            let result = await fetch("http://localhost:5000/subcategory/SubSelectAllCategory");

            result = await result.json();

            //return console.log(result.data);

            if (result) {
                setSubCategory(result.data);
            } else {
                console.log("Something went wrong");
            }
        } catch (err) {
            console.log("Server Error");
        }
    }


    return (
        <div className="managesubcategory container">

            <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
                <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

                <div class="breadcrumb-title bottom-left">
                    <h2>Manage SubCategory</h2>
                    <ul class="breadcrumb">
                        <li className="breadcrumb-item">SubCategory</li>
                        <li className="breadcrumb-item">ManageSubCategory</li>
                    </ul>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Manage SubCategory
                </div>

                <div className="card-body">

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SR No.</th>
                                <th>Category Name</th>
                                <th>Category Description</th>
                                <th>SubCategory Name</th>
                                <th>SubCategory Description</th>
                                <center>
                                    <th>Option</th>
                                </center>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                subcategory.length > 0 ? subcategory.map((item, index) => (
                                    <tr key={item._id}>
                                        <th scope="row" style={{ width: "6%" }}>{index + 1}</th>
                                        <td style={{ width: "12%" }}>{item['categoryid'][0].category_name}</td>
                                        <td style={{ width: "32%" }}>{item['categoryid'][0].description}</td>
                                        <td style={{ width: "16%" }}>{item.subcategory_name}</td>
                                        <td style={{ width: "50%" }}>{item.subcategory_description}</td>
                                        <td style={{ width: "8%" }}>
                                            <center>
                                                <i className="fa fa-trash" style={{ marginRight: 10, color: "#3f6ad" }} />
                                                {/* <Link to={"/admin/application/edit/" + item.catgeory_name}><i className="fa fa-edit" /></Link>  */}
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

export default ManageSubCategory;