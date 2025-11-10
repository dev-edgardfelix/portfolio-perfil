//---------------------BACKGROUND----------------------

const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const points = [];
const numPoints = 80;

for (let i = 0; i < numPoints; i++) {
    points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
    });
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let p of points) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 150, 255, 0.8)';
        ctx.fill();
    }

    for (let i = 0; i < numPoints; i++) {
        for (let j = i + 1; j < numPoints; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 150, 255, ${1 - dist / 150})`;
                ctx.lineWidth = 0.8;
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}
animate();


//-----------------------MANDAR MENSAGEM NO WHATSAPP--------------------


document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("btnEnviar");

    btn.addEventListener("click", function () {
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const celular = document.getElementById("celular").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        if (!nome || !email || !celular || !mensagem) {
            alert("Por favor, preencha todos os campos antes de enviar!");
            return;
        }

        const numero = "5511982461456"; // 
        const texto = `Nome: *${nome}*! 
Email: ${email} 
Celular: ${celular} 

${mensagem}`;


        const mensagemEncode = encodeURIComponent(texto);
        const url = `https://wa.me/${numero}?text=${mensagemEncode}`;
        window.open(url, "_blank");
    });
});


//---------------------CARDS DOS PROJETOS--------------------------

const projetos = [
    {
        img: "media/sistem-users.png",
        titulo: "Sistem Users",
        descricao: "Sistema Front-End (React) para cadastrar usuários com informações pessoais e sobre seus cargos e funções / Informações sobre a quantidade de usuários cadastrados na plataforma",
        link: "https://sistemusers.vercel.app/"
    },

    {
        img: "media/conversor-cotacao.png",
        titulo: "Conversor de moedas estrangeiras",
        descricao: "Aplicação feita com JavaScript que converte o real brasileiro para outras moedas, a cotação monetária se mantém constante, pois há consumo de API Externa que atualiza quaisquer mudanças",
        link: "https://currencymoney.vercel.app/"
    },

    {
        img: "media/jokenpo.png",
        titulo: "Pedra, Papel, Tesoura !",
        descricao: "Uma forma dinâmica para treinamento de Funções e Funções com Parâmetros. Funções (Functions) é a 'base' da linguagem JavaScript, por isso é essencial sua prática. Você contra a máquina, um clássico Video Game!",
        link: "https://jokenpo-nine-phi.vercel.app/"
    }
];


const cardsContainer = document.querySelector(".cardsProjects");


projetos.forEach(projeto => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="${projeto.img}" alt="${projeto.titulo}">
        <h3>${projeto.titulo}</h3>
        <p>${projeto.descricao}</p>
        <a href="${projeto.link}" target="_blank">Ver projeto</a>
    `;

    cardsContainer.appendChild(card);
});
