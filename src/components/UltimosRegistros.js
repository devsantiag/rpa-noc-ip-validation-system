import React, { useEffect, useState } from 'react'

// responsável por armazenar os últimos registros de IPs;

export default function UltimosRegistros({ item }) {

    const [registro, setRegistro] = useState([])

    useEffect(() => {
        const horaRegistro = new Date()
        const newItem = { item: item[item.length - 1], horaRegistro }
        setRegistro([...registro, newItem])
    }, [item])


    return (
        <div>
            <ul>
                {registro.map((registroItem, index) => (
                    <p key={index}> 
                        <p>
                        {registroItem.item} - último registro: {registroItem.horaRegistro.toLocaleString()}
                        </p>
                    </p>
                ))}
            </ul>
        </div>
    )
}
