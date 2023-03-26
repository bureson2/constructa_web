import {useNavigate} from "react-router-dom";
import {useState} from "react";

const EditVehicleReport = () => {
    const navigate = useNavigate();
    const url = window.location.href;
    const [vehicleReportId, setVehicleReportId] = useState(url.substring(url.lastIndexOf("/") + 1));

    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [vehicleId, setVehicleId] = useState('');
    const [driverId, setDriverId] = useState('');
    const [vehicleType, setType] = useState('');
    const [originalConditionMotorcycleWatch, setOriginalConditionMotorcycleWatch] = useState(0);
    const [afterworkConditionMotorcycleWatch, setAfterworkConditionMotorcycleWatch] = useState(0);
    const [cargoMass, setCargoMass] = useState(0);
    const [cargoType, setCargoType] = useState(0);
    const [distance, setDistance] = useState(0);
    const [purchaseOfFuelLitres, setPurchaseOfFuelLitres] = useState('');

    return (
        <>
        </>
    );
}
export default EditVehicleReport;