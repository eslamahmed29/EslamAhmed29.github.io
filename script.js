// Typing Effect
const roles = [
  '.NET Software Engineer',
  'Enterprise ERP & CRM Architect',
  'ASP.NET Core & SQL Server Specialist',
  'Clean Architecture & SOLID Advocate'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeLoop() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 65);
  } else {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 350);
      return;
    }
    setTimeout(typeLoop, 35);
  }
}
typeLoop();

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('eslam-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('eslam-theme', next);
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll Reveal & Counter Animation
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const counter = entry.target.querySelector('.counter');
        if (counter && !counter.dataset.counted) {
          animateCounter(counter);
        }
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

function animateCounter(el) {
  el.dataset.counted = 'true';
  const target = parseInt(el.dataset.target, 10);
  const duration = 1200;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(update);
}

// Project Filter Tabs
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Project Details Modal Data
const projectData = {
  'horus-erp': {
    category: 'Enterprise ERP • Euro Assist',
    title: 'Horus ERP — Enterprise Resource Planning',
    role: 'Role: .NET Backend Engineer (Architecture & Core Modules)',
    image: 'assets/images/horus-erp.jpg',
    summary:
      'A unified multi-module ERP platform serving 50+ daily internal users across departments, engineered with Clean Architecture and SOLID principles.',
    highlights: [
      'Architected 8 interconnected business modules: Accounting, Inventory, Production, Sales, Purchasing, HR, CRM, and Reporting.',
      'Enhanced financial and costing reports for higher calculation accuracy and significantly faster report generation.',
      'Implemented granular Role-Based Access Control (RBAC) and secure authentication across company departments.',
      'Built maintainable domain models and data access layers using Entity Framework Core and SQL Server.'
    ],
    tags: ['ASP.NET Core', 'Entity Framework Core', 'SQL Server', 'Clean Architecture', 'SOLID', 'RBAC']
  },
  'roadside-crm': {
    category: 'Production CRM • Euro Assist',
    title: 'Roadside Assistance CRM Platform',
    role: 'Role: .NET Backend Engineer (Workflows, Performance & Integrations)',
    image: 'assets/images/roadside-crm.jpg',
    summary:
      'Mission-critical production CRM supporting live roadside assistance operations, dispatch lifecycles, and multi-million-row customer lookups.',
    highlights: [
      'Optimized customer search queries and SQL Server indexing strategies across 1M+ customer records for rapid lookup response.',
      'Engineered real-time operational dispatch workflows and end-to-end service request tracking.',
      'Built and maintained reliable third-party API integrations with external service providers.',
      'Implemented automated background job processing using Hangfire for asynchronous workflows.'
    ],
    tags: ['ASP.NET Core', 'SQL Server', 'Hangfire', 'Query Optimization', 'Third-Party APIs', 'RESTful APIs']
  },
  'medical-crm': {
    category: 'Healthcare CRM • Euro Assist',
    title: 'Medical Insurance CRM',
    role: 'Role: .NET Backend Engineer (Backend Services & Domain Workflows)',
    image: 'assets/images/medical-crm.jpg',
    summary:
      'Enterprise healthcare CRM managing patient policies, medical approvals, claims processing, and insurance billing operations.',
    highlights: [
      'Designed secure backend services for patient management, claims lifecycle, and medical approval workflows.',
      'Enforced strict validation rules, auditability, and role-based access control for sensitive healthcare data.',
      'Structured high-reliability billing and reporting endpoints backed by SQL Server and EF Core.'
    ],
    tags: ['ASP.NET Core', 'Entity Framework Core', 'SQL Server', 'JWT', 'RBAC', 'Clean Architecture']
  },
  'medical-inventory': {
    category: 'Freelance Client Project',
    title: 'Medical Supplies Inventory System',
    role: 'Role: Full Backend Architect & Developer',
    image: 'assets/images/medical-inventory.jpg',
    summary:
      'Dedicated warehouse management platform built for a medical supplies client to control stock movements and run structured inventory audits.',
    highlights: [
      'Built complete inbound (receiving) and outbound (disbursement) tracking for medical tools and consumables.',
      'Implemented automated daily, monthly, and annual stocktaking (inventory audit) workflows.',
      'Provided real-time warehouse status visibility and variance reporting to prevent stockouts.'
    ],
    tags: ['ASP.NET Core', 'Entity Framework Core', 'SQL Server', 'Inventory Audits', 'Reporting']
  },
  'el-burhan': {
    category: 'Freelance • Art Of Coding (2023)',
    title: 'El Burhan Academy — Educational Platform',
    role: 'Role: Backend Software Engineer & Azure Deployment',
    image: 'assets/images/el-burhan-academy.jpg',
    summary:
      'Online learning platform powered by ASP.NET Core Web API, React frontend, and cloud hosting on Microsoft Azure.',
    highlights: [
      'Developed RESTful APIs using ASP.NET Core Web API with JWT Authentication and Role-Based Authorization.',
      'Collaborated on seamless integration with a React single-page application frontend.',
      'Configured and deployed the production backend and database environment on Microsoft Azure.'
    ],
    tags: ['ASP.NET Core Web API', 'JWT Authentication', 'RBAC', 'React', 'Microsoft Azure']
  }
};

const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalImg = document.getElementById('modalImg');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalRole = document.getElementById('modalRole');
const modalSummary = document.getElementById('modalSummary');
const modalHighlights = document.getElementById('modalHighlights');
const modalTags = document.getElementById('modalTags');

projectCards.forEach((card) => {
  card.addEventListener('click', () => {
    const data = projectData[card.dataset.project];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalRole.textContent = data.role;
    modalSummary.textContent = data.summary;

    modalHighlights.innerHTML = data.highlights.map((item) => `<li>${item}</li>`).join('');
    modalTags.innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// Copy to Clipboard + Toast
const toast = document.getElementById('toast');
let toastTimer;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      showToast(`Copied: ${text}`);
    } catch {
      showToast(`Contact: ${text}`);
    }
  });
});

// Dynamic Year
document.getElementById('year').textContent = new Date().getFullYear();
