import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { ChildrenContext } from "../../contexts/ChildrenContext";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";
import { SearchBar } from "../search/SearchBar";
import "./_children.scss";
import { useForm } from "react-hook-form";
import {
    REGEX_ADDRESS,
    REGEX_EMAIL,
    REGEX_NAME,
    REGEX_NUMBER_ONLY,
    REGEX_PHONE,
} from "../utils/regex";

const ChildrenCreate = () => {
    const { addChildren } = useContext(ChildrenContext);
    const { introducers } = useContext(ChildrenContext);
    const { nurturers } = useContext(ChildrenContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [newChildren, setNewChildren] = useState({
        image: "",
        fullName: "",
        dateOfBirth: "",
        gender: "",
        introductoryDate: "",
        adoptiveDate: "",
        introducerId: 0,
        nurturerId: 0,
    });

    const [imageSuccess, setImageSuccess] = useState("");
    const [pickerDate, setPickerDate] = useState("");
    const [pickerIntroDate, setPickerIntroDate] = useState("");
    const [pickerAdopDate, setPickerAdopDate] = useState("");

    const [introducerId, setIntroducerId] = useState(0);
    const [introducer, setIntroducer] = useState({});
    const getIntroducerId = (valueId) => {
        setIntroducerId(valueId);
        setIntroducer(
            introducers.find((introducer) => introducer.id === valueId)
        );
    };
    const [nurturerId, setNurturerId] = useState(0);
    const [nurturer, setNurturer] = useState(0);
    const getNurturerId = (valueId) => {
        setNurturerId(valueId);
        setNurturer(nurturers.find((nurturer) => nurturer.id === valueId));
    };
    const onInputChange = (e) => {
        setNewChildren({
            ...newChildren,
            [e.target.name]: e.target.value,
        });
        console.log(newChildren);
    };
    const {
        image,
        fullName,
        gender,
        dateOfBirth,
        introductoryDate,
        adoptiveDate,
    } = newChildren;
    const onSubmit = (data) => {
        addChildren(
            image,
            data.fullName,
            gender,
            dateOfBirth,
            introductoryDate,
            adoptiveDate,
            introducerId,
            nurturerId
        );
    };

    //Image Upload
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
    async function handleUpload() {
        if (!file) return;
        const storageRef = ref(storage, `children/${generateString(100)}`);
        await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    setNewChildren({
                        ...newChildren,
                        image: url,
                    });
                    console.log(url);
                    setImageSuccess("Tải ảnh lên thành công");
                })
                .catch((err) => console.log("err", err));
        });
    }
    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            className="form"
            id="childrenCreate"
        >
            <Form.Group className="mb-3 form-group">
                <img
                    className="image"
                    id="childrenImage"
                    alt=""
                    src={
                        (file && URL.createObjectURL(file)) ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                />
                <Row>
                    <Form.Label
                        htmlFor="childrenImageFile"
                        className="form-label btn__image btn btn--secondary"
                    >
                        <i className="bi bi-image icon icon__image"></i>
                        Chọn ảnh
                    </Form.Label>
                    <Form.Control
                        className="form-control form-control__file"
                        type="file"
                        accept="image/*"
                        name="image"
                        id="childrenImageFile"
                        onChange={onFileChange}
                    />
                    <Button
                        className="form-label btn__image btn btn--secondary"
                        onClick={handleUpload}
                    >
                        <i className="bi bi-file-earmark-arrow-up-fill"></i> Lưu
                        ảnh
                    </Button>
                </Row>
                {imageSuccess && (
                    <p className="image__success">{imageSuccess}</p>
                )}
            </Form.Group>

            <Form.Group className="mb-3 form-group">
                <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="Họ và tên"
                    name="fullName"
                    onChange={(e) => onInputChange(e)}
                    {...register("fullName", {
                        required: true,
                        pattern: REGEX_NAME,
                    })}
                />
            </Form.Group>
            {errors.fullName && (
                <p className="form__message">
                    Tên không được chứa số, ký tự đặc biệt và không có khoảng
                    trắng ở 2 đầu
                </p>
            )}
            <Row className="mb-3">
                <Form.Group as={Col} className="form-group">
                    <DatePicker
                        className="form-control"
                        placeholderText="Ngày sinh"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        dateFormat="dd/MM/yyyy"
                        selected={pickerDate}
                        onChange={(date) => {
                            const resultDate =
                                moment(date).format("DD/MM/YYYY");
                            setNewChildren({
                                ...newChildren,
                                dateOfBirth: resultDate,
                            });
                            setPickerDate(date);
                        }}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col} className="form-group">
                    <Form.Select
                        defaultValue="Giới tính"
                        className="form-select"
                        name="gender"
                        value={gender}
                        onChange={(e) => {
                            onInputChange(e);
                            setNewChildren({
                                ...newChildren,
                                gender:
                                    e.target.value === "true" ? true : false,
                            });
                        }}
                    >
                        <option value={"Giới tính"} hidden>
                            Giới tính
                        </option>
                        <option value={true}>Nam</option>
                        <option value={false}>Nữ</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} className="form-group">
                    <DatePicker
                        className="form-control"
                        placeholderText="Ngày vào trung tâm"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        dateFormat="dd/MM/yyyy"
                        selected={pickerIntroDate}
                        onChange={(date) => {
                            const resultDate =
                                moment(date).format("DD/MM/YYYY");
                            setNewChildren({
                                ...newChildren,
                                introductoryDate: resultDate,
                            });
                            setPickerIntroDate(date);
                        }}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col} className="form-group">
                    <DatePicker
                        className="form-control"
                        placeholderText="Ngày nhận nuôi"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        dateFormat="dd/MM/yyyy"
                        selected={pickerAdopDate}
                        onChange={(date) => {
                            const resultDate =
                                moment(date).format("DD/MM/YYYY");
                            setNewChildren({
                                ...newChildren,
                                adoptiveDate: resultDate,
                            });
                            setPickerAdopDate(date);
                        }}
                    />
                </Form.Group>
            </Row>
            <Form.Group as={Col} className="mb-3 form-group">
                <SearchBar
                    placeholder={"Nhập tên người giới thiệu"}
                    data={introducers}
                    getValueId={getIntroducerId}
                />
            </Form.Group>
            {Object.keys(introducer).length !== 0 && (
                <Form.Group className="mb-3 form-group search-item">
                    <img
                        src={
                            introducer.image ||
                            "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                        }
                        alt=""
                        className="search-item__image"
                    />
                    <div className="search-item__content">
                        <p>{introducer.fullName}</p>
                        <i
                            className="bi bi-trash3 icon icon__delete"
                            onClick={() => {
                                setIntroducerId(0);
                                setIntroducer({});
                            }}
                        ></i>
                    </div>
                </Form.Group>
            )}
            <Form.Group as={Col} className="mb-3 form-group">
                <SearchBar
                    placeholder={"Nhập tên người nhận nuôi"}
                    data={nurturers}
                    getValueId={getNurturerId}
                />
            </Form.Group>
            {Object.keys(nurturer).length !== 0 && (
                <Form.Group className="mb-3 form-group search-item">
                    <img
                        src={
                            nurturer.image ||
                            "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                        }
                        alt=""
                        className="search-item__image"
                    />
                    <div className="search-item__content">
                        <p>{nurturer.fullName}</p>
                        <i
                            className="bi bi-trash3 icon icon__delete"
                            onClick={() => {
                                setNurturerId(0);
                                setNurturer({});
                                setNewChildren({
                                    ...newChildren,
                                    adoptiveDate: "",
                                });
                            }}
                        ></i>
                    </div>
                </Form.Group>
            )}
        </Form>
    );
};

export default ChildrenCreate;
