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
        // iOS/Android Web Limitation:
        // Browsers cannot programmatically save files directly to the OS Photo Gallery/Camera Roll due to security sandbox.
        // The file is already captured/selected in the browser memory (this.files[0]).
        // 
        // Current behavior (download link): Saves to "Files" app on iOS, "Downloads" on Android. This is standard browser behavior.
        // 
        // To "save to album", the only standard web way is to let the user Long Press the video to "Save Video" 
        // OR rely on the fact that if they recorded it, it might have been autosaved by the OS camera UI (depending on specific browser/OS version).
        
        // Since the user is asking "Is there a way to save to album?", the answer is:
        // Pure Web App cannot force-save to Camera Roll.
        // 
        // Strategy Adjustment:
        // Instead of auto-downloading (which goes to Files), we can:
        // 1. Show the video in a modal/preview on the page.
        // 2. Instruct the user: "影片已錄製完成！若您使用的是 iPhone，請長按下方影片並選擇「加入照片」或是「儲存影片」以存入相簿。"
        
        var file = this.files[0];
        var url = URL.createObjectURL(file);
        
        // --- Create Preview Modal to help user save to album ---
        // Check if preview modal exists, if not create one
        var previewModal = document.getElementById('video_preview_modal');
        if (!previewModal) {
          previewModal = document.createElement('div');
          previewModal.id = 'video_preview_modal';
          previewModal.style.position = 'fixed';
          previewModal.style.top = '0';
          previewModal.style.left = '0';
          previewModal.style.width = '100%';
          previewModal.style.height = '100%';
          previewModal.style.backgroundColor = 'rgba(0,0,0,0.9)';
          previewModal.style.zIndex = '10000';
          previewModal.style.display = 'flex';
          previewModal.style.flexDirection = 'column';
          previewModal.style.alignItems = 'center';
          previewModal.style.justifyContent = 'center';
          previewModal.innerHTML = `
            <div style="color: white; margin-bottom: 20px; text-align: center; width: 90%;">
              <h3 style="margin-bottom: 10px; font-size: 1.2rem;">影片預覽</h3>
              <p style="font-size: 0.9rem; line-height: 1.5;">
                <span style="color: #FFC83B; font-weight: bold;">iPhone 用戶請注意：</span><br>
                請長按下方影片，選擇「儲存影片」或「加入照片」<br>
                即可將影片存入手機相簿。
              </p>
            </div>
            <video id="preview_video_player" controls playsinline style="max-width: 90%; max-height: 60vh; border: 2px solid white;"></video>
            <button id="close_preview_btn" style="margin-top: 20px; padding: 10px 30px; background: white; border: none; border-radius: 20px; font-weight: bold;">關閉</button>
          `;
          document.body.appendChild(previewModal);
          
          document.getElementById('close_preview_btn').addEventListener('click', function() {
             previewModal.style.display = 'none';
             // Revoke URL to free memory
             var player = document.getElementById('preview_video_player');
             if(player.src) window.URL.revokeObjectURL(player.src);
             player.src = '';
             videoInput.value = ''; // Reset input
          });
        }
        
        var player = document.getElementById('preview_video_player');
        player.src = url;
        previewModal.style.display = 'flex';
      }
    });
  }
});
