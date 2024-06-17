import * as dotenv from 'dotenv'
dotenv.config()
export const CHUNK_SIZE: number = (process.env.CHUNK_SIZE as unknown as number) || 1
export const PRIVATE_KEYS: string[] = JSON.parse(process.env.PRIVATE_KEYS || '[]')
