import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { AccountContext } from "../../contexts/AccountContext";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";
import { useForm } from "react-hook-form";
import {
    REGEX_ADDRESS,
    REGEX_EMAIL,
    REGEX_NAME,
    REGEX_NUMBER_ONLY,
    REGEX_PHONE,
} from "../utils/regex";

const AccountCreate = () => {
    const { addAccount } = useContext(AccountContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [newAccount, setNewAccount] = useState({
        image: "",
        fullName: "",
        date_of_birth: "",
        gender: "",
        roles: [],
        address: "",
        identification: "",
        phone: "",
        email: "",
    });

    const [imageSuccess, setImageSuccess] = useState("");
    const [pickerDate, setPickerDate] = useState("");

    const onInputChange = (e) => {
        setNewAccount({
            ...newAccount,
            [e.target.name]: e.target.value,
        });
        console.log(newAccount);
    };
    const {
        image,
        fullName,
        date_of_birth,
        gender,
        roles,
        address,
        identification,
        phone,
        email,
    } = newAccount;
    const onSubmit = (data) => {
        console.log(data);
        addAccount(
            image,
            data.fullName,
            date_of_birth,
            gender,
            roles,
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
        const storageRef = ref(storage, `accounts/${generateString(100)}`);
        await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    setNewAccount({
                        ...newAccount,
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
                    id="accountImage"
                    alt=""
                    src={
                        (file && URL.createObjectURL(file)) ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                />
                <Row>
                    <Form.Label
                        htmlFor="accountImageFile"
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
                        id="accountImageFile"
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
                id="accountCreate"
            >
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="H??? v?? t??n"
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
                        T??n kh??ng ???????c ch???a s???, k?? t??? ?????c bi???t v?? kh??ng c??
                        kho???ng tr???ng ??? 2 ?????u
                    </p>
                )}
                <Row className="mb-3">
                    <Form.Group as={Col} className="form-group">
                        <DatePicker
                            className="form-control"
                            placeholderText="Ng??y sinh"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            dateFormat="dd/MM/yyyy"
                            selected={pickerDate}
                            onChange={(date) => {
                                const resultDate =
                                    moment(date).format("DD/MM/YYYY");
                                setNewAccount({
                                    ...newAccount,
                                    date_of_birth: resultDate,
                                });
                                setPickerDate(date);
                            }}
                            // required
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="form-group">
                        <Form.Select
                            defaultValue="Gi???i t??nh"
                            className="form-select"
                            name="gender"
                            value={gender}
                            onChange={(e) => {
                                onInputChange(e);
                                setNewAccount({
                                    ...newAccount,
                                    gender:
                                        e.target.value === "true"
                                            ? true
                                            : false,
                                });
                            }}
                        >
                            <option value={"Gi???i t??nh"} hidden>
                                Gi???i t??nh
                            </option>
                            <option value={true}>Nam</option>
                            <option value={false}>N???</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} className="form-group">
                        <select
                            defaultValue="Ph??n quy???n"
                            className="form-select"
                            name="roles"
                            value={roles}
                            onChange={(e) => {
                                onInputChange(e);
                                setNewAccount({
                                    ...newAccount,
                                    roles: [e.target.value],
                                });
                            }}
                        >
                            <option value={"Ph??n quy???n"} hidden>
                                Ph??n quy???n
                            </option>
                            <option value={["ROLE_ADMIN"]}>
                                Qu???n tr??? vi??n
                            </option>
                            <option value={["ROLE_EMPLOYEE"]}>Nh??n vi??n</option>
                            <option value={["ROLE_MANAGER_LOGISTIC"]}>
                                Qu???n l?? trung t??m
                            </option>
                            <option value={["ROLE_MANAGER_HR"]}>
                                Qu???n l?? nh??n s???
                            </option>
                            <option value={["ROLE_MANAGER_CHILDREN"]}>
                                Qu???n l?? tr??? em
                            </option>
                        </select>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="?????a ch???"
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
                        ?????a ch??? kh??ng ???????c ch???a k?? t??? ?????c bi???t v?? kh??ng c??
                        kho???ng tr???ng ??? 2 ?????u
                    </p>
                )}
                <Row className="mb-3">
                    <Form.Group as={Col} className="form-group">
                        <input
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
                            placeholder="S??? ??i???n tho???i"
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
                                CMND/CCCD ch???a 9-10 s???
                            </Form.Label>
                        )}
                        {errors.phone && (
                            <Form.Label as={Col} className="form__message">
                                ?????u s??? ??i???n tho???i ph???i thu???c c??c nh?? m???ng t???i
                                Vi???t Nam
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
                        T??n ng?????i d??ng ch??? ch???a ch??? c??i, ch??? s??? v?? d???u ch???m xu???t
                        hi???n ??? gi???a
                    </p>
                )}
            </Form>
        </>
    );
};

export default AccountCreate;
