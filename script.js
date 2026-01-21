// --- Scroll Reveal Animation ---
// Adiciona a classe .visible quando o elemento entra na tela
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});


// --- Canvas Background (Otimizado) ---
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let points = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initPoints();
}

function initPoints() {
    points = [];
    // Menos pontos para mobile para performance
    const numPoints = window.innerWidth < 768 ? 40 : 80;

    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3, // Mais lento e elegante
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 1.5 + 0.5,
        });
    }
}

window.addEventListener('resize', resize);
resize();

function animate() {
    ctx.clearRect(0, 0, width, height);

    // Cor das linhas e pontos mais sutil (Azul Apple/System)
    const color = '100, 150, 255';

    for (let p of points) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.5)`;
        ctx.fill();
    }

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${color}, ${1 - dist / 120})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}
animate();


// --- Injeção de Projetos ---
const projetos = [
    {
        img: "media/sistem-users.png",
        titulo: "Sistem Users Dashboard",
        descricao: "Plataforma SaaS para gestão de hierarquia corporativa. Arquitetura React escalável com controle de estado complexo.",
        link: "https://sistemusers.vercel.app/"
    },
    {
        img: "media/conversor-cotacao.png",
        titulo: "Global Currency Converter",
        descricao: "Aplicação financeira em tempo real consumindo APIs de mercado. Foco em precisão decimal e baixa latência.",
        link: "https://currencymoney.vercel.app/"
    },
    {
        img: "media/jokenpo.png",
        titulo: "Logic Gaming Interface",
        descricao: "Experiência interativa demonstrando lógica algorítmica e manipulação dinâmica de DOM.",
        link: "https://jokenpo-nine-phi.vercel.app/"
    }
];

const cardsContainer = document.querySelector(".cardsProjects");

projetos.forEach(projeto => {
    // Adicionei uma imagem placeholder caso a sua não carregue, para testes
    const imageSrc = projeto.img ? projeto.img : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop';

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="${imageSrc}" alt="${projeto.titulo}" loading="lazy">
        <h3>${projeto.titulo}</h3>
        <p>${projeto.descricao}</p>
        <a href="${projeto.link}" target="_blank">View Project</a>
    `;
    cardsContainer.appendChild(card);
});


// --- WhatsApp Integration ---
document.getElementById("btnEnviar").addEventListener("click", function () {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !email || !mensagem) {
        alert("Para manter nosso padrão de qualidade, preencha as informações essenciais.");
        return;
    }

    const numero = "5511982461456";
    const texto = `*Nova Oportunidade de Negócio*\n\nSolicitante: ${nome}\nEmail: ${email}\nContato: ${celular}\n\n*Briefing:*\n${mensagem}`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
});