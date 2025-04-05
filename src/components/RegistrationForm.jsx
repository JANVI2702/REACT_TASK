import React, { useEffect, useState } from 'react';
import View from './View';

function Form() {
	const [ user, setUser ] = useState({});
	const [ list, setList ] = useState([]);
	const [ hobby, setHobby ] = useState([]);
	const [ editId, setEditId ] = useState(null);

	// Load initial data
	useEffect(() => {
		const savedData = localStorage.getItem('list');
		if (savedData) {
			setList(JSON.parse(savedData));
		}
	}, []);

	const handleChange = (e) => {
		const { name, value, checked } = e.target;

		if (name === 'hobby') {
			let newHobby = [ ...hobby ];
			if (checked) {
				newHobby.push(value);
			} else {
				newHobby = newHobby.filter((val) => val !== value);
			}
			setHobby(newHobby);
			setUser((prev) => ({ ...prev, hobby: newHobby }));
		} else {
			setUser((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Create new user object
		const newUser = {
			...user,
			id: editId || Date.now(),
			hobby: hobby
		};

		// Update list
		const updatedList = editId ? list.map((item) => (item.id === editId ? newUser : item)) : [ ...list, newUser ];

		// Update state and storage
		setList(updatedList);
		localStorage.setItem('list', JSON.stringify(updatedList));

		// Reset form
		setUser({});
		setHobby([]);
		setEditId(null);
	};

	const handleDelete = (id) => {
		const updatedList = list.filter((item) => item.id !== id);
		setList(updatedList);
		localStorage.setItem('list', JSON.stringify(updatedList));
	};

	const handleEdit = (id) => {
		const userToEdit = list.find((item) => item.id === id);
		if (userToEdit) {
			setUser(userToEdit);
			setHobby(userToEdit.hobby || []);
			setEditId(id);
		}
	};

	return (
		<div className="container">
			<div className="d-flex justify-content-center align-items-center flex-column">
				<form
					className="w-50 bg-primary px-5 rounded-5 py-3 shadow-lg mt-3 fs-5 text-white"
					onSubmit={handleSubmit}
				>
					<h1 className="text-center">Sign Up</h1>
					<div className="mb-3">
						<label htmlFor="exampleInputUsername1" className="form-label">
							Fisrt Name
						</label>
						<input
							type="text"
							placeholder="Enter Username"
							className="form-control text-dark fs-5 shadow"
							id="exampleInputUsername1"
							name="fname"
							value={user.fname || ''}
							onChange={handleChange}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="exampleInputUsername1" className="form-label">
							Last Name
						</label>
						<input
							type="text"
							placeholder="Enter Username"
							className="form-control text-dark fs-5 shadow"
							id="exampleInputUsername1"
							name="lname"
							value={user.lname || ''}
							onChange={handleChange}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">
							Email address
						</label>
						<input
							type="email"
							placeholder="Enter Email"
							className="form-control text-dark fs-5 shadow"
							id="exampleInputEmail1"
							name="email"
							value={user.email || ''}
							onChange={handleChange}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">
							Password
						</label>

						<input
							type="password"
							placeholder="Enter Password"
							className="form-control text-dark fs-5 shadow"
							id="exampleInputPassword1"
							name="password"
							value={user.password || ''}
							onChange={handleChange}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="exampleInputPhone" className="form-label">
							Phone
						</label>
						<input
							type="text"
							placeholder="Enter Phone Number"
							className="form-control text-dark fs-5 shadow"
							id="exampleInputPhone"
							name="phone"
							value={user.phone || ''}
							onChange={handleChange}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="exampleInputHobby" className="form-label">
							Hobby
						</label>
						<div className="d-flex align-items-center">
							<div className="form-check">
								<input
									type="checkbox"
									className="form-check-input text-dark  fs-5 shadow"
									id="exampleInputHobby"
									name="hobby"
									value="dance"
									checked={hobby.includes('dance') ? true : false}
									onChange={handleChange}
								/>
								<label className="form-check-label" htmlFor="flexRadioDefault1">
									Dance
								</label>
							</div>
							<div className="form-check ms-3">
								<input
									type="checkbox"
									className="form-check-input text-dark fs-5 shadow"
									id="exampleInputDance"
									name="hobby"
									value="reading"
									checked={hobby.includes('reading') ? true : false}
									onChange={handleChange}
								/>
								<label className="form-check-label" htmlFor="flexRadioDefault1">
									Reading
								</label>
							</div>
						</div>
					</div>

					<div className="mb-3">
						<label htmlFor="exampleInputGender" className="form-label">
							Gender
						</label>
						<div className="d-flex align-items-center">
							<div className="form-check">
								<input
									type="radio"
									className="form-check-input text-dark fs-5 shadow"
									id="exampleInputMale"
									name="gender"
									value="male"
									checked={user.gender === 'male' ? true : false}
									onChange={handleChange}
								/>
								<label className="form-check-label" htmlFor="flexRadioDefault1">
									Male
								</label>
							</div>
							<div className="form-check ms-3">
								<input
									type="radio"
									className="form-check-input text-dark fs-5 shadow"
									id="exampleInputFemale"
									name="gender"
									value="female"
									checked={user.gender === 'female' ? true : false}
									onChange={handleChange}
								/>
								<label className="form-check-label" htmlFor="flexRadioDefault1">
									Female
								</label>
							</div>
						</div>
					</div>

					<div className="mb-3">
						<label htmlFor="exampleInputCity" className="form-label">
							City
						</label>
						<select
							name="city"
							id="exampleInputCity"
							className="form-select text-dark fs-5 shadow"
							onChange={handleChange}
							value={user.city || ''}
						>
							<option disabled value="">
								--Select-City--
							</option>
							{[
								'New York',
								'Los Angeles',
								'Chicago',
								'Houston',
								'Surat',
								'Navsari',
								'San Antonio',
								'Bharuch',
								'Dallas',
								'San Jose'
							].map((city, index) => (
								<option key={index} value={city}>
									{city}
								</option>
							))}
						</select>
					</div>

					<div className="text-center mt-4">
						<button type="submit" className="btn btn-outline-light fs-5 px-5 py-2">
							Submit
						</button>
					</div>
				</form>
			</div>
			<View list={list} handleDelete={handleDelete} handleEdit={handleEdit} />
		</div>
	);
}

export default Form;
