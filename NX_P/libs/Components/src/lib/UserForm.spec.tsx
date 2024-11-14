import { fireEvent, render, screen } from '@testing-library/react';

import { UserForm } from './UserForm';

vi.mock('uuid', () => ({
  v4: () => 'mockID',
}));

describe('UserForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UserForm
        setPlayer1={() => {}}
        setPlayer2={() => {}}
        setSize={() => {}}
        size={3}
      />
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render inputs', () => {
    const { baseElement } = render(
      <UserForm
        setPlayer1={() => {}}
        setPlayer2={() => {}}
        setSize={() => {}}
        size={3}
      />
    );
    const inputP1 = screen.getByPlaceholderText('Player1');
    const inputP2 = screen.getByPlaceholderText('Player2');
    expect(baseElement).toBeTruthy();
    expect(inputP1).toBeTruthy();
    expect(inputP2).toBeTruthy();
  });
  it('should modify inputs value ', () => {
    const { baseElement } = render(
      <UserForm
        setPlayer1={() => {}}
        setPlayer2={() => {}}
        setSize={() => {}}
        size={3}
      />
    );
    const inputP1 = screen.getByPlaceholderText('Player1');
    const inputP2 = screen.getByPlaceholderText('Player2');
    fireEvent.change(inputP1, { target: { value: 'Thrall' } });
    fireEvent.change(inputP2, { target: { value: 'Garrosh ' } });
    expect(baseElement).toBeTruthy();
    expect(screen.getByDisplayValue('Thrall')).toBeTruthy();
  });
  it('should click the confirm button ', () => {
    const mockSetPlayer1 = vi.fn();
    const mockSetPlayer2 = vi.fn();
    const mockSetSize = vi.fn();
    //arg
    const { baseElement } = render(
      <UserForm
        setPlayer1={mockSetPlayer1}
        setPlayer2={mockSetPlayer2}
        setSize={mockSetSize}
        size={3}
      />
    );
    //ACT
    const inputP1 = screen.getByPlaceholderText('Player1');
    const inputP2 = screen.getByPlaceholderText('Player2');
    const confirmbtn = screen.getByTestId('confirmbtn');
    fireEvent.change(inputP1, { target: { value: 'Thrall' } });
    fireEvent.change(inputP2, { target: { value: 'Garrosh' } });
    fireEvent.click(confirmbtn);
    expect(baseElement).toBeTruthy();

    expect(mockSetPlayer1).toHaveBeenCalledWith({
      name: 'Thrall',
      id: 'mockID',
    });
    expect(mockSetPlayer2).toHaveBeenCalledWith({
      name: 'Garrosh',
      id: 'mockID',
    });
  });
  it('should modify button styles and size ', () => {
    const mockSetSize = vi.fn();
    const { baseElement } = render(
      <UserForm
        setPlayer1={vi.fn()}
        setPlayer2={vi.fn()}
        setSize={mockSetSize}
        size={4}
      />
    );
    const button4x4 = screen.getByTestId('size4');
    fireEvent.click(button4x4);
    expect(baseElement).toBeTruthy();
    expect(mockSetSize).toBeCalledWith(4);
  });

  it('should enter the useEffect ', () => {
    const { baseElement } = render(
      <UserForm
        setPlayer1={() => {}}
        setPlayer2={() => {}}
        setSize={() => {}}
        size={3}
      />
    );
    const inputP1 = screen.getByPlaceholderText('Player1');
    const inputP2 = screen.getByPlaceholderText('Player2');
    const confirmbtn = screen.getByTestId('confirmbtn');
    fireEvent.change(inputP1, { target: { value: 'Thrall' } });
    fireEvent.change(inputP2, { target: { value: 'Garrosh ' } });
    fireEvent.click(confirmbtn);
    expect(baseElement).toBeTruthy();
    expect(screen.getByDisplayValue('Thrall')).toBeTruthy();
  });
});
