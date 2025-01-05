import { render, screen } from '@testing-library/react';
import Footer from '@/layout/Footer';
describe('App', () => {

  it('renders headline', () => {

    render(<Footer />);

    const headline = screen.getByText(/Integrate nicely with your favorite framework/i);

    expect(headline);

  });

});

