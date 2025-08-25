// Main JavaScript initialization for MW Design Studio
import { initPortfolioFilter } from './portfolio-filter.js';
import { initTabs } from './tabs.js';

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize portfolio filtering
  initPortfolioFilter();
  
  // Initialize tab functionality
  initTabs();
  
  // Smooth scrolling for anchor links
  initSmoothScroll();
});

// Smooth scrolling functionality
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Skip empty or just hash links
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

// Export for use in individual pages if needed
export { initPortfolioFilter, initTabs };