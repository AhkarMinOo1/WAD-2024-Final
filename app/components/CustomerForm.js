"use client"; // Mark this file as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';

const CustomerForm = () => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [memberNumber, setMemberNumber] = useState('');
  const [interests, setInterests] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Split the interests string into an array
    const interestsArray = interests.split(',').map(interest => interest.trim()).filter(Boolean);
    const customerData = { name, dateOfBirth, memberNumber, interests: interestsArray };

    const response = await fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (response.ok) {
      router.push('/customers'); // Redirect to the customers list page
    } else {
      setError('Failed to add customer');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '20px' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add Customer
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Member Number"
            variant="outlined"
            fullWidth
            value={memberNumber}
            onChange={(e) => setMemberNumber(e.target.value)}
            required
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Interests (comma-separated)"
            variant="outlined"
            fullWidth
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g. Gym, Reading, Traveling"
            required
          />
        </Box>

        <Button variant="contained" color="primary" type="submit" sx={{ marginRight: 2 }}>
          Add Customer
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => router.push('/customers')}>
          Back to Customer List
        </Button>
      </form>
    </Container>
  );
};

export default CustomerForm;
