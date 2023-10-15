import React, { useState } from "react";

export default function Formulario() {

    const [ipRegistroMaquina, setipRegistroMaquina] = useState([])
    const [ipValue, setIpValue] = useState()
    
    // escopo destinado em formatar o IP, permitindo seu envio ou não
    const formatIp = (value) => {
        const cleanCharacter = value.replace(/\D/g, '');
        const addFormatValue = cleanCharacter.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3.$4');
        return addFormatValue;
    }

    // responsável por enviar uma negação ao usuário quando o IP não segue as normas de registro ou o campo de registro encontra-se vazio
    function hundleSubmit(e) {
        e.preventDefault()
        if (ipValue === '') {
            alert('Campo vazio, tente novamente.')
            return;
        }

        const novoRegistro = ipValue
        if (novoRegistro.length < 12) {
            alert('Não foi possível identificar este IP, por favor, tente novamente.')
            return;
        }

        setipRegistroMaquina([...ipRegistroMaquina, novoRegistro])
        setIpValue('')
    }

    const hundleInputChange = (eventFormat) => {
        const toApplyFormated = formatIp(eventFormat.target.value);
        setIpValue(toApplyFormated)
    }

    return (
        <div>
            <main>
                <hr />
                <form onSubmit={hundleSubmit} >
                    <button>Registrar</button>
                    <input
                        type="text"
                        value={ipValue}
                        onChange={hundleInputChange}
                        placeholder="IP máquina RPA"
                        maxLength={11}
                    />
                </form>
            </main>
            <section>
                <h5>Últimos registros</h5>
                <li>
                {ipRegistroMaquina.map((item, index) => (
                        <li key={index} >{item}</li>
                    ))}
                </li>
            </section>
        </div>
    )
}

