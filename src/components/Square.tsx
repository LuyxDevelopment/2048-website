import React from 'react';

export default class Square extends React.Component<{ value: number }> {
	render(): React.ReactNode {
		return (
			<img src={`../images/${this.props.value.toString()}.png`} alt={this.props.value.toString()} />
		);
	}
}