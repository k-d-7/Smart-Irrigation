import { createClient } from 'redis';

const cache_url = process.env.CACHE_URL || 'redis://localhost:6379';

const cacheClient = createClient({
    url: cache_url,
});

cacheClient.on('connect', () => {
    console.log('Connected to Redis');
});

cacheClient.on('error', (err) => {
    console.log('Error connecting to Redis', err);
});

cacheClient.on('end', () => {
    console.log('Redis connection ended');
});

cacheClient.connect();

export default cacheClient;


    