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
	dragOver: function(e) {
		console.log('drag-over');
		e.preventDefault();
		this.dragged.style.display = "none";
		if(e.target.className == "placeholder") { return; }
		this.over = e.target;
		e.target.parentNode.insertBefore(placeholder, e.target);
	},
	dragEnd: function() {
		console.log('drag-end');
		this.dragged.style.display = "block";
		this.dragged.parentNode.removeChild(placeholder);

		//Update state
		var data = this.state.data;
		var from = Number(this.dragged.dataset.id);
		var to = Number(this.over.dataset.id);
		if(from < to) to--;
		data.splice(to, 0, data.splice(from, 1)[0]);
		this.setState({
			data: data
		});
	},
	dragStart: function(e) {
		console.log('drag-start');
		this.dragged = e.currentTarget;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData("text/html", e.currentTarget);
	},
	render: function() {
		return (
			<div className="navigation">
				<ul onDragOver={this.dragOver}>
					{this.state.data.map(function(item, i) {
						return <li
							data-d={i}
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
