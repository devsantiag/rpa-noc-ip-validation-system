import React, { useState } from "react";
import '../css/formulario.css';

export default function Formulario() {

    const [ipValue, setIpValue] = useState();
    const [ipMachineRegistration, setipMachineRegistration] = useState([]);
    const [recordTime, setRecordTime] = useState([]);
    const [excluded, setExcluded] = useState(0);
    const [repeated, setRepeted] = useState(0);

    // formata o IP
    const format = (ip) => {
        const cleanCharacter = ip.replace(/\D/g, '');
        const ipPattern = cleanCharacter.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3.$4');
        return ipPattern;
    };

    // coleta as informações de entrada do IP no input para formatação
    const hundleInputChange = (eventFormat) => {
        const toApplyFormated = format(eventFormat.target.value);
        setIpValue(toApplyFormated);
    };

    // verifica se o IP já foi inserido
    const alreadyRegistered = (check) => {
        return ipMachineRegistration.some((ip) => ip === check);
    }

    // responsável para registrar o IP
    function hundleSubmit(e) {

        // evita o comportamento padrão
        e.preventDefault();
        if (ipValue === '') {
            alert('Campo vazio, tente novamente.');
            return;
        }

        // verifica que o tamanho do IP não é menor que 12
        const getIpValue = ipValue;
        if (getIpValue.length < 12) {
            alert('Não foi possível identificar este IP, por favor, tente novamente.');
            return;
        } else {
            // registra o IP no estado
            setipMachineRegistration([...ipMachineRegistration, getIpValue]);
            setIpValue('');
            recordTimeRecord();
        }

        // verifica se o IP já foi inserido
        if (!alreadyRegistered(getIpValue)) {
            return true;
        } else {
            alert('Este IP já foi incerido no sistema.');
            setRepeted(repeated + 1);
            return false;
        }
    }

    // responsável por gravar a hora de registro do último IP inserido
    function recordTimeRecord() {
        const corretaDataParaRegistro = new Date();
        setRecordTime([...recordTime, corretaDataParaRegistro]);
    }

    // responsável por excluir o IP
    function excluirIP(index) {
        setipMachineRegistration(ipMachineRegistration.filter((item, i) => i !== index));
        setRecordTime(recordTime.filter((item, i) => i !== index));
        setExcluded(excluded + 1);
    }

    return (
        <div>
            <main>
                <h3>Registros de RPA</h3>
                <form onSubmit={hundleSubmit}>
                    <div className="contadorRegistros">
                        <p>Registros: {ipMachineRegistration.length}</p>
                        <p>Repetidos: {repeated} </p>
                        <p>Excluidos: {excluded} </p>
                    </div>
                    <input
                        id="inputIp"
                        type="text"
                        value={ipValue}
                        onChange={hundleInputChange}
                        placeholder="Digite o IP"
                        maxLength={12} />
                    <button>Registrar</button>
                </form>
                <section>
                    <li className='styleList'>
                        <h5>Últimos registros</h5>
                        {ipMachineRegistration.map((item, index) => (

                            <li key={index} className="lineIndex"> ({index + 1}) - {item} último registro {recordTime[index].toLocaleString()} <button onClick={() => excluirIP(index)} className>Excluir</button></li>

                        ))}
                    </li>
                </section>
            </main>
        </div>
    );
}