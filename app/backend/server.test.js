const request = require('supertest');
const app = require('./server');

describe('API Endpoints', () => {
  // Test the root endpoint
  test('GET / should return a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Backend API is running!');
  });

  // Test the items endpoint
  test('GET /api/items should return all items', async () => {
    const response = await request(app).get('/api/items');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(3);
  });

  // Test the item by ID endpoint
  test('GET /api/items/:id should return a single item', async () => {
    const response = await request(app).get('/api/items/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(1);
  });

  // Test the item by ID endpoint with invalid ID
  test('GET /api/items/:id with invalid ID should return 404', async () => {
    const response = await request(app).get('/api/items/999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Item not found');
  });

  // Test the health check endpoint
  test('GET /health should return status ok', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toBe('ok');
  });
}); 