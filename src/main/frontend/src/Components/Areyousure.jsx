export default function AreYouSure() {

    return (
        <div id="deleteModal" class="modal">
            <div class="modal-content">
                <p>Do you really want to delete?</p>
                <button id="confirmDelete">Yes</button>
                <button id="cancelDelete">No</button>
            </div>
        </div>
    );
}