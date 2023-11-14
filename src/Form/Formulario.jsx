import React, { useState } from "react";
import '../components/css/Formulario/Formulario.css'

export default function Formulario() {

    const [ipValue, setIpValue] = useState();
    const [ipMachineRegistration, setipMachineRegistration] = useState([]);
    const [recordTime, setRecordTime] = useState([]);
    const [excluded, setExcluded] = useState(0);
    const [repeated, setRepeted] = useState(0);

    // coleta informacoes do input
    const getIpValue = ipValue;

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
        if (getIpValue.length < 12) {
            alert('Não foi possível identificar este registro IP, por favor, tente novamente ou certifique-se que este esteja correto.');
            return;
        } else {
            // registra o IP no estado
            setipMachineRegistration([...ipMachineRegistration, getIpValue]);
            setIpValue('');
            recordTimeRecord();
        }

        // verifica se o IP já foi inserido
        if (alreadyRegistered(getIpValue)) {
            alert('Este IP já foi incerido no sistema. Favor certificar com analista Nível 2.');
            setRepeted(repeated + 1);
        }
        setDateTimeRegister()
    }

    // responsável por gravar a hora de registro do último IP inserido
    function recordTimeRecord() {
        const getLocalDate = new Date();
        setRecordTime([...recordTime, getLocalDate]);
    }

    // responsável por excluir o IP
    function excluirIP(index) {
        setipMachineRegistration(ipMachineRegistration.filter((item, i) => i !== index));
        setRecordTime(recordTime.filter((item, i) => i !== index));
        setExcluded(excluded + 1);
    }

    const [manualDate, setManualDate] = useState()
    const [manualTime, setManualTime] = useState()

    function setDateTimeRegister() {
        if (manualDate && manualTime) {
            setRecordTime([...recordTime, +manualDate + ' ' + manualTime])
        }
    }


    return (
        <div>
            <main>
                <form onSubmit={hundleSubmit}>

                    <div className="contadorRegistros">
                        <p>Registros: {ipMachineRegistration.length}</p>
                        <p>Repetidos: {repeated} </p>
                        <p>Excluidos: {excluded} </p>
                        <p>Total de registros: {ipMachineRegistration.length + excluded} </p>
                    </div>

                    <input
                        className="inputIp"
                        id="inputIp"
                        type="text"
                        value={ipValue}
                        onChange={hundleInputChange}
                        placeholder="Digite o IP"
                        maxLength={12}
                    />

                    <button>Registrar</button>

                    <input
                        type="date"
                        name="manualDate"
                        value={manualDate}
                        onChange={(e) => setManualDate(e.target.value)}
                    />
                    <input
                        type="time"
                        name="manualTime"
                        value={manualTime}
                        onChange={(e) => setManualTime(e.target.value)}
                    />
                </form>
                <section>
                    <li className='styleList'>

                        <h5>Últimos registros</h5>

                        {ipMachineRegistration.map((item, index) => (

                            <li key={index} className='lineIndex' >

                                ({index + 1}) - {item} último registro {recordTime[index].toLocaleString()}

                                <button onClick={() => excluirIP(index)} className='buttonExcluded'>Excluir</button>

                            </li>
                        ))}
                    </li>
                </section>
            </main>
        </div>
    );
}