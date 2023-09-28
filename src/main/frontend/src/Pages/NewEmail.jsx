import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
export default function NewEmail() {
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [subject, setSubject] = useState([]);
    const [content, setContent] = useState("");
    const [shops, setShops] = useState("");
    const [shop, setShop] = useState("");

    const [message, setMessage] = useState("");

    const fetchShops = () =>
        fetch("/api/shops", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setShops(json);

            });
    useEffect(() => {
        fetchShops();
        console.log(shops);
    }, [shops.length])
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`address: ${address}`);
        try {
            let res = await fetch("/api/sendEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    address: address,
                    subject: subject,
                    content: content,
                }),
            });
            if (res.status === 200) {
                setAddress("");
                setSubject("");
                setContent("");
                setMessage("E-mail was sent successfully")
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            setMessage(err);
        }
    };
    const handleShopPick = (shop) => {
        setAddress(shops.find(s => s.id == shop).email);
    }
    return (
        <div className="navbarAndPage">
            <Navbar />
            <div className="page">
                <form className="form" onSubmit={handleSubmit}>
                    <h1>Send e-mail to the shop</h1>
                    <label>
                        <p>Shop</p>
                        <select onChange={(e) => { e.target.value >= 0 ? handleShopPick(e.target.value) : "" }}>
                            <option value={-2}></option>
                            {shops.length !== 0 ? shops.map((s, i) => (<option value={s.id}>{s.name}</option>)) : ""}
                        </select>
                    </label>
                    <label>
                        <p>Subject</p>
                        <input
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Content</p>
                        <textarea
                            className="emailContent"
                            rows="4"
                            cols="50"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </label>
                    <div>
                        <input className="submit" type="submit" value="Send e-mail" />
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