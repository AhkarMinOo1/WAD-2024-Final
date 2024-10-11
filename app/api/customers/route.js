import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

// Handle GET requests to fetch all customers
export async function GET() {
    try {
        await dbConnect();
        const customers = await Customer.find({});
        return new Response(JSON.stringify(customers), { status: 200 });
    } catch (error) {
        console.error('Error fetching customers:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

// Handle POST requests to create a new customer
export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();

        // Optionally validate incoming data
        const customer = new Customer(data);
        await customer.save();
        return new Response(JSON.stringify(customer), { status: 201 });
    } catch (error) {
        console.error('Error creating customer:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
