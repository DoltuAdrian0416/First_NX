import { render } from '@testing-library/react';

import UserForm from './UserForm';

describe('UserForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserForm />);
    expect(baseElement).toBeTruthy();
  });
});
