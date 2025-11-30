import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from "axios";
import Swal from "sweetalert2";

function App() {

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0);
    const [id, setId] = useState(0);
    const [editar, setEdit] = useState(false);
    const [prodList, setLista] = useState([]);

    const registrar = () => {
        Axios.post("http://localhost:3001/create", {
            nombre,
            precio,
            stock
        }).then(() => {
            Swal.fire("Registrado!", "", "success");
            limpiaCampo();
            getProduct();
        });
    };

    const actualizar = () => {
        Axios.put("http://localhost:3001/update", {
            id,
            nombre,
            precio,
            stock
        }).then(() => {
            Swal.fire({
                title: "Actualizado!",
                icon: "success"
            });
            limpiaCampo();
            getProduct();
        });
    };

    const borrar = (id) => {
        Swal.fire({
            title: "¿Está seguro de borrar el registro " + id + "?",
            text: "¡Si borra, no se puede recuperar!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, borrar!"
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
                    getProduct();
                    limpiaCampo();
                    Swal.fire("Borrado!", "El registro fue eliminado", "success");
                });
            }
        });
    };

    const limpiaCampo = () => {
        setNombre("");
        setPrecio(0);
        setStock(0);
        setEdit(false);
    };

    const editarPro = (val) => {
        setEdit(true);
        setNombre(val.despro);
        setPrecio(val.precio);
        setStock(val.stock);
        setId(val.codpro);
    };

    const getProduct = () => {
        Axios.get("http://localhost:3001/list").then((response) => {
            setLista(response.data);
        }).catch(error => console.error(error.message));
    };

    useEffect(() => {
        getProduct();
    }, []);

    return (
            <div className='container'>
              <div className='card'>
                <div className='card-header'>
                  <h2>Registro de Productos</h2>
                </div>
        
                <div className="card-body">
                  <div className="input-group mb-3">
                    <span>Descripción</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ingrese nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
        
                  <div className="input-group mb-3">
                    <span>Precio</span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Ingrese precio"
                      value={precio}
                      onChange={(e) => setPrecio(Number(e.target.value))}
                    />
                  </div>
        
                  <div className="input-group mb-3">
                    <span>Stock</span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Ingrese stock"
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                    />
                  </div>
        
                  <div className="card-footer">
                    {editar ? (
                            <div>
                              <button className="btn btn-info" onClick={actualizar}>
                                Actualizar
                              </button>
                              <button className="btn btn-primary" onClick={limpiaCampo}>
                                Cancelar
                              </button>
                            </div>
                        ) : (
                            <button className="btn btn-primary" onClick={registrar}>
                              Registrar
                            </button>
                        )}
                  </div>
                </div>
              </div>
        
              <table className="table table-striped mt-3">
                <thead>
                  <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Stock</th>
                  </tr>
                </thead>
        
                <tbody>
                  {prodList.map((val, key) => {
                                return <tr key={val.codpro}>
                                  <th>{val.codpro}</th>
                                  <td>{val.despro}</td>
                                  <td>{val.precio}</td>
                                  <td>{val.stock}</td>
                                  <td>
                                    <div className="btn-group">
                                      <button
                                        className="btn btn-info me-2"
                                        onClick={() => editarPro(val)}
                                      >
                                        Editar
                                      </button>
                    
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => borrar(val.codpro)}
                                      >
                                        Borrar
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                            })}
                </tbody>
              </table>
        
            </div>
            );
}

export default App;