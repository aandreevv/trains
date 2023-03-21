import logo from './logo.svg';
import './App.css';
import DataTable from "./components/listOfTraffics/listOfTraffics";
import {useEffect, useState} from "react";
import {_apiBase} from "./api";

const App = () => {
    const [traffics, setTraffics] = useState([]);
    const [stations, setStations] = useState([]);

    const fetchTraffics = async () => {
        const response = await fetch(`${_apiBase}/traffic`);
        const data = await response.json();
        const transformData = data.map(traffic => {
            return {
                ...traffic,
                from: traffic.from.name,
                to: traffic.to.name,
                inRoad: new Date(traffic.arrivalTime) - new Date(traffic.departureTime)
            }
        })
        setTraffics(transformData);
    };

    const fetchStations = async () => {
        const response = await fetch(`${_apiBase}/stations`);
        return await response.json().then(res => {
            setStations(res)
        });
    }

    useEffect(() => {
        fetchTraffics();
    }, [])

    useEffect(() => {
        fetchStations();
    },)

    const remove = (id) => {
        setTraffics(traffics.filter(traffic => traffic.id !== id));
    }


    const newRace = async(body) => {
        await fetch(`${_apiBase}/traffic`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        fetchTraffics();
    }

    const newStation = async(name) => {
        await fetch(`${_apiBase}/stations`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(name)
        })
        fetchStations();
    }

    return (
        <div className="App">
            <DataTable
                traffics={traffics}
                stations={stations}
                remove={remove}
                newRace={newRace}
                newStation={newStation}
            ></DataTable>
        </div>
    );
}

export default App;
