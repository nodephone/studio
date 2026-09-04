import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState, Session, LoginCredentials } from "@/types/auth";
import { User } from "@/types/user";

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  validateSession: () => Promise<boolean>;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
}

export type AuthStore = AuthState & AuthActions;

const MOCK_DEFAULT_USER: User = {
  id: "usr_nodephone_01",
  email: "admin@nodephone.io",
  name: "Alex Dev",
  role: "owner",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  createdAt: new Date().toISOString(),
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate JWT authentication check with NodePhone Server
          await new Promise((resolve) => setTimeout(resolve, 800));

          if (!credentials.email.includes("@")) {
            set({ error: "Please enter a valid email address.", isLoading: false });
            return false;
          }

          const mockUser: User = {
            ...MOCK_DEFAULT_USER,
            email: credentials.email,
            name: credentials.email.split("@")[0].replace(".", " "),
          };

          const mockSession: Session = {
            token: `np_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            user: mockUser,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          };

          set({
            user: mockUser,
            session: mockSession,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return true;
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "Authentication failed",
            isLoading: false,
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      validateSession: async () => {
        const { session } = get();
        set({ isLoading: true });

        if (!session || !session.token) {
          set({ isAuthenticated: false, isLoading: false });
          return false;
        }

        // Check token expiration
        const isExpired = new Date(session.expiresAt).getTime() < Date.now();
        if (isExpired) {
          set({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
            error: "Session expired. Please log in again.",
          });
          return false;
        }

        set({ isAuthenticated: true, isLoading: false });
        return true;
      },

      setUser: (user) => set({ user }),
      setError: (error) => set({ error }),
    }),
    {
      name: "nodephone-studio-auth",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      partialize: (state) => ({ session: state.session, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
