import { useState } from 'react'

const Button = ({text, onClick}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Display = ({text, counter}) => (
  <tr>
    <td>{text}</td>
    <td>{counter}</td>
  </tr>
)

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if (total === 0){
    return (
      <div>
        <h1>
          statistics
        </h1>
        <div>
          no feedback given
        </div>
      </div>
    )
  }
  return (
    <div>
      <h1>
        statistics
      </h1>
      <table>
        <Display text="good" counter={good}/>
        <Display text="neutral" counter={neutral}/>
        <Display text="bad" counter={bad}/>
        <Display text="all" counter={total}/>
        <Display text="average" counter={average}/>
        <tr>
          <td>positive </td>
          <td>{positive} % </td>
        </tr>
      </table>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
 
  const onGoodPress = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
    setAverage((updatedGood - bad) / (updatedGood + neutral + bad))
    setPositive(100 * updatedGood / (updatedGood + neutral + bad))
  }

  const onNeutralPress = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
    setAverage((good - bad) / (good + updatedNeutral + bad))
    setPositive(100 * good / (good + updatedNeutral + bad))
  }

  const onBadPress = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
    setAverage((good - updatedBad) / (good + neutral + updatedBad))
    setPositive(100 * good / (good + neutral + updatedBad))
  }

  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button text="good" onClick={onGoodPress}/>
      <Button text="neutral" onClick={onNeutralPress}/>
      <Button text="bad" onClick={onBadPress}/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div>
  )
}

export default App