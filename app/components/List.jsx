var React = require('react');

var colors = ["Red","Green","Blue","Yellow","Black","White","Orange"];

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

var List = React.createClass({
	getInitialState: function() {
		return {
			data: colors
		};
	},
	dragStart: function(e) {
		this.dragged = e.currentTarget;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData("text/html", e.currentTarget);
	},
	dragOver: function(e) {
		e.preventDefault();
		this.dragged.style.display = "none";
		if (e.target.className == "placeholder") { return; }
		this.over = e.target;


		e.target.parentNode.insertBefore(placeholder, e.target);
	},
	dragEnd: function(e) {
		this.dragged.style.display = "block";
		this.dragged.parentNode.removeChild(placeholder);

		//Update state
		var data = this.state.data;
		var from = +this.dragged.dataset.id;
		var to = +this.over.dataset.id;
		if(from < to) to--;
		console.log(`${from} - ${to}`);
		data.splice(to, 0, data.splice(from, 1)[0]);
		this.setState({
			data: data
		});
	},
	render: function() {
		return (
			<div className="navigation">
				<ul onDragOver={this.dragOver}>
					{this.state.data.map(function(item, i) {
						return <li
							data-id={i}
							key={i}
							draggable="true"
							onDragEnd={this.dragEnd}
							onDragStart={this.dragStart}
						>{item}</li>
					}, this)}
				</ul>
			</div>
		);
	}
});

module.exports = List;
