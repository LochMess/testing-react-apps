// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()
function Counter() {
  const {count, increment, decrement} = useCounter()

  return (
    <>
      <p>Current count: {count}</p>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </>
  )
}

test('exposes the count and increment/decrement functions', () => {
  // 🐨 render the component
  render(<Counter />)
  // 🐨 get the elements you need using screen
  // 🐨 assert on the initial state of the hook
  expect(screen.getByText(/current count/i)).toHaveTextContent('0')
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  userEvent.click(screen.getByRole('button', {name: /decrement/i}))
  expect(screen.getByText(/current count/i)).toHaveTextContent('-1')
  userEvent.click(screen.getByRole('button', {name: /increment/i}))
  expect(screen.getByText(/current count/i)).toHaveTextContent('0')
})

/* eslint no-unused-vars:0 */
