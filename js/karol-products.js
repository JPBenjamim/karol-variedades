var KAROL_WHATSAPP = "558491827825";
var KAROL_SITE_URL = "https://jpbenjamim.github.io/karol-variedades";

var karolProducts = [
  { name: "Copo liquidificador portátil", category: "Utilidades", image: "produto-01.jpeg" },
  { name: "Cabo e adaptador para celular", category: "Cabos e carregadores", image: "produto-02.jpeg" },
  { name: "Caixa de som Bluetooth compacta", category: "Áudio", image: "produto-03.jpeg" },
  { name: "Cabo Type-C reforçado", category: "Cabos e carregadores", image: "produto-04.jpeg" },
  { name: "Carregadores e cabos diversos", category: "Cabos e carregadores", image: "produto-05.jpeg" },
  { name: "Kit carregadores e cabos", category: "Cabos e carregadores", image: "produto-06.jpeg" },
  { name: "Celular estilo retrô", category: "Eletrônicos", image: "produto-07.jpeg" },
  { name: "Caixa de som Kapbom", category: "Áudio", image: "produto-08.jpeg" },
  { name: "Headphone Your Music", category: "Áudio", image: "produto-09.jpeg" },
  { name: "Headphone Your Music", category: "Áudio", image: "produto-10.jpeg" },
  { name: "Caixa de som Kapbom portátil", category: "Áudio", image: "produto-11.jpeg" },
  { name: "Cabos USB coloridos", category: "Cabos e carregadores", image: "produto-12.jpeg" },
  { name: "Carregador turbo 3.4A", category: "Cabos e carregadores", image: "produto-13.jpeg" },
  { name: "Carregador veicular", category: "Acessórios auto", image: "produto-14.jpeg" },
  { name: "Adaptador VGA para HDMI", category: "Adaptadores", image: "produto-15.jpeg" },
  { name: "Cabos e conectores para celular", category: "Cabos e carregadores", image: "produto-16.jpeg" },
  { name: "Adaptador de tomada USB", category: "Cabos e carregadores", image: "produto-17.jpeg" },
  { name: "Carregador Gold", category: "Cabos e carregadores", image: "produto-18.jpeg" },
  { name: "Máquina de acabamento Kemei", category: "Beleza", image: "produto-19.jpeg" },
  { name: "Microfone dourado", category: "Áudio", image: "produto-20.jpeg" },
  { name: "Acessório doméstico multiuso", category: "Utilidades", image: "produto-21.jpeg" },
  { name: "Fone sem fio estilo AirPods", category: "Áudio", image: "produto-22.jpeg" },
  { name: "Controle sem fio para jogos", category: "Games", image: "produto-23.jpeg" },
  { name: "Cartão de memória e adaptador", category: "Memória", image: "produto-24.jpeg" },
  { name: "Controle Doubleshock 4", category: "Games", image: "produto-25.jpeg" },
  { name: "Cabo Xbox 360", category: "Games", image: "produto-26.jpeg" },
  { name: "Fone de ouvido com fio", category: "Áudio", image: "produto-27.jpeg" },
  { name: "Caixas de som S10+", category: "Áudio", image: "produto-28.jpeg" },
  { name: "Relógio digital infantil", category: "Acessórios", image: "produto-29.jpeg" },
  { name: "Ring light de mesa", category: "Acessórios", image: "produto-30.jpeg" },
  { name: "Mouse sem fio", category: "Informática", image: "produto-31.jpeg" },
  { name: "Caixa de som com luz LED", category: "Áudio", image: "produto-32.jpeg" },
  { name: "Pulseiras luminosas LED", category: "Acessórios", image: "produto-33.jpeg" },
  { name: "Fone de ouvido Bluetooth", category: "Áudio", image: "produto-34.jpeg" },
  { name: "Kit carregador e cabos", category: "Cabos e carregadores", image: "produto-35.jpeg" }
];

var karolCurrentCategory = "Todos";
var karolCurrentSearch = "";

function normalizeKarolText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getKarolFilteredProducts(limit) {
  var search = normalizeKarolText(karolCurrentSearch);
  var products = karolProducts.filter(function (product) {
    var matchCategory = karolCurrentCategory === "Todos" || product.category === karolCurrentCategory;
    var haystack = normalizeKarolText(product.name + " " + product.category);
    var matchSearch = !search || haystack.indexOf(search) !== -1;
    return matchCategory && matchSearch;
  });

  return typeof limit === "number" ? products.slice(0, limit) : products;
}

function renderKarolProducts(limit) {
  var grid = document.getElementById("karolProductsGrid");
  if (!grid) return;

  var products = getKarolFilteredProducts(limit);
  grid.innerHTML = products.map(function (product) {
    var message = encodeURIComponent("Olá, Karol! Tenho interesse neste produto: " + product.name);
    var productSlug = product.image.replace(".jpeg", ".html");
    var productUrl = KAROL_SITE_URL + "/produtos/" + productSlug;
    var shareMessage = encodeURIComponent("Olha esse produto da Karol Variedades: " + product.name + " " + productUrl);
    return [
      '<div class="col-sm-6 col-md-4 col-lg-3 mb-4">',
        '<article class="product-card-karol">',
          '<div class="product-img-karol">',
            '<img src="images/karol-produtos-tratadas/' + product.image + '" alt="' + product.name + '" loading="lazy">',
          '</div>',
          '<div class="product-body-karol">',
            '<span class="tag">' + product.category + '</span>',
            '<h3>' + product.name + '</h3>',
            '<p class="price-note">Consulte preço e disponibilidade</p>',
            '<div class="product-actions">',
              '<a class="btn-karol" href="https://wa.me/' + KAROL_WHATSAPP + '?text=' + message + '" target="_blank" rel="noopener">Pedir</a>',
              '<a class="btn-share-karol" href="https://wa.me/?text=' + shareMessage + '" target="_blank" rel="noopener" aria-label="Compartilhar ' + product.name + ' no WhatsApp"><i class="fa fa-whatsapp"></i> Compartilhar</a>',
            '</div>',
          '</div>',
        '</article>',
      '</div>'
    ].join("");
  }).join("");

  var count = document.getElementById("karolProductCount");
  if (count) {
    count.textContent = products.length + " produto" + (products.length === 1 ? "" : "s") + " encontrado" + (products.length === 1 ? "" : "s") + ".";
  }

  var empty = document.getElementById("karolEmptyState");
  if (empty) {
    empty.classList.toggle("show", products.length === 0);
  }
}

function setupKarolWhatsappButtons() {
  var buttons = document.querySelectorAll("[data-karol-whatsapp]");
  buttons.forEach(function (button) {
    var text = encodeURIComponent(button.getAttribute("data-message") || "Olá, Karol! Quero ver os produtos disponíveis.");
    button.href = "https://wa.me/" + KAROL_WHATSAPP + "?text=" + text;
  });
}

function setupKarolCatalogFilters() {
  var filterWrap = document.getElementById("karolFilters");
  if (!filterWrap) return;

  var categories = ["Todos"].concat(karolProducts.map(function (product) { return product.category; })
    .filter(function (category, index, list) { return list.indexOf(category) === index; }));

  filterWrap.innerHTML = categories.map(function (category, index) {
    return '<button class="filter-pill' + (index === 0 ? ' active' : '') + '" type="button" data-category="' + category + '">' + category + '</button>';
  }).join("");

  filterWrap.addEventListener("click", function (event) {
    var button = event.target.closest("[data-category]");
    if (!button) return;

    karolCurrentCategory = button.getAttribute("data-category");
    filterWrap.querySelectorAll(".filter-pill").forEach(function (pill) {
      pill.classList.toggle("active", pill === button);
    });
    renderKarolProducts();
  });

  var search = document.getElementById("karolSearch");
  if (search) {
    search.addEventListener("input", function () {
      karolCurrentSearch = search.value;
      renderKarolProducts();
    });
  }
}

function setupKarolSite() {
  setupKarolCatalogFilters();
  renderKarolProducts();
  setupKarolWhatsappButtons();
}
