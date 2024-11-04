import { render } from '@testing-library/react';

import TESTCOMPONENT from './button';

describe('TESTCOMPONENT', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TESTCOMPONENT />);
    expect(baseElement).toBeTruthy();
  });
});
