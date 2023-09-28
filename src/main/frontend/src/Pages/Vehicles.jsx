import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import '../App.css'
import { useNavigate } from "react-router-dom";
import VehiclesTable from "../Components/VehiclesTable.jsx";
import Pagination from "../Components/Pagination";
import DeleteModal from "../Components/DeleteModal";
export default function Vehicles() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [vehicles, setVehicles] = useState([]);
    const [works, setWorks] = useState([]);
    const [showVehicle, setShowVehicle] = useState(null);
    const [message, setMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    const handlePageClick = (selected) => {
        const newOffset = selected.selected + 1;
        console.log(
            `User requested page number ${newOffset}, which is offset ${(newOffset - 1) * itemsPerPage}`
        );
        setCurrentPage(newOffset);
    };

    const fetchVehicles = () =>
        fetch("/api/vehicles", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setVehicles(json);
            });
    const fetchWorks = (id) =>
        fetch(`/api/works/forVehicle/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setWorks(json);

            });

    const fetchDelete = (id) => {
        fetch(`/api/vehicles/${id}`, {
            method: "DELETE",
        }).then((response) => {
            if (response.status === 200) {
                setMessage("Vehicle deleted");
                setShowConfirm(false);
                fetchVehicles();
            } else {
                setMessage("Some error occured");
            }
        })
            .catch((error) => {
                setMessage("Some error occured");
            });
    }
    useEffect(() => {
        localStorage.clear();
        fetchVehicles();
    }, [vehicles.length])
    const handlePickVehicle = (vehicle) => {
        setShowVehicle(vehicle)
    }
    const handleDelete = (id) => {
        console.log("delete" + showVehicle.id)
        fetchDelete(id);
        setShowVehicle(null);
    }
    useEffect(() => {
        console.log(showVehicle)
        localStorage.setItem("vehicle", JSON.stringify(showVehicle));
        if (showVehicle !== null) {
            fetchWorks(showVehicle.id)
        }
    }, [showVehicle]);
    const showWorkDetails = (workToShow) => {
        navigate(`/detailsOfWorks/${workToShow.id}`);
    }
    const itemsPerPage = 4;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentWorks = works.slice(startIndex, endIndex);
    const pageCount = Math.ceil(works.length / itemsPerPage);

    return (
        <div className="navbarAndPage">
            <Navbar />
            <div className="page">
                {showVehicle === null ?
                    <div>
                        <h1>Vehicles</h1>
                        <ul>
                            {vehicles.length !== 0 ? vehicles.map((v, i) => (
                                <li className="vehicle_list_element" key={i} onClick={() => handlePickVehicle(v)} >{v.licensePlate}</li>
                            )) : ""}
                        </ul>
                        <div>
                            <a href="/newVehicle">
                                <button >
                                    Add new vehicle
                                </button>
                            </a>
                        </div>
                        <div>
                            <a href="/">
                                <button >
                                    Back
                                </button>
                            </a>
                        </div>
                    </div>
                    :
                    <div className="vehicle_details">
                        <a href="/newWork">
                            <button >Start new work</button>
                        </a>
                        <h1>{showVehicle.licensePlate}</h1>
                        <h3>Year of manufacture: {showVehicle.yearOfManufacture}</h3>
                        <h3>Brand: {showVehicle.brand}</h3>
                        <h3>Type: {showVehicle.type}</h3>
                        <div className='table'>
                            <VehiclesTable currentWorks={currentWorks} showWorkDetails={showWorkDetails} />
                            {works.length > 0 ? <Pagination
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                currentPage={currentPage}
                            /> : ""}
                        </div>
                        <div>
                            <a href="/updateVehicle"><button>Update</button></a>
                        </div>
                        <div>
                            <button onClick={() => setShowConfirm(true)}>Delete</button>
                        </div>
                        {showConfirm == false ? "" : <DeleteModal handleDelete={handleDelete} itemToDelete={showVehicle} setShowConfirm={setShowConfirm} />}
                        <div>
                            <button onClick={() => setShowVehicle(null)}>BACK</button>
                        </div>
                    </div>}
                <p>{message}</p>
            </div>
        </div>
    )
}


