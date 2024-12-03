import { render } from '@testing-library/react';

import GenerateBoard from './GenerateBoard';

describe('GenerateBoard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenerateBoard />);
    expect(baseElement).toBeTruthy();
  });
});
