// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

// Clear the document even if an assert fails etc
beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement('div')
  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(div)
  // 🐨 use ReactDOM.render to render the <Counter /> to the div
  ReactDOM.render(<Counter />, div)
  // 🐨 get a reference to the increment and decrement buttons:
  //   💰 div.querySelectorAll('button')
  const [decrementButton, incrementButton] = div.querySelectorAll('button')
  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  const outputFieldValue = div.firstChild.querySelector('div')

  // 🐨 expect the message.textContent toBe 'Current count: 0'
  // console.log(outputFieldValue.textContent)
  expect(outputFieldValue.textContent).toBe('Current count: 0')
  // 🐨 click the increment button (💰 increment.click())
  // incrementButton.click()
  // Dispatch click event for extra credit 1
  incrementButton.dispatchEvent(new MouseEvent('click', {
    bubbles: true, // need to bubble due to React event delegation
    cancelable: true,
    button: 0, // left click
  }))
  // 🐨 assert the message.textContent
  expect(outputFieldValue.textContent).toBe('Current count: 1')
  // 🐨 click the decrement button (💰 decrement.click())
  // decrementButton.click()
  // Dispatch click event for extra credit 1
  decrementButton.dispatchEvent(new MouseEvent('click', {
    bubbles: true, // need to bubble due to React event delegation
    cancelable: true,
    button: 0, // left click
  }))
  // 🐨 assert the message.textContent
  expect(outputFieldValue.textContent).toBe('Current count: 0')

  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  console.log(div.innerHTML)
  // div.remove() only works if there isn't an error or failed assertion above as that will stop it from being run
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
})

/* eslint no-unused-vars:0 */
