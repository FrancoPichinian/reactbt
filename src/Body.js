import React, { Component } from 'react'
import Welcome from "./Welcome"
import CrearEstudiante from "./CrearEstudiante"
import Estudiantes from "./Estudiantes"
import InscribirEstudiantes from "./InscribirEstudiantes"
import Container from 'react-bootstrap/Container'

export default class Body extends Component {

  constructor(props) {
    super(props); 
  }

  render() {
    return (
      <Container fluid className="body">
        {this.props.itemClicked === 0 && <Welcome />}
        {this.props.itemClicked === 1 && <CrearEstudiante />}
        {this.props.itemClicked === 2 && <Estudiantes inputValue={this.props.inputValue} />}
        {this.props.itemClicked === 3 && <InscribirEstudiantes />}
      </Container>
    );
  }
}
