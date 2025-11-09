// Seleciona o formulário e o espaço para mensagem
const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

// Função para validar CPF (simples)
function validarCPF(cpf) {
  return /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf);
}

// Função para validar Telefone
function validarTelefone(tel) {
  return /^\(\d{2}\)\s\d{4,5}\-\d{4}$/.test(tel);
}

// Função para validar CEP
function validarCEP(cep) {
  return /^\d{5}\-\d{3}$/.test(cep);
}

// Máscaras automáticas
document.getElementById("cpf").addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, "");
  if (valor.length > 9)
    e.target.value = valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, "$1.$2.$3-$4");
});

document.getElementById("telefone").addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, "");
  if (valor.length > 10)
    e.target.value = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
});

document.getElementById("cep").addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, "");
  if (valor.length > 7)
    e.target.value = valor.replace(/^(\d{5})(\d{3}).*/, "$1-$2");
});

// Evento de envio do formulário
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita recarregar a página
  mensagem.innerHTML = ""; // Limpa mensagens anteriores

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const cpf = form.cpf.value.trim();
  const telefone = form.telefone.value.trim();
  const cep = form.cep.value.trim();

  let erros = [];

  if (nome.length < 3) erros.push("O nome deve ter pelo menos 3 letras.");
  if (!email.includes("@")) erros.push("E-mail inválido.");
  if (!validarCPF(cpf)) erros.push("CPF inválido. Use o formato 000.000.000-00.");
  if (!validarTelefone(telefone))
    erros.push("Telefone inválido. Use o formato (00) 00000-0000.");
  if (!validarCEP(cep)) erros.push("CEP inválido. Use o formato 00000-000.");

  if (erros.length > 0) {
    mensagem.innerHTML = `<div class="erro">${erros.join("<br>")}</div>`;
  } else {
    mensagem.innerHTML = `<div class="sucesso">Cadastro enviado com sucesso! 🎉</div>`;
    form.reset(); // Limpa o formulário
  }
});
