let map;
let marker;

function initMap() {
    const center = [-6.888463202449027, -38.558930105104125];
    
    // Inicializa o mapa
    const map = L.map('map').setView(center, 14);
    
    // Adiciona camada de tiles do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  }
  

  // Cria o marcador inicial, que é arrastável
  marker = L.marker([center.lat, center.lng], { draggable: true }).addTo(map);

  // Atualiza a posição do marcador quando o usuário clicar no mapa
  map.on("click", (evt) => {
    addMarker(evt);
  });

  // Atualiza o centro do mapa quando o marcador for arrastado
  marker.on("dragend", () => {
    map.setView(marker.getLatLng());
  });

function addMarker(evt) {
  // Atualiza a posição do marcador utilizando as coordenadas do evento
  marker.setLatLng(evt.latlng);
}

function getValuesField() {
  // Obtém a posição atual do marcador
  const latLng = marker.getLatLng();

  // Cria o objeto com os valores dos campos e a propriedade "geometria"
  const obj = {
    titulo: document.getElementById("titulo").value,
    tipo: document.getElementById("tipo").value,
    data: document.getElementById("data").value,
    hora: document.getElementById("hora").value,
    geometria: {
      type: "Point",
      // No padrão GeoJSON, as coordenadas são [longitude, latitude]
      coordinates: [latLng.lng, latLng.lat],
    },
  };
  return obj;
}

function setValuesField(values) {
  // Converte a data do formato "dd/mm/yyyy" para "yyyy-mm-dd"
  const data = values.data.split("/").reverse().join("-");

  document.getElementById("tipo").value = values.tipo;
  document.getElementById("data").value = data;
  document.getElementById("hora").value = values.hora;
  document.getElementById("titulo").value = values.titulo;

  if (values.geometria && values.geometria.coordinates) {
    const coords = values.geometria.coordinates;
    // Lembre-se: em GeoJSON, as coordenadas estão no formato [lng, lat]
    const newLatLng = L.latLng(coords[1], coords[0]);
    marker.setLatLng(newLatLng);
    map.setView(newLatLng);
  }
}

function salvar() {
  const obj = getValuesField();
  fetch("http://localhost:3000/ocorrencia", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      alert("Salvo com sucesso");
    })
    .catch((error) => alert("Falha ao salvar!"));
}

function salvarRascunho() {
  const obj = getValuesField();

  fetch("http://localhost:3000/ocorrencia/rascunho", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      alert("Salvo com sucesso");
    })
    .catch((error) => alert("Falha ao salvar!"));
}

async function recuperarRascunho() {
  try {
    const response = await fetch("http://localhost:3000/ocorrencia/rascunho");
    const data = await response.json();
    setValuesField(data);
  } catch (error) {
    console.error(error);
  }
}

function lista() {
  fetch("http://localhost:3000/ocorrencia")
    .then((res) => res.json())
    .then((pontos) => {
      pontos.forEach((location) => {
        if (location.geometria && location.geometria.coordinates) {
          // Adiciona um marcador para cada ocorrência, convertendo as coordenadas de [lng, lat] para [lat, lng]
          L.marker([
            location.geometria.coordinates[1],
            location.geometria.coordinates[0],
          ]).addTo(map);
        }
      });
    });
}
