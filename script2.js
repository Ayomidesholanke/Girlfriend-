// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  setTimeout(function() {
      const preloader = document.querySelector('.preloader');
      preloader.classList.add('fade-out');
      setTimeout(() => {
          preloader.style.display = 'none';
      }, 500);
  }, 2000);

  // Create floating hearts
  createFloatingHearts();

  // Image slider functionality
  initSlider();

  // Initialize scroll animations
  initScrollAnimations();

  // Initialize gallery lightbox
  initLightbox();

  // Initialize 3D cube
  initCube();
});

// Create floating hearts
function createFloatingHearts() {
  const heartsContainer = document.querySelector('.floating-hearts');
  const heartCount = 20;
  
  for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      
      // Random position
      heart.style.left = `${Math.random() * 100}%`;
      
      // Random size
      const size = Math.random() * 20 + 10;
      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;
      
      // Random animation duration
      const duration = Math.random() * 10 + 10;
      heart.style.animationDuration = `${duration}s`;
      
      // Random delay
      const delay = Math.random() * 10;
      heart.style.animationDelay = `${delay}s`;
      
      heartsContainer.appendChild(heart);
  }
}

// Image slider functionality
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  let currentSlide = 0;
  let slideInterval;

  // Start automatic slideshow
  startSlideshow();

  // Previous slide button
  prevBtn.addEventListener('click', () => {
      clearInterval(slideInterval);
      changeSlide(currentSlide - 1);
      startSlideshow();
  });

  // Next slide button
  nextBtn.addEventListener('click', () => {
      clearInterval(slideInterval);
      changeSlide(currentSlide + 1);
      startSlideshow();
  });

  // Dot navigation
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          clearInterval(slideInterval);
          changeSlide(index);
          startSlideshow();
      });
  });

  // Change slide function
  function changeSlide(index) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      
      currentSlide = (index + slides.length) % slides.length;
      
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
  }

  // Start automatic slideshow
  function startSlideshow() {
      slideInterval = setInterval(() => {
          changeSlide(currentSlide + 1);
      }, 5000);
  }

  // Scroll down button
  document.querySelector('.scroll-down').addEventListener('click', () => {
      const nextSection = document.querySelector('.parallax-section');
      nextSection.scrollIntoView({ behavior: 'smooth' });
  });
}

// Initialize scroll animations
function initScrollAnimations() {
  const animatedElements = [
      document.querySelector('.quote-box'),
      ...document.querySelectorAll('.gallery-item'),
      document.querySelector('.video-wrapper'),
      ...document.querySelectorAll('.timeline-item'),
      document.querySelector('.message-content')
  ];

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate');
              observer.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.1
  });

  animatedElements.forEach(element => {
      if (element) {
          observer.observe(element);
      }
  });
}

// Initialize gallery lightbox
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  let currentIndex = 0;

  // Open lightbox when clicking on gallery items
  galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
          currentIndex = index;
          const imgSrc = item.querySelector('.gallery-image').style.backgroundImage.slice(4, -1).replace(/"/g, "");
          const title = item.querySelector('h3').textContent;
          const description = item.querySelector('p').textContent;
          
          lightboxImage.src = imgSrc;
          lightboxCaption.querySelector('h3').textContent = title;
          lightboxCaption.querySelector('p').textContent = description;
          lightbox.style.display = 'flex';
          document.body.style.overflow = 'hidden';
      });
  });

  // Close lightbox
  lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
  });

  // Previous image
  lightboxPrev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      updateLightboxContent();
  });

  // Next image
  lightboxNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      updateLightboxContent();
  });

  // Update lightbox content
  function updateLightboxContent() {
      const item = galleryItems[currentIndex];
      const imgSrc = item.querySelector('.gallery-image').style.backgroundImage.slice(4, -1).replace(/"/g, "");
      const title = item.querySelector('h3').textContent;
      const description = item.querySelector('p').textContent;
      
      lightboxImage.src = imgSrc;
      lightboxCaption.querySelector('h3').textContent = title;
      lightboxCaption.querySelector('p').textContent = description;
  }

  // Close lightbox with Escape key
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
          lightbox.style.display = 'none';
          document.body.style.overflow = 'auto';
      }
  });

  // Navigate with arrow keys
  document.addEventListener('keydown', (e) => {
      if (lightbox.style.display === 'flex') {
          if (e.key === 'ArrowLeft') {
              currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
              updateLightboxContent();
          } else if (e.key === 'ArrowRight') {
              currentIndex = (currentIndex + 1) % galleryItems.length;
              updateLightboxContent();
          }
      }
  });
}

// Initialize 3D cube
function initCube() {
  const cube = document.querySelector('.cube');
  const controls = document.querySelectorAll('.cube-control');
  let rotateY = 15;
  let rotateX = -15;

  // Update cube rotation
  function updateCubeRotation() {
      cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  // Cube controls
  controls.forEach(control => {
      control.addEventListener('click', () => {
          const direction = control.getAttribute('data-direction');
          
          if (direction === 'left') {
              rotateY -= 90;
          } else if (direction === 'right') {
              rotateY += 90;
          }
          
          updateCubeRotation();
      });
  });

  // Auto-rotate cube slightly
  let autoRotate = setInterval(() => {
      rotateY += 0.5;
      updateCubeRotation();
  }, 100);

  // Stop auto-rotation when hovering over cube
  const cubeScene = document.querySelector('.cube-scene');
  cubeScene.addEventListener('mouseenter', () => {
      clearInterval(autoRotate);
  });

  // Resume auto-rotation when leaving cube
  cubeScene.addEventListener('mouseleave', () => {
      autoRotate = setInterval(() => {
          rotateY += 0.5;
          updateCubeRotation();
      }, 100);
  });

  // Handle cube drag rotation
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  cubeScene.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  document.addEventListener('mouseup', () => {
      isDragging = false;
  });

  document.addEventListener('mousemove', (e) => {
      if (isDragging) {
          const deltaMove = {
              x: e.clientX - previousMousePosition.x,
              y: e.clientY - previousMousePosition.y
          };

          rotateY += deltaMove.x * 0.5;
          rotateX -= deltaMove.y * 0.5;

          // Limit rotation on X axis
          rotateX = Math.max(-60, Math.min(60, rotateX));

          updateCubeRotation();
          previousMousePosition = { x: e.clientX, y: e.clientY };
      }
  });

  // Handle video placeholder click
  const videoPlaceholder = document.querySelector('.video-placeholder');
  videoPlaceholder.addEventListener('click', () => {
      // Replace this with actual video embed code
      alert('Add your video here!');
  });
}