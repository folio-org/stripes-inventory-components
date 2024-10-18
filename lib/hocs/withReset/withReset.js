import { useReset } from '../../contexts';

const withReset = (Component) => (props) => {
  const resetProps = useReset();

  return (
    <Component
      {...props}
      {...resetProps}
    />
  );
};

export { withReset };
