import { useState, useEffect } from 'react';

interface UseApiOptions {
  onMount?: boolean;
  dependencies?: any[];
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>, 
  args: any[] = [], 
  options: UseApiOptions = { onMount: true, dependencies: [] }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const { onMount = true, dependencies = [] } = options;
  
  const execute = async (...executeArgs: any[]) => {
    try {
      setLoading(true);
      setError(null);
      
      // 파라미터 우선 순위: execute 함수에 전달된 인자 > 초기 설정된 인자
      const argsToUse = executeArgs.length > 0 ? executeArgs : args;
      const result = await apiFunction(...argsToUse);
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (onMount) {
      execute();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
  
  return { data, loading, error, execute };
}
