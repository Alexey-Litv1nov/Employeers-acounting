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
            ]
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


    render() {
        // общее число сотрудников
        const employeers =  this.state.data.length;
        // число сотрудников, которые получат премию
        const increased = this.state.data.filter(item => item.increase).length;

        return (
            <div className="app">
                <AppInfo
                    employeers={employeers}
                    increased={increased}
                />
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
                <EmployeersList 
                    data={this.state.data}
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