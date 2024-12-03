import { render } from '@testing-library/react';

import BoardController from './BoardController';

describe('BoardController', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BoardController />);
    expect(baseElement).toBeTruthy();
  });
});
