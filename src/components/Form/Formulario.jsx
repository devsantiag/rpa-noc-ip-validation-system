import React, { useState } from "react";
import '../css/homePage.css'

export default function Formulario() {

    const [ipRegistroMaquina, setipRegistroMaquina] = useState([])
    const [ipValue, setIpValue] = useState()

    const [armazemHora, setArmazemHora] = useState([])
    
    // escopo destinado em formatar o IP, permitindo seu envio ou não
    const formatIp = (value) => {
        const cleanCharacter = value.replace(/\D/g, '');
        const addFormatValue = cleanCharacter.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3.$4');
        return addFormatValue;
    }
    
    // responsável para registrar o IP
    function hundleSubmit(e) {
        e.preventDefault()
        if (ipValue === '') {
            alert('Campo vazio, tente novamente.')  
            return;
        }
        // verifica se o IP é válido            
        const novoRegistro = ipValue
        if (novoRegistro.length < 12) {
            alert('Não foi possível identificar este IP, por favor, tente novamente.') 
            return;
        }
        // registra o IP no estado
        setipRegistroMaquina([...ipRegistroMaquina, novoRegistro]) 
        setIpValue('')
        gravarHoraRegistro();
    }
    // responsável por formatar o IP
    const hundleInputChange = (eventFormat) => {
        const toApplyFormated = formatIp(eventFormat.target.value);
        setIpValue(toApplyFormated)
    }

    // responsável por gravar a hora de registro do último IP inserido
    function gravarHoraRegistro() {
        const corretaDataParaRegistro = new Date()
        setArmazemHora([...armazemHora, corretaDataParaRegistro])
    }

    return (
        <div>
            <main>
                <form onSubmit={hundleSubmit} >
                    <input
                        type="text"
                        value={ipValue}
                        onChange={hundleInputChange}
                        placeholder = "Digite o IP"
                        maxLength={12}
                    />
                    <button>Registrar</button>
                </form>
            </main>
            <section>
                <h5>Últimos registros</h5>
                <li className='styleList'>
                    {ipRegistroMaquina.map((item, index) => (
                        <li key={index} > {index + 1} {item} último registro {armazemHora[index].toLocaleString()} </li> 
                    ))}
                </li>
            </section>
        </div>
    )
}  