import { useState, useEffect } from 'react'
import phoneService from './services/phones'

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

const DeleteButton = ({onDelete}) => (
  <button onClick={onDelete}>
    delete
  </button>
)

const Person = ({person, onDelete}) => (
  <div>
    {person.name} {person.number}
    <DeleteButton onDelete={() => onDelete(person.id)}/> 
  </div>
)

const Persons = ({persons, onDelete}) => (
  <div>
    {persons.map(person =>
      <Person key={person.id} person={person} onDelete={onDelete}/>
    )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        phoneService
        .update(existingPerson.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
        })
      }
      return
    }

    phoneService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    phoneService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
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
      <Persons persons={shownPersons} onDelete={deletePerson}/>
    </div>
  )
}

export default App