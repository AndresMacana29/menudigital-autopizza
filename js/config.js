// ============================================================
// ZONA DE CONFIGURACIÓN — EDITAR PARA CADA CLIENTE
// Cliente: Autopizza (Puente Nacional)
//
// ⚠️ PENDIENTES POR CONFIRMAR CON EL CLIENTE:
//   - Número de WhatsApp real para recibir pedidos: el menú trae 3 números
//     de contacto (3204801071 / 3166925074 / 3107834802). Se dejó el primero
//     como valor de ejemplo — confirmar cuál es el de WhatsApp para pedidos.
//   - Horario de atención (no aparece en el PDF del menú).
//   - Orden exacto de precios de las 4 hamburguesas (Tradicional, Mixta,
//     Gaucha, Doble Carne): el PDF no dejaba clara la pareja precio-producto.
//     Se asumió Tradicional $23.000, Mixta $27.000, Gaucha $27.000,
//     Doble Carne $29.000 (la más cara, por llevar el doble de carne).
//   - 5 precios de "Otras Bebidas" (Agua Natural, Soda, Soda con Limón,
//     Jugos Hit, Tea Hatzu): mismo problema de diseño en columnas del PDF.
//   - Logo y foto de portada (hero): no se han recibido, el header usa el
//     emoji 🍕 como marcador temporal.
//   - Los precios de pizza mostrados en las tarjetas usan el precio de
//     tamaño MEDIANO (30cm) mientras se construye el selector de tamaño
//     (Ticket #13/#14) — cada pizza ya trae los 3 precios en "tamanos".
// ============================================================
const CONFIG = {
  // ── DATOS DEL NEGOCIO ──────────────────────────────────────
  nombre:    "Autopizza",
  tagline:   "Pizza artesanal al horno de leña · Puente Nacional" ,
  emoji:     "🍕",
  whatsapp:  "573506194325",   // TODO: confirmar cuál de los 3 números es el de pedidos
  horarioSemana: {
    // TODO: confirmar horario real — se dejó un valor de ejemplo para que el status "Abierto/Cerrado" funcione
    domingo:    { abre: "11:00", cierra: "21:00" },
    lunes:      { abre: "11:00", cierra: "21:00" },
    martes:     { abre: "11:00", cierra: "21:00" },
    miercoles:  { abre: "11:00", cierra: "21:00" },
    jueves:     { abre: "11:00", cierra: "21:00" },
    viernes:    { abre: "11:00", cierra: "22:00" },
    sabado:     { abre: "11:00", cierra: "22:00" },
  },

  // ── CATEGORÍAS Y MENÚ ─────────────────────────────────────
  categorias: [
    { id: "pizzas-clasicas", nombre: "Pizzas Clásicas",
      nota: "Toppings adicionales — proteína: +$3.000 (personal) / +$4.000 (mediana) / +$5.000 (grande). Vegetal: +$2.000 / +$3.000 / +$4.000." },
    { id: "pizzas-casa",    nombre: "Pizzas de la Casa",
      nota: "Mismos toppings adicionales disponibles que en las clásicas." },
    { id: "hamburguesas",   tabId: "hamburguesas", tabNombre: "Hamburguesas", nombre: "Hamburguesas al Carbón",
      nota: "Toppings adicionales — vegetales: +$3.000, proteínas: +$4.000." },
    { id: "mazorcadas",     tabId: "para-compartir", tabNombre: "Para Compartir", nombre: "Mazorcadas de la Casa" },
    { id: "choripapas",     tabId: "para-compartir", tabNombre: "Para Compartir", nombre: "Choripapas Tradicionales" },
    { id: "papas",          tabId: "para-compartir", tabNombre: "Para Compartir", nombre: "Papas a la Francesa" },
    { id: "jugos-agua",     tabId: "bebidas", tabNombre: "Bebidas", nombre: "Jugos en Agua" },
    { id: "jugos-leche",    tabId: "bebidas", tabNombre: "Bebidas", nombre: "Jugos en Leche" },
    { id: "limonadas",      tabId: "bebidas", tabNombre: "Bebidas", nombre: "Limonadas" },
    { id: "gaseosas",       tabId: "bebidas", tabNombre: "Bebidas", nombre: "Gaseosas" },
    { id: "cervezas",       tabId: "bebidas", tabNombre: "Bebidas", nombre: "Cervezas" },
    { id: "otras-bebidas",  tabId: "bebidas", tabNombre: "Bebidas", nombre: "Otras Bebidas",
      nota: "Vinos disponibles según existencia, consultar precio directamente. ⚠️ Precios marcados por confirmar." },
  ],

  productos: [
    // ── PIZZAS CLÁSICAS (22cm / 30cm / 40cm) ────────────────
    // precio = valor de tamaño mediano (fallback temporal, ver TODO arriba)
    { id:1,  cat:"pizzas-clasicas", emoji:"🍕", nombre:"Napolitana",imagen: "/img/productos/p-clasicas/pizza-clasica-napolitana.jpg",desc:"Base queso tipo mozzarella y tomate en rodajas con finas hierbas.", precio:35000,
      tamanos:[{nombre:"Personal 22cm",precio:20000},{nombre:"Mediana 30cm",precio:35000},{nombre:"Grande 40cm",precio:55000}] },
    { id:2,  cat:"pizzas-clasicas", emoji:"🍕", nombre:"Jamón y Queso",imagen: "/img/productos/p-clasicas/pizza-clasica-jamon-queso.png", desc:"Base queso tipo mozzarella acompañado de jamón ahumado.", precio:35000,
      tamanos:[{nombre:"Personal 22cm",precio:21000},{nombre:"Mediana 30cm",precio:35000},{nombre:"Grande 40cm",precio:55000}] },
    { id:3,  cat:"pizzas-clasicas", emoji:"🍕", nombre:"Hawaiana", imagen: "/img/productos/p-clasicas/pizza-clasica-hawaina.png", desc:"Base de piña caramelizada, acompañada de jamón ahumado.", precio:35000,
      tamanos:[{nombre:"Personal 22cm",precio:20000},{nombre:"Mediana 30cm",precio:35000},{nombre:"Grande 40cm",precio:55000}] },
    { id:4,  cat:"pizzas-clasicas", emoji:"🍕", nombre:"Tocinetas", imagen: "/img/productos/p-clasicas/pizza-clasica-tocineta.png", desc:"Base piña caramelizada, acompañada de tocineta ahumada.", precio:35000,
      tamanos:[{nombre:"Personal 22cm",precio:20000},{nombre:"Mediana 30cm",precio:35000},{nombre:"Grande 40cm",precio:55000}] },
    { id:5,  cat:"pizzas-clasicas", emoji:"🍕", nombre:"Pollo con Piña", imagen: "/img/productos/p-clasicas/pizza-clasica-pollo-con-piña.png", desc:"Base de piña caramelizada, y pollo desmechado.", precio:35000,
      tamanos:[{nombre:"Personal 22cm",precio:20000},{nombre:"Mediana 30cm",precio:35000},{nombre:"Grande 40cm",precio:55000}] },
    { id:6,  cat:"pizzas-clasicas", emoji:"🍕", nombre:"Pollo y Champiñones", imagen: "/img/productos/p-clasicas/pizza-clasica-pollo-champinones.png", desc:"Pollo desmechado, acompañado con champiñones horneados.", precio:35000,
      tamanos:[{nombre:"Personal 22cm",precio:20000},{nombre:"Mediana 30cm",precio:35000},{nombre:"Grande 40cm",precio:55000}] },
    { id:7,  cat:"pizzas-clasicas", emoji:"🍕", nombre:"Pollo con Verduras", imagen: "/img/productos/p-clasicas/pizza-clasica-pollo-con-verduras.png",desc:"Pollo desmechado, acompañado de cebolla y pimentón en julianas.", precio:35000,
      tamanos:[{nombre:"Personal 22cm",precio:20000},{nombre:"Mediana 30cm",precio:35000},{nombre:"Grande 40cm",precio:55000}] },
    { id:8,  cat:"pizzas-clasicas", emoji:"🍕", nombre:"Pollo con Maíz", imagen: "/img/productos/p-clasicas/pizza-clasica-pollo-con-maiz.png", desc:"Pollo desmechado, acompañado de maíz tierno.", precio:35000,
      tamanos:[{nombre:"Personal 22cm",precio:20000},{nombre:"Mediana 30cm",precio:35000},{nombre:"Grande 40cm",precio:55000}] },
    { id:9,  cat:"pizzas-clasicas", emoji:"🍕", nombre:"Carnes", imagen: "/img/productos/p-clasicas/pizza-clasica-carnes.png", desc:"Carne molida tipo bolognesa, acompañada de cábano, jamón y tocineta ahumada.", precio:36000,
      tamanos:[{nombre:"Personal 22cm",precio:21000},{nombre:"Mediana 30cm",precio:36000},{nombre:"Grande 40cm",precio:57000}] },
    { id:10, cat:"pizzas-clasicas", emoji:"🍕", nombre:"Mexicana", imagen: "/img/productos/p-clasicas/pizza-clasica-mexicana.png", desc:"Carne molida tipo bolognesa, acompañada de cebolla, pimentón, maíz, cábano y perejil.", precio:36000,
      tamanos:[{nombre:"Personal 22cm",precio:21000},{nombre:"Mediana 30cm",precio:36000},{nombre:"Grande 40cm",precio:57000}] },
    { id:11, cat:"pizzas-clasicas", emoji:"🍕", nombre:"Mi Tierra", desc:"Carne molida tipo bolognesa, acompañada de cebolla, pimentón, maíz y chorizo.", precio:38000,
      tamanos:[{nombre:"Personal 22cm",precio:23000},{nombre:"Mediana 30cm",precio:38000},{nombre:"Grande 40cm",precio:59000}] },
    { id:12, cat:"pizzas-clasicas", emoji:"🍕", nombre:"Pepperoni", desc:"Base queso tipo mozzarella, acompañado con rodajas de pepperoni.", precio:38000,
      tamanos:[{nombre:"Personal 22cm",precio:23000},{nombre:"Mediana 30cm",precio:38000},{nombre:"Grande 40cm",precio:59000}] },
    { id:13, cat:"pizzas-clasicas", emoji:"🍕", nombre:"Canadiense", desc:"Pepperoni, acompañado de tocineta ahumada y champiñón.", precio:37000,
      tamanos:[{nombre:"Personal 22cm",precio:22000},{nombre:"Mediana 30cm",precio:37000},{nombre:"Grande 40cm",precio:58000}] },
    { id:14, cat:"pizzas-clasicas", emoji:"🍕", nombre:"Australiana", desc:"Pepperoni, cebolla, pimentón, acompañada de piña melada.", precio:36000,
      tamanos:[{nombre:"Personal 22cm",precio:21000},{nombre:"Mediana 30cm",precio:36000},{nombre:"Grande 40cm",precio:57000}] },
    { id:15, cat:"pizzas-clasicas", emoji:"🍕", nombre:"Jalapeña", desc:"Carne molida tipo bolognesa, acompañada de pepperoni y jalapeños encurtidos.", precio:38000,
      tamanos:[{nombre:"Personal 22cm",precio:23000},{nombre:"Mediana 30cm",precio:38000},{nombre:"Grande 40cm",precio:59000}] },

    // ── PIZZAS DE LA CASA (22cm / 30cm / 40cm) ──────────────
    { id:16, cat:"pizzas-casa", emoji:"🍕", nombre:"Antojo", desc:"Carne bolognesa, chorizo criollo, tocineta ahumada, maduro, maíz y queso parmesano.", precio:38000,
      tamanos:[{nombre:"Personal 22cm",precio:22000},{nombre:"Mediana 30cm",precio:38000},{nombre:"Grande 40cm",precio:59000}] },
    { id:17, cat:"pizzas-casa", emoji:"🍕", nombre:"Especial", desc:"Carne bolognesa, pollo desmechado, tocineta ahumada, cebolla, pimentón y tomate en finas hierbas.", precio:38000,
      tamanos:[{nombre:"Personal 22cm",precio:22000},{nombre:"Mediana 30cm",precio:38000},{nombre:"Grande 40cm",precio:59000}] },
    { id:18, cat:"pizzas-casa", emoji:"🦐", nombre:"Frutos del Mar", desc:"Camarones a la brasa, acompañados con palmitos, aceituna negra, cebolla, pimentón y queso parmesano.", precio:41000,
      tamanos:[{nombre:"Personal 22cm",precio:25000},{nombre:"Mediana 30cm",precio:41000},{nombre:"Grande 40cm",precio:62000}] },
    { id:19, cat:"pizzas-casa", emoji:"🍕", nombre:"SuperEspecial", desc:"Carne bolognesa, pollo desmechado, cebolla, pimentón, champiñón, maíz, aceituna negra, pepperoni y tomate en rodajas con finas hierbas.", precio:41000,
      tamanos:[{nombre:"Personal 22cm",precio:25000},{nombre:"Mediana 30cm",precio:41000},{nombre:"Grande 40cm",precio:62000}] },
    { id:20, cat:"pizzas-casa", emoji:"🍕", nombre:"Detroit", desc:"Pollo desmechado, tocineta ahumada, champiñón, aceituna negra y queso parmesano.", precio:36000,
      tamanos:[{nombre:"Personal 22cm",precio:21000},{nombre:"Mediana 30cm",precio:36000},{nombre:"Grande 40cm",precio:56000}] },
    { id:21, cat:"pizzas-casa", emoji:"🍕", nombre:"SuperCarnes", desc:"Carne bolognesa, pollo desmechado, cábano, jamón ahumado, chorizo, tocineta ahumada y pepperoni.", precio:38000,
      tamanos:[{nombre:"Personal 22cm",precio:22000},{nombre:"Mediana 30cm",precio:38000},{nombre:"Grande 40cm",precio:58000}] },
    { id:22, cat:"pizzas-casa", emoji:"🍕", nombre:"Barcelona", desc:"Carne bolognesa, cebolla, tocineta ahumada, aceituna verde, queso parmesano y perejil.", precio:38000,
      tamanos:[{nombre:"Personal 22cm",precio:22000},{nombre:"Mediana 30cm",precio:38000},{nombre:"Grande 40cm",precio:58000}] },
    { id:23, cat:"pizzas-casa", emoji:"🍕", nombre:"Antaño", desc:"Tocineta ahumada, ciruela pasa, maduro en rodajas, maíz tierno y queso parmesano.", precio:38000,
      tamanos:[{nombre:"Personal 22cm",precio:22000},{nombre:"Mediana 30cm",precio:38000},{nombre:"Grande 40cm",precio:58000}] },
    { id:24, cat:"pizzas-casa", emoji:"🥦", nombre:"Vegetariana", desc:"Base queso tipo mozzarella, cebolla, pimentón, aceitunas negras en rodajas, maíz tierno y rodajas de tomate.", precio:36000,
      tamanos:[{nombre:"Personal 22cm",precio:21000},{nombre:"Mediana 30cm",precio:36000},{nombre:"Grande 40cm",precio:57000}] },
    { id:25, cat:"pizzas-casa", emoji:"🍕", nombre:"Verona", desc:"Base de queso tipo mozzarella, pollo desmechado, chorizo en rodajas y cebolla.", precio:37000,
      tamanos:[{nombre:"Personal 22cm",precio:21000},{nombre:"Mediana 30cm",precio:37000},{nombre:"Grande 40cm",precio:58000}] },
    { id:26, cat:"pizzas-casa", emoji:"🍕", nombre:"Mediterránea", desc:"Tocineta ahumada, aceituna verde, cebolla en plumas, pimentón, tomate en rodajas y parmesano.", precio:38000,
      tamanos:[{nombre:"Personal 22cm",precio:22000},{nombre:"Mediana 30cm",precio:38000},{nombre:"Grande 40cm",precio:59000}] },

    // ── HAMBURGUESAS AL CARBÓN (⚠️ orden de precios por confirmar) ──
    { id:27, cat:"hamburguesas", emoji:"🍔", nombre:"Hamburguesa Tradicional", desc:"140gr de carne de res asada al carbón, tocineta y jamón ahumados, queso mozzarella, lechuga, tomate, cebolla, pan brioche, con papa a la francesa y salsas de la casa.", precio:23000 },
    { id:28, cat:"hamburguesas", emoji:"🍔", nombre:"Hamburguesa Mixta", desc:"140gr de carne de res asada al carbón, pollo desmechado, tocineta y jamón ahumados, queso mozzarella, lechuga, tomate, cebolla, pan brioche, con papa a la francesa y salsas de la casa.", precio:27000 },
    { id:29, cat:"hamburguesas", emoji:"🍔", imagen:"/img/productos/hamburgesa-gaucha.jpg", nombre:"Hamburguesa Gaucha", desc:"140gr de carne de res asada al carbón, chorizo, tocineta y jamón ahumados, queso mozzarella, lechuga, tomate, cebolla, pan brioche, con papa a la francesa, salsas de la casa y chimichurri.", precio:27000 },
    { id:30, cat:"hamburguesas", emoji:"🍔", nombre:"Hamburguesa Doble Carne", desc:"2 carnes de res de 140gr asadas al carbón, doble tocineta y jamón ahumados, doble queso mozzarella, lechuga, tomate, cebolla, pan brioche, con papa a la francesa y salsas de la casa.", precio:29000 },

    // ── MAZORCADAS DE LA CASA ────────────────────────────────
    { id:31, cat:"mazorcadas", emoji:"🌽", nombre:"Mazorcada Tradicional con Pollo", desc:"200gr de maíz, tocineta ahumada, pollo desmechado, queso mozzarella, gratinada en horno a leña y acompañada con salsas de la casa.", precio:26000 },
     { id:62, cat:"mazorcadas", emoji:"🌽", nombre:"Mazorcada Tradicional con Carne", desc:"200gr de maíz, tocineta ahumada, carne desmechada, queso mozzarella, gratinada en horno a leña y acompañada con salsas de la casa.", precio:26000 },
    { id:32, cat:"mazorcadas", emoji:"🌽", nombre:"Mazorcada Mixta", desc:"200gr de maíz, tocineta ahumada, pollo y carne bolognesa, queso mozzarella, gratinada en horno a leña y acompañada con salsas de la casa.", precio:26000 },

    // ── CHORIPAPAS TRADICIONALES ─────────────────────────────
    { id:33, cat:"choripapas", emoji:"🍟", nombre:"Choripapa Sencilla", desc:"300gr de papa a la francesa, acompañada de chorizo tradicional, queso y salsas de la casa.", precio:18000 },
    { id:34, cat:"choripapas", emoji:"🍟", nombre:"Choripapa Especial (2 personas)", desc:"300gr de papa a la francesa, acompañada de chorizo tradicional, tocineta, maíz, pollo desmechado, maduro, queso mozzarella y queso costeño, con salsas de la casa.", precio:32000 },

    // ── PAPAS A LA FRANCESA ───────────────────────────────────
    { id:35, cat:"papas", emoji:"🍟", nombre:"Papas Sencillas", desc:"300gr de papa a la francesa, acompañada de queso costeño y salsas de la casa.", precio:12000 },
    { id:36, cat:"papas", emoji:"🍟", nombre:"Papas Dobles", desc:"600gr de papa a la francesa, acompañada de queso costeño y salsas de la casa.", precio:20000 },

    // ── JUGOS EN AGUA ─────────────────────────────────────────
    { id:37, cat:"jugos-agua", emoji:"🫐", nombre:"Jugo de Mora en Agua", desc:"", precio:6500 },
    { id:38, cat:"jugos-agua", emoji:"🟣", nombre:"Jugo de Maracuyá en Agua", desc:"", precio:6500 },
    { id:39, cat:"jugos-agua", emoji:"🥭", nombre:"Jugo de Mango en Agua", desc:"", precio:6500 },

    // ── JUGOS EN LECHE ────────────────────────────────────────
    { id:40, cat:"jugos-leche", emoji:"🫐", nombre:"Jugo de Mora en Leche", desc:"", precio:7500 },
    { id:41, cat:"jugos-leche", emoji:"🟣", nombre:"Jugo de Maracuyá en Leche", desc:"", precio:7500 },
    { id:42, cat:"jugos-leche", emoji:"🥭", nombre:"Jugo de Mango en Leche", desc:"", precio:7500 },

    // ── LIMONADAS ─────────────────────────────────────────────
    { id:43, cat:"limonadas", emoji:"🍋", nombre:"Limonada Natural", desc:"", precio:6500 },
    { id:44, cat:"limonadas", emoji:"🥭", nombre:"Limonada de Mango", desc:"", precio:8000 },
    { id:45, cat:"limonadas", emoji:"🟣", nombre:"Limonada de Maracuyá", desc:"", precio:8000 },
    { id:46, cat:"limonadas", emoji:"🍓", nombre:"Limonada de Frutos Rojos", desc:"", precio:8000 },
    { id:47, cat:"limonadas", emoji:"🍒", nombre:"Limonada Cerezada", desc:"", precio:8000 },
    { id:48, cat:"limonadas", emoji:"🥥", nombre:"Limonada de Coco", desc:"", precio:9000 },

    // ── GASEOSAS ──────────────────────────────────────────────
    { id:49, cat:"gaseosas", emoji:"🥤", nombre:"Postobón o Coca-Cola 500ml", desc:"", precio:4500 },
    { id:50, cat:"gaseosas", emoji:"🥤", nombre:"Postobón o Coca-Cola 1.5L", desc:"", precio:8500 },
    { id:51, cat:"gaseosas", emoji:"🥤", nombre:"Coca-Cola 2.5L", desc:"", precio:9500 },
    { id:52, cat:"gaseosas", emoji:"🥤", nombre:"Coca-Cola Lata 235ml", desc:"", precio:4500 },

    // ── CERVEZAS ──────────────────────────────────────────────
    { id:53, cat:"cervezas", emoji:"🍺", nombre:"Club Colombia", desc:"", precio:6000 },
    { id:54, cat:"cervezas", emoji:"🍺", nombre:"Coronita", desc:"", precio:5500 },

    // ── OTRAS BEBIDAS (⚠️ 5 precios por confirmar) ──────────
    { id:55, cat:"otras-bebidas", emoji:"💧", nombre:"Agua Natural", desc:"⚠️ Precio por confirmar.", precio:4000 },
    { id:56, cat:"otras-bebidas", emoji:"🥤", nombre:"Soda", desc:"⚠️ Precio por confirmar.", precio:3500 },
    { id:57, cat:"otras-bebidas", emoji:"🥤", nombre:"Soda con Limón", desc:"⚠️ Precio por confirmar.", precio:4500 },
    { id:58, cat:"otras-bebidas", emoji:"🧃", nombre:"Jugos Hit", desc:"⚠️ Precio por confirmar.", precio:4000 },
    { id:59, cat:"otras-bebidas", emoji:"🧋", nombre:"Tea Hatzu", desc:"⚠️ Precio por confirmar.", precio:8000 },
    { id:60, cat:"otras-bebidas", emoji:"🧋", nombre:"Fuze Tea", desc:"", precio:4000 },
    { id:61, cat:"otras-bebidas", emoji:"🥤", nombre:"Soda Hatzu", desc:"", precio:8000 },
  ]
};