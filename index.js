const express = require('express')
const app = express()

app.get('/', (req, res) => {
  const a = req.query.a || ''
  const b = req.query.b || ''
  const op = req.query.op || 'add'

  let result = ''
  let symbol = '+'

  if (a !== '' && b !== '') {
    const left = Number(a)
    const right = Number(b)

    if (op === 'subtract') {
      result = left - right
      symbol = '-'
    } else if (op === 'multiply') {
      result = left * right
      symbol = '*'
    } else if (op === 'divide') {
      result = left / right
      symbol = '/'
    } else {
      result = left + right
    }
  }

  res.send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Calculator</title>
  </head>
  <body>
    <h1>Calculator</h1>
    <form method="get" action="/">
      <input type="number" name="a" step="any" value="${a}">
      <select name="op">
        <option value="add"${op === 'add' ? ' selected' : ''}>add</option>
        <option value="subtract"${op === 'subtract' ? ' selected' : ''}>subtract</option>
        <option value="multiply"${op === 'multiply' ? ' selected' : ''}>multiply</option>
        <option value="divide"${op === 'divide' ? ' selected' : ''}>divide</option>
      </select>
      <input type="number" name="b" step="any" value="${b}">
      <button type="submit">Calculate</button>
    </form>
    ${a !== '' && b !== '' ? `<p>${a} ${symbol} ${b} = ${result}</p>` : ''}
  </body>
</html>`)
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
