import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import '../App.css'
import DeleteModal from "../Components/DeleteModal";
export default function DetailsOfWork() {
    const { id } = useParams();
    const [work, setWork] = useState();
    const [message, setMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const fetchWork = () =>
        fetch(`/api/works/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setWork(json);
                console.log(json)
            });


    const fetchDelete = () => {
        fetch(`/api/works/${id}`, {
            method: "DELETE",
        }).then((response) => {
            if (response.status === 200) {
                setMessage("Work deleted");
                setShowConfirm(false);
            } else {
                setMessage("Some error occured");
            }
        })
            .catch((error) => {
                setMessage("Some error occured");
            });
    }

    useEffect(() => {
        fetchWork();
        console.log("fetch")
    }, [])

    const handleDelete = (e) => {
        console.log("delete")
        fetchDelete();
    }

    return (
        <div>
            <Navbar />
            <div className="page">
                {work == null ? <p>Loading...</p> : <div>
                    <h1>{JSON.parse(localStorage.getItem("vehicle")).licensePlate}</h1>
                    <h3>Date of work: </h3>
                    <p>{new Date(work.date).getFullYear()}-{(new Date(work.date).getMonth() + 1).toString().padStart(2, '0')}-{new Date(work.date).getDate().toString().padStart(2, '0')}</p>
                    <h3>Mileage: </h3>
                    <p>{work.mileage}</p>
                    <h3>Work: </h3>
                    <p>{work.name}</p>
                    <h3>Comment: </h3>
                    <p>{work.comment}</p>
                    <h3>Fixtures: </h3>
                    {work.fixtures.length > 0 ? work.fixtures.map(fixt => <p>{fixt.name}</p>) : <p>No fixture</p>}
                    <div>
                        <button onClick={() => setShowConfirm(true)}>Delete</button>
                    </div>
                    {showConfirm == false ? "" : <DeleteModal handleDelete={handleDelete} itemToDelete={""} setShowConfirm={setShowConfirm} />}
                    <p>{message}</p>
                    <div>
                        <a href="/vehicles">
                            <button >
                                Back
                            </button>
                        </a>
                    </div>
                </div>}
            </div>
        </div>
    )
}