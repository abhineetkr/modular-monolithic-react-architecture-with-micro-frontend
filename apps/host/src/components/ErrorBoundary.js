import React from 'react';

class MicroFrontendErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		console.error('Micro Frontend Error:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div style={{
					padding: '20px',
					border: '2px solid #dc3545',
					margin: '10px',
					backgroundColor: '#f8d7da',
					color: '#721c24'
				}}>
					<h3>âš ï¸ {this.props.name} failed to load</h3>
					<p>There was an error loading this module. Please try refreshing the page.</p>
					<details>
						<summary>Error Details</summary>
						<pre style={{ fontSize: '12px', marginTop: '10px' }}>
							{this.state.error?.toString()}
						</pre>
					</details>
				</div>
			);
		}

		return this.props.children;
	}
}

export default MicroFrontendErrorBoundary;