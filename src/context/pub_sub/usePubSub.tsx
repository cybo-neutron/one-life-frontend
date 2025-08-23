import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

const PubSubContext = createContext({
  subscribe: (event: string, callback: Function) => {},
  publish: (event: string, data: any) => {},
  unsubscribe: (event: string, callback: Function) => {},
});

export const PubSubProvider = ({ children }: { children: React.ReactNode }) => {
  const subscribers = useRef<Record<string, Function[]>>({});

  const subscribe = useCallback((event: string, callback: Function) => {
    console.log(`subscribing to ${event}`);
    if (!subscribers.current[event]) {
      subscribers.current[event] = [];
    }
    subscribers.current[event].push(callback);
  }, []);

  const publish = useCallback((event: string, data: any) => {
    console.log(`publishing to ${event}`);
    if (subscribers.current[event]) {
      subscribers.current[event].forEach((callback: Function) =>
        callback(data)
      );
    }
  }, []);

  const unsubscribe = useCallback((event: string, callback: Function) => {
    console.log(`unsubscribing from ${event}`);
    if (subscribers.current[event]) {
      subscribers.current[event] = subscribers.current[event].filter(
        (cb) => cb !== callback
      );
    }
  }, []);

  return (
    <PubSubContext.Provider value={{ subscribe, publish, unsubscribe }}>
      {children}
    </PubSubContext.Provider>
  );
};

export const usePubSub = () => {
  const { subscribe, publish, unsubscribe } = useContext(PubSubContext);

  return {
    publish,
    subscribe,
    unsubscribe,
  };
};

export const useSubscribe = (event: string, cb: Function) => {
  const { subscribe, unsubscribe } = useContext(PubSubContext);
  useEffect(() => {
    if (!event || !cb) return;
    subscribe(event, cb);
    return () => {
      unsubscribe(event, cb);
    };
  }, [event, cb]);

  return null;
};
