import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

export default class CrearEstudiante extends Component {
    
  constructor(props) {
      super(props);

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleClose = this.handleClose.bind(this);

      this.state = {
          form: {
            nombre: "", 
            apellido: "", 
            curso: "", 
          },
          resultado: "",
          errors: {},
          show: false,
          cursos: [],
      }
  }

  handleClose() {
    this.setState({
      show: false,
    })
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
        {this.state.show && (
          <Alert variant="success" onClose={this.handleClose} dismissible>
           <Alert.Heading>{this.state.resultado}</Alert.Heading>
          </Alert> 
        )}
        <Form>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
             type="text" name="nombre" onChange={this.handleChange} value={this.state.form.nombre} 
             isInvalid={this.state.errors.nombre}
             />
             <Form.Control.Feedback type="invalid">
              {this.state.errors.nombre}
             </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text" name="apellido" onChange={this.handleChange} value={this.state.form.apellido}
              isInvalid={this.state.errors.apellido}
              />
              <Form.Control.Feedback type="invalid">
              {this.state.errors.apellido}
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Curso</Form.Label>
            <Form.Select name="curso" onChange={this.handleChange} isInvalid={this.state.errors.cursos}>
              <option value = ''>Seleccione un curso</option>
              {this.state.cursos.map((c) => (
                <option>{c.nombre}</option>
              ))}
            </Form.Select> 
            <Form.Control.Feedback type="invalid">
              {this.state.errors.cursos}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" onClick={this.handleSubmit}>Enviar</Button>
        </Form>
      </div>
    )
  }
}
