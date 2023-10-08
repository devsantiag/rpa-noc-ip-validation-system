import React, { useState } from "react";
import UltimosRegistros from "./UltimosRegistros";

export default function Formulario() {

    const [ipValue, setIpValue] = useState()
    const [ultimosRegistros, setUltimosRegistros] = useState([])

    // formata o IP no campo INPUT colocando pontos: 000.000.000.000
    const formatIp = (value) => {
        const cleanCharacter = value.replace(/\D/g, '');
        const addFormatValue = cleanCharacter.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3.$4');
        return addFormatValue;
    }

    function hundleSubmit(e) {
        e.preventDefault()

        // realiza o valor dentro do input
        if (ipValue === '') {
            alert('Campo vazio, tente novamente.')
            return;
        }

        const novoRegistro = ipValue

        if (novoRegistro.length < 5) {
            alert('Não foi possível identificar este IP, por favor, tente novamente.')
            return;
        }

        setUltimosRegistros([...ultimosRegistros, novoRegistro])
        setIpValue('')
    }

    const hundleInputChange = (eventFormat) => {
        const toApplyFormated = formatIp(eventFormat.target.value);
        setIpValue(toApplyFormated)
    }

    return (
        <div>
            <form onSubmit={hundleSubmit} >
                <input
                    type="text"
                    value={ipValue}
                    onChange={hundleInputChange}
                    placeholder="IP máquina RPA"
                    maxLength={11}
                />
                <button>Registrar</button>
            </form>
            <main>
                <p>Últimos registros</p>
                <UltimosRegistros item={ultimosRegistros} />
            </main>
        </div>
    )
}