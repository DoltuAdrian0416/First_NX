import { render } from '@testing-library/react';

import GameHistory from './GameHistory';

describe('GameHistory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameHistory />);
    expect(baseElement).toBeTruthy();
  });
});