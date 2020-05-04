import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AuthForm from './AuthForm';

configure({ adapter: new Adapter() });

describe('<AuthForm />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AuthForm />);
  });

  it('should render the compoent', () => {
    expect(wrapper).toBeTruthy();
  });
});
