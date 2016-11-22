var React = require('react');


var Main = (props) => {
	return (
		<div>
			<div>
				<div>
					<p className="message-text">Main.jsx rendered</p>
					{props.children}
				</div>
			</div>
		</div>
	);
};

module.exports = Main;
