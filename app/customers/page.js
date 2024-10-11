"use client"; // This line marks the component as a Client Component

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Box
} from '@mui/material';

const CustomersList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('/api/customers');
                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }
                const data = await response.json();
                setCustomers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

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
                Customers List
            </Typography>
            <Button variant="contained" color="primary" component={Link} href="/customers/new" sx={{ marginBottom: 2 }}>
                Add New Customer
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Member Number</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map(customer => {
                            const age = new Date().getFullYear() - new Date(customer.dateOfBirth).getFullYear(); // Calculate age
                            return (
                                <TableRow key={customer._id}>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{age}</TableCell>
                                    <TableCell>{customer.memberNumber}</TableCell>
                                    <TableCell>
                                        <Link href={`/customers/${customer._id}`}>
                                            <Button variant="outlined">View Details</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default CustomersList;
