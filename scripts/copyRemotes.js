const fs = require('fs-extra');
const path = require('path');

async function copyRemoteAssets() {
	try {
		console.log('ðŸ“¦ Copying remote assets...');

		// Ensure the host dist directory exists
		const hostDistPath = path.join(__dirname, '../apps/host/dist');
		await fs.ensureDir(hostDistPath);

		// Copy auth remote assets
		const authDistPath = path.join(__dirname, '../apps/auth/dist');
		const authTargetPath = path.join(hostDistPath, 'auth');

		if (await fs.pathExists(authDistPath)) {
			await fs.copy(authDistPath, authTargetPath);
			console.log('âœ… Auth assets copied');
		} else {
			console.warn('âš ï¸ Auth dist folder not found. Make sure to build auth first.');
		}

		// Copy dashboard remote assets
		const dashboardDistPath = path.join(__dirname, '../apps/dashboard/dist');
		const dashboardTargetPath = path.join(hostDistPath, 'dashboard');

		if (await fs.pathExists(dashboardDistPath)) {
			await fs.copy(dashboardDistPath, dashboardTargetPath);
			console.log('âœ… Dashboard assets copied');
		} else {
			console.warn('âš ï¸ Dashboard dist folder not found. Make sure to build dashboard first.');
		}

		console.log('ðŸŽ‰ Remote assets copy completed!');
	} catch (error) {
		console.error('âŒ Error copying remote assets:', error);
		process.exit(1);
	}
}

copyRemotes();