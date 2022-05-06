import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class InscribirEstudiantes extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      form: {
        estudiante: {
          nombre: "",
          apellido: "",
        },
        curso: "",
      },
      resultado: "",
      estudiantes: [],
      cursos: [],
    }
  }

  handleChange(e) {
    let nombre = e.target.name;
    let valor = e.target.value;

    this.setState((state) => ({
        form: {
          ...state.form, 
          [nombre]:valor,
        }
    }))
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:1234/estudiantes", {
          method: "POST", 
          body: JSON.stringify({
            nombre: this.state.form.nombre,
            apellido: this.state.form.apellido,
            cursos: [this.state.form.curso],
          })
      })
      .then((resp) => resp.json())
      .then((json) => {
          if(json.result === "error") {
              this.setState ({
                resultado: json.message,
                errors: json.errors,
                show: false,
              })
              return;
          }
          this.setState ({
            resultado: "El estudiante fue creado con éxito",
            errors: {},
            show: true,
          })
      })
  }

  componentDidMount() {
    fetch("http://localhost:1234/estudiantes")
    .then((resp) => resp.json())
    .then((json) => {
      this.setState({
        estudiantes: json.estudiantes,
      })
    });

    fetch("http://localhost:1234/cursos")
    .then((resp) => resp.json())
    .then((json) => {
      this.setState({
        cursos: json.cursos,
      })
    });
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Estudiante</Form.Label>
            <Form.Select name="estudiante" onChange={this.handleChange}>
              <option value = ''>Seleccione un estudiante</option>
              {this.state.estudiantes.map((e) => (
                <option>{e.nombre} {e.apellido}</option>
              ))}
            </Form.Select> 
          </Form.Group>

          <Form.Group>
            <Form.Label>Curso</Form.Label>
            <Form.Select name="curso" onChange={this.handleChange}>
              <option value = ''>Seleccione un curso</option>
              {this.state.cursos.map((c) => (
                <option>{c.nombre}</option>
              ))}
            </Form.Select> 
          </Form.Group>

          <Button type="submit" onClick={this.handleSubmit}>Inscribir</Button>
        </Form>
      </div>
    )
  }
}
