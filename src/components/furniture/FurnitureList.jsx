import { useContext, useEffect, useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { FurnitureContext } from "../../contexts/FurnitureContext";
import { Link, useNavigate } from "react-router-dom";
import "../../scss/abstracts/_modal.scss";
import "../../scss/abstracts/_table.scss";
import "./_furniture.scss";
import Furniture from "./Furniture";
import FurnitureCreate from "./FurnitureCreate";
import FurniturePagination from "./FurniturePagination";

const FurnitureList = () => {
   
    const { furnitures,addResult } = useContext(FurnitureContext);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState(addResult);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleReDirect=()=>{
        navigate("/furniture/request");
    };
    return ( <>

        <div className="table">
            <div className="table__top">
                <h2  style={{ color: "#0f1e54" }}>Danh sách trang thiết bị</h2>
                <Button className="btn" onClick={handleReDirect}>
                    Danh sách yêu cầu
                </Button>
                <Button className="btn btn--primary" onClick={handleShow}>
                    Thêm trang thiết bị
                </Button>
            </div>
            <table className="table__body">
                <thead>
                    <tr>
                        <th scope="col">Tên trang thiết bị</th>
                        <th scope="col">Số lượng hoạt động tốt</th>
                        <th scope="col">Số lượng bị hỏng</th>
                        <th scope="col">Ghi chú</th>
                        <th scope="col">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {furnitures.map((furniture) => (
                        <tr key={furniture.furnitureId}>
                            <Furniture furniture={furniture} />
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose} centered className="modal">
                <Modal.Header closeButton className="modal__header">
                    <Modal.Title>Thêm trang thiết bị</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <FurnitureCreate />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        className="btn btn--secondary btn__close"
                    >
                        Đóng
                    </Button>
                    <Button
                        variant="success"
                        form="furnitureCreate"
                        type="submit"
                        className="btn btn--primary btn__submit"
                    >
                        Xác nhận 
                    </Button>
                   
                </Modal.Footer>
            </Modal>
        </div>
           <FurniturePagination />
           </>
    );
};

export default FurnitureList;