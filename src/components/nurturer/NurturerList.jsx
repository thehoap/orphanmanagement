import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { NurturerContext } from "../../contexts/NurturerContext";
import "../../scss/abstracts/_modal.scss";
import "../../scss/abstracts/_table.scss";
import Nurturer from "./Nurturer";
import NurturerCreate from "./NurturerCreate";
import NurturerPagination from "./NurturerPagination";

const NurturerList = () => {
    const { nurturers } = useContext(NurturerContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        handleClose();
    }, [nurturers]);

    return (
        <>
            <div className="table">
                <div className="table__top">
                    <h2>Nhận nuôi trẻ</h2>
                    <Button className="btn btn--primary" onClick={handleShow}>
                        Thêm người nhận nuôi
                    </Button>
                </div>
                <table className="table__body">
                    <thead>
                        <tr>
                            <th scope="col">Họ và tên</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nurturers.map((nurturer) => (
                            <tr key={nurturer.id}>
                                <Nurturer nurturer={nurturer} />
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal
                    show={show}
                    onHide={handleClose}
                    centered
                    className="modal"
                >
                    <Modal.Header closeButton className="modal__header">
                        <Modal.Title>Thêm người nhận nuôi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal__body">
                        <NurturerCreate />
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
                            form="nurturerCreate"
                            type="submit"
                            className="btn btn--primary btn__submit"
                        >
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <NurturerPagination />
        </>
    );
};

export default NurturerList;