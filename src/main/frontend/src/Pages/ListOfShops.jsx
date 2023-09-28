import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Navbar from "../Components/Navbar";
import Pagination from "../Components/Pagination";
import DeleteModal from "../Components/DeleteModal";
export default function ListOfShops() {
    const [shops, setShops] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showConfirm, setShowConfirm] = useState(false);
    const [message, setMessage] = useState("");
    const [shopToDelete, setShopToDelete] = useState();
    const handlePageClick = (selected) => {
        const newOffset = selected.selected + 1;
        console.log(
            `User requested page number ${newOffset}, which is offset ${(newOffset - 1) * itemsPerPage}`
        );
        setCurrentPage(newOffset);
    };
    const fetchShops = () =>
        fetch("/api/shops", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setShops(json);

            });
    useEffect(() => {
        fetchShops()
    }, [shops.length]);
    const fetchDelete = (id) => {
        fetch(`/api/shops/${id}`, {
            method: "DELETE",
        }).then((response) => {
            if (response.status === 200) {
                setMessage("Shop deleted");
                setShowConfirm(false);
                fetchShops();
                setShopToDelete();
            } else {
                setMessage("Some error occured");
            }
        })
            .catch((error) => {
                setMessage("Some error occured");
            });
    }

    const handleDelete = (id) => {
        fetchDelete(id);
    }
    const itemsPerPage = 4;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentshops = shops.slice(startIndex, endIndex);
    const pageCount = Math.ceil(shops.length / itemsPerPage);

    return (
        <div className="navbarAndPage">
            <Navbar />
            <div className="page">
                <h1>List of shops</h1>
                <div className='table'>
                    <table>
                        <thead className='table-head'>
                            <tr>
                                <th>Name of shop</th>
                                <th>Address</th>
                                <th>Email address</th>
                                <th>Telephone number</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentshops.length !== 0 ? currentshops.map((shop, i) => (
                                <tr className={`table-row-${i % 2}`} key={i}>
                                    <td>
                                        {shop.name}
                                    </td>
                                    <td>{shop.address}</td>
                                    <td>{shop.email}</td>
                                    <td>{shop.phoneNumber}</td>
                                    <div>
                                        <button onClick={() => { setShowConfirm(true), setShopToDelete(shop.id) }}>Delete</button>
                                    </div>
                                </tr>
                            )) : <tr></tr>}
                        </tbody>
                    </table>
                    {shops.length > 0 ? <Pagination
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        currentPage={currentPage}
                    /> : "Loading..."}
                </div>
                {showConfirm == false ? "" : <DeleteModal handleDelete={handleDelete} itemToDelete={shopToDelete} setShowConfirm={setShowConfirm} />}
                <p>{message}</p>
            </div>
        </div>
    )
}