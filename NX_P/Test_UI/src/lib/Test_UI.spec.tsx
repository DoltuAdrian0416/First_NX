import { render } from '@testing-library/react';

import TestUI from './Test_UI';

describe('TestUI', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestUI />);
    expect(baseElement).toBeTruthy();
  });
});
