class AppStore {
  constructor() {
    this.state = {
      user: null,
      isAuthenticated: false,
      currentModule: 'auth'
    };
    this.listeners = new Set();
  }

  // Subscribe to state changes
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Notify all listeners
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Update state
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
    // Persist to sessionStorage for micro frontend communication
    sessionStorage.setItem('appState', JSON.stringify(this.state));
  }

  // Get current state
  getState() {
    return { ...this.state };
  }

  // Initialize from sessionStorage
  init() {
    const savedState = sessionStorage.getItem('appState');
    if (savedState) {
      try {
        this.state = { ...this.state, ...JSON.parse(savedState) };
      } catch (e) {
        console.warn('Failed to parse saved state');
      }
    }
  }

  // Actions
  login(userData) {
    this.setState({
      user: userData,
      isAuthenticated: true,
      currentModule: 'dashboard'
    });
  }

  logout() {
    this.setState({
      user: null,
      isAuthenticated: false,
      currentModule: 'auth'
    });
    sessionStorage.removeItem('appState');
  }

  updateUser(userData) {
    this.setState({
      user: { ...this.state.user, ...userData }
    });
  }

  setCurrentModule(module) {
    this.setState({ currentModule: module });
  }
}

// Create singleton instance
const appStore = new AppStore();
export default appStore;