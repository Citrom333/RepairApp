import { useEffect, useState } from "react";

export default function NewFixture() {
    const [name, setName] = useState("");
    const [shops, setShops] = useState([]);
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
        console.log(`name: ${name}, shop: ${shops.find(s => s.id == shop).name}`);
        try {
            let res = await fetch("/api/fixtures", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    shop: shops.find(s => s.id == shop),
                }),
            });
            if (res.status === 200) {
                setName("");
                setShop("");
                setMessage("Fixture saved successfully");
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
                    <h1>New fixture</h1>
                    <label>
                        <p>Name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Shops</p>
                        <select onChange={(e) => { e.target.value >= 0 ? setShop(e.target.value) : e.target.value === -1 ? handleNewShop() : "" }}>
                            <option value={-2}></option>
                            <option value={-1}>New</option>
                            {shops.length !== 0 ? shops.map((s, i) => (<option value={s.id}>{s.name}</option>)) : ""}
                        </select>
                    </label>
                    <div>
                        <input className="submit" type="submit" value="Add fixture" />
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