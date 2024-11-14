import { BoardProps, FormProps } from '@./Components';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './app';
vi.mock('@./Components', () => ({
  Board: (props: BoardProps) => {
    return (
      <div>
        BoardTest
        <button
          data-testid="setWinnerBtn"
          onClick={() => {
            props.setWinner({ name: 'User1', id: '1' });
          }}
        ></button>
      </div>
    );
  },
  UserForm: (props: FormProps) => {
    return (
      <div>
        <p>UserFormTest</p>
        <button
          data-testid="testID1"
          onClick={() => {
            props.setPlayer1({ name: 'Test', id: '1' });
            props.setPlayer2({ name: 'Test1', id: '2' });
          }}
        ></button>
      </div>
    );
  },
}));
describe('App', () => {
  it('should render successfully', () => {
    //Arrange
    const { baseElement } = render(<App />);

    //Expect
    expect(baseElement).toBeTruthy();
    expect(() => {
      screen.getByText(/BoardTest/gi);
    }).toThrow();
    expect(screen.getByText(/UserFormTest/gi)).toBeTruthy();
  });
  it('should render Board', () => {
    //Arrange
    const { baseElement } = render(<App />);
    const button1 = screen.getByTestId('testID1');
    //Act
    fireEvent.click(button1);

    //Expect
    expect(() => {
      screen.getByText(/UserFormTest/gi);
    }).toThrow();
    expect(baseElement).toBeTruthy();
    expect(() => {
      screen.getByText(/BoardTest/gi);
    }).toBeTruthy();
  });
  it('should go back to UserForm', () => {
    const { baseElement } = render(<App />);
    const buttonSetUsers = screen.getByTestId('testID1');
    // const button2 = screen.getByTestId('testID2');
    fireEvent.click(buttonSetUsers);
    waitFor(() => {
      expect(screen.getByText(/BoardTest/gi)).toBeTruthy();
    });
    const button1 = screen.getByTestId('BackButton');
    fireEvent.click(button1);

    // fireEvent.click(button2);
    expect(() => {
      screen.getByText(/UserFormTest/gi);
    }).toBeTruthy();
    expect(baseElement).toBeTruthy();
    expect(() => {
      screen.getByText(/BoardTest/gi);
    }).toThrow();
  });
  it('should go back to UserForm', () => {
    const { baseElement } = render(<App />);
    const buttonSetUsers = screen.getByTestId('testID1');
    // const button2 = screen.getByTestId('testID2');
    fireEvent.click(buttonSetUsers);
    waitFor(() => {
      expect(screen.getByText(/BoardTest/gi)).toBeTruthy();
    });
    const button1 = screen.getByTestId('ResetButton');
    fireEvent.click(button1);

    // fireEvent.click(button2);
    expect(baseElement).toBeTruthy();
    expect(() => {
      screen.getByText(/BoardTest/gi);
    }).toBeTruthy();
  });
  it('should render the Winner', () => {
    const { baseElement } = render(<App />);
    const buttonSetUsers = screen.getByTestId('testID1');
    // const button2 = screen.getByTestId('testID2');
    fireEvent.click(buttonSetUsers);
    waitFor(() => {
      expect(screen.getByText(/BoardTest/gi)).toBeTruthy();
    });
    const buttonSetWinner = screen.getByTestId('setWinnerBtn');
    fireEvent.click(buttonSetWinner);
    // fireEvent.click(button2);
    expect(baseElement).toBeTruthy();
    expect(() => {
      screen.getByText(/BoardTest/gi);
    }).toBeTruthy();
    expect(() => {
      screen.getByText(/The winner is : User/gi);
    }).toBeTruthy();
  });
});
