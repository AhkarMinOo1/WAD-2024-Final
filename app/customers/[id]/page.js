"use client"; // This line marks the component as a Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    CircularProgress,
} from '@mui/material';

const CustomerDetails = ({ params }) => {
    const { id } = params;
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    // Fetch customer details
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await fetch(`/api/customers/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch customer details');
                }
                const data = await response.json();
                setCustomer(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [id]);

    // Handle delete customer
    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this customer?')) {
            const response = await fetch(`/api/customers/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Customer deleted successfully');
                router.push('/customers'); // Redirect to customers list
            } else {
                alert('Failed to delete customer');
            }
        }
    };

    // Handle update customer
    const handleUpdate = async (event) => {
        event.preventDefault();
        const updatedCustomer = {
            name: event.target.name.value,
            dateOfBirth: event.target.dateOfBirth.value,
            memberNumber: event.target.memberNumber.value,
            interests: event.target.interests.value.split(',').map((interest) => interest.trim()), // Convert string to array
        };

        const response = await fetch(`/api/customers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCustomer),
        });

        if (response.ok) {
            const data = await response.json();
            setCustomer(data); // Update the customer state with the new data
            setIsEditing(false); // Exit edit mode
        } else {
            alert('Failed to update customer');
        }
    };

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ marginTop: '20px', textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ marginTop: '20px' }}>
                <Alert severity="error">Error: {error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ marginTop: '20px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Customer Details
            </Typography>
            {isEditing ? (
                <form onSubmit={handleUpdate}>
                    <TextField
                        label="Name"
                        name="name"
                        defaultValue={customer.name}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        defaultValue={customer.dateOfBirth.slice(0, 10)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Member Number"
                        name="memberNumber"
                        type="text"
                        defaultValue={customer.memberNumber}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Interests (comma separated)"
                        name="interests"
                        defaultValue={Array.isArray(customer.interests) ? customer.interests.join(', ') : customer.interests}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Box mt={2}>
                        <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
                            Update Customer
                        </Button>
                        <Button variant="outlined" onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                        <Button variant="outlined" onClick={() => router.push('/customers')} sx={{ ml: 2 }}>
                            Back
                        </Button>
                    </Box>
                </form>
            ) : (
                <div>
                    <Typography variant="h6">Name: {customer.name}</Typography>
                    <Typography variant="h6">Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</Typography>
                    <Typography variant="h6">Member Number: {customer.memberNumber}</Typography>
                    <Typography variant="h6">Interests: {Array.isArray(customer.interests) ? customer.interests.join(', ') : customer.interests}</Typography>
                    <Box mt={2}>
                        <Button variant="outlined" color="primary" onClick={() => setIsEditing(true)} sx={{ mr: 2 }}>
                            Edit
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleDelete}>
                            Delete
                        </Button>
                        <Button variant="outlined" onClick={() => router.push('/customers')} sx={{ ml: 2 }}>
                            Back
                        </Button>
                    </Box>
                </div>
            )}
        </Container>
    );
};

export default CustomerDetails;
