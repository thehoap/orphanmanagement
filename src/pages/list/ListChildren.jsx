import { Navigate } from "react-router-dom";
import { MetaTags } from "react-meta-tags";
import ChildrenList from "../../components/children/ChildrenList";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import ChildrenContextProvider from "../../contexts/ChildrenContext";
import "./list.scss";

const ListChildren = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
        return <Navigate to="/" />;
    }

    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Trẻ em</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <Header />
                <div className="main">
                    <ChildrenContextProvider>
                        <ChildrenList />
                    </ChildrenContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListChildren;
