import React, { useState } from 'react';
import axios from 'axios';

export default () => {
	const [state, setState] = useState({ firstName: '', lastName: '', message: '' });
	const handleChange = (e) => {
		const target = e.target;
		const name = target.name;
		setState({ ...state, [name]: e.target.value });
	};

	const handleSubmit = (e) => {
		axios
			.post('/api/sendemail', { ...state }, { headers: { 'Content-type': 'application/json; charset=UTF-8' } })
			.then((response) => {
				console.log('response received', response);
			});
		e.preventDefault();
	};

	const handleClick = (e) => {
		axios.get('/api/test').then((response) => {
			console.log('response received', response);
		});
	};

	return (
		<div>
			DO NOT CONTACT US EVER
			<div className="contact-form-container">
				<h2>Call (210) 788-9130</h2>
				<h2>or Send George a Request</h2>
				<form onSubmit={handleSubmit}>
					<label>
						First Name:
						<input
							name="firstName"
							type="text"
							placeholder="how can we help?"
							value={state.firstName}
							onChange={handleChange}
						/>
					</label>
					<label>
						Last Name:
						<input
							name="lastName"
							type="text"
							placeholder="how can we help?"
							value={state.lastName}
							onChange={handleChange}
						/>
					</label>
					<label>
						How can we help?
						<textarea name="message" type="text" value={state.message} onChange={handleChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>
				<div className="submit">{/* <button>submit</button>
					<button>reset</button> */}</div>
				<button onClick={handleClick}>test</button>
			</div>
		</div>
	);
};
