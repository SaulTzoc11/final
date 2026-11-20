function Boton({ texto, color = '#007bff', cuandoHaceClick}){
    const estiloBoton = {
        backgroundColor: color,
        color: 'white',
        pedding: '10 px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '5px'
    };

    return (
        <button style={estiloBoton} onClick={cuandoHaceClick}>
            {texto}
             </button>
    );
}
export default Boton;