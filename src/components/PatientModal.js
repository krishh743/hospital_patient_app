import React, {useState} from 'react';

const PatientModal = ({patient, onSave}) => {
    const [name, setName] = useState(patient.name);
    const [gender, setGender] = useState(patient.gender);
    const [dob, setDob] = useState(patient.dob);
    const [image, setImage] = useState(patient.image);

    const handleSave = () => {
        const updatedPatient = {
            ...patient,
            name,
            gender,
            dob,
            image,
        };
        onSave(updatedPatient);
    };

    return (
        <div>
            <h2>Edit Patient Information</h2>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Gender:
                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
            </label>
            <label>
                Date of Birth:
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            </label>
            <label>
                Image URL:
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            </label>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default PatientModal;
