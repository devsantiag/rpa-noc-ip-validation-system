import React, { useState } from "react";
import '../css/formulario.css';

export default function Formulario() {

    const [ipValue, setIpValue] = useState();
    const [ipRegistroMaquina, setIpRegistroMaquina] = useState([]);
    const [armazemHora, setArmazemHora] = useState([]);
    const [itensExcluidos, setItensExcluidos] = useState(0);
    const [itensRepetidos, setItensRepetidos] = useState(0);

    // escopo destinado a formatar o IP 
    const formatIp = (ip) => {
        const cleanCharacter = ip.replace(/\D/g, '');
        const ipPattern = cleanCharacter.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3.$4');
        return ipPattern;
    };

    // verifica se o IP já foi inserido
    const ipJaRegistrado = (toCheckIp) => {
        return ipRegistroMaquina.some((ipRegistro) => ipRegistro === toCheckIp);
    }

    // responsável para registrar o IP
    function hundleSubmit(e) {

        // evita o comportamento padrão
        e.preventDefault();
        if (ipValue === '') {
            alert('Campo vazio, tente novamente.');
            return;
        }

        // verifica se o IP é válido sendo ele não menor que 12           
        const novoRegistro = ipValue;
        if (novoRegistro.length < 12) {
            alert('Não foi possível identificar este IP, por favor, tente novamente.');
            return;
        }

        // registra o IP no estado
        setIpRegistroMaquina([...ipRegistroMaquina, novoRegistro]);
        setIpValue('');
        gravarHoraRegistro();

        // verifica se o IP já foi inserido
        if (!ipJaRegistrado(novoRegistro)) {
            return true;
        } else {
            alert('Este IP já foi incerido no sistema.');
            setItensRepetidos(itensRepetidos + 1);
            return false;
        }
    }

    // responsável por formatar o IP
    const hundleInputChange = (eventFormat) => {
        const toApplyFormated = formatIp(eventFormat.target.value);
        setIpValue(toApplyFormated);
    };

    // responsável por gravar a hora de registro do último IP inserido
    function gravarHoraRegistro() {
        const corretaDataParaRegistro = new Date();
        setArmazemHora([...armazemHora, corretaDataParaRegistro]);
    }

    // responsável por excluir o IP
    function excluirIP(index) {
        setIpRegistroMaquina(ipRegistroMaquina.filter((item, i) => i !== index));
        setArmazemHora(armazemHora.filter((item, i) => i !== index));
        setItensExcluidos(itensExcluidos + 1);
    }

    return (
        <div>
            <main>
                <h3>Registros de RPA</h3>
                <form onSubmit={hundleSubmit}>
                    <div className="contadorRegistros">
                        <p>Registros: {ipRegistroMaquina.length}</p>
                        <p>Repetidos: {itensRepetidos} </p>
                        <p>Excluidos: {itensExcluidos} </p>
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
                        {ipRegistroMaquina.map((item, index) => (
                            <li key={index} className="lineIndex"> ({index + 1}) - {item} último registro {armazemHora[index].toLocaleString()} <button onClick={() => excluirIP(index)}>Excluir</button></li>
                        ))}
                    </li>
                </section>
            </main>
        </div>
    );
}