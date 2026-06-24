const productos = [
  {
    id: 1,
    nombre: 'Smartphone Chanchi-Gulapsy S33',
    precio: 549990,
    descripcion: 'Smartphone de última generación con pantalla AMOLED 6.1", cámara triple de 200MP, procesador Snapdragon 15 Gen 6 y 4TB de almacenamiento. Ideal para fotografía y rendimiento diario.',
    imagen: './assets/img/S-Gula-01.jpg',
    categoria: 'Smartphones'
  },
  {
    id: 2,
    nombre: 'Laptop SuperUltraBook 15"',
    precio: 899990,
    descripcion: 'Laptop ultradelgada con procesador Intel Core i10, 256GB RAM, SSD 6TB y pantalla Full HD 15.6". Perfecta para trabajo, estudio y mas.',
    imagen: './assets/img/Laptop-15.png',
    categoria: 'Computadores'
  },
  {
    id: 3,
    nombre: 'Auriculares Bluetooth MaxPro',
    precio: 89990,
    descripcion: 'Auriculares inalámbricos con cancelación de ruido activa, graves profundos y 150 horas de batería. Cómodos para uso diario.',
    imagen: './assets/img/Blue-T01.png',
    categoria: 'Audio'
  },
  {
    id: 4,
    nombre: 'Smartwatch Premium-X3000',
    precio: 149990,
    descripcion: 'Reloj inteligente con monitor de frecuencia cardíaca, GPS preciso(menos de 3 cm de tolerancia), resistencia al agua 5ATM, a mas de 300 metros de profundidad y más de 300 modos deportivos.',
    imagen: './assets/img/Smart-W01.png',
    categoria: 'Wearables'
  },
  {
    id: 5,
    nombre: 'Parlante Portátil Sound-ultra++',
    precio: 49990,
    descripcion: 'Parlante Bluetooth portátil con sonido envolvente 360°, resistencia al agua IPX7 y 60 horas de reproducción ininterrumpida.',
    imagen: './assets/img/Partlante-01.png',
    categoria: 'Audio'
  },
  {
    id: 6,
    nombre: 'Tablet MediaPad-Plus 10.5"',
    precio: 249990,
    descripcion: 'Tablet con pantalla IPS 10.5", 128GB RAM, 3TB de almacenamiento y batería de larga duración. Ideal para entretenimiento y productividad.',
    imagen: './assets/img/Tablet-01.png',
    categoria: 'Tablets'
  },
  {
    id: 7,
    nombre: 'Teclado Mecánico RGB',
    precio: 69990,
    descripcion: 'Teclado mecánico gaming con switches Cherry MX, retroiluminación RGB personalizable y construcción en adamantium.',
    imagen: './assets/img/Teclado-R01.png',
    categoria: 'Periféricos'
  },
  {
    id: 8,
    nombre: 'Mouse Inalámbrico Ergo',
    precio: 29990,
    descripcion: 'Mouse ergonómico inalámbrico con sensor óptico de 4000 DPI, 6 botones programables y larga duración de batería.',
    imagen: './assets/img/Mouse-i01.png',
    categoria: 'Periféricos'
  },
  {
    id: 9,
    nombre: 'Hub USB-C 7 en 1',
    precio: 24990,
    descripcion: 'Hub multipuerto USB-C con HDMI 4K, 3x USB 3.0, lector SD, PD 300W, audio (control remoto se vende por separado, opcional). Compatible con Mac y Windows.',
    imagen: './assets/img/7x1-00.png',
    categoria: 'Accesorios'
  },
  {
    id: 10,
    nombre: 'SSD Externo 20TB',
    precio: 79990,
    descripcion: 'Disco SSD portátil de 20TB con velocidad de lectura hasta 3050MB/s, resistente a golpes y agua. Respalda tus datos con seguridad.',
    imagen: './assets/img/SSD-01.png',
    categoria: 'Almacenamiento'
  }
];

const carrito = [];

function formatearPrecio(precio) {
  return '$' + precio.toLocaleString('es-CL');
}

function showSection(section) {
  document.querySelectorAll('main > section').forEach(s => s.style.display = 'none');
  document.getElementById('section-' + section).style.display = 'block';

  const navCollapse = document.getElementById('navbarNav');
  const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
  if (bsCollapse) bsCollapse.hide();

  if (section === 'cart') renderCart();
}

function renderHome() {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = productos.map(p => `
    <div class="col-12 col-sm-6 col-lg-4 mb-4">
      <div class="card h-100 shadow-sm border-0">
        <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}" loading="lazy">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text text-secondary small flex-grow-1">${p.descripcion.substring(0, 90)}...</p>
          <p class="card-text fs-5 fw-bold text-primary mb-3">${formatearPrecio(p.precio)}</p>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-primary flex-fill" onclick="showDetail(${p.id})">Ver más</button>
            <button class="btn btn-primary flex-fill" onclick="addToCart(${p.id})">Agregar</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function showDetail(id) {
  const p = productos.find(prod => prod.id === id);
  if (!p) return;
  const container = document.getElementById('detail-content');
  container.innerHTML = `
    <div class="col-lg-6 mb-4">
      <img src="${p.imagen}" class="img-fluid rounded shadow-sm" alt="${p.nombre}">
    </div>
    <div class="col-lg-6">
      <h2 class="mb-3">${p.nombre}</h2>
      <p class="fs-2 fw-bold text-primary mb-3">${formatearPrecio(p.precio)}</p>
      <p class="mb-4">${p.descripcion}</p>
      <p class="text-secondary mb-4"><small>Categoría: ${p.categoria}</small></p>
      <div class="d-flex gap-2 flex-wrap">
        <button class="btn btn-primary btn-lg" onclick="addToCart(${p.id})">Agregar al carrito</button>
        <button class="btn btn-outline-secondary btn-lg" onclick="showSection('home')">Volver</button>
      </div>
    </div>
  `;
  showSection('detail');
}

function renderCart() {
  const container = document.getElementById('cart-content');
  if (carrito.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <p class="fs-4 text-secondary mb-3">El carrito está vacío</p>
        <a href="#" class="btn btn-primary" onclick="showSection('home')">Ir a comprar</a>
      </div>
    `;
    return;
  }

  let total = 0;
  const filas = carrito.map(item => {
    const p = productos.find(prod => prod.id === item.productoId);
    const subtotal = p.precio * item.cantidad;
    total += subtotal;
    return `
      <tr>
        <td><img src="${p.imagen}" alt="${p.nombre}" width="50" height="50" class="rounded" style="object-fit:cover;"></td>
        <td>${p.nombre}</td>
        <td>${formatearPrecio(p.precio)}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${p.id}, -1)">-</button>
            <span class="fw-bold">${item.cantidad}</span>
            <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${p.id}, 1)">+</button>
          </div>
        </td>
        <td class="fw-bold">${formatearPrecio(subtotal)}</td>
        <td><button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${p.id})">Eliminar</button></td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-dark">
          <tr><th></th><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
    </div>
    <div class="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
      <h3 class="fw-bold mb-0">Total: ${formatearPrecio(total)}</h3>
      <button class="btn btn-outline-danger" onclick="clearCart()">Vaciar carrito</button>
    </div>
  `;
}

function addToCart(id) {
  const existing = carrito.find(item => item.productoId === id);
  if (existing) {
    existing.cantidad++;
  } else {
    carrito.push({ productoId: id, cantidad: 1 });
  }
  updateCartCounter();
}

function changeQuantity(id, delta) {
  const item = carrito.find(i => i.productoId === id);
  if (item) {
    item.cantidad += delta;
    if (item.cantidad <= 0) {
      removeFromCart(id);
      return;
    }
    updateCartCounter();
    renderCart();
  }
}

function removeFromCart(id) {
  const index = carrito.findIndex(item => item.productoId === id);
  if (index !== -1) carrito.splice(index, 1);
  updateCartCounter();
  renderCart();
}

function clearCart() {
  carrito.length = 0;
  updateCartCounter();
  renderCart();
}

function updateCartCounter() {
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById('cart-counter').textContent = total;
}

document.addEventListener('DOMContentLoaded', () => {
  renderHome();
  updateCartCounter();
});

function irArriba() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.addEventListener('scroll', function () {
    const btn = document.getElementById('btnArriba');
    if (window.scrollY > 300) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
});

