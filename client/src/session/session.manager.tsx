// SessionManager.ts
class SessionManager {
    private static TOKEN_KEY = 'authToken';
    private static USER_KEY = 'user';
  
    // Save user session data
    static saveSession(authToken: string, userData: any): void {
      localStorage.setItem(SessionManager.TOKEN_KEY, authToken);
      localStorage.setItem(SessionManager.USER_KEY, JSON.stringify(userData));
    }
  
    // Retrieve auth token
    static getAuthToken(): string | null {
      return localStorage.getItem(SessionManager.TOKEN_KEY);
    }
  
    // Retrieve user data
    static getUserData(): any | null {
      const userData = localStorage.getItem(SessionManager.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    }
  
    // Clear user session data
    static clearSession(): void {
      localStorage.removeItem(SessionManager.TOKEN_KEY);
      localStorage.removeItem(SessionManager.USER_KEY);
    }
  
    // Check if the user is logged in
    static isLoggedIn(): boolean {
      return !!SessionManager.getAuthToken();
    }
  }
  
  export default SessionManager;
  