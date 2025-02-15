import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProfileForm } from '@/pages/dashboard/ProfileForm';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('ProfileForm', () => {
  const mockProps = {
    selectedFields: ['name', 'email', 'created'],
    tableName: 'users'
  };

  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
    // Clear mock fetch
    mockFetch.mockReset();
  });

  it('renders form fields correctly', () => {
    render(<ProfileForm {...mockProps} />);
    
    // Should not render 'created' field
    expect(screen.queryByLabelText('created')).not.toBeInTheDocument();
    
    // Should render other fields
    expect(screen.getByLabelText('name')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    // Check for submit button
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('handles input changes correctly', async () => {
    const user = userEvent.setup();
    render(<ProfileForm {...mockProps} />);
    
    const nameInput = screen.getByLabelText('name');
    const emailInput = screen.getByLabelText('email');
    
    // Type in the inputs
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    
    // Check if inputs have correct values
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('shows loading state during form submission', async () => {
    // Mock a delayed response
    mockFetch.mockImplementationOnce(() => 
      new Promise(resolve => 
        setTimeout(() => 
          resolve({ ok: true }), 100
        )
      )
    );

    const user = userEvent.setup();
    render(<ProfileForm {...mockProps} />);
    
    // Fill out the form
    await user.type(screen.getByLabelText('name'), 'John Doe');
    await user.type(screen.getByLabelText('email'), 'john@example.com');
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);
    
    // Check loading state
    expect(screen.getByRole('button', { name: "Submitting..." })).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    
    // Wait for submission to complete
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled();
    });
  });

  it('submits form data correctly', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    
    const user = userEvent.setup();
    render(<ProfileForm {...mockProps} />);
    
    // Fill out the form
    await user.type(screen.getByLabelText('name'), 'John Doe');
    await user.type(screen.getByLabelText('email'), 'john@example.com');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Check if fetch was called with correct data
    expect(mockFetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/api/collection/insert`,
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tableName: 'users',
          formData: {
            name: 'John Doe',
            email: 'john@example.com'
          }
        })
      })
    );
  });

  it('resets form after successful submission', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    
    const user = userEvent.setup();
    render(<ProfileForm {...mockProps} />);
    
    // Fill out the form
    const nameInput = screen.getByLabelText('name');
    const emailInput = screen.getByLabelText('email');
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Wait for form to reset
    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
    });
  });

  it('handles submission error correctly', async () => {
    // Mock console.error to prevent error logs in test output
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    
    const user = userEvent.setup();
    render(<ProfileForm {...mockProps} />);
    
    // Fill out and submit the form
    await user.type(screen.getByLabelText('name'), 'John Doe');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Verify error was logged
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
    
    // Verify button is re-enabled
    expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled();
    
    consoleSpy.mockRestore();
  });
});