import { MetaTags } from "react-meta-tags";
import ChildrenList from "../../components/children/ChildrenList";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import ChildrenContextProvider from "../../contexts/ChildrenContext";
import "./list.scss";

const List = () => {
    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Thành viên</title>
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

export default List;
