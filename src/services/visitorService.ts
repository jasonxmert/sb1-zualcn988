import { supabase } from '../config/supabase';

export interface VisitorCount {
  id: number;
  count: number;
}

const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function retryOperation<T>(
  operation: () => Promise<T>,
  attempts: number = RETRY_ATTEMPTS
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < attempts; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      if (i < attempts - 1) {
        await sleep(RETRY_DELAY * (i + 1));
      }
    }
  }
  
  throw lastError;
}

export async function getVisitorCount(): Promise<number> {
  try {
    const { data, error } = await retryOperation(() => 
      supabase
        .from('visitor_count')
        .select('count')
        .single()
    );

    if (error) {
      console.error('Error fetching visitor count:', error);
      return 0;
    }

    return data?.count || 0;
  } catch (error) {
    console.error('Failed to fetch visitor count after retries:', error);
    return 0;
  }
}

export async function incrementVisitorCount(currentCount: number): Promise<void> {
  try {
    const { error } = await retryOperation(() =>
      supabase
        .from('visitor_count')
        .update({ count: currentCount + 1 })
        .eq('id', 1)
    );

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Failed to increment visitor count after retries:', error);
  }
}