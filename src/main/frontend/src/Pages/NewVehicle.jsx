import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
export default function NewVehicle() {
    const [licensePlate, setLicensePlate] = useState("");
    const [yearOfManufacture, setYearOfManufacture] = useState("");
    const [brand, setBrand] = useState("");
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`name: ${licensePlate}`);
        try {
            let res = await fetch("/api/vehicles", {
                method: "POST",
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
            <div className="navbarAndPage">
                <Navbar />
                <div className="page">
                    <form className="form" onSubmit={handleSubmit}>
                        <h1>New vehicle</h1>
                        <label>
                            <p>License plate</p>
                            <input
                                onChange={(e) => setLicensePlate(e.target.value)}
                            />
                        </label>
                        <label>
                            <p>Year of manufacture</p>
                            <input
                                onChange={(e) => setYearOfManufacture(e.target.value)}
                            />
                        </label>
                        <label>
                            <p>Brand</p>
                            <input
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </label>
                        <label>
                            <p>Type</p>
                            <input
                                onChange={(e) => setType(e.target.value)}
                            />
                        </label>
                        <div>
                            <input className="submit" type="submit" value="Add vehicle" />
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