import { screen, render, fireEvent } from '@testing-library/react';

import { Board } from './Board';
import Square, { SquareProps } from './Square';

vi.mock('@./Components', () => ({
  Square: (props: SquareProps) => {
    return (
      <button
        data-testid="square"
        onClick={() => {
          props.onClick();
        }}
      >
        {props.value}
      </button>
    );
  },
}));
describe('Board', () => {
  it('should not render any square', () => {
    //Arrange
    const { baseElement } = render(
      <Board
        key={1}
        setWinner={() => {}}
        locked={false}
        size={0}
        players={[]}
      />
    );

    expect(baseElement).toBeTruthy();
    expect(() => {
      screen.getByTestId('square');
    }).toThrow();
  });
  it('should render square', () => {
    //Arrange
    const { baseElement } = render(
      <Board
        key={1}
        setWinner={() => {}}
        locked={false}
        size={3}
        players={[
          { name: 'Testus', id: '1' },
          { name: 'TestusMic', id: '2' },
        ]}
      />
    );

    expect(baseElement).toBeTruthy();
    expect(() => {
      screen.getByTestId('square');
    }).toBeTruthy();
  });
  it('should return if board is locked', async () => {
    //Arrange
    const { baseElement } = render(
      <Board
        key={1}
        setWinner={() => {}}
        locked={true}
        size={3}
        players={[
          { name: 'Testus', id: '1' },
          { name: 'TestusMic', id: '2' },
        ]}
      />
    );
    const squarebtn = await screen.findAllByRole('button');
    fireEvent.click(squarebtn[0]);
    expect(baseElement).toBeTruthy();
    expect(() => {
      screen.getByTestId('square');
    }).toBeTruthy();
    expect(squarebtn.length).toBe(9);
  });
  it('should return if board is locked', async () => {
    //Arrange
    const { baseElement } = render(
      <Board
        key={1}
        setWinner={() => {}}
        locked={false}
        size={3}
        players={[
          { name: 'Testus', id: '1' },
          { name: 'TestusMic', id: '2' },
        ]}
      />
    );
    const squarebtn = await screen.findAllByRole('button');
    fireEvent.click(squarebtn[0]);
    fireEvent.click(squarebtn[0]);
    expect(baseElement).toBeTruthy();
    expect(() => {
      screen.getByTestId('square');
    }).toBeTruthy();
    expect(squarebtn.length).toBe(9);
  });
  it('should return if board is locked', async () => {
    const setWinnerMock = vi.fn();
    //Arrange
    const { baseElement } = render(
      <Board
        key={1}
        setWinner={setWinnerMock}
        locked={false}
        size={3}
        players={[
          { name: 'Testus', id: '1' },
          { name: 'TestusMic', id: '2' },
        ]}
      />
    );
    const squarebtn = await screen.findAllByRole('button');
    fireEvent.click(squarebtn[0]);
    fireEvent.click(squarebtn[3]);
    fireEvent.click(squarebtn[1]);
    fireEvent.click(squarebtn[4]);
    fireEvent.click(squarebtn[2]);

    expect(baseElement).toBeTruthy();
    expect(() => {
      screen.getByTestId('square');
    }).toBeTruthy();
    expect(squarebtn.length).toBe(9);
    expect(() => {
      screen.getByText(/The winner is Testus/gi);
    });
    expect(setWinnerMock).toBeCalledTimes(1);
  });
});
