import {
  createContext,
  useCallback,
  useContext,
  useRef,
} from 'react';
import PropTypes from 'prop-types';

const ResetContext = createContext();

export const useReset = () => useContext(ResetContext);

export const ResetProvider = ({ children }) => {
  const subscribers = useRef([]);

  const subscribeOnReset = useCallback((cb) => {
    const isSubscribed = subscribers.current.some(callback => callback === cb);

    if (!isSubscribed) {
      subscribers.current.push(cb);
    }
  }, []);

  const unsubscribeFromReset = useCallback(() => {
    subscribers.current = [];
  }, []);

  const publishOnReset = useCallback(() => {
    subscribers.current.forEach(cb => cb());
  }, []);

  const contextValue = {
    subscribeOnReset,
    unsubscribeFromReset,
    publishOnReset,
  };

  return (
    <ResetContext.Provider value={contextValue}>
      {children}
    </ResetContext.Provider>
  );
};

ResetProvider.propTypes = {
  children: PropTypes.object,
};

