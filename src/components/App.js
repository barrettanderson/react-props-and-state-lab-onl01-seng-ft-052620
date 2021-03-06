import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeType = event => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }


  findPetsClick = () => {
    if (this.state.filters.type === "all") {
      fetch("/api/pets")
      .then(resp => resp.json())
      .then(petsList => {
        console.log(" I am here ", petsList)
        this.setState({
          pets: petsList
        })
      })
    } else {
      fetch("/api/pets" + `?type=${this.state.filters.type}`)
      .then(resp => resp.json())
      .then(petsList => {
        console.log(" I am also here ", petsList)
        this.setState({
          pets: petsList
        })
      })
    }
  }

  adoptPet = id => {
    let newPetsList = this.state.pets.map(pet => {
      return pet.id === id ? {...pet, isAdopted: true } : pet;
    })
    this.setState({ pets: newPetsList })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.findPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
