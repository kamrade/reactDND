var React = require('react');

var names = ["Homer","Bart","Lizzy","March","Maggy","Leo","Ramshan"];

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

var img = document.createElement("img");
// img.src = "https://www.fillmurray.com/120/35";

var List = React.createClass({
	getInitialState: function() {
		return {
			data: names
		};
	},
	dragStart: function(e) {
		this.dragged = e.currentTarget;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData("text/html", e.currentTarget);
		e.dataTransfer.setDragImage(img, 0, 0);

		// e.dataTransfer.setDragImage(img, 0, 0);
	},
	dragOver: function(e) {
		e.preventDefault();
		this.dragged.style.display = "none";
		if (e.target.className == "placeholder") { return; }
		this.over = e.target;

		var relY = e.clientY - this.over.offsetTop;
		var height = this.over.offsetHeight / 2;
		var parent = e.target.parentNode;

		if(relY > height) {
			this.nodePlacement = "after";
			parent.insertBefore(placeholder, e.target.nextElementSibling);
		} else if(relY < height) {
			this.nodePlacement = "before";
			parent.insertBefore(placeholder, e.target);
		}
	},
	dragEnd: function(e) {
		this.dragged.style.display = "block";
		this.dragged.parentNode.removeChild(placeholder);

		//Update state
		var data = this.state.data;
		var from = +this.dragged.dataset.id;
		var to = +this.over.dataset.id;
		if(this.nodePlacement == "after") to++;
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
