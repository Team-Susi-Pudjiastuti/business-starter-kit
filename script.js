    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
      if (mobileMenu.classList.contains('translate-y-full')) {
        mobileMenu.classList.remove('translate-y-full');
        mobileMenu.classList.add('translate-y-0');
        mobileMenuButton.innerHTML = '<i class="fas fa-times text-xl"></i>';
      } else {
        mobileMenu.classList.add('translate-y-full');
        mobileMenu.classList.remove('translate-y-0');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
      }
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-y-full');
        mobileMenu.classList.remove('translate-y-0');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
      });
    });
    
    // Progress bar animation
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      
      progressBar.style.transform = `scaleX(${scrollPercent})`;
      
      // Add active class for animation effect
      if (scrollTop > 100 && !progressBar.classList.contains('active')) {
        progressBar.classList.add('active');
      } else if (scrollTop <= 100 && progressBar.classList.contains('active')) {
        progressBar.classList.remove('active');
      }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger animations when elements come into view
          if (entry.target.classList.contains('float-in')) {
            entry.target.style.animationPlayState = 'running';
          }
          if (entry.target.classList.contains('stagger-children')) {
            entry.target.querySelectorAll('*').forEach((el, index) => {
              setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              }, index * 100);
            });
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe elements with animations
    document.querySelectorAll('.float-in, .stagger-children, .testimonial-fade').forEach(el => {
      observer.observe(el);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Add floating animation to feature icons
    document.addEventListener('DOMContentLoaded', () => {
      const featureIcons = document.querySelectorAll('.feature-icon');
      featureIcons.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
      });
    });
    
    // Add blossom animation to elements on page load
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        document.querySelectorAll('.blossom').forEach(el => {
          el.style.animationPlayState = 'running';
        });
      }, 500);
    });