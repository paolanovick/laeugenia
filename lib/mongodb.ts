import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI no está configurada en las variables de entorno de Vercel');

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }
  return cachedClient.db('laeugenia');
}
