const inputQuestion = document.querySelector("#perguntar_ípt");
const result = document.querySelector("#result");

function ver_resultado() {
  if (inputQuestion.value) SendQuestion();
}

const OPENAI_API_KEY = "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"

function SendQuestion() {
  var sQuestion = inputQuestion.value;

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: sQuestion,
      max_tokens: 2048, // tamanho da resposta
      temperature: 0.5, // criatividade na resposta
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (result.value) result.value += "\n";

      if (json.error?.message) {
        result.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text || "Sem resposta";

        result.value = "Chat GPT: " + text;
      }

      result.scrollTop = result.scrollHeight;
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      inputQuestion.value = "";
      inputQuestion.disabled = false;
      inputQuestion.focus();
    });

  if (result.value) result.value = "\n\n\n";

  result.value = `Eu: ${sQuestion}`;
  inputQuestion.value = "Carregando...";
  inputQuestion.disabled = true;
}

/* sugestao  de senha*/

var lista_sugestao = ['Descreva a segunda guerra mundial', 'Como é programado uma IA', 'O palmeiras tem mundial'];

function nova_sugestao() {

  var lista = ['Cachorrow', 'winyc', 'leticia']

  var min = 0;
  var max = lista.length;
  var total = max - min;
  var aleatorio = (parseInt(Math.random() * total - min));

  div_sugestao.style.display = 'flex';

  text.innerHTML = `Nossa sugestão é ${lista[aleatorio]}`
}
function fechar_sugestao() {
  
  div_sugestao.style.display  = 'none';
}