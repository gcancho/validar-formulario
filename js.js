//Expresiones regulares
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
    correo: /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/,
    telefono: /\+?(\d|-|\s){7,30}/,
    mensaje: /.{1,200}/
}

const campos = {
    nombre: false,
    correo: false,
    telefono: false,
    mensaje: false
}

//Llamando a elementos html
const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefono');
const mensaje = document.getElementById('mensaje');
const formulario = document.getElementById('formulario');
const cajas = document.querySelectorAll('.formulario .form-control');
const btnEnviarCorreo = document.getElementById('enviar-correo');

//Iconos
const iconoCheck = document.querySelectorAll('.formulario .container-campo .fa-check-square');
const iconoEquiz = document.querySelectorAll('.formulario .container-campo .fa-times-circle');

//Recorriendo los inputs y el textarea incluido tambien
function recorrerCajas() {
    cajas.forEach(caja => {
        caja.addEventListener('keyup', validarCampos)
        caja.addEventListener('blur', validarCampos)
    });
}

recorrerCajas();

function validarCampos(e) {
    //Captura el evento y en que input se esta realizando ese evento
    switch (e.target.name) {
        case 'nombre':
            testearValorCampo(e, expresiones.nombre, 0, e.target.name)
            break;
        case 'correo':
            testearValorCampo(e, expresiones.correo, 1, e.target.name)
            break;
        case 'telefono':
            testearValorCampo(e, expresiones.telefono, 2, e.target.name)
            break;
        case 'mensaje':
            testearValorCampo(e, expresiones.mensaje, 3, e.target.name)
            break;
    }
}

//Recibe como parametro el evento, la expresion regular, un numero y el nombre del campo
function testearValorCampo(e, expresion, indice, campo) {
    if (expresion.test(e.target.value)) {
        iconoCheck[indice].classList.add('active');
        iconoEquiz[indice].classList.remove('active');
        campos[campo] = true;
    } else {
        iconoEquiz[indice].classList.add('active');
        iconoCheck[indice].classList.remove('active');
        //Si el input no cumple con la expresion regular entonces se la cambia el valor a false
        campos[campo] = false;
    }
}


formulario.addEventListener('submit', (e) => {
    //Evita el comportamiento al enviar datos del formulario por default
    e.preventDefault();
    //Verifica si son verdaderos todos los campos
    if (campos.nombre && campos.correo && campos.telefono && campos.mensaje) {
        document.querySelector('.alert-success').classList.add('active');
        document.querySelector('.alert-danger').classList.remove('active');
        iconoCheck.forEach(icono => {
            icono.classList.remove('active');
        });
    } else {
        document.querySelector('.alert-danger').classList.add('active');
        document.querySelector('.alert-success').classList.remove('active');
    }
})