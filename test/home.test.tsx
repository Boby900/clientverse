import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { TableDemo } from '@/pages/dashboard/Home';



global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve({
        data: [
          {
            id: 1,
            email: 'test1@example.com',
            createdAt: '2023-01-01',
            githubId: '123',
            username: 'testuser1',
          },
          {
            id: 2,
            email: 'test2@example.com',
            createdAt: '2023-01-02',
            githubId: '124',
            username: 'testuser2',
          },
        ],
      }),
  } as Response)
);

test('renders user data correctly', async () => {
  render(<TableDemo />);

  await waitFor(() => expect(screen.getByText('test1@example.com')).toBeInTheDocument());
  expect(screen.getByText('testuser1')).toBeInTheDocument();
  expect(screen.getByText('2023-01-02')).toBeInTheDocument();
});

