

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const themeIcon = themeToggle.querySelector('.theme-icon');
  
  
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.classList.add(`theme-${savedTheme}`);
  updateThemeIcon(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('theme-dark');
    const newTheme = isDark ? 'light' : 'dark';

    body.classList.remove(isDark ? 'theme-dark' : 'theme-light');
    body.classList.add(`theme-${newTheme}`);
    
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  }

  
  function animateCircle(circleEl) {
    const percent = Number(circleEl.dataset.percent || 0);
    const circle = circleEl.querySelector('.circle');
    
    
    const defaultColor = getComputedStyle(document.documentElement).getPropertyValue('--circle-stroke').trim();
    
    if (!circle) return;
    circle.style.stroke = defaultColor; 
    
    const circumference = 100; 
    const target = percent;
    const duration = 1000 + percent * 10;
    let start = null;
    
    function step(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(1, elapsed / duration);
      const current = progress * target;
      const dashArray = `${current}, ${circumference}`;
      circle.setAttribute('stroke-dasharray', dashArray);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    
    requestAnimationFrame(step);
  }
  

  document.querySelectorAll('.skill-circle').forEach((el, idx) => {
 
    setTimeout(() => animateCircle(el), 200 + idx * 150);
    
    
    el.addEventListener('mouseenter', () => {
      const hoverColor = el.dataset.color || getComputedStyle(document.documentElement).getPropertyValue('--progress-fill').trim();
      const circle = el.querySelector('.circle');
      if (circle) {
        circle.style.stroke = hoverColor;
      }
    
      document.documentElement.style.setProperty('--hover-accent', hoverColor);
    });
    
    el.addEventListener('mouseleave', () => {
      
      const defaultColor = getComputedStyle(document.documentElement).getPropertyValue('--circle-stroke').trim();
      const circle = el.querySelector('.circle');
      if (circle) {
        circle.style.stroke = defaultColor;
      }
   
      document.documentElement.style.setProperty('--hover-accent', defaultColor);
    });
  });

  
  document.querySelectorAll('.software-item').forEach((item, idx) => {
    const bar = item.querySelector('.progress-fill');
    const width = item.dataset.progress; 
    
    if (bar && width) {
     
      setTimeout(() => {
        bar.style.width = `${width}%`; 
      }, 300 + idx * 100);
    }
  });

});