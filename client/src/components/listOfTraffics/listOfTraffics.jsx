import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField} from "@mui/material";
import {_apiBase} from "../../api";
import {useState} from "react";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const DataTable = (props) => {
    const [openRaces, setOpenRaces] = React.useState(false);
    const [openStations, setOpenStations] = React.useState(false);
    const handleOpenRaces = () => setOpenRaces(true);
    const handleCloseRaces = () => setOpenRaces(false);
    const handleOpenStation = () => setOpenStations(true);
    const handleCloseStation = () => setOpenStations(false);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departureTime, setDepartureTime] = useState(dayjs());
    const [arrivalTime, setArrivalTime] = useState(dayjs());
    const [newStationName, setNewStationName] = useState('');


    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 60,
            editable: true,
        },
        {
            field: 'from',
            headerName: 'From',
            width: 150,
            editable: true,
            valueOptions: props.stations.map(option => option.name),
            type: 'singleSelect',
        },
        {
            field: 'to',
            headerName: 'To',
            width: 150,
            editable: true,
            valueOptions: props.stations.map(option => option.name),
            type: 'singleSelect',
        },
        {
            field: 'departureTime',
            headerName: 'Departure time',
            width: 200,
            type: 'dateTime',
            sortable: false,
            editable: true,
            valueGetter: (params) => new Date(params.row.departureTime),
        },
        {
            field: 'arrivalTime',
            headerName: 'Arrival time',
            width: 200,
            type: 'dateTime',
            sortable: false,
            valueGetter: (params) => new Date(params.row.arrivalTime)
        },
        {
            field: 'inRoad',
            headerName: 'In road',
            width: 120,
            sortable: false,
            valueGetter: (params) => {
                const hours = Math.floor(params.row.inRoad / 1000 / 60 / 60)
                const minutes = Math.floor(params.row.inRoad / 1000 / 60 % 60)
                return `${hours}h ${minutes}m`
            }
        },
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            renderCell: (params) => {
                const onClick = async (event) => {
                    event.stopPropagation();
                    fetch(`${_apiBase}/traffic/${params.row.id}`, {
                        method: 'delete'
                    }).then(props.remove(params.row.id));
                }
                return <Button onClick={onClick}>Delete</Button>
            }
        }
    ];

    const handleFrom = (event) => {
        setFrom(event.target.value)
    }

    const handleTo = (event) => {
        setTo(event.target.value)
    }

    const handleNewRace = () => {
        const body = {fromId: +from, toId: +to, departureTime, arrivalTime};
        if (from !== "" || to !== "") {
            props.newRace(body)
        }
    }

    const handleNewStation = () => {
        const body = {name: newStationName};
        if (newStationName !== "") {
            props.newStation(body);
        }
    }

    return (
        <div style={{height: '100vh', width: '100%'}}>
            <Button onClick={handleOpenRaces}>New race</Button>
            <Button onClick={handleOpenStation}>New station</Button>
            <DataGrid
                rows={props.traffics}
                columns={columns}
                pageSize={100}
                editMode={"cell"}
                rowsPerPageOptions={[15]}
            />

            <Modal
                open={openRaces}
                onClose={handleCloseRaces}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FormControl fullWidth>
                        <InputLabel id="from">From</InputLabel>
                        <Select
                            labelId="from"
                            id="demo-simple-select"
                            value={from}
                            label="From"
                            onChange={handleFrom}
                        >
                            {props.stations.map(station => <MenuItem value={station.id}>{station.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="to">To</InputLabel>
                        <Select
                            labelId="to"
                            id="demo-simple-select"
                            value={to}
                            label="To"
                            onChange={handleTo}
                        >
                            {props.stations.map(station => <MenuItem value={station.id}>{station.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker label="Departure" onChange={(event) => setDepartureTime(event.$d)}/>
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker label="Arrival" onChange={(event) => setArrivalTime(event.$d)}/>
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                    <Button onClick={handleNewRace}>Submit</Button>
                </Box>
            </Modal>

            <Modal
                open={openStations}
                onClose={handleCloseStation}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FormControl fullWidth>
                        <TextField
                            label="New station"
                            value={newStationName}
                            onChange={(event) => setNewStationName(event.target.value)}></TextField>
                    </FormControl>
                    <Button onClick={handleNewStation}>Submit</Button>
                </Box>
            </Modal>
        </div>

    );
}

export default DataTable;
