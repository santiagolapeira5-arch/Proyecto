var listaTareas = [];
var filtroActual = "todas";

function agregarTarea() {
  var nombre = document.getElementById("nombreTarea").value;
  var fecha = document.getElementById("fechaTarea").value;

  if (nombre.trim() === "") {
    alert("Escribe el nombre de la tarea.");
    return;
  }

  var nuevaTarea = {
    nombre: nombre,
    fecha: fecha,
    completada: false
  };

  listaTareas.push(nuevaTarea);
  document.getElementById("nombreTarea").value = "";
  document.getElementById("fechaTarea").value = "";

  dibujarTareas();
}

function mostrarTareas(filtro) {
  filtroActual = filtro;

  var botones = document.getElementsByClassName("opcion");
  for (var i = 0; i < botones.length; i++) {
    botones[i].classList.remove("seleccionada");
  }
  event.target.classList.add("seleccionada");

  var titulo = document.getElementById("tituloLista");
  if (filtro === "todas") titulo.textContent = "Todas mis tareas";
  if (filtro === "hoy") titulo.textContent = "Tareas para hoy";
  if (filtro === "pendientes") titulo.textContent = "Tareas pendientes";
  if (filtro === "completadas") titulo.textContent = "Tareas completadas";

  dibujarTareas();
}

function dibujarTareas() {
  var contenedor = document.getElementById("tareas");
  var mensaje = document.getElementById("mensajeVacio");
  contenedor.innerHTML = "";
  var cantidad = 0;
  var hoy = new Date().toISOString().slice(0, 10);

  for (var i = 0; i < listaTareas.length; i++) {
    var tarea = listaTareas[i];

    if (filtroActual === "hoy" && tarea.fecha !== hoy) continue;
    if (filtroActual === "pendientes" && tarea.completada) continue;
    if (filtroActual === "completadas" && !tarea.completada) continue;

    cantidad++;

    var fila = document.createElement("div");
    fila.className = "tarea";

    var casilla = document.createElement("input");
    casilla.type = "checkbox";
    casilla.checked = tarea.completada;
    casilla.onclick = (function(indice) {
      return function() {
        listaTareas[indice].completada = !listaTareas[indice].completada;
        dibujarTareas();
      };
    })(i);

    var info = document.createElement("div");
    info.className = "info-tarea";

    var texto = document.createElement("p");
    texto.textContent = tarea.nombre;
    if (tarea.completada) texto.className = "hecha";
    info.appendChild(texto);

    if (tarea.fecha !== "") {
      var fechaTexto = document.createElement("small");
      fechaTexto.textContent = "Fecha: " + tarea.fecha;
      info.appendChild(fechaTexto);
    }

    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "eliminar";
    botonEliminar.onclick = (function(indice) {
      return function() {
        listaTareas.splice(indice, 1);
        dibujarTareas();
      };
    })(i);

    fila.appendChild(casilla);
    fila.appendChild(info);
    fila.appendChild(botonEliminar);
    contenedor.appendChild(fila);
  }

  if (cantidad === 0) {
    mensaje.style.display = "block";
  } else {
    mensaje.style.display = "none";
  }
}