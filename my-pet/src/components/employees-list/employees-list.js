import "./employeers-list.css";
import EmployeersListItem from "../employees-list-item/employeers-list-item";

const EmployeersList = () => {
    return (
        <ul className="app-list list-group">
            <EmployeersListItem/>
            <EmployeersListItem/>
            <EmployeersListItem/>
        </ul>
    );
}

export default EmployeersList;