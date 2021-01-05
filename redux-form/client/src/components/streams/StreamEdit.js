import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
	componentDidMount = () => {
		let streamId = this.props.match.params.id;
		this.props.fetchStream(streamId);
	};

	onSubmit = (formValues) => {
		this.props.editStream(this.props.match.params.id, formValues);
	};

	render() {
		if (!this.props.stream) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<h3>Edit a Stream</h3>
				<StreamForm
					// lodash pick is to create a new object from another object, and
					// picking only specific properties (i.e. title, desciption) of that object
					initialValues={_.pick(this.props.stream, 'title', 'description')}
					onSubmit={this.onSubmit}
				></StreamForm>
			</div>
		);
	}
}

// ownProps: contain all of the props given to the component (i.e. StreamEdit) that was generated by connect.
// This is used when within the mapStateToProps(), there is a need to access the component’s prop property.
const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
	StreamEdit
);