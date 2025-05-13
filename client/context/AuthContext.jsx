import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

// Get the backend URL from environment variables
const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    // State variables
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to connect to the Socket.IO server
    const connectSocket = async (userData) => {
        if (!userData || socket?.connected) return;

        try {
            const newSocket = io(backendUrl, {
                query: {
                    userId: userData._id,
                },
                reconnection: true,
                reconnectionAttempts: 5,
            });

            newSocket.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
                toast.error("Socket connection failed");
            });

            newSocket.on("connect", () => {
                console.log("Socket connected!");
            });

            newSocket.on("disconnect", () => {
                console.log("Socket disconnected!");
            });

            newSocket.on("getOnlineUsers", (userIds) => {
                setOnlineUsers(userIds);
            });

            setSocket(newSocket);
        } catch (error) {
            console.error("Socket connection error:", error);
            toast.error("Failed to connect to chat server");
        }
    };

    // Function to check if the user is authenticated
    const checkAuth = async () => {
        try {
            const { data } = await axios.get("/api/auth/check");

            if (data.success) {
                setAuthUser(data.user);
                connectSocket(data.user);
            } else {
                // Token is invalid or user not found
                localStorage.removeItem("token");
                setToken(null);
                setAuthUser(null);
            }
        } catch (error) {
            console.error("Auth check error:", error?.response?.data?.message || error.message);
            localStorage.removeItem("token");
            setToken(null);
            setAuthUser(null);
            toast.error("Authentication failed. Please login.");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle user login
    const login = async (state, credentials) => {
        try {
            const { data } = await axios.post(`/api/auth/${state}`, credentials);

            if (data.success) {
                setAuthUser(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common["token"] = data.token;
                setToken(data.token);
                localStorage.setItem("token", data.token);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    // Function to handle user logout
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        axios.defaults.headers.common["token"] = null;
        toast.success("Logged out successfully");

        if (socket) {
            socket.disconnect();
            setSocket(null);
        }
    };

    // Function to update user profile
    const updateProfile = async (body) => {
        try {
            const { data } = await axios.put("/api/auth/update-profile", body);

            if (data.success) {
                setAuthUser(data.user);
                toast.success("Profile updated successfully");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    // useEffect hook to check authentication on component mount and token changes
    useEffect(() => {
        setLoading(true); // Ensure loading is true when token changes

        if (token) {
            axios.defaults.headers.common["token"] = token;
            checkAuth();
        } else {
            setAuthUser(null);
            setLoading(false);
        }

        // Cleanup function to disconnect the socket when the component unmounts
        return () => {
            socket?.disconnect();
        };
    }, [token]);

    // Value object to be passed to the context provider
    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile,
        checkAuth,
        token,
        loading,
    };

    // Return the AuthContext.Provider
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
