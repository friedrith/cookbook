import { render, screen } from '@testing-library/react'

import Button from '../Button'

describe('Button', () => {
  it('renders learn react link', () => {
    render(<Button>Foo</Button>)
    const textElement = screen.getByText(/Foo/i)
    expect(textElement).toBeInTheDocument()
  })
})
