import { createContext, useEffect, useState } from "react";

export const EmployeeContext = createContext();

const EmployeeContextProvider = (props) => {
    const [employees, setEmployees] = useState([]);
    const [pages, setPages] = useState([]);

    const currentPage = JSON.parse(localStorage.getItem("currentPage"));
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        localStorage.setItem("currentPage", 1);
        getEmployeesList(1, "");
    }, []);

    // GET ACCOUNTS LIST
    async function getEmployeesList(currentPage, keyword) {
        if (keyword) {
            let raw = JSON.stringify({
                keyword,
            });

            let requestOptions = {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: raw,
                redirect: "follow",
            };

            await fetch(
                `https://orphanmanagement.herokuapp.com/api/v1/manager/employee/search?page=${currentPage}&limit=${5}`,
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    setEmployees(result.data.result);
                    setPages(result.data.pages);
                })
                .catch((error) => console.log("error", error));
        } else {
            let requestOptions = {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                redirect: "follow",
            };
            await fetch(
                `https://orphanmanagement.herokuapp.com/api/v1/manager/employee?page=${currentPage}&limit=${5}`,
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    setEmployees(result.data.result);
                    setPages(result.data.pages);
                })
                .catch((error) => {
                    console.log("error", error);
                    setEmployees([]);
                    getEmployeesList(currentPage - 1);
                });
        }
    }
    // ADD ACCOUNT
    async function addEmployee(
        image,
        fullName,
        date_of_birth,
        gender,
        roles,
        address,
        identification,
        phone,
        email
    ) {
        let raw = JSON.stringify({
            image,
            fullName,
            date_of_birth,
            gender,
            roles,
            address,
            identification,
            phone,
            email,
        });

        let requestOptions = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: raw,
            redirect: "follow",
        };

        await fetch(
            "https://orphanmanagement.herokuapp.com/api/v1/manager/employee",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.code === 200) {
                    getEmployeesList(currentPage);
                } else if (result.error === "ERROR_EMAIL_ALREADY_EXIST") {
                    alert("Email đã tồn tại");
                } else if (
                    result.error === "ERROR_IDENTIFICATION_ALREADY_EXIST"
                ) {
                    alert("CMND/CCCD đã tồn tại");
                }
            })
            .catch((error) => console.log("error", error));
    }
    // VIEW ACCOUNT DETAILS
    async function viewEmployee(id) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        let result = await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/employee/${id}`,
            requestOptions
        );
        result = await result.json();
        return result.data;
    }
    //EDIT ACCOUNT
    async function updateEmployee(id, updatedEmployee) {
        let raw = JSON.stringify(updatedEmployee);
        let requestOptions = {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: raw,
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/employee/${id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getEmployeesList(currentPage);
            })
            .catch((error) => console.log("error", error));
    }
    // STORE ACCOUNT
    async function storeEmployee(id) {
        let requestOptions = {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/${id}/updateStatus`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                getEmployeesList(currentPage);
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <EmployeeContext.Provider
            value={{
                employees,
                getEmployeesList,
                addEmployee,
                storeEmployee,
                viewEmployee,
                updateEmployee,
                pages,
            }}
        >
            {props.children}
        </EmployeeContext.Provider>
    );
};

export default EmployeeContextProvider;
