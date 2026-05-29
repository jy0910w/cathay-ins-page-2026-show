/**
 * 2026 Cathay Insurance Campaign
 * Logic for landing page interactions
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    console.log('Campaign 2026 initialized');
    
    // Init standard components if needed (reuse old project logic if applicable)
    // document.dispatchEvent(new Event('PageReady'));
  });

  // Example: Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Video Modal Logic
  const modal = document.getElementById('video_modal');
  const openBtns = document.querySelectorAll('.js-video-modal-btn');
  const closeBtns = document.querySelectorAll('.js-video-modal-close');
  const iframe = document.getElementById('youtube_player');
  // Store initial src
  let videoSrc = iframe ? iframe.getAttribute('src') : '';

  if (modal && openBtns.length > 0) {
    openBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (iframe) {
           let cleanSrc = videoSrc; 
           // Add autoplay if not present
           if (cleanSrc.indexOf('autoplay=1') === -1) {
              const separator = cleanSrc.includes('?') ? '&' : '?';
              cleanSrc += separator + "autoplay=1";
           }
           iframe.src = cleanSrc;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      // Use postMessage to stop video instead of reloading iframe
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(JSON.stringify({
          'event': 'command',
          'func': 'stopVideo',
          'args': ''
        }), '*');
      }
    };

    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // Campaign Video Player Logic (Custom Cover with YouTube)
  const videoCover = document.querySelector('.video-cover');
  const campaignVideo = document.getElementById('campaign-video');

  if (videoCover && campaignVideo) {
    videoCover.addEventListener('click', function() {
      this.classList.add('hide');
      // Show iframe and start playing
      campaignVideo.style.display = 'block';
      
      // Get current src and add autoplay if not present
      let src = campaignVideo.src;
      if (src.indexOf('autoplay=1') === -1) {
        const separator = src.includes('?') ? '&' : '?';
        campaignVideo.src = src + separator + 'autoplay=1';
      }
    });
    
    // Optional: Reset cover when clicking outside (if needed in future)
    // Note: YouTube iframe doesn't fire 'ended' event easily without API setup
  }

  // Mobile Prizes Navigation with Swiper
  const prizesSection = document.getElementById('prizes');
  
  if (prizesSection) {
    // Initialize Swiper for mobile
    let swiperInstance = null;
    
    // Create arrows if they don't exist
    // We reuse the classes defined in CSS
    const createArrows = () => {
       let prev = prizesSection.querySelector('.prize_nav_prev');
       let next = prizesSection.querySelector('.prize_nav_next');
       
       if (!prev) {
          prev = document.createElement('div');
          prev.className = 'prize_nav_arrow prize_nav_prev';
          prizesSection.appendChild(prev);
       }
       if (!next) {
          next = document.createElement('div');
          next.className = 'prize_nav_arrow prize_nav_next';
          prizesSection.appendChild(next);
       }
       return { prev, next };
    };

    const initSwiper = () => {
      const isMobile = window.innerWidth < 1024;
      
      if (isMobile) {
        const arrows = createArrows();
        // Show arrows
        arrows.prev.style.display = 'block';
        arrows.next.style.display = 'block';
        
        if (!swiperInstance && typeof Swiper !== 'undefined') {
          swiperInstance = new Swiper('.prizes_grid', {
            loop: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 16,
            loopedSlides: 4, // Stable count for 6 real slides
            navigation: {
              nextEl: arrows.next,
              prevEl: arrows.prev,
            },
          });
        }
      } else {
        // Desktop
        if (swiperInstance) {
          swiperInstance.destroy(true, true);
          swiperInstance = null;
        }
        // Hide arrows
        const prev = prizesSection.querySelector('.prize_nav_prev');
        const next = prizesSection.querySelector('.prize_nav_next');
        if (prev) prev.style.display = 'none';
        if (next) next.style.display = 'none';
      }
    };

    // Run on load and resize
    initSwiper();
    window.addEventListener('resize', initSwiper);
  }

})();

// Floating Camera Button Logic
document.addEventListener('DOMContentLoaded', function() {
  var cameraBtn = document.getElementById('floatingCameraBtn');
  var cameraContainer = document.querySelector('.global_floating_camera_container');
  var incentiveBanner = document.querySelector('.incentive_banner');
  var step1Footer = document.querySelector('.step1_footer');
  
  if(cameraBtn && cameraContainer && incentiveBanner && step1Footer) {
    var isAndroid = /Android/.test(navigator.userAgent);
    var isLine = /Line/.test(navigator.userAgent);

    var updateFloatingCameraVisibility = function() {
      // Hide on Android Line
      if (isAndroid && isLine) {
        cameraContainer.classList.remove('visible');
        return;
      }

      var isMobile = window.innerWidth < 1024;
      var triggerElement = isMobile ? step1Footer : incentiveBanner;
      var triggerRect = triggerElement.getBoundingClientRect();
      var shouldShow = isMobile
        ? triggerRect.bottom <= window.innerHeight
        : triggerRect.top <= window.innerHeight * 0.9;

      // Mobile: show when step1 footer bottom reaches viewport bottom.
      // Desktop: show when incentive banner top reaches 90% from viewport top.
      if (shouldShow) {
        cameraContainer.classList.add('visible');
      } else {
        cameraContainer.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', updateFloatingCameraVisibility);
    window.addEventListener('resize', updateFloatingCameraVisibility);
    updateFloatingCameraVisibility();

    cameraBtn.addEventListener('click', function() {
      // Mobile: Open URL
      // Desktop: Do nothing (handled by CSS pointer-events: none, but JS check added for safety)
      var isMobile = window.innerWidth < 1024;
      if (isMobile) {
          window.open('https://recorddemo.webarfilter.com', '_blank');
      }
    });
  }
});
