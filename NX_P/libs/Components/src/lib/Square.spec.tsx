import { render } from '@testing-library/react';

import Square from './Square';

describe('Square', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Square />);
    expect(baseElement).toBeTruthy();
  });
});
