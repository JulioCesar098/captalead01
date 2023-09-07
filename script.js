
const emailInput = document.getElementById("email");
const enviarButton = document.getElementById("enviar");
const compartilharButton = document.getElementById("compartilhar");
const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");
const message = document.querySelector(".message");
const telefoneInput = document.getElementById("telefone"); // Adicionamos uma referência ao input do telefone

// Recuperar o número de telefone armazenado, se existir
const telefoneArmazenado = localStorage.getItem("telefone");
if (telefoneArmazenado) {
    telefoneInput.value = telefoneArmazenado; // Preencha o campo de telefone com o valor armazenado
}


let compartilhamentos = 0;

enviarButton.addEventListener("click", () => {
    const email = emailInput.value;
    const telefone = telefoneInput.value;

    if (email && telefone) {
        enviarButton.style.display = "none"; // Oculta o botão de enviar
        compartilharButton.style.display = "block"; // Mostra o botão de compartilhar
        progressBar.style.display = "block"; // Mostra a barra de progresso
    }
});

compartilharButton.addEventListener("click", () => {
    const telefone = telefoneInput.value; // Obtém o número de telefone do campo

    compartilhamentos++;

    if (compartilhamentos <= 10) {
        navigator.share({
            title: "Título da Página",
            text: "Descrição do Conteúdo",
            url: window.location.href
        }).then(() => {
            // Atualize a barra de progresso e o texto de contagem
            const progresso = (compartilhamentos / 10) * 100;
            progressBar.style.width = `${progresso}%`;
            progressText.textContent = `${compartilhamentos} de 10 compartilhamentos`;

            // Armazene o número de telefone no localStorage
            localStorage.setItem("telefone", telefone);

            if (compartilhamentos === 10) {
                message.style.display = "block"; // Mostra a mensagem
            }
        }).catch((error) => {
            console.error("Erro ao compartilhar:", error);
        });
    } else {
        alert("Você já compartilhou o site 10 vezes!");
    }
});

// ...
