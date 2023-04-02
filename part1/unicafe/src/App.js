import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
      <p>{props.text} {props.value}{props.percentage}</p>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }
  const increaseBad = () => {
    setBad(bad + 1)
  }
  const all = good + neutral + bad
  const average = Math.round((good - bad)/all * 10) / 10
  const positive = Math.round(((good / all) * 100) * 10) / 10

  if (good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <div>
        <h1>Give Feedback</h1>
        <Button handleClick={increaseGood} text="good" />
        <Button handleClick={increaseNeutral} text="neutral" />
        <Button handleClick={increaseBad} text="bad" />
        <StatisticLine header="Statistics" />
        <table>
          <tbody>
          <tr>
            <td><StatisticLine text="Good" /></td>
            <td><StatisticLine value={good} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="Neutral" /></td>
            <td><StatisticLine value={neutral} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="Bad" /></td>
            <td><StatisticLine value={bad} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="All" /></td>
            <td><StatisticLine value={all} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="Average" /></td>
            <td><StatisticLine value={average} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="Positive" /></td>
            <td><StatisticLine value={positive} percentage="%" /></td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }else {
    return (
      <div>
        <h1>Give Feedback</h1>
        <Button handleClick={increaseGood} text="good" />
        <Button handleClick={increaseNeutral} text="neutral" />
        <Button handleClick={increaseBad} text="bad" />
        <StatisticLine text="No feedback given!" />
      </div>
    )
  }  
}

export default App