//================ EJEMPLO COMPLETO  ================

// Variables de información
let jugadores = [];
let usuario;

// Variables para elementos de autenticación y usuario

let formularioIdentificacion;
let contenedorIdentificacion;
let contenedorUsuario;
let textoUsuario;
let botonLimpiarStorage;

// Variables para formulario de jugadores
let modalAddProduct;
let botonAgregarJugador;
let formulario;
let inputId;
let inputNombre;
let inputEdad;
let inputEstatura;
let inputNacionalidad;
let inputEquipo;
let inputPosicion;
let inputDorsal;
let inputCantidad;
let contenedorJugadores;
let botonesCerrarModalAgregarJugador;
let modal;

class Jugador {
  constructor(id, nombre, edad, estatura, nacionalidad, equipo, posicion, dorsal, cantidad) {
    this.id = id;
    this.nombre = nombre.toUpperCase();
    this.edad = edad;
    this.estatura = estatura;
    this.nacionalidad = nacionalidad;
    this.equipo = equipo;
    this.posicion = posicion;
    this.dorsal = dorsal;
    this.cantidad = cantidad;
  }
}

function inicializarElementos() {
  formularioIdentificacion = document.getElementById(
    "formularioIdentificacion"
  );
  inputUsuario = document.getElementById("inputUsuario");
  contenedorIdentificacion = document.getElementById(
    "contenedorIdentificacion"
  );
  contenedorUsuario = document.getElementById("contenedorUsuario");
  textoUsuario = document.getElementById("textoUsuario");

  botonLimpiarStorage = document.getElementById("limpiarStorage");
  formulario = document.getElementById("formularioAgregarJugador");
  inputId = document.getElementById("inputId");
  inputNombre = document.getElementById("inputNombreJugador");
  inputEdad = document.getElementById("inputEdad");
  inputEstatura = document.getElementById("inputEstatura");
  inputNacionalidad = document.getElementById("inputNacionalidad");
  inputEquipo = document.getElementById("inputEquipo");
  inputPosicion = document.getElementById("inputPosicion");
  inputDorsal = document.getElementById("inputDorsal");
  inputCantidad = document.getElementById("inputCantidad");
  contenedorJugadores = document.getElementById("contenedorJugadores");

  botonesCerrarModalAgregarJugador = document.getElementsByClassName(
    "btnCerrarModalAgregarJugador"
  );
  modalAddProduct = document.getElementById("modalAddProduct");
  botonAgregarJugador = document.getElementById("btnAgregarJugador");
  modal = new bootstrap.Modal(modalAddProduct);
}

function inicializarEventos() {
  formulario.onsubmit = (event) => validarFormulario(event);
  formularioIdentificacion.onsubmit = (event) => identificarUsuario(event);
  botonLimpiarStorage.onclick = eliminarStorage;
  botonAgregarJugador.onclick = abrirModalAgregarJugador;

  for (const boton of botonesCerrarModalAgregarJugador) {
    boton.onclick = cerrarModalAgregarJugador;
  }
}

function abrirModalAgregarJugador() {
  if (usuario) {
    modal.show();
  } else {
    Swal.fire({
      title: "Por favor identifíquese antes de agregar un jugador",
    })
  }
}

function cerrarModalAgregarJugador() {
  formulario.reset();
  modal.hide();
}

function eliminarStorage() {
  localStorage.clear();
  usuario = "";
  jugadores = [];
  mostrarFormularioIdentificacion();
  pintarJugadores();
}

function identificarUsuario(event) {
  event.preventDefault();
  usuario = inputUsuario.value;
  formularioIdentificacion.reset();
  actualizarUsuarioStorage();
  mostrarTextoUsuario();
}

function mostrarTextoUsuario() {
  contenedorIdentificacion.hidden = true;
  contenedorUsuario.hidden = false;
  textoUsuario.innerHTML += ` ${usuario}`;
}

function mostrarFormularioIdentificacion() {
  contenedorIdentificacion.hidden = false;
  contenedorUsuario.hidden = true;
  textoUsuario.innerHTML = ``;
}

function validarFormulario(event) {
  event.preventDefault();
  let idJugador = inputId.value;
  let nombre = inputNombre.value;
  let edad = parseFloat(inputEdad.value);
  let estatura = parseFloat(inputEstatura.value);
  let nacionalidad = inputNacionalidad.value;
  let equipo = inputEquipo.value;
  let posicion = inputPosicion.value;
  let dorsal = parseInt(inputDorsal.value);
  let cantidad = parseInt(inputCantidad.value);

  const idExiste = jugadores.some((jugador) => jugador.id === idJugador);
  if (!idExiste) {
    let jugador = new Jugador(
      idJugador,
      nombre,
      edad,
      estatura,
      nacionalidad,
      equipo,
      posicion,
      dorsal,
      cantidad
    );

    jugadores.push(jugador);
    formulario.reset();
    actualizarJugadoresStorage();
    pintarJugadores();
    mostrarMensajeConfirmacion(
      `El jugador ${nombre} fue agregado exitosamente`,
      "info"
    );
  } else {
    Swal.fire({
      title: "Este ID ya fue registrado",
    })
  }
}

function confirmarEliminacion(idJugador) {
  Swal.fire({
    icon: "question",
    title: "¿Estás seguro que quieres eliminar a este jugador?",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarJugador(idJugador);
    }
  });
}

function eliminarJugador(idJugador) {
  let columnaBorrar = document.getElementById(`columna-${idJugador}`);
  let indiceBorrar = jugadores.findIndex(
    (jugador) => Number(jugador.id) === Number(idJugador)
  );

  let nombreJugadorEliminado = jugadores[indiceBorrar].nombre;
  jugadores.splice(indiceBorrar, 1);
  columnaBorrar.remove();
  actualizarJugadoresStorage();
  mostrarMensajeConfirmacion(
    `El jugador ${nombreJugadorEliminado} fue eliminado exitosamente`,
    "danger"
  );
}

function pintarJugadores() {
  contenedorJugadores.innerHTML = "";
  jugadores.forEach((jugador) => {
    let column = document.createElement("div");
    column.className = "col-md-4 mt-3";
    column.id = `columna-${jugador.id}`;
    column.innerHTML = `
            <div class="card">
                <div class="card-body">
                <p class="card-text">ID:
                    <b>${jugador.id}</b>
                </p>
                <p class="card-text">Nombre:
                    <b>${jugador.nombre}</b>
                </p>
                <p class="card-text">Edad:
                    <b>${jugador.edad}</b>
                </p>
                <p class="card-text">Estatura:
                    <b>${jugador.estatura}</b>
                </p>
                <p class="card-text">Nacionalidad:
                    <b>${jugador.nacionalidad}</b>
                </p>
                <p class="card-text">Equipo:
                    <b>${jugador.equipo}</b>
                </p>
                <p class="card-text">Posicion:
                    <b>${jugador.posicion}</b>
                </p>
                <p class="card-text">Dorsal:
                    <b>${jugador.dorsal}</b>
                </p>
                <p class="card-text">Cantidad de goles:
                    <b>${jugador.cantidad}</b>
                </p>
                </div>
                <div class="card-footer">
                  <button class="btn btn-danger" id="botonEliminar-${jugador.id}" >Eliminar</button>
                </div>
            </div>`;

    contenedorJugadores.append(column);

    let botonEliminar = document.getElementById(`botonEliminar-${jugador.id}`);
    botonEliminar.onclick = () => confirmarEliminacion(jugador.id);
  });
}

function actualizarJugadoresStorage() {
  let jugadoresJSON = JSON.stringify(jugadores);
  localStorage.setItem("jugadores", jugadoresJSON);
}

function actualizarUsuarioStorage() {
  localStorage.setItem("usuario", usuario);
}

function obtenerJugadoresStorage() {
  let jugadoresJSON = localStorage.getItem("jugadores");
  if (jugadoresJSON) {
    jugadores = JSON.parse(jugadoresJSON);
    pintarJugadores();
  }
}

function obtenerUsuarioStorage() {
  let usuarioAlmacenado = localStorage.getItem("usuario");
  if (usuarioAlmacenado) {
    usuario = usuarioAlmacenado;
    mostrarTextoUsuario();
  }
}

function mostrarMensajeConfirmacion(mensaje, clase) {
  Toastify({
    text: mensaje,
    duration: 30000,
    close: true,
    gravity: "top",
    position: "right",
    className: clase,
  }).showToast();
}

//Ejemplo fetch de JSON local
function consultarJugadoresServer() {
  fetch("./datos.json")
    .then((response) => response.json())
    .then((data) => {
      jugadores = [...data]
      pintarJugadores();
    })
    .catch((error) => console.log(error));
};


function main() {
  inicializarElementos();
  inicializarEventos();
  consultarJugadoresServer();
  obtenerUsuarioStorage();
}

main();