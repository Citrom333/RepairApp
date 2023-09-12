import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import '../App.css'
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";


export default function Vehicles() {
    const navigate = useNavigate()
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const [vehicles, setVehicles] = useState([]);
    const [works, setWorks] = useState([]);
    const [showVehicle, setShowVehicle] = useState(null);
    const [message, setMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [showWork, setShowWork] = useState(false);
    const [itemOffset, setItemOffset] = useState(0);

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
                fetchVehicles(); // Ezt a függvényt definiálnod kell, hogy frissítse a járművek állapotát
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
        console.log(vehicles);
        console.log(location);
        console.log(vehicles.length)
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
    const itemsPerPage = 4;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentWorks = works.slice(startIndex, endIndex);
    const pageCount = Math.ceil(works.length / itemsPerPage);
    const showWorkDetails = (workToShow) => {
        navigate(`/detailsOfWorks/${workToShow.id}`);
    }

    return (
        <div>
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
                            <table>
                                <thead className='table-head'>
                                    <tr>
                                        <th>Date of work</th>
                                        <th>Mileage</th>
                                        <th>Name</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {currentWorks.length !== 0 ? currentWorks.map((work, i) => (
                                        <tr className={`table-row-${i % 2}`} key={i} onClick={() => showWorkDetails(work)}>
                                            <td>
                                                {new Date(work.date).getFullYear()}-{(new Date(work.date).getMonth() + 1).toString().padStart(2, '0')}-{new Date(work.date).getDate().toString().padStart(2, '0')}
                                            </td>
                                            <td>{work.mileage}</td>
                                            <td>{work.name}</td>
                                        </tr>
                                    )) : <tr></tr>}
                                </tbody>
                            </table>
                            {works.length > 0 ? <ReactPaginate className="pagination"
                                breakLabel="..."
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel="< previous"
                                renderOnZeroPageCount={null}
                                initialPage={currentPage - 1} // Hozzáadva
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                            /> : ""}
                        </div>
                        <div>
                            <a href="/updateVehicle"><button>Update</button></a>
                        </div>
                        <div>
                            <button onClick={() => setShowConfirm(true)}>Delete</button>
                        </div>
                        {showConfirm == false ? "" : <div id="deleteModal" class="modal">
                            <div class="modal-content">
                                <p>Do you really want to delete?</p>
                                <button onClick={() => handleDelete(showVehicle.id)} id="confirmDelete">Yes</button>
                                <button onClick={() => setShowConfirm(false)} id="cancelDelete">No</button>
                            </div>
                        </div>}
                        <div>
                            <button onClick={() => setShowVehicle(null)}>BACK</button>
                        </div>
                    </div>}
                <p>{message}</p>
            </div>
        </div>
    )
}