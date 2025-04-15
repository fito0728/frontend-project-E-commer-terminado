document.addEventListener("DOMContentLoaded", function () {
    const tallas = document.querySelectorAll(".talla");
    const colores = document.querySelectorAll(".colores img");
    const cantidadInput = document.getElementById("cantidad");

    // Seleccionar talla
    tallas.forEach(talla => {
        talla.addEventListener("click", function () {
            tallas.forEach(t => t.classList.remove("selected"));
            this.classList.add("selected");
        });
    });

    // Seleccionar color
    colores.forEach(color => {
        color.addEventListener("click", function () {
            colores.forEach(c => c.classList.remove("color-seleccionado"));
            this.classList.add("color-seleccionado");
        });
    });

    // Manejar cantidad
    document.getElementById("sumar").addEventListener("click", function () {
        cantidadInput.value = parseInt(cantidadInput.value) + 1;
    });

    document.getElementById("restar").addEventListener("click", function () {
        if (cantidadInput.value > 1) {
            cantidadInput.value = parseInt(cantidadInput.value) - 1;
        }
    });

    // Agregar al carrito
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const producto = this.closest(".producto");
            const nombre = producto.querySelector(".nombre-producto").innerText;
            const precio = producto.querySelector(".precio-producto").innerText;
            const imagen = producto.querySelector("img").src;
            const tallaSeleccionada = document.querySelector(".talla.selected");
            const colorSeleccionado = document.querySelector(".colores img.color-seleccionado");

            if (!tallaSeleccionada || !colorSeleccionado) {
                alert("Por favor selecciona una talla y un color.");
                return;
            }

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            carrito.push({
                nombre,
                precio,
                imagen,
                talla: tallaSeleccionada.dataset.talla,
                color: colorSeleccionado.alt,
                cantidad: parseInt(cantidadInput.value)
            });

            localStorage.setItem("carrito", JSON.stringify(carrito));

            window.location.href = "carrito.html";
        });
    });
});

// Mostrar productos en el carrito
function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const listaCarrito = document.getElementById("carrito-lista");
    const totalElemento = document.getElementById("total");

    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        let item = document.createElement("div");
        item.classList.add("carrito-item");
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-carrito" onclick="ampliarImagen('${producto.imagen}')">
            <div class="producto-info">
                <p><strong>${producto.nombre}</strong></p>
                <p>Precio: ${producto.precio}</p>
                <p>Talla: ${producto.talla}</p>
                <p>Color: ${producto.color}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </div>
        `;
        listaCarrito.appendChild(item);
        total += parseFloat(producto.precio.replace("$", "").replace(".", "")) * producto.cantidad;
    });

    totalElemento.textContent = `$${total.toLocaleString()}`;
}

if (window.location.pathname.includes("carrito.html")) {
    mostrarCarrito();
}
