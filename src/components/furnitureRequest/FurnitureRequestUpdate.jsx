// import { Card, ListGroup } from "react-bootstrap";
// import { useContext, useEffect, useState } from "react";
// import { Button, Col, Form, Row } from "react-bootstrap";
// import { FurnitureRequestContext } from "../../contexts/FurnitureRequestContext";
// import "../../scss/abstracts/_form.scss";
// // import { SearchBar } from "../searchBar/SearchBar";

// const FurnitureRequestUpdate = ({ furnitureRequestId }) => {
//     const id = furnitureRequestId;
//     const { introducers } = useContext(FurnitureRequestContext);
//     const { nurturers } = useContext(FurnitureRequestContext);

//     const [image, setImage] = useState("");

//     const [fullName, setFullName] = useState("");
//     const [dateOfBirth, setDateOfBirth] = useState("");
//     const [gender, setGender] = useState("");
//     const [introductoryDate, setIntroductoryDate] = useState("");
//     const [adoptiveDate, setAdoptiveDate] = useState("");
//     const [introducerId, setIntroducerId] = useState(0);
//     const [nurturerId, setNurturerId] = useState(0);
//     const [detailFurnitureRequest, setDetailFurnitureRequest] = useState({});
//     const [introducer, setIntroducer] = useState({});
//     const [nurturer, setNurturer] = useState({});

//     const { viewFurnitureRequest } = useContext(FurnitureRequestContext);
//     useEffect(() => {
//         viewFurnitureRequest(id).then((result) => {
//             setImage(result.image);
//             setFullName(result.fullName);
//             setDateOfBirth(result.dateOfBirth);
//             setGender(result.gender);
//             setIntroductoryDate(result.introductoryDate);
//             setAdoptiveDate(result.adoptiveDate);
//             setIntroducerId(result.introducerId);
//             setIntroducer(
//                 introducers.find(
//                     (introducer) => introducer.id === result.introducerId
//                 )
//             );
//             setNurturerId(result.nurturerId);
//             setNurturer(
//                 nurturers.find((nurturer) => nurturer.id === result.nurturerId)
//             );
//         });
//     }, []);

//     const { updateFurnitureRequest } = useContext(FurnitureRequestContext);
//     const updatedFurnitureRequest = {
//         image,
//         fullName,
//         gender,
//         dateOfBirth,
//         introductoryDate,
//         adoptiveDate,
//         introducerId,
//         nurturerId,
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(updatedFurnitureRequest);
//         updateFurnitureRequest(id, updatedFurnitureRequest);
//     };


    
//     return (
//         <>
//            <Card className="card modal-dialog1 " >
//              <Card.Header className="card__header">
//                 <div>
//                       <h3  style={{ color: "#0f1e54" }}>C???p nh???t y??u c???u s???a ch???a</h3>
//                 </div>
//             </Card.Header>
//             <Card.Body className="card__body">
//                 <ListGroup  className="list-group">
//                 {/* <ListGroup.Item >

//             <Form onSubmit={handleSubmit} className="form" id="furnitureRequestUpdate">
//                 <Form.Group className="mb-3 form-group">
//                     <Form.Control
//                         className="form-control"
//                         type="text"
//                         placeholder="H??? v?? t??n"
//                         name="fullName"
//                         value={fullName}
//                         onChange={(e) => setFullName(e.target.value)}
//                         required
//                     />
//                 </Form.Group>
//                 <Row className="mb-3">
//                     <Form.Group as={Col} className="form-group">
//                         <Form.Control
//                             className="form-control"
//                             type="text"
//                             placeholder="Ng??y sinh"
//                             name="dateOfBirth"
//                             value={dateOfBirth}
//                             onChange={(e) => setDateOfBirth(e.target.value)}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group as={Col} className="form-group">
//                         <Form.Select
//                             className="form-select"
//                             name="gender"
//                             value={gender}
//                             onChange={(e) =>
//                                 setGender(
//                                     e.target.value === "true" ? true : false
//                                 )
//                             }
//                         >
//                             <option value={"Gi???i t??nh"} hidden>
//                                 Gi???i t??nh
//                             </option>
//                             <option value={true}>Nam</option>
//                             <option value={false}>N???</option>
//                         </Form.Select>
//                     </Form.Group>
//                 </Row>

//                 <Row className="mb-3">
//                     <Form.Group as={Col} className=" form-group">
//                         <Form.Control
//                             className="form-control"
//                             type="text"
//                             placeholder="Ng??y v??o trung t??m"
//                             name="introductoryDate"
//                             value={introductoryDate}
//                             onChange={(e) =>
//                                 setIntroductoryDate(e.target.value)
//                             }
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group as={Col} className="form-group">
//                         <Form.Control
//                             className="form-control"
//                             type="text"
//                             placeholder="Ng??y ???????c nh???n nu??i"
//                             name="adoptiveDate"
//                             value={adoptiveDate}
//                             onChange={(e) => setAdoptiveDate(e.target.value)}
//                         />
//                     </Form.Group>
//                 </Row>
//                 <Form.Group as={Col} className="mb-3 form-group">
//                 </Form.Group>
//                 {introducer && Object.keys(introducer).length !== 0 && (
//                     <Form.Group className="mb-3 form-group search-item">
//                         <img
//                             src={
//                                 introducer.image ||
//                                 "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
//                             }
//                             alt=""
//                             className="search-item__image"
//                         />
//                         <div className="search-item__content">
//                             <p>{introducer.fullName}</p>
//                             <span> {introducer.phone}</span>
//                         </div>
//                     </Form.Group>
//                 )}
//                 <Form.Group as={Col} className="mb-3 form-group">
//                 </Form.Group>
//                 {nurturer && Object.keys(nurturer).length !== 0 && (
//                     <Form.Group className="mb-3 form-group search-item">
//                         <img
//                             src={
//                                 nurturer.image ||
//                                 "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
//                             }
//                             alt=""
//                             className="search-item__image"
//                         />
//                         <div className="search-item__content">
//                             <p>{nurturer.fullName}</p>
//                             <span> {nurturer.phone}</span>
//                         </div>
//                     </Form.Group>
//                 )}
//             </Form>
//             </ListGroup.Item> */}
//              <ListGroup.Item >
//                         <div class="row-fluid">
//                         <div class="span2"></div>
//                             <div class="span5 p-title">ID
//                             <p className="list-group__item-content">
//                             {detailFurnitureRequest.furnitureRequestId}
//                         </p></div>
//                             <div class="span4 p-title" > Nh??n vi??n ???????c giao
//                              <p className="list-group__item-content p-value" >
//                             {detailFurnitureRequest.employeeName}
//                         </p></div>
//                         </div>
//                         <div class="row-fluid">
//                         <div class="span2"></div>
//                             <div class="span5 p-title">Ng??y y??u c???u
//                             <p className="list-group__item-content">
//                             {detailFurnitureRequest.startDate}
//                         </p></div>
//                             <div class="span4 p-title"> H???n cu???i
//                              <p className="list-group__item-content">
//                             {detailFurnitureRequest.deadlineDate}
//                         </p></div>
//                         </div>
//                         <div class="row-fluid">
//                             <div class="span2"></div>
//                             <div class="span5 p-title"> Tr???ng th??i
//                              <p className="list-group__item-content">
//                              {detailFurnitureRequest.status === "DONE"
//                     ? "???? ho??n th??nh"
//                     : "Ch??a ho??n th??nh"}
//                         </p></div>
//                         <div class="span4 p-title">Ng??y ho??n th??nh
//                             <p className="list-group__item-content">
//                             {detailFurnitureRequest.finishDate}
//                         </p></div>   
//                         </div>                      
//                         <div class="row-fluid">
//                         <div class="span2"></div>
//                             <div class="span5 p-title">Ng?????i y??u c???u
//                             <p className="list-group__item-content">
//                             {namePersonRequest}
//                         </p></div>
//                         <div class="span4 p-title">T??n thi???t b???
//                             <p className="list-group__item-content">
//                             {nameFurniture}  
//                         </p></div>
//                         </div>
//                         <div class="row-fluid">
//                         <div class="span2"></div>
//                             <div class="span5 p-title">S??? l?????ng nh???p
//                             <p className="list-group__item-content">
//                             {request.importQuantity}  
//                         </p></div>
//                             <div class="span4 p-title"> S??? l?????ng s???a
//                              <p className="list-group__item-content">
//                             {request.fixQuantity}
//                         </p></div>
//                         </div>
//                         <div class="row-fluid">
//                         <div class="span2"></div>
//                             <div class="span5 p-title">T???ng gi??
//                             <p className="list-group__item-content">
//                             {detailFurnitureRequest.totalPrice}
//                         </p></div>
//                             <div class="span4 p-title"> Ghi ch??
//                              <p className="list-group__item-content">
//                             {request.note}
//                         </p></div>
//                         </div>
               
//                     </ListGroup.Item>
//         </ListGroup>
//             </Card.Body>
//             <div className="row-fluid">
//                 <div className="span7"></div>
//                 <div className="span1-5">  <Button
//                             variant="secondary"
//                             className="btn btn--secondary btn__close"
//                         >
//                             ????ng
//                         </Button>
//                 </div>
//                 <div className="span2">
//                 <Button
//                             variant="success"
//                             form="furnitureRequestCreate"
//                             type="submit"
//                             className="btn btn--primary btn__submit"
//                         >
//                             X??c nh???n
//                         </Button>
//                 </div>

//             </div>
          
                       
//         </Card>
//         </>
//     );
// };

// export default FurnitureRequestUpdate;
import { useContext, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { FurnitureRequestContext } from "../../contexts/FurnitureRequestContext";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FurnitureRequestDetail = ({ furnitureRequestId }) => {
    const navigate = useNavigate();
    const id = furnitureRequestId;
    const [nameFurniture, setNameFurniture] = useState("");
    const [namePersonRequest,setNamePersonRequest]= useState("");
    const [detailFurnitureRequest, setDetailFurnitureRequest] = useState({});
    const [idPerson, setIdPerson]=useState(0); 
    const [idFurniture, setIdFurniture]=useState(0)
    const { viewFurnitureRequest } = useContext(FurnitureRequestContext);
    const [request, setRequest]=useState({});
    const handleUpdate=(id)=> {
        navigate(`/furniture/request/update/${id}`);
    }
    useEffect(() => {
        viewFurnitureRequest(id).then((result) => {
            setDetailFurnitureRequest(result);
            setIdFurniture(result.furnitureRequestList[0].furnitureId);
            setRequest(result.furnitureRequestList[0]);
            setIdPerson(detailFurnitureRequest.createdId);
            getNameAccount(idPerson);
            getNameFurniture(idFurniture);
            
        });
       
    },[idPerson]);
    function getNameAccount(idPerson) {
        const token = JSON.parse(localStorage.getItem("token"));
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
    
         fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/${idPerson}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                result = JSON.parse(result).data;
                setNamePersonRequest(result.fullName)
            })
            .catch((error) => {
                console.log("error", error);
            
            });
          
        }
        function getNameFurniture(id) {
            const token = JSON.parse(localStorage.getItem("token"));
            let requestOptions = {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                redirect: "follow",
            };
        
             fetch(
                `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/${id}`,
                requestOptions
            )
                .then((response) => response.text())
                .then((result) => {
                    result = JSON.parse(result).data;
                    setNameFurniture(result.nameFurniture);
                })
                .catch((error) => {
                    console.log("error", error);
                
                });
              
            }
   
    return (
        <Card className="card modal-dialog1 "  >
            <Card.Header className="card__header">
                <div>
                      <h3  style={{ color: "#0f1e54" }}> Th??ng tin chi ti???t y??u c???u s???a ch???a, mua m???i trang thi???t b???</h3>
                </div>
            </Card.Header>
            <Card.Body className="card__body">
                <ListGroup  className="list-group">
                <ListGroup.Item >
                        <div class="row-fluid">
                        <div class="span2"></div>
                            <div class="span5 p-title">ID
                            <p className="list-group__item-content">
                            {detailFurnitureRequest.furnitureRequestId}
                        </p></div>
                            <div class="span4 p-title" > Nh??n vi??n ???????c giao
                             <p className="list-group__item-content p-value" >
                            {detailFurnitureRequest.employeeName}
                        </p></div>
                        </div>
                        <div class="row-fluid">
                        <div class="span2"></div>
                            <div class="span5 p-title">Ng??y y??u c???u
                            <p className="list-group__item-content">
                            {detailFurnitureRequest.startDate}
                        </p></div>
                            <div class="span4 p-title"> H???n cu???i
                             <p className="list-group__item-content">
                            {detailFurnitureRequest.deadlineDate}
                        </p></div>
                        </div>
                        <div class="row-fluid">
                            <div class="span2"></div>
                            <div class="span5 p-title"> Tr???ng th??i
                             <p className="list-group__item-content">
                             {detailFurnitureRequest.status === "DONE"
                    ? "???? ho??n th??nh"
                    : "Ch??a ho??n th??nh"}
                        </p></div>
                        <div class="span4 p-title">Ng??y ho??n th??nh
                            <p className="list-group__item-content">
                            {detailFurnitureRequest.finishDate}
                        </p></div>   
                        </div>                      
                        <div class="row-fluid">
                        <div class="span2"></div>
                            <div class="span5 p-title">Ng?????i y??u c???u
                            <p className="list-group__item-content">
                            {namePersonRequest}
                        </p></div>
                        <div class="span4 p-title">T??n thi???t b???
                            <p className="list-group__item-content">
                            {nameFurniture}  
                        </p></div>
                        </div>
                        <div class="row-fluid">
                        <div class="span2"></div>
                            <div class="span5 p-title">S??? l?????ng nh???p
                            <p className="list-group__item-content">
                            {request.importQuantity}  
                        </p></div>
                            <div class="span4 p-title"> S??? l?????ng s???a
                             <p className="list-group__item-content">
                            {request.fixQuantity}
                        </p></div>
                        </div>
                        <div class="row-fluid">
                        <div class="span2"></div>
                            <div class="span5 p-title">T???ng gi??
                            <p className="list-group__item-content">
                            {detailFurnitureRequest.totalPrice}
                        </p></div>
                            <div class="span4 p-title"> Ghi ch??
                             <p className="list-group__item-content">
                            {request.note}
                        </p></div>
                        </div>
               
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
            <div className="row-fluid">
                <div className="span7"></div>
                <div className="span1-5">  <Button
                            variant="secondary"
                            // onClick={handleClose}
                            className="btn btn--secondary btn__close"
                        >
                            Tr??? v???
                        </Button>
                </div>
                <div className="span2">
                <Button
                            variant="success"
                            // form="furnitureRequestCreate"
                            // type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                handleUpdate(detailFurnitureRequest.furnitureRequestId);
                            }}
                            className="btn btn--primary btn__update"
                        >
                            C???p nh???t
                        </Button>
                </div>

            </div>
        </Card>
    );
};

export default FurnitureRequestDetail;
 
