import React from 'react';
import renderer from 'react-test-renderer';
import EllipsisPopup from '../utils/EllipsisPopup';

it('renders correctly', () => {
  const tree = renderer
    .create(<EllipsisPopup />).toJSON();
  expect(tree).toMatchSnapshot();
});
