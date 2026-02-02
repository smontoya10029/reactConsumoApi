import { useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { AddP } from "../interfaces/AddP"
import { Container, Row, Col, Table, Button } from "reactstrap"

export function Lista(){

    const [Persona, setPersona] = useState<AddP[]>([]);

    const getPersonas = async () => {
    
        const response = await fetch(`${appsettings.url}Persona/List`);

        if (response.ok) {
            const data = await response.json();
            setPersona(data);
        } else {
            Swal.fire({
                title:"Nota",
                text:"No se encuentran personas registradas",
                icon:"warning"
            });
        }
    };

    useEffect(() => {
        getPersonas()
    },[])

    const EliminarPersona = (id:number) => {
        Swal.fire({
            title: "Esta Seguro que desea eliminar la persona?",
            text: "Se eliminara la persona de nuestra base de datos!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si Eliminar!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                const response = await fetch(`${appsettings.url}Persona/Eliminar/${id}`, {
                    method:"DELETE"
                });

                if(response.ok) await getPersonas()

            }
        });
    }

    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8, offset:2}}>
                    <h4>Listado de personas</h4>
                    <hr/>
                    <Link className="btn btn-success mb-3" to="/Guardar">Crear Persona</Link>

                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Identificacion</th>
                                <th>Nombre</th>
                                <th>Edad</th>
                                <th>Genero</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Persona.map((item) => (
                                    <tr key={item.identificacion}>
                                        <td>{item.identificacion}</td>
                                        <td>{item.nombres} {item.apellidos}</td>
                                        <td>{item.edad}</td>
                                        <td>{item.genero}</td>
                                        <td>
                                            <Link className="btn btn-warning me-2" to={`/Editar/${item.identificacion}`}>Editar</Link>
                                            <Button color="danger" onClick={() => {EliminarPersona(item.identificacion)}}>
                                                Eliminar
                                            </Button>
                                        
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>

                </Col>
            </Row>
        </Container>
    )

}