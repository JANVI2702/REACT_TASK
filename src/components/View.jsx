import React from 'react';
import { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { FaEdit, FaTrash } from 'react-icons/fa';

function View({ list, handleDelete, handleEdit }) {
	const [ search, setSearch ] = useState('');
	const [ sortConfig, setSortConfig ] = useState({ key: null, direction: 'asc' });

	const filteredList = list.filter((user) =>
		[ user.fname, user.email, user.city ].some(
			(field) => field && field.toString().toLowerCase().includes(search.toLowerCase())
		)
	);

	const sortedList = [ ...filteredList ].sort((a, b) => {
		if (!sortConfig.key) return 0;
		const valueA = a[sortConfig.key].toString().toLowerCase();
		const valueB = b[sortConfig.key].toString().toLowerCase();

		if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
		if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
		return 0;
	});

	const handleSort = (key) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
		}));
	};

	const getSortIcon = (key) => {
		if (sortConfig.key !== key) return <FaSort />;
		return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
	};

	return (
		<div className="container mt-4">
			<div className="text-center fs-3 text-primary fw-bold">User Data</div>
			<div className="mb-3">
				<input
					type="text"
					className="form-control form-control-lg shadow-sm"
					placeholder="Search by Name, Email, or City..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>

			<table className="table table-striped table-hover shadow-lg text-center">
				<thead className="bg-primary text-white">
					<tr>
						<th scope="col">SrNo.</th>
						<th scope="col" onClick={() => handleSort('fname')} className="cursor-pointer">
							Name {getSortIcon('fname')}
						</th>
						<th scope="col">Email</th>
						<th scope="col" onClick={() => handleSort('city')} className="cursor-pointer">
							City {getSortIcon('city')}
						</th>
						<th scope="col" onClick={() => handleSort('gender')} className="cursor-pointer">
							Gender {getSortIcon('gender')}
						</th>
						<th scope="col" onClick={() => handleSort('phone')} className="cursor-pointer">
							Phone {getSortIcon('phone')}
						</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{sortedList.length > 0 ? (
						sortedList.map((user, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{user.fname + ' ' + user.lname}</td>
								<td>{user.email}</td>
								<td>{user.city}</td>
								<td>{user.gender}</td>
								<td>{user.phone}</td>
								<td>
									<button className="btn btn-danger me-2" onClick={() => handleDelete(user.id)}>
										<FaTrash />
									</button>
									<button className="btn btn-warning" onClick={() => handleEdit(user.id)}>
										<FaEdit />
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="7" className="text-center text-danger fw-bold">
								No Data Found
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default View;
