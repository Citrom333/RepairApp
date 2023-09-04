import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
export default function NewWork() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [mileage, setMilage] = useState("");
    const [date, setDate] = useState("");
    const [fixtures, setFixtures] = useState([]);
    const [chosenFixtures, setChosenFixtures] = useState([]);
    const [message, setMessage] = useState("");
    const fetchFixtures = () =>
        fetch("/api/fixtures", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setFixtures(json);

            });
    useEffect(() => {
        fetchFixtures();
        console.log(JSON.parse(localStorage.getItem("vehicle")).licensePlate);
        console.log(chosenFixtures);
    }, [fixtures.length, chosenFixtures.length])
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`name: ${name}, comment: ${comment}, Date: ${date}, mileage: ${mileage}, fixtures: ${chosenFixtures}, vehicle: ${(localStorage.getItem("vehicle"))}`);
        try {
            let res = await fetch("/api/works", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    name: name,
                    comment: comment,
                    mileage: mileage,
                    date: date.split(".").join("-"),
                    vehicle: JSON.parse(localStorage.getItem("vehicle")),
                    fixtures: chosenFixtures

                }),
            });
            if (res.status === 200) {
                setName("");
                setComment("");
                setDate("");
                setMilage("");
                setFixtures("");
                setChosenFixtures([]);
                setMessage("Work saved successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            setMessage("Some error occured");
        }
    };
    const handleNewFixture = () => {
        console.log("NEW");
        navigate('/newfixture');
    }
    return (
        <div>
            <Navbar />
            <div className="page">
                <form className="form" onSubmit={handleSubmit}>
                    <h1>New work for vehicle {JSON.parse(localStorage.getItem("vehicle")).licensePlate}</h1>
                    <label>
                        <p>Name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Comment</p>
                        <input
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Date</p>
                        <input
                            type="date"
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Milage</p>
                        <input
                            onChange={(e) => setMilage(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Fixtures</p>
                        <select onChange={(e) => { e.target.value >= 0 ? setChosenFixtures(prev => [...prev, fixtures.find(fixt => fixt.id == e.target.value)]) : e.target.value == -1 ? handleNewFixture() : "" }}>
                            <option value={-2}></option>
                            <option value={-1}>New</option>
                            {fixtures.length !== 0 ? fixtures.map((f, i) => (<option value={f.id}>{f.name}</option>)) : ""}
                        </select>
                        <div><p>Used fixtures: </p>{chosenFixtures.map(f => (<p>{f.name}</p>))}</div>
                    </label>
                    {/* <label>
                        <p>Choose an avatar picture</p>
                        <div className="avatarPics">
                            {avatarPics.map((pic, index) =>
                                <div key={index} >
                                    <img
                                        className="avatarPic"
                                        id={chosenPic === pic ? "chosenPicture" : ""}
                                        src={pic}
                                        onClick={() => setChosenPic(pic)}>
                                    </img>
                                </div>)}
                        </div>
                    </label> */}
                    <div>
                        <input className="submit" type="submit" value="Save work" />
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
    )
}