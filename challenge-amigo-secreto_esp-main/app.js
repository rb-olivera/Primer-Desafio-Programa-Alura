//El usuario deberá agregar nombres mediante un campo de texto y un botón "Adicionar". Los nombres ingresados se mostrarán en una lista visible en la página, y al finalizar, un botón "Sortear Amigo" seleccionará uno de los nombres de forma aleatoria, mostrando el resultado en pantalla.

//*Fucionalidades: Agregar nombres: Los usuarios escribirán el nombre de un amigo en un campo de texto y lo agregarán a una lista visible al hacer clic en "Adicionar". Validar entrada: Si el campo de texto está vacío, el programa mostrará una alerta pidiendo un nombre válido. Visualizar la lista: Los nombres ingresados aparecerán en una lista debajo del campo de entrada. Sorteo aleatorio: Al hacer clic en el botón "Sortear Amigo", se seleccionará aleatoriamente un nombre de la lista y se mostrará en la página.

const amigos = [];
const amigosList = document.getElementById('listaAmigos');
const amigoInput = document.getElementById('amigo');
const resultado = document.getElementById('resultado');

function agregarAmigo() {
    const amigo = amigoInput.value.trim();
    
    if (!amigo) { 
        alert('Por favor, ingresa un nombre de amigo.');
        return; // Detiene la ejecución si el campo está vacío
    }

    amigos.push(amigo);
    const amigoItem = document.createElement('li');
    amigoItem.textContent = amigo;
    amigosList.appendChild(amigoItem);
    amigoInput.value = '';
}

function sortearAmigo() {
    if (amigos.length > 0) {
        const amigoSorteado = amigos[Math.floor(Math.random() * amigos.length)];
        resultado.textContent = `El amigo secreto es: ${amigoSorteado}`;
    } else {
        alert('No hay amigos en la lista para sortear.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const buttonAdd = document.querySelector('.button-add');
    const buttonDraw = document.querySelector('.button-draw');

    if (buttonAdd) {
        buttonAdd.addEventListener('click', agregarAmigo);
    }

    if (buttonDraw) {
        buttonDraw.addEventListener('click', sortearAmigo);
    }
});
