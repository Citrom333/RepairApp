import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
export default function UpdateVehicle() {
    const [licensePlate, setLicensePlate] = useState(JSON.parse(localStorage.getItem("vehicle")).licensePlate);
    const [yearOfManufacture, setYearOfManufacture] = useState(JSON.parse(localStorage.getItem("vehicle")).yearOfManufacture);
    const [brand, setBrand] = useState(JSON.parse(localStorage.getItem("vehicle")).brand);
    const [type, setType] = useState(JSON.parse(localStorage.getItem("vehicle")).type);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`name: ${licensePlate}`);
        try {
            let res = await fetch(`/api/vehicles/${JSON.parse(localStorage.getItem("vehicle")).id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    licensePlate: licensePlate,
                    brand: brand,
                    yearOfManufacture: yearOfManufacture,
                    type: type
                }),
            });
            if (res.status === 200) {
                setBrand("");
                setLicensePlate("");
                setType("");
                setYearOfManufacture("");
                setMessage("Vehicle saved successfully");
            } else {
                console.log(res)
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err)
            setMessage("Some error occured");
        }
    };
    return (
        <>
            <div>
                <Navbar />
                <div className="page">
                    <form className="form" onSubmit={handleSubmit}>
                        <h1>Update vehicle</h1>
                        <label>
                            <p>License plate</p>
                            <input
                                value={licensePlate}
                                onChange={(e) => setLicensePlate(e.target.value)}
                            />
                        </label>
                        <label>
                            <p>Year of manufacture</p>
                            <input
                                value={yearOfManufacture}
                                onChange={(e) => setYearOfManufacture(e.target.value)}
                            />
                        </label>
                        <label>
                            <p>Brand</p>
                            <input
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </label>
                        <label>
                            <p>Type</p>
                            <input
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </label>
                        <div>
                            <input className="submit" type="submit" value="Update vehicle" />
                        </div>
                    </form>
                    <div><p>{message}</p></div>
                    <div>
                        <a href="/vehicles">
                            <button >
                                Back
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}