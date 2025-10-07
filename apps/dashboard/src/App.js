import React, { useState } from "react";
import { useAppState } from "../../shared/src/hooks/useAppState";

const DashboardApp = () => {
	const { user, logout, setCurrentModule } = useAppState();
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [activeTab, setActiveTab] = useState('overview');
	
	// Normal logout - clears state and persisted data
	const handleLogout = async () => {
		if (window.confirm('Are you sure you want to logout?')) {
			setIsLoggingOut(true);

			try {
				await logout(); // This purges redux-persist storage
				// State automatically switches to auth due to reducer
			} catch (error) {
				console.error('Logout failed:', error);
				setIsLoggingOut(false);
			}
		}
	};

	const navigateToProfile = () => {
		setCurrentModule('profile');
	};

	const sidebarItems = [
		{ id: 'overview', label: 'Overview', icon: '📊' },
		{ id: 'analytics', label: 'Analytics', icon: '📈' },
		{ id: 'reports', label: 'Reports', icon: '📋' },
		{ id: 'settings', label: 'Settings', icon: '⚙️' }
	];

	const renderContent = () => {
		switch (activeTab) {
			case 'overview':
				return (
					<div>
						<h2>Dashboard Overview</h2>
						<div style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
							gap: '1rem',
							marginTop: '1rem'
						}}>
							{[
								{ title: 'Total Users', value: '1,234', change: '+12%', color: '#28a745' },
								{ title: 'Revenue', value: '$45,678', change: '+8%', color: '#17a2b8' },
								{ title: 'Orders', value: '567', change: '+15%', color: '#ffc107' },
								{ title: 'Conversion', value: '23.4%', change: '-2%', color: '#dc3545' }
							].map((stat, index) => (
								<div key={index} style={{
									padding: '1.5rem',
									backgroundColor: 'white',
									borderRadius: '8px',
									boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
									border: '1px solid #e9ecef'
								}}>
									<h3 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>{stat.title}</h3>
									<div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
										{stat.value}
									</div>
									<small style={{ color: stat.change.startsWith('+') ? '#28a745' : '#dc3545' }}>
										{stat.change} from last month
									</small>
								</div>
							))}
						</div>
					</div>
				);
			case 'analytics':
				return (
					<div>
						<h2>Analytics</h2>
						<div style={{
							padding: '2rem',
							backgroundColor: 'white',
							borderRadius: '8px',
							boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
							marginTop: '1rem'
						}}>
							<p>Advanced analytics and insights would go here.</p>
							<div style={{ height: '300px', backgroundColor: '#f8f9fa', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								📊 Chart Placeholder
							</div>
						</div>
					</div>
				);
			default:
				return (
					<div>
						<h2>{sidebarItems.find(item => item.id === activeTab)?.label}</h2>
						<div style={{
							padding: '2rem',
							backgroundColor: 'white',
							borderRadius: '8px',
							boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
							marginTop: '1rem'
						}}>
							<p>Content for {activeTab} would go here.</p>
						</div>
					</div>
				);
		}
	};

	return (
		<div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
			{/* Sidebar */}
			<div style={{
				width: '250px',
				backgroundColor: '#343a40',
				color: 'white',
				padding: '1rem 0'
			}}>
				{/* User Info */}
				<div style={{
					padding: '1rem',
					borderBottom: '1px solid #495057',
					marginBottom: '1rem'
				}}>
					<div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
						<img
							src={user?.avatar}
							alt="Avatar"
							style={{
								width: '40px',
								height: '40px',
								borderRadius: '50%',
								objectFit: 'cover'
							}}
						/>
						<div>
							<div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
								{user?.username}
							</div>
							<div style={{ fontSize: '0.75rem', color: '#adb5bd' }}>
								{user?.email}
							</div>
						</div>
					</div>
				</div>

				{/* Navigation */}
				<nav>
					{sidebarItems.map(item => (
						<button
							key={item.id}
							onClick={() => setActiveTab(item.id)}
							style={{
								width: '100%',
								padding: '0.75rem 1rem',
								backgroundColor: activeTab === item.id ? '#495057' : 'transparent',
								color: 'white',
								border: 'none',
								textAlign: 'left',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
								transition: 'background-color 0.2s'
							}}
							onMouseEnter={(e) => {
								if (activeTab !== item.id) {
									e.target.style.backgroundColor = '#495057';
								}
							}}
							onMouseLeave={(e) => {
								if (activeTab !== item.id) {
									e.target.style.backgroundColor = 'transparent';
								}
							}}
						>
							<span>{item.icon}</span>
							{item.label}
						</button>
					))}
				</nav>

				{/* Bottom Actions */}
				<div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '0',
          right: '0',
          padding: '0 1rem'
        }}>
          <button
            onClick={navigateToProfile}
            disabled={isLoggingOut}
            style={{
              width: '19%',
              padding: '0.75rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoggingOut ? 'not-allowed' : 'pointer',
              marginBottom: '0.5rem',
              opacity: isLoggingOut ? 0.5 : 1
            }}
          >
            👤 Profile
          </button>
          <br/>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            style={{
              width: '19%',
              padding: '0.75rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoggingOut ? 'not-allowed' : 'pointer',
              opacity: isLoggingOut ? 0.5 : 1
            }}
          >
            {isLoggingOut ? '⏳ Logging out...' : '🚪 Logout'}
          </button>
        </div>
      </div>

			{/* Main Content */}
			<div style={{
				flex: 1,
				backgroundColor: '#f8f9fa',
				padding: '2rem'
			}}>
				{/* Header */}
				<header style={{
					backgroundColor: 'white',
					padding: '1rem 1.5rem',
					borderRadius: '8px',
					boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
					marginBottom: '2rem',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}>
					<div>
						<h1 style={{ margin: '0 0 0.25rem 0', color: '#495057' }}>
							Welcome back, {user?.username}! 👋
						</h1>
						<p style={{ margin: '0', color: '#6c757d' }}>
							Here's what's happening with your account today.
						</p>
					</div>
					<div style={{ fontSize: '0.875rem', color: '#6c757d' }}>
						{new Date().toLocaleDateString('en-US', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</div>
				</header>

				{/* Content */}
				<main>
					{renderContent()}
				</main>
			</div>
		</div>
	);
};

export default DashboardApp;