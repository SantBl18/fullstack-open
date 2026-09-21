const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  )
}

const Part = (props) => {
    return (
      <div>{props.name} {props.number}</div>
  )
}

const Content = ({parts}) => {
    console.log(parts)
    return (
        <ul>
            {parts.map(part =>
                <li key={part.id}>
                    <Part name={part.name} number = {part.exercises}/>
                </li>
            )}
        </ul>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    
    return(
        <div>Number of exercises {total}</div>
    )
}

const Course = ({ course }) => (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
)

export default Course