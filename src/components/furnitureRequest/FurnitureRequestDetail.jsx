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
    const handleReturn=() =>{
        navigate('/furniture/request');
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
            `https://orphanmanagement.herokuapp.com/api/v1/profile/account/${idPerson}`,
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
                      <h3  style={{ color: "#0f1e54" }}> Thông tin chi tiết yêu cầu sửa chữa, mua mới trang thiết bị</h3>
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
                            <div class="span4 p-title" > Nhân viên được giao
                             <p className="list-group__item-content p-value" >
                            {detailFurnitureRequest.employeeName}
                        </p></div>
                        </div>
                        <div class="row-fluid">
                        <div class="span2"></div>
                            <div class="span5 p-title">Ngày yêu cầu
                            <p className="list-group__item-content">
                            {detailFurnitureRequest.startDate}
                        </p></div>
                            <div class="span4 p-title"> Hạn cuối
                             <p className="list-group__item-content">
                            {detailFurnitureRequest.deadlineDate}
                        </p></div>
                        </div>
                        <div class="row-fluid">
                            <div class="span2"></div>
                            <div class="span5 p-title"> Trạng thái
                             <p className="list-group__item-content">
                             {detailFurnitureRequest.status === "DONE"
                    ? "Đã hoàn thành"
                    : "Chưa hoàn thành"}
                        </p></div>
                        <div class="span4 p-title">Ngày hoàn thành
                            <p className="list-group__item-content">
                            {detailFurnitureRequest.finishDate}
                        </p></div>   
                        </div>                      
                        <div class="row-fluid">
                        <div class="span2"></div>
                            <div class="span5 p-title">Người yêu cầu
                            <p className="list-group__item-content">
                            {namePersonRequest}
                        </p></div>
                        <div class="span4 p-title">Tên thiết bị
                            <p className="list-group__item-content">
                            {nameFurniture}  
                        </p></div>
                        </div>
                        <div class="row-fluid">
                        <div class="span2"></div>
                            <div class="span5 p-title">Số lượng nhập
                            <p className="list-group__item-content">
                            {request.importQuantity}  
                        </p></div>
                            <div class="span4 p-title"> Số lượng sửa
                             <p className="list-group__item-content">
                            {request.fixQuantity}
                        </p></div>
                        </div>
                        <div class="row-fluid">
                        <div class="span2"></div>
                            <div class="span5 p-title">Tổng giá
                            <p className="list-group__item-content">
                            {detailFurnitureRequest.totalPrice}
                        </p></div>
                            <div class="span4 p-title"> Ghi chú
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
                            onClick={handleReturn}
                            className="btn btn--secondary btn__close"
                        >
                            Trở về
                        </Button>
                </div>
                {/* <div className="span2">
                <Button
                            variant="success"
                            onClick={(e) => {
                                e.preventDefault();
                                handleUpdate(detailFurnitureRequest.furnitureRequestId);
                            }}
                            className="btn btn--primary btn__update"
                        >
                            Cập nhật
                        </Button>
                </div> */}

            </div>
        </Card>
    );
};

export default FurnitureRequestDetail;
 