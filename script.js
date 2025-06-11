let intervalId = null;

// === Animation d'écriture (typewriter) ===
function typeWriter(text, elementId, speed = 60) {
  const element = document.getElementById(elementId);
  if (!element) return;
  let i = 0;
  clearInterval(intervalId);
  element.textContent = '';
  intervalId = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(intervalId);
    }
  }, speed);
}

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById('sidebar-toggle').addEventListener('click', () => {
    document.body.classList.toggle('sidebar-hidden');
  });

  // === Message d’accueil
  typeWriter("Bienvenue sur mon portfolio", "landing-title", 70);

  // === Animation fade-in-up
  const animatedElements = document.querySelectorAll(".fade-in-up");
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });
  animatedElements.forEach(el => fadeObserver.observe(el));

  // === Animation au scroll (.animate-on-scroll + autres)
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillImages = document.querySelectorAll('.skill-image');
  const projectItems = document.querySelectorAll('.project-item');
  const activityCards = document.querySelectorAll('.activity-card');
  const textElements = document.querySelectorAll('.animate-on-scroll');
  const searchInput = document.getElementById('project-search');

  const visibilityObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const bar = entry.target.querySelector('.bar');
      if (entry.isIntersecting) {
        entry.target.classList.add('animate', 'visible');
        if (bar) bar.style.width = "100%";

        if (entry.target.classList.contains('activity-card')) {
          const delay = [...activityCards].indexOf(entry.target) * 150;
          entry.target.style.transitionDelay = `${delay}ms`;
        }

        if (entry.target.id === 'typewriter') {
          typeWriter("Qu’est-ce que le BTS SIO ?", "typewriter");
        }
      } else {
        entry.target.classList.remove('animate', 'visible');
        if (bar) bar.style.width = '0';
        entry.target.style.transitionDelay = '0ms';
      }
    });
  }, { threshold: 0.5 });

  [...skillBars, ...skillImages, ...projectItems, ...activityCards, ...textElements].forEach(el => visibilityObserver.observe(el));

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      document.querySelectorAll('.project-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
      });
    });
  }

  // === Affichage conditionnel des sections Épreuves
  document.querySelectorAll('.epreuve-card, .sub-link').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const id = btn.dataset.target || btn.getAttribute('href').replace('#', '');
      toggleEpreuveSection(id);
    });
  });

  function toggleEpreuveSection(targetId) {
    document.querySelectorAll('.epreuve-content').forEach(section => {
      if (section.id === targetId) {
        section.classList.remove('hidden-section');
        section.classList.add('show-section');

        const yOffset = -60;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        section.classList.remove('show-section');
        section.classList.add('hidden-section');
      }
    });
  }

  // === Navigation normale (hors E5/E6)
  document.querySelectorAll('nav a:not(.sub-link)').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href !== '#epreuve-e5' && href !== '#epreuve-e6') {
        document.querySelectorAll('.epreuve-content').forEach(section => {
          section.classList.remove('show-section');
          section.classList.add('hidden-section');
        });
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // === Photo au survol pour l’équipe
  const persons = document.querySelectorAll('.person-hover');
  persons.forEach(el => {
    const id = el.dataset.person;
    const tooltip = document.getElementById(`image-${id}`);
    if (!tooltip) return;

    el.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block';
    });

    el.addEventListener('mousemove', e => {
      tooltip.style.top = `${e.pageY + 10}px`;
      tooltip.style.left = `${e.pageX + 10}px`;
    });

    el.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  });

  // === Animation ligne (ex: arbre généalogique, parcours, etc.)
  const animatedLines = document.querySelectorAll(".animated-line");
  const lineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("reset-animation");
        void entry.target.offsetWidth;
        entry.target.classList.add("reset-animation");
      }
    });
  }, { threshold: 0.3 });
  animatedLines.forEach(el => lineObserver.observe(el));

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar nav a[href^="#"]');
  function highlightNav() {
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    sections.forEach(section => {
      const id = section.getAttribute('id');
      const link = document.querySelector(`.sidebar nav a[href="#${id}"]`);
      if (!link) return;
      const offset = section.offsetTop - 100;
      const height = section.offsetHeight;
      if (scrollPos >= offset && scrollPos < offset + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', highlightNav);
  highlightNav();
});
// Si besoin : activer animation au scroll
document.addEventListener("DOMContentLoaded", () => {
  const quantumSection = document.querySelector('.quantum-container');
  if (quantumSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          quantumSection.classList.add('animate');
        }
      });
    }, { threshold: 0.3 });
    observer.observe(quantumSection);
  }
});
