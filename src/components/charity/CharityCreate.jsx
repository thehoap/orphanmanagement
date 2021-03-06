import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { CharityContext } from "../../contexts/CharityContext";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";
import { useForm } from "react-hook-form";
import {
    REGEX_ADDRESS,
} from "../utils/regex";

const CharityCreate = () => {
    const { addCharity } = useContext(CharityContext);
    const [newCharity, setNewCharity] = useState({
        image: "",
        charityName: "",
        title: "",
        dateEnd: "",
        dateStart: "",
        content: "",
        isCompleted: true,
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [imageSuccess, setImageSuccess] = useState("");
    const [pickerDateStart, setPickerDateStart] = useState("");
    const [pickerDateEnd, setPickerDateEnd] = useState("");

    const onInputChange = (e) => {
        setNewCharity({
            ...newCharity,
            [e.target.name]: e.target.value,
        });
        console.log(newCharity);
    };
    const {
        charityName,
        content,
        dateEnd,
        dateStart,
        image,
        isCompleted,
        title,
    } = newCharity;
    const onSubmit = (data) => {
        console.log(data);
        addCharity(
            data.charityName,
            content,
            dateEnd,
            dateStart,
            image,
            isCompleted,
            data.title
        );
    };

    // IMAGE UPLOAD
    // generate random string for filename
    function generateString(length) {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = " ";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }
    const [file, setFile] = useState("");
    const onFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    async function handleUploadImage() {
        if (!file) return;
        const storageRef = ref(storage, `charitys/${generateString(100)}`);
        await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    setNewCharity({
                        ...newCharity,
                        image: url,
                    });
                    console.log(url);
                    setImageSuccess("T???i ???nh l??n th??nh c??ng");
                })
                .catch((err) => console.log("err", err));
        });
    }

    return (
        <>
            <Form.Group className="mb-3 form-group">
                <img
                    className="image"
                    id="charityImage"
                    alt=""
                    src={
                        (file && URL.createObjectURL(file)) ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                />
                <Row>
                    <Form.Label
                        htmlFor="charityImageFile"
                        className="form-label btn__image btn btn--secondary"
                    >
                        <i className="bi bi-image icon icon__image"></i>
                        Ch???n ???nh
                    </Form.Label>
                    <Form.Control
                        className="form-control form-control__file"
                        type="file"
                        accept="image/*"
                        name="image"
                        id="charityImageFile"
                        onChange={onFileChange}
                    />
                    <Button
                        className="form-label btn__image btn btn--secondary"
                        onClick={handleUploadImage}
                    >
                        <i className="bi bi-file-earmark-arrow-up-fill"></i> L??u
                        ???nh
                    </Button>
                </Row>
                {imageSuccess && (
                    <p className="image__success">{imageSuccess}</p>
                )}
            </Form.Group>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className="form"
                id="charityCreate"
            >
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="T??n s??? ki???n"
                        name="charityName"
                        onChange={(e) => onInputChange(e)}
                        {...register("charityName", {
                            required: true,
                            pattern: REGEX_ADDRESS,
                        })}
                    />
                </Form.Group>
                {errors.charityName && (
                    <p className="form__message">
                        T??n s??? ki???n kh??ng ???????c ch???a k?? t??? ?????c bi???t v?? kh??ng c??
                        kho???ng tr???ng ??? 2 ?????u
                    </p>
                )}
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Ch??? ?????"
                        name="title"
                        onChange={(e) => onInputChange(e)}
                        {...register("title", {
                            required: true,
                            pattern: REGEX_ADDRESS,
                        })}
                    />
                </Form.Group>
                {errors.title && (
                    <p className="form__message">
                        Ch??? ????? kh??ng ???????c ch???a s???, k?? t??? ?????c bi???t v?? kh??ng c??
                        kho???ng tr???ng ??? 2 ?????u
                    </p>
                )}
                <Row className="mb-3">
                    <Form.Group as={Col} className="form-group">
                        <DatePicker
                            className="form-control"
                            placeholderText="Th???i gian b???t ?????u"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            dateFormat="dd/MM/yyyy HH:mm"
                            timeInputLabel="Th???i gian:"
                            showTimeInput
                            selected={pickerDateStart}
                            onChange={(date) => {
                                const resultDate =
                                    moment(date).format("DD/MM/YYYY HH:mm");
                                setNewCharity({
                                    ...newCharity,
                                    dateStart: resultDate,
                                });
                                setPickerDateStart(date);
                            }}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="form-group">
                        <DatePicker
                            className="form-control"
                            placeholderText="Th???i gian k???t th??c"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            dateFormat="dd/MM/yyyy HH:mm"
                            timeInputLabel="Th???i gian:"
                            showTimeInput
                            selected={pickerDateEnd}
                            onChange={(date) => {
                                const resultDate =
                                    moment(date).format("DD/MM/YYYY HH:mm");
                                setNewCharity({
                                    ...newCharity,
                                    dateEnd: resultDate,
                                });
                                setPickerDateEnd(date);
                            }}
                            required
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        as="textarea"
                        placeholder="N???i dung s??? ki???n"
                        name="content"
                        value={content}
                        onChange={(e) => onInputChange(e)}
                        style={{ height: "150px" }}
                        required
                    />
                </Form.Group>
            </Form>
        </>
    );
};

export default CharityCreate;
