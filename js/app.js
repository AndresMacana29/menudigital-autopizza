// ============================================================
// LÓGICA DE LA APLICACIÓN — no requiere cambios por cliente.
// Depende de que CONFIG (config.js) esté cargado antes que este archivo.
// ============================================================

// ── ESTADO ──────────────────────────────────────────────────
const cart = {};
let activeCategory = 'pizzas-clasicas';
let pizzaSeleccionada = null;
let tamanoSeleccionado = null;

// ── FORMATO DE PRECIO ────────────────────────────────────────
const fmt = n => '$' + n.toLocaleString('es-CO');

// ── INIT ─────────────────────────────────────────────────────
function init() {
  document.getElementById('restoName').textContent   = CONFIG.nombre;
  document.getElementById('restoTagline').textContent = CONFIG.tagline;
  document.getElementById('modalSubtitle').textContent = CONFIG.nombre;
  renderCategories();
  renderMenu('pizzas-clasicas');
  renderCartPanel();
  actualizarEstadoNegocio();
  initPizzaSizeSelector();
  initSplashScreen();
}

// ── INIT BIENVENIDA ───────────────────────────────────────────────
function initSplashScreen(){
  const splashScreen = document.getElementById('splashScreen');
  setTimeout(() =>{
    splashScreen.classList.add('oculto')
  }, 1500);
}

// ── HORARIO DE ATENCIÓN ─────────────────────────────────────────────────────
function actualizarEstadoNegocio() {
  const dias = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
  const ahora = new Date();
  const horarioHoy = CONFIG.horarioSemana[dias[ahora.getDay()]];

  const contenedor = document.getElementById('statusDot');
  const texto = document.getElementById('statusText');
  if (!contenedor || !texto) return;

  if (!horarioHoy) {
    texto.textContent = 'Cerrado';
    contenedor.classList.add('cerrado');
    return;
  }

  const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();
  const [horaAbre, minAbre] = horarioHoy.abre.split(':').map(Number);
  const [horaCierra, minCierra] = horarioHoy.cierra.split(':').map(Number);
  const estaAbierto = minutosAhora >= (horaAbre * 60 + minAbre) && minutosAhora < (horaCierra * 60 + minCierra);

  texto.textContent = estaAbierto ? 'Abierto' : 'Cerrado';
  contenedor.classList.toggle('cerrado', !estaAbierto);
}

// ── CATEGORÍAS ───────────────────────────────────────────────
function renderCategories() {
  const nav = document.getElementById('catNav');
  const tabsYaCreados = new Set();
  CONFIG.categorias.forEach(cat => {
    // tabId agrupa varias categorías bajo una sola pestaña.
    // Si una categoría no define tabId, usa su propio id (comportamiento normal, sin cambios).
    const tabId = cat.tabId || cat.id;
    if (tabsYaCreados.has(tabId)) return; // ya existe una pestaña para este grupo, no crear otra
    tabsYaCreados.add(tabId);

    const tabNombre = cat.tabNombre || cat.nombre;
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (tabId === activeCategory ? ' active' : '');
    btn.textContent = tabNombre;
    btn.onclick = () => { activeCategory = tabId; setActiveTab(btn); renderMenu(tabId); };
    nav.appendChild(btn);
  });
}

function setActiveTab(btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function scrollCats(direction) {
  const nav = document.getElementById('catNav');
  nav.scrollBy({ left: direction * 150, behavior: 'smooth' });
}

// ── MENÚ ─────────────────────────────────────────────────────
function renderMenu(catId) {
  const pizzaSelector = document.getElementById("pizzaSelector");
  const container = document.getElementById('menuSections');
  if (catId === "pizzas-clasicas" || catId === "pizzas-casa"){
      pizzaSelector.style.display = "block";
      container.style.display = "none";
      const pizzas = CONFIG.productos.filter(p => p.cat === catId);
      const pizzaList = document.getElementById("pizzaList");
      pizzaList.innerHTML = '';
      pizzas.forEach(p =>{const item = document.createElement('div');
        item.className = 'pizza-list-item';
        item.innerHTML = `<div class="pizza-list-name">${p.nombre}</div><div class="pizza-list-desc">${p.desc}</div>`;
        item.dataset.id = p.id;
        item.onclick = () => {
          const pizzaClickeada = CONFIG.productos.find(p => p.id == item.dataset.id);
          mostrarPizzaDestacada(pizzaClickeada);
          document.querySelectorAll('.pizza-list-item').forEach(el => el.classList.remove('active'));
          item.classList.add('active');
         };
        if(p.id === pizzas[0].id){item.classList.add('active');}
        pizzaList.appendChild(item);
      });
      mostrarPizzaDestacada(pizzas[0]);
  }
  else{
      pizzaSelector.style.display = "none";
      container.style.display = "block";
  }
  container.innerHTML = '';
  const cats = catId === 'todo'
    ? CONFIG.categorias.filter(c => c.id !== 'todo')
    : CONFIG.categorias.filter(c => (c.tabId || c.id) === catId);
  cats.forEach(cat => {
    const prods = CONFIG.productos.filter(p => p.cat === cat.id);
    if (!prods.length) return;
    const section = document.createElement('div');
    section.className = 'menu-section';
    section.innerHTML = `<div class="section-title">${cat.nombre}</div>`
      + (cat.nota ? `<div class="section-note">${cat.nota}</div>` : '');
    prods.forEach(p => section.appendChild(productCard(p)));
    container.appendChild(section);
  });
}

//----MOSTRAR PIZZA------//
function mostrarPizzaDestacada(p){
  const opciones = document.querySelectorAll('.pizza-size-option');
  opciones.forEach(o => o.classList.remove('selected'));
  pizzaSeleccionada = p;
  tamanoSeleccionado = null;
  const boton = document.getElementById('pizzaAddBtn');
      boton.disabled = true;
      boton.classList.remove('active');
      boton.textContent = "Elige un tamaño";
      const contenidoImagen = p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}">` : p.emoji;
      document.getElementById('pizzaImgPersonal').innerHTML = contenidoImagen;
      document.getElementById('pizzaImgMediana').innerHTML = contenidoImagen;
      document.getElementById('pizzaImgGrande').innerHTML = contenidoImagen;
      document.getElementById("pizzaFeaturedName").textContent = p.nombre;
  document.getElementById("pizzaPricePersonal").textContent = fmt(p.tamanos[0].precio);
  document.getElementById("pizzaPriceMediana").textContent = fmt(p.tamanos[1].precio);
  document.getElementById("pizzaPriceGrande").textContent = fmt(p.tamanos[2].precio);
}

//-----SELECTOR DE TAMAÑO PIZZA -------------
function initPizzaSizeSelector(){
  const opciones = document.querySelectorAll('.pizza-size-option');
  const botonAgregar = document.getElementById('pizzaAddBtn');
  botonAgregar.onclick = agregarPizzaAlCarrito;
  opciones.forEach(opcion =>{
    opcion.onclick = () =>{
      tamanoSeleccionado = opcion.dataset.size;
      opciones.forEach(o => o.classList.remove('selected'));
      opcion.classList.add('selected');
      const boton = document.getElementById('pizzaAddBtn');
      boton.disabled = false;
      boton.classList.add('active');
      boton.textContent = "Agregar al pedido";
    };
  });
}

//------TARJETA VISUAL PRODUCTO--------------
function mostrarProductoAmpliado(id){
const producto = CONFIG.productos.find(p => p.id == id);
document.getElementById("productModalName").textContent = producto.nombre;
document.getElementById("productModalDesc").textContent = producto.desc;
document.getElementById("productModalImg").innerHTML = producto.imagen
  ? `<img src="${producto.imagen}" alt="${producto.nombre}">`
  : producto.emoji;
document.getElementById("productModalPrice").textContent = fmt(producto.precio);
document.getElementById('productOverlay').classList.add('open');
}

function cerrarProductoAmpliado(){
  document.getElementById('productOverlay').classList.remove('open');
}

function obtenerInfoCarrito(llave){
  if (llave.includes('-')) {
    const [idPizza, tamano] = llave.split('-');
    const pizza = CONFIG.productos.find(p => p.id == idPizza);
    const indices = { personal: 0, mediana: 1, grande: 2 };
    const infoTamano = pizza.tamanos[indices[tamano]];
    return { nombre: pizza.nombre + "(" +infoTamano.nombre +")", precio: infoTamano.precio, emoji: pizza.emoji};
  } else {
    const p = CONFIG.productos.find(p => p.id == llave);
    return {nombre: p.nombre, precio: p.precio, emoji: p.emoji};
  }
}  


//------AGREGAR AL CARRITO --------------
function agregarPizzaAlCarrito(){
  const llave = `${pizzaSeleccionada.id}-${tamanoSeleccionado}`;
  cart[llave] = (cart[llave] || 0) + 1;
  updateFab();
  renderCartPanel();
}

//------TARJETA DE PRODUCTO --------------
function productCard(p) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.id = `card-${p.id}`;
  const contenidoImagen = p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}">` : p.emoji;
  card.innerHTML = `
    <div class="product-img">${contenidoImagen}</div>
    <div class="product-info">
      <div class="product-name">${p.nombre}</div>
      <div class="product-desc">${p.desc}</div>
      <div class="product-footer">
        <div class="product-price"><span class="currency">$</span>${p.precio.toLocaleString('es-CO')}</div>
        <div id="ctrl-${p.id}">${addBtn(p.id)}</div>
      </div>
    </div>`;
  card.onclick = () => mostrarProductoAmpliado(p.id);
  return card;
}

function addBtn(id) {
  return `<button class="add-btn" onclick="event.stopPropagation(); addToCart(${id})">+</button>`;
}

function qtyCtrl(id) {
  const qty = cart[id] || 0;
  return `<div class="qty-control">
    <button class="qty-btn minus" onclick="event.stopPropagation(); removeFromCart(${id})">−</button>
    <span class="qty-num">${qty}</span>
    <button class="qty-btn plus" onclick="event.stopPropagation(); addToCart(${id})">+</button>
  </div>`;
}

// ── CARRITO ──────────────────────────────────────────────────
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCtrl(id);
  updateFab();
  renderCartPanel();
}

function removeFromCart(id) {
  if (!cart[id]) return;
  cart[id]--;
  if (cart[id] === 0) delete cart[id];
  updateCtrl(id);
  updateFab();
  renderCartPanel();
  if (document.getElementById('overlay').classList.contains('open')) renderModal();
}

function updateCtrl(id) {
  const ctrl = document.getElementById(`ctrl-${id}`);
  if (!ctrl) return;
  ctrl.innerHTML = cart[id] ? qtyCtrl(id) : addBtn(id);
}

function cartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const info = obtenerInfoCarrito(id);
    return sum + info.precio * qty;
  }, 0);
}

function cartItemCount() {
  return Object.values(cart).reduce((s, v) => s + v, 0);
}

function updateFab() {
  const fab = document.getElementById('cartFab');
  const count = cartItemCount();
  if (count > 0) {
    fab.classList.add('visible');
    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartTotalFab').textContent = fmt(cartTotal());
  } else {
    fab.classList.remove('visible');
  }
}

// ── MODAL ────────────────────────────────────────────────────
function openCart() {
  document.getElementById('overlay').classList.add('open');
  renderModal();
}

function closeCart() {
  document.getElementById('overlay').classList.remove('open');
}

function renderCartInto(itemsEl, totalEl) {
  const entries = Object.entries(cart);

  if (!entries.length) {
    itemsEl.innerHTML = `<div class="empty-cart"><div class="empty-icon">🛒</div><div class="empty-text">Tu pedido está vacío</div></div>`;
    totalEl.textContent = fmt(0);
    return;
  }

  itemsEl.innerHTML = entries.map(([id, qty]) => {
    const info = obtenerInfoCarrito(id);
    return `<div class="cart-item">
      <span style="font-size:20px">${info.emoji}</span>
      <div class="cart-item-name">${info.nombre}</div>
      <span class="cart-item-qty">x${qty}</span>
      <span class="cart-item-price">${fmt(info.precio * qty)}</span>
      <button class="remove-btn" onclick="removeFromCart('${id}')" title="Quitar">✕</button>
    </div>`;
  }).join('');

  totalEl.textContent = fmt(cartTotal());
}

function renderModal() {
  renderCartInto(document.getElementById('modalItems'), document.getElementById('modalTotal'));
}

function renderCartPanel() {
  const itemsEl = document.getElementById('cartPanelItems');
  const totalEl = document.getElementById('cartPanelTotal');
  if (!itemsEl || !totalEl) return;
  renderCartInto(itemsEl, totalEl);
}

// ── ENVIAR PEDIDO POR WHATSAPP ────────────────────────────────
function sendOrder() {
  const entries = Object.entries(cart);
  if (!entries.length) return;

  const lines = entries.map(([id, qty]) => {
    const info = obtenerInfoCarrito(id);
    return `• ${qty}x ${info.nombre} — ${fmt(info.precio * qty)}`;
  });

  const total = cartTotal();
  const msg = [
    `¡Hola *${CONFIG.nombre}*!👋 Me gustaria ordenar el siguiente pedido:`,
    ``,
    ...lines,
    ``,
    `*Total: ${fmt(total)}*`,
    ``,
    `¿Me confirmas por favor disponibilidad y tiempo aproximado de entrega? 😊`
  ].join('\n');

  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

init();
