import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class ExpenseForm extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			description: props.expense ? props.expense.description : '',
			note: props.expense ? props.expense.note : '',
			amount: props.expense ? (props.expense.amount / 100).toString() : '',
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			calendarFocused: false,
			error: ''
		};
	}
	
	onDescriptionChange = (e) => {
		const description = e.target.value;
		this.setState(() => ({ description }));
	};
	onNoteChange = (e) => {
		const note = e.target.value;
		this.setState(() => ({note}));
	};
	onAmountChange = (e) => {
		const amount = e.target.value;
		if(amount.match(/^\d*(\.\d{0,2})?$/))
		this.setState(() => ({amount}));
	};
	onDateChange = createdAt => {
		this.setState(() => ({createdAt}));
	};
	onFocusChange = ({focused}) => {
		this.setState({calendarFocused: focused})
	};
	onSubmit= (e) => {
		e.preventDefault();
		if( !this.state.description || !this.state.amount) {
			this.setState({error: 'Please provide a description and amount'})
		}else {
			this.setState({error: ''})
			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount, 10),
				createdAt: this.state.createdAt.valueOf(),
				note: this.state.note
			})
			console.log('Submitted')
		}
	}
	render() {
		return (
			<div>
				<form>
					{!!this.state.error && <h2>{this.state.error}</h2>}
					<input type="text"
					placeholder="Description"
					autoFocus
					value={this.state.description}
					onChange={this.onDescriptionChange}
					/>

					<input type="number"
					placeholder="Amount"
					value={this.state.amount}
					onChange={this.onAmountChange}
					/>
					<SingleDatePicker
					date={this.state.createdAt}
					onDateChange={this.onDateChange}
					focused={this.state.calendarFocused}
					onFocusChange={this.onFocusChange}
					numberOfMonths={1}
					isOutsideRange={() => false}
					/>

					<textarea 
					placeholder="Add a note (optional)"
					value={this.state.note}
					onChange={this.onNoteChange}
					></textarea>

					<button onClick={this.onSubmit}>Add Expense</button>
				</form>
			</div>
			)
	}
}