import { useState } from 'react';
import { Grid, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setToken }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post('http://localhost:8000/login', formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });

      setToken(response.data.access_token);
      setMessage('');
      navigate(`/hello/${username}`);
    } catch (error) {
      setMessage('Login failed. Check credentials.');
    }
  };

  return (
    <Grid
      container
      style={{ minHeight: '100vh' }}
      alignItems="center"
      justifyContent="center"
    >
      <Paper elevation={3} style={{ padding: '30px', maxWidth: '400px', width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          style={{ marginTop: '20px' }}
        >
          Login
        </Button>

        {message && (
          <Typography
            variant="body1"
            color="error"
            align="center"
            style={{ marginTop: '15px' }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

export default LoginPage;
