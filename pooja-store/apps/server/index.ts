import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { handle } from 'hono/vercel'

const app = new Hono()

// Serve frontend from dist
app.use('/*', cors())
app.use('/static/*', serveStatic({ root: './public', rewriteRequestPath: (path) => path.replace(/^\/static/, '') }))

// Make products mutable for Admin feature
const products = [
    // 1. Coconuts
    {
        id: '1',
        name: 'Coconut (Big)',
        description: 'Fresh big size coconut for pooja.',
        price: 50,
        image: 'http://localhost:3001/static/images/image001.jpg',
        category: 'Essentials'
    },
    {
        id: '2',
        name: 'Coconut (Medium)',
        description: 'Fresh medium size coconut.',
        price: 40,
        image: 'http://localhost:3001/static/images/image002.jpg',
        category: 'Essentials'
    },
    // 2. Pooja Items
    {
        id: '3',
        name: 'Agarbatti (5rs)',
        description: 'Fragrant incense sticks (Small pack).',
        price: 5,
        image: 'http://localhost:3001/static/images/image003.gif',
        category: 'Pooja Items'
    },
    {
        id: '4',
        name: 'Agarbatti (10rs)',
        description: 'Fragrant incense sticks (Regular pack).',
        price: 10,
        image: 'http://localhost:3001/static/images/image004.jpg',
        category: 'Pooja Items'
    },
    {
        id: '5',
        name: 'Turmeric & Kumkum',
        description: 'Small packets of Haldi and Kumkum.',
        price: 5,
        image: 'http://localhost:3001/static/images/image006.jpg',
        category: 'Pooja Items'
    },
    // 3. Flowers
    {
        id: '6',
        name: 'Chamanti Flowers',
        description: 'Fresh Chrysanthemum flowers (Subject to market price).',
        price: 20, // Placeholder price
        image: 'http://localhost:3001/static/images/image007.jpg',
        category: 'Flowers'
    },
    {
        id: '7',
        name: 'Tulasi Flowers',
        description: 'Fresh Holy Basil (Tulasi) for offering.',
        price: 10, // Placeholder
        image: 'http://localhost:3001/static/images/image008.jpg',
        category: 'Flowers'
    },
    {
        id: '8',
        name: 'Kakada Flowers',
        description: 'Fresh Kakada flowers.',
        price: 20, // Placeholder
        image: 'http://localhost:3001/static/images/image009.jpg',
        category: 'Flowers'
    },
    // Combos
    {
        id: '9',
        name: 'Basic Combo (1 Coconut)',
        description: '1 Coconut, Agarbatti, Turmeric, Kumkum, and Flowers.',
        price: 50,
        image: 'http://localhost:3001/static/images/image0010.jpg',
        category: 'Combos'
    },
    {
        id: '10',
        name: 'Basic Combo (2 Coconuts)',
        description: '2 Coconuts, Agarbatti, Turmeric, Kumkum, and Flowers.',
        price: 100,
        image: 'http://localhost:3001/static/images/image011.jpg',
        category: 'Combos'
    },
    // 4. Ellu Batti
    {
        id: '11',
        name: '5 Ellu Batti + Oil',
        description: '5 Sesame oil wicks with small oil packet.',
        price: 30,
        image: 'http://localhost:3001/static/images/image012.gif',
        category: 'Oil & Wicks'
    },
    {
        id: '12',
        name: '9 Ellu Batti + Oil',
        description: '9 Sesame oil wicks with small oil packet.',
        price: 50,
        image: 'http://localhost:3001/static/images/image013.jpg',
        category: 'Oil & Wicks'
    },
    // 5. Nava Dhanya
    {
        id: '13',
        name: 'Nava Dhanya Packet',
        description: 'Nine grains mix for pooja.',
        price: 50,
        image: 'http://localhost:3001/static/images/image014.jpg',
        category: 'Pooja Items'
    },
    // 6. Gingelly Oil
    {
        id: '14',
        name: 'Gingelly Oil (100ml)',
        description: 'Pure Gingelly oil bottle.',
        price: 40,
        image: 'http://localhost:3001/static/images/image015.gif',
        category: 'Oil & Wicks'
    },
    {
        id: '15',
        name: 'Gingelly Oil (150ml)',
        description: 'Pure Gingelly oil bottle.',
        price: 50,
        image: 'http://localhost:3001/static/images/image016.jpg',
        category: 'Oil & Wicks'
    },
    {
        id: '16',
        name: 'Gingelly Oil (200ml)',
        description: 'Pure Gingelly oil bottle.',
        price: 60,
        image: 'http://localhost:3001/static/images/image017.jpg',
        category: 'Oil & Wicks'
    },
    {
        id: '17',
        name: 'Gingelly Oil (500ml)',
        description: 'Pure Gingelly oil bottle (1/2 Liter).',
        price: 100,
        image: 'http://localhost:3001/static/images/image018.gif',
        category: 'Oil & Wicks'
    },
    {
        id: '18',
        name: 'Gingelly Oil (1 Liter)',
        description: 'Pure Gingelly oil bottle (1 Liter).',
        price: 200,
        image: 'http://localhost:3001/static/images/image019.jpg',
        category: 'Oil & Wicks'
    },
    // 7. Flower Mala
    {
        id: '19',
        name: 'Flower Mala',
        description: 'Fresh flower garland (Price range 50rs - 100rs).',
        price: 50,
        image: 'http://localhost:3001/static/images/image020.png',
        category: 'Flowers'
    },
    // 8. Lemon
    {
        id: '20',
        name: 'Lemon',
        description: 'Fresh yellow lemon (1 piece).',
        price: 5,
        image: 'http://localhost:3001/static/images/image021.jpg',
        category: 'Essentials'
    },
    // 9. Karpura
    {
        id: '21',
        name: 'Karpura',
        description: 'Camphor tablets (1 piece/packet).',
        price: 5,
        image: 'http://localhost:3001/static/images/image022.jpg',
        category: 'Pooja Items'
    },
    // Pooja Sets
    {
        id: '22',
        name: 'Normal Pooja Set (1 Coconut)',
        description: 'Complete set: 1 Coconut, Agarbatti, Turmeric, Kumkum, Flowers, Ellu batti, Oil.',
        price: 100,
        image: 'http://localhost:3001/static/images/image023.gif',
        category: 'Pooja Sets'
    },
    {
        id: '23',
        name: 'Normal Pooja Set (2 Coconuts)',
        description: 'Complete set: 2 Coconuts, Agarbatti, Turmeric, Kumkum, Flowers, Ellu batti, Oil.',
        price: 150,
        image: 'http://localhost:3001/static/images/image024.jpg',
        category: 'Pooja Sets'
    },
    {
        id: '24',
        name: 'Navagraha Pooja Set (1 Coconut)',
        description: 'Normal Set + Nava Dhanya Packet.',
        price: 150,
        image: 'http://localhost:3001/static/images/image025.jpg',
        category: 'Pooja Sets'
    },
    {
        id: '25',
        name: 'Navagraha Pooja Set (2 Coconuts)',
        description: 'Normal Set (2 Coconuts) + Nava Dhanya Packet.',
        price: 200,
        image: 'http://localhost:3001/static/images/image026.jpg',
        category: 'Pooja Sets'
    },
    {
        id: '26',
        name: 'Tailabhishekam Pooja Set',
        description: '2 Coconuts, Agarbatti, Turmeric/Kumkum, Flowers, Ellu Batti, Oil Packet, Nava Dhanya, Oil Bottle.',
        price: 250,
        image: 'http://localhost:3001/static/images/image027.jpg',
        category: 'Pooja Sets'
    }
]

// Order Counter State
let orderState = {
    date: new Date().toLocaleDateString('en-IN'),
    count: 0
};

app.get('/api/order-id', (c) => {
    const today = new Date().toLocaleDateString('en-IN');
    if (orderState.date !== today) {
        // Reset for new day
        orderState = { date: today, count: 1 };
    } else {
        // Increment for same day
        orderState.count++;
    }
    return c.json({ orderId: orderState.count });
})

app.get('/api/products', (c) => {
    return c.json(products)
})

app.get('/api/products/:id', (c) => {
    const id = c.req.param('id')
    const product = products.find(p => p.id === id)
    if (product) {
        return c.json(product)
    }
    return c.json({ message: 'Product not found' }, 404)
})

app.post('/api/login', async (c) => {
    const body = await c.req.json()
    if (body.username === 'Dhaya2898' && body.password === 'Ucannottrack$~') {
        return c.json({ success: true, message: 'Login successful' })
    }
    return c.json({ success: false, message: 'Invalid credentials' }, 401)
})

app.post('/api/products', async (c) => {
    const body = await c.req.json()
    const newProduct = {
        id: Math.random().toString(36).substr(2, 9),
        ...body
    }
    products.push(newProduct)
    return c.json({ success: true, product: newProduct })
})

app.put('/api/products/:id', async (c) => {
    const id = c.req.param('id')
    const body = await c.req.json()
    const index = products.findIndex(p => p.id === id)
    if (index !== -1) {
        products[index] = { ...products[index], ...body }
        return c.json({ success: true, product: products[index] })
    }
    return c.json({ success: false, message: 'Product not found' }, 404)
})

app.delete('/api/products/:id', (c) => {
    const id = c.req.param('id')
    const index = products.findIndex(p => p.id === id)
    if (index !== -1) {
        products.splice(index, 1)
        return c.json({ success: true })
    }
    return c.json({ success: false, message: 'Product not found' }, 404)
})

app.post('/api/checkout', async (c) => {
    const body = await c.req.json()
    console.log('Checkout received:', body)
    return c.json({ message: 'Order placed successfully!', orderId: Math.random().toString(36).substr(2, 9) })
})

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)

const port = 3001
console.log(`Server is running on port ${port}`)

if (!process.env.VERCEL) {
    serve({
        fetch: app.fetch,
        port
    })
}

export default app
