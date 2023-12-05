import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userid, setUserid] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    const response = await fetch('http://127.0.0.1:8001/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok == false) {
      const fial_message = data?.message
      alert('failed: ' + fial_message);
    } else {
      localStorage.setItem("token", data.token);
      setLoggedIn(true);
      await getUserProfile();
    }

  };

  const getUserProfile = async () => {
    const response = await fetch('http://127.0.0.1:8001/users/' + username, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
      }
    });

    const data = await response.json();

    if (response.ok == false) {
      alert('failed: ' + data?.message);
      return false
    } else {
      setUserid(data._id)
      return true
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token")
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <h1>Welcome, {username} user id:{userid}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
