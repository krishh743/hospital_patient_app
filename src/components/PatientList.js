import React, {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Button, Stack} from "@mui/material";
import {patientData} from "./Data";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./Patient.css"
// import {patientData} from "./Header";

const PatientList = () => {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(patientData);
    const [showModal, setShowModal] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);
    const [newPatientData, setNewPatientData] = useState({
        name: "",
        gender: "",
        dob: "",
        image: ""
    });
    const [showNewPatientModal, setShowNewPatientModal] = useState(false);

    const [open, setOpen] = useState(false)
    useEffect(() => {
        const results = patientData.filter(patient =>
            patient.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(results);
    }, [search]);


    const handleClose = () => {
        setOpen(false);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setNewPatientData(prevState => ({
                ...prevState,
                image: reader.result
            }));
        };
    };

    const handleSearch = event => {
        setSearch(event.target.value);
    };

    const handleEdit = patient => {
        setEditingPatient(patient);
        setNewPatientData(patient);
        setShowModal(true);
    };

    const handleSave = () => {
        if (editingPatient) {
            // Edit existing patient
            const updatedData = patientData.map(patient =>
                patient.id === editingPatient.id ? newPatientData : patient
            );
            setFilteredData(updatedData);
            localStorage.setItem("patientData", JSON.stringify(updatedData));
        } else {
            // Add new patient
            const newPatient = {
                id: patientData.length + 1,
                ...newPatientData
            };
            const updatedData = [...patientData, newPatient];
            setFilteredData(updatedData);
            localStorage.setItem("patientData", JSON.stringify(updatedData));
        }
        setShowModal(false);
        setEditingPatient(null);
        setNewPatientData({
            name: "",
            gender: "",
            dob: "",
            image: ""
        });
    };

    const handleCancel = () => {
        setShowModal(false);
        setEditingPatient(null);
        setNewPatientData({
            name: "",
            gender: "",
            dob: "",
            image: ""
        });
    };

    const handleInputChange = event => {
        const {name, value} = event.target;
        setNewPatientData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddPatient = () => {
        const newPatient = {
            id: patientData.length + 1,
            ...newPatientData
        };
        const updatedData = [...patientData, newPatient];
        setFilteredData(updatedData);
        localStorage.setItem("patientData", JSON.stringify(updatedData));
        setShowNewPatientModal(false);
        setNewPatientData({
            name: "",
            gender: "",
            dob: "",
            image: ""
        });
    };


    return (
        <div className="patient-list-body">
            <Stack direction={""} justifyContent="center" >
                <p className="find-patient-text">Find your patient here</p>
            </Stack>

            <div className="input-field" >
                <Button
                    variant="contained"
                    onClick={() => setShowNewPatientModal(true)}
                >
                    Add New Patient
                </Button>
                <input
                    className="input-txt"
                    placeholder="Search patient name.."
                    type="text"
                    value={search}
                    onChange={handleSearch}
                />
            </div>


            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 5,
                        width: 230,
                    },
                }}
            >
                {filteredData.map((patient) => (

                    <Paper  >
                        <div className="patient-list" >
                            <img className="patient-photo" src={patient.image} alt="green iguana" />
                        </div>
                        <Typography color="green" gutterTop variant="h5" marginLeft={"20px"}>
                            {patient.name}
                        </Typography>
                        <Stack direction={"column"} marginLeft={"20px"} spacing={1}>
                            <span className="reason"><span >Reason for admit : </span>{patient.subject}</span>
                            <span>{patient.gender}</span>
                            <span className="dob-alignment">{patient.dob}</span>
                        </Stack>
                        <div className="edit-btn-section"  >

                            <Button className="edit-btn" variant="contained" onClick={() => {handleEdit(patient); setOpen(true);}
                            }>
                                Edit
                            </Button>
                        </div>
                    </Paper>
                ))}
            </Box>

            {showModal && (
                <div>
                    <Dialog open={open} onClose={handleClose} >
                        <DialogTitle>
                            {editingPatient ? "Edit Patient" : "Add New Patient"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Edit your patient details here
                            </DialogContentText>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{marginBottom: "20px"}}
                            />

                            <img
                                src={newPatientData.image}
                                alt="patient image"
                                className="new-patient-image"

                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                placeholder="Name"
                                fullWidth
                                value={newPatientData.name}
                                onChange={handleInputChange}
                                name="name"

                            />

                            <TextField
                                margin="dense"
                                id="gender"
                                placeholder="Gender"
                                fullWidth
                                value={newPatientData.gender}
                                onChange={handleInputChange}
                                name="gender"
                            />

                            <TextField
                                margin="dense"
                                id="dob"
                                placeholder="Date of Birth"
                                fullWidth
                                value={newPatientData.dob}
                                onChange={handleInputChange}
                                name="dob"
                            />
                        </DialogContent>
                        <DialogActions className="center-btn">
                            <Button className="edit-btn-1" onClick={handleCancel}>Cancel</Button>
                            <Button className="edit-btn-1" onClick={handleSave}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )}
            {showNewPatientModal && <div>
                <Dialog open={showNewPatientModal} onClose={() => setShowNewPatientModal(false)} className="add-data-dialog">
                    <DialogTitle>Add New Patient</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                placeholder="Name"
                                value={newPatientData.name}
                                onChange={handleInputChange}
                                name="name"
                            />
                            <TextField
                                placeholder="Gender"
                                value={newPatientData.gender}
                                onChange={handleInputChange}
                                name="gender"
                                className="textfield-data"
                            />
                            <TextField
                                placeholder="DOB"
                                value={newPatientData.dob}
                                onChange={handleInputChange}
                                name="dob"
                            />
                            <input type="file" accept="image/*" onChange={handleImageChange} className="upload-image" />
                        </form>
                    </DialogContent>
                    <DialogActions className="center-btn">
                        <Button onClick={() => setShowNewPatientModal(false)}
                            className="edit-btn-1"
                        >Cancel</Button>
                        <Button onClick={handleAddPatient} className="edit-btn-1">Save</Button>
                    </DialogActions>
                </Dialog>
            </div>}
        </div>

    );
}

export default PatientList;



