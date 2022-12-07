import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('shows an image', ()=> {
  render(<App />);
  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('it down or upvotes', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByTestId('decrease'));
  expect(screen.getByTestId('counter')).toHaveDisplayValue(3);
  await user.click(screen.getByTestId('increase'));
  expect(screen.getByTestId('counter')).toHaveDisplayValue(4);
})

test('submits and shows result', async()=> {
  render(<App />)
  const user = userEvent.setup()
  const input = screen.getByTestId('furcolor');
  await user.type(input, 'red');
  await user.click(screen.getByTestId('submit-btn'));
  expect(screen.getByText('furcolor:red')).toBeInTheDocument();
});

test('fails to submit and shows result', async()=> {
  render(<App />)
  const user = userEvent.setup()
  const input = screen.getByLabelText('Fur Color');
  await user.type(input, 'red');
  await user.click(screen.getByRole('button', {name: 'Send'}));
  expect(screen.getByText('furcolor:red')).toBeInTheDocument();
});
