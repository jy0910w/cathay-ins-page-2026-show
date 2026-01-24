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

  // Campaign Video Player Logic (Custom Cover)
  const videoCover = document.querySelector('.video-cover');
  const campaignVideo = document.getElementById('campaign-video');

  if (videoCover && campaignVideo) {
    videoCover.addEventListener('click', function() {
      this.classList.add('hide');
      campaignVideo.play().catch(error => {
        console.log("Autoplay prevented:", error);
        // If autoplay is blocked (rare on user interaction), we might need to show controls immediately
      });
    });

    campaignVideo.addEventListener('ended', function() {
      videoCover.classList.remove('hide');
      // Reset video
      campaignVideo.currentTime = 0;
      // Also on mobile, exiting full screen might happen, ensure inline plays
    });
  }

})();

// Floating Camera Button Logic
document.addEventListener('DOMContentLoaded', function() {
  var cameraBtn = document.getElementById('floatingCameraBtn');
  var videoInput = document.getElementById('danceVideoInput');
  var cameraContainer = document.querySelector('.global_floating_camera_container');
  var videoSection = document.getElementById('video');
  
  if(cameraBtn && videoInput && cameraContainer && videoSection) {
    // Scroll Monitor
    window.addEventListener('scroll', function() {
      // Logic: Show button when Video Section top reaches viewport (or desired trigger point)
      // Requirement: "滑動到出現section vedio時 這個按鈕才出現"
      var videoRect = videoSection.getBoundingClientRect();
      var triggerPoint = window.innerHeight * 0.8; // Trigger when video section is near bottom of viewport
      
      // If video section top is higher than trigger point (meaning it's entering view or passed)
      if (videoRect.top < triggerPoint) {
        cameraContainer.classList.add('visible');
      } else {
        cameraContainer.classList.remove('visible');
      }
    });

    cameraBtn.addEventListener('click', function() {
      // Trigger the hidden file input
      videoInput.click();
    });
    
    videoInput.addEventListener('change', function() {
      if (this.files && this.files.length > 0) {
        // Web limitations: Input capture doesn't automatically save to gallery on all devices (esp. iOS).
        // Solution: Create a download link to prompt the user to save the file manually.
        var file = this.files[0];
        var url = URL.createObjectURL(file);
        
        // Create invisible download link
        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // Generate a timestamped filename
        var timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15);
        a.download = 'cathay-dance-' + timestamp + '.mp4';
        
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          // Optional: Clear the input so same file can be selected again if needed
          videoInput.value = ''; 
          
          // Customized alert based on likely OS behavior
          // Android often downloads silently to 'Downloads' folder.
          // iOS requires manual confirmation and saves to 'Files' app (not Photos).
          var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
          
          if (isIOS) {
             alert('請點擊「下載」將影片儲存到手機檔案，稍後請至「檔案」App 找尋影片上傳。');
          } else {
             alert('影片已下載！請至相簿或下載資料夾確認，以便稍後上傳。');
          }
        }, 100);
      }
    });
  }
});
