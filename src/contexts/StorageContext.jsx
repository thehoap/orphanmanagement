import { createContext, useEffect, useState } from "react";

export const StorageContext = createContext();

const StorageContextProvider = (props) => {
    const [storages, setStorages] = useState([]);
    const [pages, setPages] = useState([]);

    const currentPage = JSON.parse(localStorage.getItem("currentPage"));
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        localStorage.setItem("currentPage", 1);
        getStoragesList(1, "");
    }, []);

    // GET STORAGES LIST
    async function getStoragesList(currentPage, keyword) {
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
                `https://orphanmanagement.herokuapp.com/api/v1/admin/search/deleted?page=${currentPage}&limit=${5}`,
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    setStorages(result.data.result);
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
                `https://orphanmanagement.herokuapp.com/api/v1/admin/deleted?page=${currentPage}&limit=${5}`,
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    setStorages(result.data.result);
                    setPages(result.data.pages);
                })
                .catch((error) => {
                    console.log("error", error);
                    setStorages([]);
                    getStoragesList(currentPage - 1);
                });
        }
    }

    // VIEW STORAGE DETAILS
    async function viewStorage(id) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        let result = await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/${id}`,
            requestOptions
        );
        result = await result.json();
        return result.data;
    }
    // RESTORE STORAGE
    async function restoreStorage(id) {
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
                getStoragesList(currentPage);
            })
            .catch((error) => console.log("error", error));
    }
    // DELETE STORAGE
    async function deleteStorage(id) {
        let requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/${id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getStoragesList(currentPage);
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <StorageContext.Provider
            value={{
                storages,
                getStoragesList,
                deleteStorage,
                restoreStorage,
                viewStorage,
                pages,
            }}
        >
            {props.children}
        </StorageContext.Provider>
    );
};

export default StorageContextProvider;
