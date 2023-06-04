import { render, screen } from '@testing-library/react';
import UsersList from './components';

test('Test rendering basic layout', () => {
  render(<UsersList />);
  const header = screen.getByText(/Users rating list/i);
  const allUsersList = screen.getByTestId('all-users-list');
  const ratedList = screen.getByTestId('rated-users-list');
  expect(allUsersList).toBeInTheDocument();
  expect(ratedList).toBeInTheDocument();
  expect(header).toBeInTheDocument();
});
