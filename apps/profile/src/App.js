import React, { useState } from "react";
import { useAppState } from "../../shared/src/hooks/useAppState";

const ProfileApp = () => {
	const { user, updateUser, setCurrentModule } = useAppState();
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		username: user?.username || '',
		email: user?.email || '',
		fullName: user?.fullName || '',
		bio: user?.bio || '',
		phone: user?.phone || '',
		location: user?.location || ''
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		updateUser(formData);
		setIsEditing(false);
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleCancel = () => {
		setFormData({
			username: user?.username || '',
			email: user?.email || '',
			fullName: user?.fullName || '',
			bio: user?.bio || '',
			phone: user?.phone || '',
			location: user?.location || ''
		});
		setIsEditing(false);
	};

	return (
		<div style={{
			minHeight: '100vh',
			backgroundColor: '#f8f9fa',
			padding: '2rem',
			fontFamily: 'Arial, sans-serif'
		}}>
			<div style={{ maxWidth: '800px', margin: '0 auto' }}>
				{/* Header */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '2rem'
				}}>
					<h1 style={{ margin: '0', color: '#495057' }}>Profile Settings</h1>
					<button
						onClick={() => setCurrentModule('dashboard')}
						style={{
							padding: '0.5rem 1rem',
							backgroundColor: '#6c757d',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem'
						}}
					>
						← Back to Dashboard
					</button>
				</div>

				<div style={{
					display: 'grid',
					gridTemplateColumns: '1fr 2fr',
					gap: '2rem'
				}}>
					{/* Profile Card */}
					<div style={{
						backgroundColor: 'white',
						padding: '2rem',
						borderRadius: '8px',
						boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
						height: 'fit-content'
					}}>
						<div style={{ textAlign: 'center' }}>
							<img
								src={user?.avatar}
								alt="Profile"
								style={{
									width: '120px',
									height: '120px',
									borderRadius: '50%',
									objectFit: 'cover',
									marginBottom: '1rem',
									border: '4px solid #e9ecef'
								}}
							/>
							<h3 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>
								{user?.fullName || user?.username}
							</h3>
							<p style={{ margin: '0 0 1rem 0', color: '#6c757d' }}>
								{user?.email}
							</p>
							<div style={{
								padding: '0.5rem 1rem',
								backgroundColor: '#e7f3ff',
								color: '#007bff',
								borderRadius: '20px',
								fontSize: '0.875rem',
								display: 'inline-block'
							}}>
								Member since {user?.joinDate || 'Today'}
							</div>
						</div>

						<hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid #e9ecef' }} />

						<div>
							<h4 style={{ margin: '0 0 1rem 0', color: '#495057' }}>Quick Stats</h4>
							<div style={{ fontSize: '0.875rem', color: '#6c757d' }}>
								<div style={{ marginBottom: '0.5rem' }}>
									📊 Dashboard Views: 142
								</div>
								<div style={{ marginBottom: '0.5rem' }}>
									🕒 Last Login: Today
								</div>
								<div>
									⭐ Profile Complete: 75%
								</div>
							</div>
						</div>
					</div>

					{/* Profile Form */}
					<div style={{
						backgroundColor: 'white',
						padding: '2rem',
						borderRadius: '8px',
						boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
					}}>
						<div style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: '2rem'
						}}>
							<h2 style={{ margin: '0', color: '#495057' }}>Personal Information</h2>
							{!isEditing && (
								<button
									onClick={() => setIsEditing(true)}
									style={{
										padding: '0.5rem 1rem',
										backgroundColor: '#007bff',
										color: 'white',
										border: 'none',
										borderRadius: '4px',
										cursor: 'pointer',
										display: 'flex',
										alignItems: 'center',
										gap: '0.5rem'
									}}
								>
									✏️ Edit Profile
								</button>
							)}
						</div>

						<form onSubmit={handleSubmit}>
							<div style={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr',
								gap: '1rem',
								marginBottom: '1rem'
							}}>
								<div>
									<label style={{
										display: 'block',
										marginBottom: '0.5rem',
										fontWeight: 'bold',
										color: '#495057'
									}}>
										Username
									</label>
									<input
										type="text"
										name="username"
										value={formData.username}
										onChange={handleChange}
										disabled={!isEditing}
										style={{
											width: '100%',
											padding: '0.75rem',
											border: '1px solid #ced4da',
											borderRadius: '4px',
											fontSize: '1rem',
											boxSizing: 'border-box',
											backgroundColor: isEditing ? 'white' : '#f8f9fa'
										}}
									/>
								</div>

								<div>
									<label style={{
										display: 'block',
										marginBottom: '0.5rem',
										fontWeight: 'bold',
										color: '#495057'
									}}>
										Email
									</label>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										disabled={!isEditing}
										style={{
											width: '100%',
											padding: '0.75rem',
											border: '1px solid #ced4da',
											borderRadius: '4px',
											fontSize: '1rem',
											boxSizing: 'border-box',
											backgroundColor: isEditing ? 'white' : '#f8f9fa'
										}}
									/>
								</div>
							</div>

							<div style={{ marginBottom: '1rem' }}>
								<label style={{
									display: 'block',
									marginBottom: '0.5rem',
									fontWeight: 'bold',
									color: '#495057'
								}}>
									Full Name
								</label>
								<input
									type="text"
									name="fullName"
									value={formData.fullName}
									onChange={handleChange}
									disabled={!isEditing}
									style={{
										width: '100%',
										padding: '0.75rem',
										border: '1px solid #ced4da',
										borderRadius: '4px',
										fontSize: '1rem',
										boxSizing: 'border-box',
										backgroundColor: isEditing ? 'white' : '#f8f9fa'
									}}
								/>
							</div>

							<div style={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr',
								gap: '1rem',
								marginBottom: '1rem'
							}}>
								<div>
									<label style={{
										display: 'block',
										marginBottom: '0.5rem',
										fontWeight: 'bold',
										color: '#495057'
									}}>
										Phone
									</label>
									<input
										type="tel"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										disabled={!isEditing}
										placeholder="Enter phone number"
										style={{
											width: '100%',
											padding: '0.75rem',
											border: '1px solid #ced4da',
											borderRadius: '4px',
											fontSize: '1rem',
											boxSizing: 'border-box',
											backgroundColor: isEditing ? 'white' : '#f8f9fa'
										}}
									/>
								</div>

								<div>
									<label style={{
										display: 'block',
										marginBottom: '0.5rem',
										fontWeight: 'bold',
										color: '#495057'
									}}>
										Location
									</label>
									<input
										type="text"
										name="location"
										value={formData.location}
										onChange={handleChange}
										disabled={!isEditing}
										placeholder="Enter location"
										style={{
											width: '100%',
											padding: '0.75rem',
											border: '1px solid #ced4da',
											borderRadius: '4px',
											fontSize: '1rem',
											boxSizing: 'border-box',
											backgroundColor: isEditing ? 'white' : '#f8f9fa'
										}}
									/>
								</div>
							</div>

							<div style={{ marginBottom: '2rem' }}>
								<label style={{
									display: 'block',
									marginBottom: '0.5rem',
									fontWeight: 'bold',
									color: '#495057'
								}}>
									Bio
								</label>
								<textarea
									name="bio"
									value={formData.bio}
									onChange={handleChange}
									disabled={!isEditing}
									rows={4}
									placeholder="Tell us about yourself..."
									style={{
										width: '100%',
										padding: '0.75rem',
										border: '1px solid #ced4da',
										borderRadius: '4px',
										fontSize: '1rem',
										boxSizing: 'border-box',
										backgroundColor: isEditing ? 'white' : '#f8f9fa',
										resize: 'vertical'
									}}
								/>
							</div>

							{isEditing && (
								<div style={{ display: 'flex', gap: '1rem' }}>
									<button
										type="submit"
										style={{
											padding: '0.75rem 1.5rem',
											backgroundColor: '#28a745',
											color: 'white',
											border: 'none',
											borderRadius: '4px',
											cursor: 'pointer',
											fontSize: '1rem',
											display: 'flex',
											alignItems: 'center',
											gap: '0.5rem'
										}}
									>
										💾 Save Changes
									</button>
									<button
										type="button"
										onClick={handleCancel}
										style={{
											padding: '0.75rem 1.5rem',
											backgroundColor: '#6c757d',
											color: 'white',
											border: 'none',
											borderRadius: '4px',
											cursor: 'pointer',
											fontSize: '1rem',
											display: 'flex',
											alignItems: 'center',
											gap: '0.5rem'
										}}
									>
										❌ Cancel
									</button>
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileApp;