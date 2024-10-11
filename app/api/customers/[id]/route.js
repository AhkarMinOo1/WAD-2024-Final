// app/api/customers/[id]/route.js

import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

// Handle GET requests to fetch a specific customer by ID
export async function GET(request, { params }) {
    await dbConnect();
    const { id } = params;
    const customer = await Customer.findById(id);
    
    if (!customer) {
        return new Response(JSON.stringify({ error: 'Customer not found' }), { status: 404 });
    }
    
    return new Response(JSON.stringify(customer), { status: 200 });
}

// Handle PUT requests to update a specific customer
export async function PUT(request, { params }) {
    await dbConnect();
    const { id } = params;
    const data = await request.json();
    
    const customer = await Customer.findByIdAndUpdate(id, data, { new: true });
    
    if (!customer) {
        return new Response(JSON.stringify({ error: 'Customer not found' }), { status: 404 });
    }
    
    return new Response(JSON.stringify(customer), { status: 200 });
}

// Handle DELETE requests to remove a specific customer
export async function DELETE(request, { params }) {
    await dbConnect();
    const { id } = params;
    
    const customer = await Customer.findByIdAndDelete(id);
    
    if (!customer) {
        return new Response(JSON.stringify({ error: 'Customer not found' }), { status: 404 });
    }
    
    return new Response(JSON.stringify({ message: 'Customer deleted successfully' }), { status: 200 });
}
