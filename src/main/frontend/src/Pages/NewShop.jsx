import { useEffect, useState } from "react";

export default function NewShop() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`name: ${name}`);
        try {
            let res = await fetch("/api/shops", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    address: address,
                    email: email,
                    phoneNumber: phoneNumber
                }),
            });
            if (res.status === 200) {
                setName("");
                setShop("");
                setMessage("Shop saved successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            setMessage(err);
        }
    };
    return (
        <>
            <div>
                <form className="form" onSubmit={handleSubmit}>
                    <h1>New shop</h1>
                    <label>
                        <p>Name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Address</p>
                        <input
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>E-mail</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Phone number</p>
                        <input
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </label>
                    <div>
                        <input className="submit" type="submit" value="Add shop" />
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

        </>
    )
}