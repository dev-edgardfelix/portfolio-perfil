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
    //https://espaco-hannah.vercel.app/
    //https://star-god.vercel.app/

    {
        img: "media/stargod.png",
        titulo: "Vidraçaria StarGod",
        descricao: "Reposicionamento de marca premium através de UX de elite. Este ecossistema digital transforma a necessidade técnica em desejo estético, utilizando um design positivo e performático para maximizar a confiança do cliente e acelerar orçamentos com agilidade.",
        link: "https://star-god.vercel.app/"
    },
    {
        img: "media/hannah.png",
        titulo: "Espaço Mulher Hannah",
        descricao: "Transformação da jornada de agendamento em um serviço de luxo. Design de elite com sistema de reserva customizado e inteligência artificial 24h, projetado para elevar o posicionamento de mercado do Espaço Hannah através da tecnologia.",
        link: "https://espaco-hannah.vercel.app/"
    },
    {
        img: "media/hannah-painel.png",
        titulo: "System ADM - Hannah",
        descricao: "Plataforma SaaS para gestão completa do andamento da empresa e salão de beleza Mulher Hannah",
        link: "#"
    },
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





// --- Lógica do Menu Mobile (Versão Direta via JS) ---
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Função para abrir/fechar o menu
const toggleMenu = () => {
    // Verifica se o menu está escondido (estilo computado ou inline)
    const isHidden = window.getComputedStyle(navMenu).display === 'none';

    if (isHidden) {
        // Estilos para abrir o menu (Padrão Elite Premium)
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '80px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.backgroundColor = 'rgba(5, 5, 7, 0.95)';
        navMenu.style.backdropFilter = 'blur(15px)';
        navMenu.style.padding = '30px 0';
        navMenu.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        navMenu.style.textAlign = 'center';
        navMenu.style.zIndex = '1000';
        
        mobileMenuIcon.style.transform = 'rotate(90deg)';
    } else {
        // Fecha o menu
        navMenu.style.display = 'none';
        mobileMenuIcon.style.transform = 'rotate(0deg)';
    }
};

// Evento de clique no ícone
mobileMenuIcon.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que o clique feche o menu imediatamente
    toggleMenu();
});

// Fecha o menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            navMenu.style.display = 'none';
            mobileMenuIcon.style.transform = 'rotate(0deg)';
        }
    });
});

// Fecha o menu se clicar em qualquer lugar fora dele
document.addEventListener('click', (event) => {
    const isClickInside = navMenu.contains(event.target);
    const isClickOnIcon = mobileMenuIcon.contains(event.target);

    if (!isClickInside && !isClickOnIcon && navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
        mobileMenuIcon.style.transform = 'rotate(0deg)';
    }
});

// Resetar o menu ao redimensionar a tela para desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        navMenu.style.display = ''; // Remove estilos inline
        navMenu.style.flexDirection = '';
        mobileMenuIcon.style.transform = '';
    }
});