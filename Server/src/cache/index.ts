import cacheClient from '@utils/redis';

export default class Cache {
    private static instance: Cache;
    private client: any;
    
    private constructor() {
        this.client = cacheClient;
    }
    
    public static getInstance(): Cache {
        if (!Cache.instance) {
        Cache.instance = new Cache();
        }
    
        return Cache.instance;
    }
    
    public async set(key: string, value: any) {
        try {
        this.client.set(key, JSON.stringify(value));
        } catch (error) {
        throw error;
        }
    }
    
    public async get(key: string) {
        try {
        const value = await this.client.get(key);
        return JSON.parse(value);
        } catch (error) {
        throw error;
        }
    }
    
    public async delete(key: string) {
        try {
        await this.client.del(key);
        } catch (error) {
        throw error;
        }
    }

    public async flush() {
        try {
        await this.client.flushall();
        } catch (error) {
        throw error;
        }
    }

    public async exists(key: string) {
        try {
        const value = await this.client.exists(key);
        return value;
        } catch (error) {
        throw error;
        }
    }
}