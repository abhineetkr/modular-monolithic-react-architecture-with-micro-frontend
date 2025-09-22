import React, { Suspense } from 'react';
import MicroFrontendErrorBoundary from './ErrorBoundary';

const LoadingFallback = ({ name }) => (
	<div style={{
		padding: '20px',
		border: '2px dashed #6c757d',
		margin: '10px',
		textAlign: 'center',
		color: '#6c757d'
	}}>
		<div>ðŸ”„ Loading {name}...</div>
	</div>
);

const MicroFrontendLoader = ({ name, children }) => (
	<MicroFrontendErrorBoundary name={name}>
		<Suspense fallback={<LoadingFallback name={name} />}>
			{children}
		</Suspense>
	</MicroFrontendErrorBoundary>
);

export default MicroFrontendLoader;