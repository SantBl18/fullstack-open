const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.number}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part name={props.part1_name} number={props.part1_number}/>
      <Part name={props.part2_name} number={props.part2_number}/>
      <Part name={props.part3_name} number={props.part3_number}/>
    </>
  )
}

const Total = (props) => {
  return(
    <>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content part1_name={part1} part1_number={exercises1} part2_name={part2} part2_number={exercises2} part3_name={part3} part3_number={exercises3}/>
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </div>
  )
}

export default App