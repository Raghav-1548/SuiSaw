export interface User {
  suiAddress: string;
  username: string;
  models: string[];
  rentals: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Credentials {
  suiAddress: string;
  password: string;
}

export interface AuthStore extends AuthState {
  login: (credentials: Credentials) => Promise<User>;
  logout: () => void;
  register: (credentials: Credentials & { username: string }) => Promise<User>;
}