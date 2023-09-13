import Navbar from "../Components/Navbar";
export default function WrongPage() {
    console.log("wrong!");
    return (
        <div>
            <Navbar />
            <div className="page">
                <h2>Wrong Page</h2>
                <div>
                    <a href="/">
                        <button >
                            Back
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}