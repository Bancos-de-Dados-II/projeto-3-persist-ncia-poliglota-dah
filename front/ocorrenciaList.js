const baseURL = "http://localhost:3000/denuncias";

function carregarOcorrencias() {
  fetch(baseURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro HTTP! Código: ${response.status}`);
      }
      return response.json();
    })
    .then(ocorrencias => {
      console.log("Dados recebidos:", ocorrencias);
      renderizarNaTela(ocorrencias);
    })
    .catch(err => {
      console.error("Erro ao carregar ocorrências:", err);
      alert("Erro ao carregar as ocorrências. Veja o console para detalhes.");
    });
}

function renderizarNaTela(ocorrencias) {
  console.log("Ocorrências recebidas para renderizar:", ocorrencias);

  const lista = document.getElementById("listaOcorrencias");
  if (!lista) {
    console.error("Elemento listaOcorrencias não encontrado no HTML!");
    return;
  }

  lista.innerHTML = "";

  if (!ocorrencias.length) {
    lista.innerHTML = "<p class='text-center text-muted'>Nenhuma ocorrência encontrada.</p>";
    return;
  }

  ocorrencias.forEach(ocorrencia => {
    console.log("Processando ocorrência:", ocorrencia);

    const li = document.createElement("li");
    li.classList.add("d-flex", "justify-content-between", "align-items-center");

    let dataFormatada = "";
    if (ocorrencia.dataOcorrencia) {
      dataFormatada = ocorrencia.dataOcorrencia.split("T")[0];
    }

    li.innerHTML = `
      <div>
        <h5>${ocorrencia.nome || "Sem Nome"}</h5>
        <p>${ocorrencia.descricao || "Sem descrição"}</p>
        <p>
          <small>
            Data: ${dataFormatada} | Horário: ${ocorrencia.horarioOcorrencia || "N/A"}<br>
            Local: ${
              ocorrencia.localizacao?.coordinates
                ? ocorrencia.localizacao.coordinates[1] + ", " + ocorrencia.localizacao.coordinates[0]
                : "N/A"
            }
          </small>
        </p>
      </div>
      <div class="d-flex flex-column gap-2">
        <button class="btn btn-warning btn-sm" onclick="handleEdit('${ocorrencia._id}')">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="handleDelete('${ocorrencia._id}')">Excluir</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

function handleDelete(id) {
  if (confirm("Tem certeza que deseja excluir esta ocorrência?")) {
    fetch(`${baseURL}/${id}`, { method: "DELETE" })
      .then(response => response.json())
      .then(data => {
        console.log("Ocorrência deletada:", data);
        carregarOcorrencias();
      })
      .catch(err => {
        console.error("Erro ao deletar ocorrência:", err);
        alert("Erro ao excluir a ocorrência. Veja o console para detalhes.");
      });
  }
}

function handleEdit(id) {
  window.location.href = `editarOcorrencia.html?id=${id}`;
}

document.addEventListener("DOMContentLoaded", carregarOcorrencias);
