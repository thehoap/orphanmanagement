import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { IntroducerContext } from "../../contexts/IntroducerContext";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";
import {
    REGEX_ADDRESS,
    REGEX_EMAIL,
    REGEX_NAME,
    REGEX_NUMBER_ONLY,
    REGEX_PHONE,
} from "../utils/regex";

const IntroducerCreate = () => {
    const { addIntroducer } = useContext(IntroducerContext);
    const [newIntroducer, setNewIntroducer] = useState({
        image: "",
        fullName: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        identification: "",
        phone: "",
        email: "",
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [imageSuccess, setImageSuccess] = useState("");
    const [pickerDate, setPickerDate] = useState("");

    const onInputChange = (e) => {
        setNewIntroducer({
            ...newIntroducer,
            [e.target.name]: e.target.value,
        });
        console.log(newIntroducer);
    };
    const {
        image,
        fullName,
        dateOfBirth,
        gender,
        address,
        identification,
        phone,
        email,
    } = newIntroducer;
    const onSubmit = (data) => {
        addIntroducer(
            image,
            data.fullName,
            dateOfBirth,
            gender,
            data.address,
            data.identification,
            data.phone,
            data.email
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
        const storageRef = ref(storage, `introducers/${generateString(100)}`);
        await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    setNewIntroducer({
                        ...newIntroducer,
                        image: url,
                    });
                    console.log(url);
                    setImageSuccess("Tải ảnh lên thành công");
                })
                .catch((err) => console.log("err", err));
        });
    }

    return (
        <>
            <Form.Group className="mb-3 form-group">
                <img
                    className="image"
                    id="introducerImage"
                    alt=""
                    src={
                        (file && URL.createObjectURL(file)) ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                />
                <Row>
                    <Form.Label
                        htmlFor="introducerImageFile"
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
                        id="introducerImageFile"
                        onChange={onFileChange}
                    />
                    <Button
                        className="form-label btn__image btn btn--secondary"
                        onClick={handleUploadImage}
                    >
                        <i className="bi bi-file-earmark-arrow-up-fill"></i> Lưu
                        ảnh
                    </Button>
                </Row>
                {imageSuccess && (
                    <p className="image__success">{imageSuccess}</p>
                )}
            </Form.Group>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className="form"
                id="introducerCreate"
            >
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
                        Tên không được chứa số, ký tự đặc biệt và không có
                        khoảng trắng ở 2 đầu
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
                                setNewIntroducer({
                                    ...newIntroducer,
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
                                setNewIntroducer({
                                    ...newIntroducer,
                                    gender:
                                        e.target.value === "true"
                                            ? true
                                            : false,
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

                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Địa chỉ"
                        name="address"
                        onChange={(e) => onInputChange(e)}
                        {...register("address", {
                            required: true,
                            pattern: REGEX_ADDRESS,
                        })}
                    />
                </Form.Group>
                {errors.address && (
                    <p className="form__message">
                        Địa chỉ không được chứa ký tự đặc biệt và không có
                        khoảng trắng ở 2 đầu
                    </p>
                )}
                <Row className="mb-3">
                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="CMND/CCCD"
                            name="identification"
                            onChange={(e) => onInputChange(e)}
                            {...register("identification", {
                                required: true,
                                minLength: 9,
                                maxLength: 10,
                                pattern: REGEX_NUMBER_ONLY,
                            })}
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Số điện thoại"
                            name="phone"
                            onChange={(e) => onInputChange(e)}
                            {...register("phone", {
                                required: true,
                                pattern: REGEX_PHONE,
                            })}
                        />
                    </Form.Group>
                </Row>
                {(errors.identification || errors.phone) && (
                    <Row>
                        {errors.identification && (
                            <Form.Label as={Col} className="form__message">
                                CMND/CCCD chứa 9-10 số
                            </Form.Label>
                        )}
                        {errors.phone && (
                            <Form.Label as={Col} className="form__message">
                                Đầu số điện thoại phải thuộc các nhà mạng tại
                                Việt Nam
                            </Form.Label>
                        )}
                    </Row>
                )}
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => onInputChange(e)}
                        {...register("email", {
                            required: true,
                            pattern: REGEX_EMAIL,
                        })}
                    />
                </Form.Group>
                {errors.email && (
                    <p className="mb-0 form__message">
                        Tên người dùng chỉ chứa chữ cái, chữ số và dấu chấm xuất
                        hiện ở giữa
                    </p>
                )}
            </Form>
        </>
    );
};

export default IntroducerCreate;
