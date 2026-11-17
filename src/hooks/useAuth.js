import { useState, useCallback } from 'react';

const USERS_KEY = 'agrilink_users';
const CURRENT_USER_KEY = 'agrilink_current_user';

const DEMO_USERS = [
  {
    id: 101,
    name: 'Raju Patil',
    email: 'farmer@agrilink.in',
    password: 'password123',
    role: 'farmer',
    phone: '+91 98765 43210',
    location: 'Dharwad, Karnataka',
    farmSize: '12',
    cropTypes: ['Rice', 'Maize', 'Vegetables'],
    experience: '15',
    createdAt: new Date().toISOString(),
  },
  {
    id: 102,
    name: 'Ananya Sharma',
    email: 'buyer@agrilink.in',
    password: 'password123',
    role: 'buyer',
    phone: '+91 91234 56789',
    location: 'Bengaluru, Karnataka',
    buyerType: 'Wholesaler',
    createdAt: new Date().toISOString(),
  },
  {
    id: 103,
    name: 'Gurpreet Singh',
    email: 'transporter@agrilink.in',
    password: 'password123',
    role: 'transporter',
    phone: '+91 98111 22334',
    location: 'Ludhiana, Punjab',
    vehicleType: 'Mini Truck',
    vehicleNumber: 'PB-10-EF-9012',
    capacity: '3',
    createdAt: new Date().toISOString(),
  },
];

const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(DEMO_USERS));
      return DEMO_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEMO_USERS;
  }
};

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export function useAuth() {
  const [user, setUser] = useState(getStoredUser);

  const login = useCallback(async (email, password) => {
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    // For demo purposes: allow login with demo users or matching password
    if (found) {
      if (found.password && found.password !== password && password !== 'password123' && password !== 'demo') {
        throw new Error('Incorrect password. For demo, you can use: password123');
      }
      const { password: _pw, ...safeUser } = found;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
      setUser(safeUser);
      return safeUser;
    }

    // If email contains farmer / buyer / transporter, create a demo session on the fly
    const lowerEmail = email.toLowerCase();
    let detectedRole = 'buyer';
    if (lowerEmail.includes('farmer')) detectedRole = 'farmer';
    else if (lowerEmail.includes('transport')) detectedRole = 'transporter';

    const tempUser = {
      id: Date.now(),
      name: email.split('@')[0].replace('.', ' '),
      email: email.trim(),
      role: detectedRole,
      phone: '+91 98765 00000',
      location: 'Karnataka, India',
      createdAt: new Date().toISOString(),
    };
    users.push({ ...tempUser, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(tempUser));
    setUser(tempUser);
    return tempUser;
  }, []);

  const register = useCallback(async (param1, email, password, role = 'buyer') => {
    const users = getStoredUsers();
    let newUser;

    if (typeof param1 === 'object' && param1 !== null) {
      const exists = users.some(
        (u) => u.email.toLowerCase() === (param1.email || '').trim().toLowerCase()
      );
      if (exists) {
        throw new Error('An account with this email already exists.');
      }
      newUser = {
        id: Date.now(),
        ...param1,
        createdAt: new Date().toISOString(),
      };
    } else {
      const exists = users.some(
        (u) => u.email.toLowerCase() === (email || '').trim().toLowerCase()
      );
      if (exists) {
        throw new Error('An account with this email already exists.');
      }
      newUser = {
        id: Date.now(),
        name: param1,
        email: email.trim(),
        password,
        role,
        createdAt: new Date().toISOString(),
      };
    }

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const { password: _pw, ...safeUser } = newUser;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
    return safeUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  }, []);

  return {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };
}
