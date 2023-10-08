import React, { useState } from 'react'

// responsável por armazenar os últimos registros de IPs;

export default function UltimosRegistros({ item }) {

    const [registros, setRegistros] = useState([])
    

    const ultimaAplicacaoRegistro = new Date()
    const gaveta = []

    const novoIpRegistro = () => {
        setRegistros([...gaveta, setRegistros])
    }

    return (
        <>
            <ul>
                {item.map((item, index) => (
                    <p key={index}>
                        <p>{item} - Último registro: {new Date().toLocaleString()} </p>
                    </p>
                ))}
            </ul>
        </>
    )
}