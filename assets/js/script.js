const tareaInput = document.querySelector("#nuevaTarea")
const btnAgregar = document.querySelector("#agregarTarea")
const totalTareasSpan = document.querySelector("#cuenta-tareas");
const tareasRealizadasSpan = document.querySelector("#cuenta-realizadas");
const tbody = document.querySelector("tbody");

const tareas = [
  { id: 1, descripcion: "Hacer mercado", realizada: false  },
  { id: 2, descripcion: "Estudiar para la prueba", realizada: false },
  { id: 3, descripcion: "Sacar a pasear al perro", realizada: false },
];
let ultimoId = 3; 

function renderTareas() {
  tbody.innerHTML = ""; 
  let realizadasCount = 0;

  // Recorremos el array de tareas.
  for (const tarea of tareas) {
    // Si la tarea está realizada, la contamos.
    if (tarea.realizada) {
      realizadasCount++;
    }

    // Creamos una fila (tr) por cada tarea.
    tbody.innerHTML += `
      <tr>
        <td>${tarea.id}</td>
        <td class="${tarea.realizada ? 'tarea-realizada' : ''}">${tarea.descripcion}</td>
        <td>
          <button onclick="marcarComoRealizada(${tarea.id})">
            <i class="fa-solid fa-check-circle"></i>
          </button>
        </td>
        <td>
          <button onclick="borrar(${tarea.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>`;
  }

  // Requisito 3: Actualizamos el contador de tareas totales.
  totalTareasSpan.textContent = `Total: ${tareas.length}`;
  // Requisito 5: Actualizamos el contador de tareas realizadas.
  tareasRealizadasSpan.textContent = `Realizadas: ${realizadasCount}`;
}


// Requisito 2: Función para borrar una tarea.
function borrar(id){
  
  const index = tareas.findIndex((ele) => ele.id == id);
  
  tareas.splice(index, 1);
  
  renderTareas();
}


function marcarComoRealizada(id) {
  const tarea = tareas.find((ele) => ele.id == id);
  // Invertimos el valor booleano: si es 'true' lo vuelve 'false' y viceversa.
  tarea.realizada = !tarea.realizada;
  renderTareas();
}


// Agregar una nueva tarea.
btnAgregar.addEventListener("click", () => {
  const nuevaTareaDescripcion = tareaInput.value;
  if (nuevaTareaDescripcion.trim() === "") {
    alert("Debes escribir una tarea.");
    return; // Salimos de la función si el input está vacío.
  }
  ultimoId++; // Incrementamos el ID para la nueva tarea.
  tareas.push({id: ultimoId, descripcion: nuevaTareaDescripcion, realizada: false});
  tareaInput.value = ""; // Limpiamos el input.
  renderTareas(); // Actualizamos la vista.
});


renderTareas();