import { createContext, useEffect, useState } from "react";

export const NurturerContext = createContext();

const NurturerContextProvider = (props) => {
    const [nurturers, setNurturers] = useState([]);
    const [pages, setPages] = useState([]);

    const nurturerPage = JSON.parse(localStorage.getItem("nurturerPage"));
    const token = JSON.parse(localStorage.getItem("token"));
    
    useEffect(() => {
        getNurturersList(1);
    }, []);

    // GET NURTURERS LIST
    async function getNurturersList(nurturerPage) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/nurturer?page=${nurturerPage}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setNurturers(result.data.result);
                setPages(result.data.pages);
            })
            .catch((error) => console.log("error", error));
    }

    // ADD NURTURER
    async function addNurturer(
        image,
        fullName,
        dateOfBirth,
        gender,
        address,
        identification,
        phone,
        email
    ) {
        let raw = JSON.stringify({
            image,
            fullName,
            dateOfBirth,
            gender,
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
            "https://orphanmanagement.herokuapp.com/api/v1/manager/nurturer",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getNurturersList(nurturerPage);
            })
            .catch((error) => console.log("error", error));
    }
    // VIEW NURTURER DETAILS
    async function viewNurturer(id) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        let result = await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/nurturer/${id}`,
            requestOptions
        );

        result = await result.json();
        return result.data;
    }
    //EDIT NURTURER
    async function updateNurturer(id, updatedNurturer) {
        let raw = JSON.stringify(updatedNurturer);
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/nurturer/${id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getNurturersList(nurturerPage);
            })
            .catch((error) => console.log("error", error));
    }
    // DELETE NURTURER
    async function deleteNurturer(id) {
        let requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/nurturer/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                getNurturersList(nurturerPage);
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <NurturerContext.Provider
            value={{
                nurturers,
                getNurturersList,
                addNurturer,
                deleteNurturer,
                viewNurturer,
                updateNurturer,
                pages,
            }}
        >
            {props.children}
        </NurturerContext.Provider>
    );
};

export default NurturerContextProvider;
