import { useState } from 'react'

const Search = ({ query, onChange }) => {
  return (
    <div>
      filter shown with: <input 
        value={query} onChange={onChange}
        />
    </div>
  )
}

const Add = ({ name, onNameChange, number, onNumberChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input
          value={name}
          onChange={onNameChange} 
          />
      </div>
      <div>
        number: <input
          value={number}
          onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({person}) => (
  <div>
    {person.name} {person.number}
  </div>
)

const Persons = ({persons}) => (
  <div>
    {persons.map(person =>
      <Person key={person.id} person={person}/>
    )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }
    
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const shownPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Search query={search} onChange={handleSearchChange}/>
      <h2>Add a new</h2>
      <Add
       name={newName} onNameChange={handleNameChange} 
       number={newNumber} onNumberChange={handleNumberChange} onSubmit={addName}
      />
      <h2>Numbers</h2>
      <Persons persons={shownPersons}/>
    </div>
  )
}

export default App