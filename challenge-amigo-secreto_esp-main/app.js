/**
 * Amigo Secreto — Versión mejorada
 * Rebeca Olivera · Programa ONE — Alura
 *
 * Mejoras respecto a la versión original:
 *  - Eliminar participantes individualmente
 *  - Validación de nombres duplicados (ignora mayúsculas/minúsculas)
 *  - Soporte tecla Enter para agregar
 *  - Mínimo 2 participantes para sortear
 *  - Animación de "sorteando..." antes de revelar
 *  - Botón Reiniciar para limpiar todo
 *  - Contador y barra de estado en tiempo real
 */

/* ── Estado ──────────────────────────────────────────────────── */
const amigos = [];

/* ── Referencias DOM ─────────────────────────────────────────── */
const amigoInput    = document.getElementById('amigo');
const listaAmigos   = document.getElementById('listaAmigos');
const resultBox     = document.getElementById('resultBox');
const resultadoText = document.getElementById('resultadoTexto');
const contadorEl    = document.getElementById('contador');
const statusMsg     = document.getElementById('statusMsg');
const statusCount   = document.getElementById('statusCount');
const emptyHint     = document.getElementById('emptyHint');

/* ── Utilidades ──────────────────────────────────────────────── */
function setStatus(msg) {
    if (statusMsg) statusMsg.textContent = msg;
}

function actualizarContador() {
    const n = amigos.length;
    if (contadorEl)  contadorEl.textContent  = n;
    if (statusCount) statusCount.textContent = `${n} participante${n !== 1 ? 's' : ''}`;
    if (emptyHint)   emptyHint.style.display = n === 0 ? 'block' : 'none';
}

function flashInput(color = '#CC0000') {
    const original = amigoInput.style.borderTopColor;
    amigoInput.style.outline = `2px solid ${color}`;
    setTimeout(() => { amigoInput.style.outline = ''; }, 1500);
}

/* ── Agregar amigo ───────────────────────────────────────────── */
function agregarAmigo() {
    const nombre = amigoInput.value.trim();

    if (!nombre) {
        setStatus('⚠ Por favor, escribe un nombre antes de agregar.');
        flashInput('#CC0000');
        amigoInput.focus();
        return;
    }

    // Validar duplicado (sin distinguir mayúsculas)
    const duplicado = amigos.find(
        a => a.toLowerCase() === nombre.toLowerCase()
    );
    if (duplicado) {
        setStatus(`⚠ "${duplicado}" ya está en la lista.`);
        flashInput('#E08000');
        amigoInput.select();
        return;
    }

    amigos.push(nombre);
    renderizarParticipante(nombre);

    amigoInput.value = '';
    amigoInput.focus();
    actualizarContador();
    setStatus(`✔ "${nombre}" agregado correctamente.`);

    // Ocultar resultado anterior al agregar nuevo participante
    ocultarResultado();
}

/* ── Renderizar un participante en la lista ──────────────────── */
function renderizarParticipante(nombre) {
    const li = document.createElement('li');

    const nameSpan = document.createElement('span');
    nameSpan.className = 'name-text';
    nameSpan.textContent = nombre;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.className = 'xp-delete-btn';
    deleteBtn.title = `Eliminar a ${nombre}`;
    deleteBtn.addEventListener('click', () => eliminarAmigo(nombre, li));

    li.appendChild(nameSpan);
    li.appendChild(deleteBtn);
    listaAmigos.appendChild(li);
}

/* ── Eliminar un participante ────────────────────────────────── */
function eliminarAmigo(nombre, li) {
    const index = amigos.indexOf(nombre);
    if (index > -1) amigos.splice(index, 1);

    // Animación de salida rápida
    li.style.transition = 'opacity .15s, max-height .2s';
    li.style.opacity    = '0';
    li.style.maxHeight  = '0';
    li.style.overflow   = 'hidden';
    setTimeout(() => li.remove(), 200);

    actualizarContador();
    setStatus(`"${nombre}" eliminado de la lista.`);
    ocultarResultado();
}

/* ── Sortear amigo ───────────────────────────────────────────── */
function sortearAmigo() {
    if (amigos.length === 0) {
        setStatus('⚠ No hay participantes. Agrega nombres primero.');
        return;
    }
    if (amigos.length < 2) {
        setStatus('⚠ Necesitas al menos 2 participantes para sortear.');
        return;
    }

    // Mostrar animación de "sorteando"
    resultBox.style.display = 'block';
    resultadoText.innerHTML = '<em>🎲 Sorteando...</em>';
    setStatus('Sorteando...');

    setTimeout(() => {
        const sorteado = amigos[Math.floor(Math.random() * amigos.length)];

        // Re-disparar animación CSS
        resultBox.style.animation = 'none';
        void resultBox.offsetWidth; // reflow
        resultBox.style.animation = '';

        resultadoText.innerHTML =
            `¡El amigo secreto es: <strong>${sorteado}</strong>!`;

        setStatus(`✔ Sorteo completado. Amigo secreto: ${sorteado}`);
    }, 700);
}

/* ── Reiniciar ───────────────────────────────────────────────── */
function reiniciar() {
    if (amigos.length === 0 && resultBox.style.display === 'none') {
        setStatus('La lista ya está vacía.');
        return;
    }

    amigos.length = 0;
    listaAmigos.innerHTML = '';
    amigoInput.value = '';
    amigoInput.focus();
    ocultarResultado();
    actualizarContador();
    setStatus('Lista reiniciada. Listo para comenzar de nuevo.');
}

/* ── Ocultar resultado ───────────────────────────────────────── */
function ocultarResultado() {
    resultBox.style.display = 'none';
    resultadoText.innerHTML = '';
}

/* ── Inicialización ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const btnAgregar = document.getElementById('btnAgregar');
    const btnSortear = document.getElementById('btnSortear');
    const btnReset   = document.getElementById('btnReset');
    const btnClose   = document.getElementById('btnClose');

    if (btnAgregar) btnAgregar.addEventListener('click', agregarAmigo);
    if (btnSortear) btnSortear.addEventListener('click', sortearAmigo);
    if (btnReset)   btnReset.addEventListener('click', reiniciar);

    // Soporte tecla Enter en el input
    amigoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            agregarAmigo();
        }
    });

    // Botón cerrar (decorativo — informa al usuario)
    if (btnClose) {
        btnClose.addEventListener('click', () =>
            setStatus('Cierra la pestaña del navegador para salir.')
        );
    }

    actualizarContador();
});
