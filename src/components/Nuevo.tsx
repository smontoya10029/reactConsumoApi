import { ChangeEvent, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { AddP } from "../interfaces/AddP"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"

const ObjetoP = {
    identificacion: "",
    nombres: "",
    apellidos: "",
    edad: "",
    genero: ""
}

export function Nuevo(){

    const [Persona, setPersona] = useState<AddP>(ObjetoP);
    const navigate = useNavigate();

    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>)=>{
        const inputIdentificacion = event?.target.name;
        const inputValue = event?.target.value;

        setPersona({...Persona, [inputIdentificacion] : inputValue})

    }

    const Guardar = async() => {

        const response = await fetch(`${appsettings.url}Persona/Guardar`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(Persona)
        })

        if(response.ok){
            navigate("/")
        }else{
            Swal.fire({
                title:"Error Envio de datos",
                text:"Por favor validar los datos que se envian para la creacion",
                icon:"Warning"
            });
        }

    }

    const volver = () => {
        navigate("/")
    }

    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8, offset:2}}>
                    <h4>Crear Nueva Persona</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                            <Label>Identificacion</Label>
                            <input type="number" name="identificacion" onChange={inputChangeValue} value={Persona.identificacion}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <input type="text" name="nombres" onChange={inputChangeValue} value={Persona.nombres}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Apellido</Label>
                            <input type="text" name="apellidos" onChange={inputChangeValue} value={Persona.apellidos}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Edad</Label>
                            <input type="number" name="edad" onChange={inputChangeValue} value={Persona.edad}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Género</Label>

                            <Input
                                type="select"
                                name="genero"
                                onChange={inputChangeValue}
                                value={Persona.genero}
                            >
                                <option value="">-- Seleccione --</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </Input>
                        </FormGroup>
                    </Form>
                    <Button color="success" className="me-4" onClick={Guardar}>Guardar</Button>
                    <Button color="warning" className="me-4" onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>
    )

}