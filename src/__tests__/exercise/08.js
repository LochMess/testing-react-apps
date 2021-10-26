// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {renderHook, act as hookAct} from '@testing-library/react-hooks'
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

test('extra credit 1: test with fake component', () => {
  let result
  function FakeComponent(props) {
    result = useCounter(props)
    return null
  }

  render(<FakeComponent />)
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})

function setup(...props) {
  const results = {}
  function TestComponent() {
    Object.assign(results, useCounter(...props))
    return null
  }
  render(<TestComponent />)
  return results
}

test('extra credit 2: allows customization of the initial count', () => {
  const counterData = setup({initialCount: 13})
  expect(counterData.count).toBe(13)
})

test('extra credit 2: allows customization of the step', () => {
  const result = setup({step: 7})
  expect(result.count).toBe(0)
  act(() => result.increment())
  act(() => result.increment())
  expect(result.count).toBe(14)
  act(() => result.decrement())
  expect(result.count).toBe(7)
})

test('extra credit 3: allows customization of the step with renderHook', () => {
  const {result} = renderHook(() => useCounter({step: 7}))
  expect(result.current.count).toBe(0)
  hookAct(() => result.current.increment())
  hookAct(() => result.current.increment())
  expect(result.current.count).toBe(14)
  hookAct(() => result.current.decrement())
  expect(result.current.count).toBe(7)
})
/* eslint no-unused-vars:0 */
