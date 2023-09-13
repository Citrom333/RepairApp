export default function VehiclesTable({ currentWorks, showWorkDetails }) {
    return <table>
        <thead className='table-head'>
            <tr>
                <th>Date of work</th>
                <th>Mileage</th>
                <th>Name</th>

            </tr>
        </thead>
        <tbody>
            {currentWorks.length !== 0 ? currentWorks.map((work, i) => (
                <tr className={`table-row-${i % 2}`} key={i} onClick={() => showWorkDetails(work)}>
                    <td>
                        {new Date(work.date).getFullYear()}-{(new Date(work.date).getMonth() + 1).toString().padStart(2, '0')}-{new Date(work.date).getDate().toString().padStart(2, '0')}
                    </td>
                    <td>{work.mileage}</td>
                    <td>{work.name}</td>
                </tr>
            )) : <tr></tr>}
        </tbody>
    </table>;
}
