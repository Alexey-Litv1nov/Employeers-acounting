import "./app-info.css";

const AppInfo = ({employeers, increased}) => {
    const companyName = "nut net";
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании: {companyName}</h1>
            <h2>Общее число сотрудников: {employeers}</h2>
            <h2>Премию получат: {increased}</h2>
        </div>
    );
};

export default AppInfo;