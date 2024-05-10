import PropTypes from 'prop-types';

export const TestComponent = ({ text }) => {
  return (
    <div>{text}</div>
  );
};

TestComponent.propTypes = {
  text: PropTypes.string,
};
