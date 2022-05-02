import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'

export default class Estudiantes extends Component {
  constructor(props){
    super(props);
    this.listarEstudiantes = this.listarEstudiantes.bind(this);
    this.limpiar = this.limpiar.bind(this);
    this.state = {
      estudiantes: [],
    };
  }

  listarEstudiantes (inputValue) {
    fetch("http://localhost:1234/estudiantes?apellido=" + inputValue)
    .then((resp) => resp.json())
    .then((json) => {
        this.setState({
          estudiantes: json.estudiantes,
          resultado: json.result, 
        });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue)
      this.listarEstudiantes(this.props.inputValue);
  }

  componentDidMount() {
    this.listarEstudiantes(this.props.inputValue);
  }

  limpiar () {
    this.setState({
      estudiantes: [],
    });
  }

  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Curso</th>
            </tr>
          </thead>
          <tbody>
            {this.state.estudiantes.map((e, index) => (
              e.cursos.map((c, index) => (
                <tr>
                  <td>{e.nombre}</td>
                  <td>{e.apellido}</td>
                  <td>{c.nombre}</td>
                </tr>
              ))
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}
