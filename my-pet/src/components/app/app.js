import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeersList from "../employees-list/employees-list";
import EmployeersAddForm from "../employees-add-form/employees-add-form";

import "./app.css";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: "Alexey Litvinov", salary: 50000, increase: true, rise: true, id: 1},
                {name: "John C.", salary: 800, increase: false, rise: false, id: 2},
                {name: "Alex M.", salary: 3000, increase: true, rise: false, id: 3},
                {name: "Carl W.", salary: 5000, increase: false, rise: false, id: 4}
            ],
            term: "",
            filter: "all"
        }
        this.maxId = this.state.data.length;
    }
    // удаление сотрудника
    deleteItem = (id) => {
        this.maxId -= 1;
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    // добавление новых сотрудников
    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    // печенька (премия)
    onToggleIncreace = (id) => {
         this.setState(({data})=> ({
            data: data.map((item)=>{
                if(item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item;
            })
         }))
    }

    // звездочка (повышение)
    onToggleRise = (id) => {
        this.setState(({data})=> ({
            data: data.map((item)=>{
                if(item.id === id) {
                    return {...item, rise: !item.rise}
                }
                return item;
            })
         }))
    }

    onToggleProp = (id, prop) => {
        this.setState(({data})=> ({
            data: data.map((item)=>{
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
         }))
    }

    searchEmp = (items, term) => {
        // если вводимая строка пустая, то возвращаем те же самые элементы
        if(term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    // работа с поисковой строкой
    onUpdateSearch = (term) => {
        this.setState({term});
    }

    // фильтры
    filerPost = (items, filter) => {
        switch(filter) {
            // сотрудники со звездочкой
            case "rise":
                return items.filter(item => item.rise);
            case "moreThen1000":
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    // фильтры
    onFilterSelect = (filter) => {
        this.setState({filter});
    }




    render() {
        const {data, term, filter} = this.state;
        // общее число сотрудников
        const employeers =  this.state.data.length;
        // число сотрудников, которые получат премию
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filerPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo
                    employeers={employeers}
                    increased={increased}
                />
                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                        />
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <EmployeersList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />
                <EmployeersAddForm
                    onAdd={this.addItem}
                />
            </div>
        );
    }
}

export default App;