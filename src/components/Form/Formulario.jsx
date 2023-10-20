import React, { useState } from "react";

export default function Formulario() {

    const [ipRegistroMaquina, setIpRegistroMaquina] = useState([]);
    const [ipValue, setIpValue] = useState();
    const [armazemHora, setArmazemHora] = useState([]);

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
        e.preventDefault();
        if (ipValue === '') {
            alert('Campo vazio, tente novamente.');
            return;
        }
        // verifica se o IP é válido            
        const novoRegistro = ipValue;
        if (novoRegistro.length < 12) {
            alert('Não foi possível identificar este IP, por favor, tente novamente.');
            return;
        }
        // registra o IP no estado
        setIpRegistroMaquina([...ipRegistroMaquina, novoRegistro]);
        setIpValue('');
        gravarHoraRegistro();

        if (!ipJaRegistrado(novoRegistro)) {
            return true;
        } else {
            alert('Esse IP já foi inserido ou validado por um analista.');
            ipValue('');
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

    return (
        <div>
            <main>
                <form onSubmit={hundleSubmit}>
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
                    <h5>Últimos registros</h5>
                    <li className='styleList'>
                        {ipRegistroMaquina.map((item, index) => (
                            <li key={index} className="lineIndex"> ({index + 1}) - {item} último registro {armazemHora[index].toLocaleString()} </li>
                        ))}
                    </li>
                </section>
            </main>
        </div>
    );
}
