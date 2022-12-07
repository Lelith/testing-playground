import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Counter} from './Counter';

const onChangeMock = jest.fn();

test('increases', async ()=> {
  render(<Counter onChange={onChangeMock} />);
  fireEvent.click(screen.getByTestId('increase'));
  expect(onChangeMock).toHaveBeenCalled();
  expect(screen.getByTestId('counter')).toHaveDisplayValue(1);
});

test('fails to increase', async()=>{
  const user = userEvent.setup();
  render(<Counter onChange={onChangeMock} />);
  const button = screen.getByTestId('increase');
  button.focus();
  await user.keyboard("{enter}");
  expect(screen.getByTestId('counter')).toHaveDisplayValue(1);
  expect(onChangeMock).toHaveBeenCalled();
})

test('decreases', ()=>{
  render(<Counter onChange={onChangeMock} initialCounter={1} />);
  fireEvent.click(screen.getByTestId('decrease'));
  expect(screen.getByTestId('counter')).toHaveDisplayValue(0);
  expect(onChangeMock).toHaveBeenCalled();

});

test('does respect max property', ()=> {
  render(<Counter onChange={onChangeMock}  initialCounter={4} max={4} />);
  fireEvent.click(screen.getByTestId('increase'));
  expect(screen.getByTestId('counter')).toHaveDisplayValue(4);
  expect(onChangeMock).not.toHaveBeenCalled();
})

test('does respect min property', ()=> {
  render(<Counter onChange={onChangeMock}  initialCounter={4} min={4} />);
    fireEvent.click(screen.getByTestId('decrease'));
  expect(screen.getByTestId('counter')).toHaveDisplayValue(4);
    expect(onChangeMock).not.toHaveBeenCalled();
})