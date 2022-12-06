import React, {useState, useEffect} from "react";

const ManageFacultyIssueBook=()=>{
    const [issuebook,setIssueBook] = useState("");
    const [settings, setSettings] = useState("");
    const [membership_id,setMembershipId] = useState("");

    useEffect(()=>{
        getAllIssueBookByFaculty();
        getAllSettings();
    },[])

    const getAllIssueBookByFaculty = async () => {
        try{
            console.log(new Date().toISOString().split("T")[0]);
            //return console.log("faculty");

            const membership_id = sessionStorage.getItem("memberid").replace(/['"]+/g, '');

            //return console.log(membership_id);

            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch(`http://localhost:5000/IssueBook/selectallIssueBookDetailsByMembershipId/${membership_id}`);

            result = await result.json();

            //return console.log(result.data[0].duedate);

            if(result)
            {
                console.log(result.data);
                setIssueBook(result.data);
            }else{
                console.log("Something went wrong!!");
            }
        }catch(err){
            return console.log("Server Error");
        }
    }

    //Get All setting for assign panelty to customer

    const getAllSettings=async()=>{
        try{
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

            let result = await fetch("http://localhost:5000/Settings/SelectSettings/",{
                method: "GET",
                headers:{
                    "authorization": token
                }
            })

            result = await result.json();

            //return console.log(result.data);

            if(result){
                //console.log(result.data[0].penalty_amount);
                setSettings(result.data[0].penalty_amount);
            }else{
                console.log("something went wrong!");
            }

        }catch(err){
            console.log("server error!");
        }
    }

    return(
        <div className="manageissuebook container">
            <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
                <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

                <div class="breadcrumb-title bottom-left">
                    <h2>Manage Issue Book</h2>
                    <ul class="breadcrumb">
                        <li className="breadcrumb-item">Faculty</li>
                        <li className="breadcrumb-item">ManageIssueBook</li>
                    </ul>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Manage Issue Book
                </div>

                <div className="card-body">
                    <table className="table table-bordered">
                    <thead>
                            <tr>
                            <th>SR No.</th>
                                <th>Book Title</th>
                                <th>PDF</th>
                                <th>Due Date</th>
                                <th>Issue Date</th>
                                <th>Panelty Amount</th>
                                <center>
                                    <th>Option</th>
                                </center>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                issuebook.length > 0 ? issuebook.map((item,index) => (
                                    <tr key={item._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td style={{width: "12%"}}>{item['book_id'][0].title}</td>
                                        <td style={{width: "5%"}}><a href={"http://localhost:5000"+item['book_id'][0].pdf} target="_blank">PDF</a></td>
                                        <td style={{width: "25%"}}>{item.duedate.split("T")[0]}</td>
                                        <td style={{width: "25%"}}>{item.issuedate}</td>
                                        <td>
                                            {
                                                new Date().toISOString().split("T")[0] > item.duedate.split("T")[0] ? <>
                                                <p>{settings}</p>
                                                </>:<>
                                                    <p>0</p>
                                                </>
                                            }
                                        </td>
                                        
                                    </tr>
                                )):
                                <>
                                
                                </>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageFacultyIssueBook;