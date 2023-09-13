export default function DeleteModal({ handleDelete, itemToDelete, setShowConfirm }) {
    return <div id="deleteModal" class="modal">
        <div class="modal-content">
            <p>Do you really want to delete?</p>
            <button onClick={() => handleDelete(itemToDelete.id)} id="confirmDelete">Yes</button>
            <button onClick={() => setShowConfirm(false)} id="cancelDelete">No</button>
        </div>
    </div>;
}
