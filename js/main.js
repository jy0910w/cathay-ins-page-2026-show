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

  // Mobile Prizes Navigation Arrows
  // The CSS pseudo-elements are for display, but we'll add click handlers to the container
  // to detect clicks near the edges if the user taps the arrows
  const prizesSection = document.getElementById('prizes');
  const prizesGrid = document.querySelector('.prizes_grid');
  
  if (prizesSection && prizesGrid) {
    // Add real clickable arrows for better UX (optional overlay elements could also work)
    // Here we'll just check click coordinates on the container relative to width
    
    // Create actual clickable arrow elements for better reliability than pseudo-elements
    const leftArrow = document.createElement('div');
    leftArrow.className = 'prize_nav_arrow prize_nav_prev';
    // Styles moved to CSS class .prize_nav_arrow to fix path issues
    
    const rightArrow = document.createElement('div');
    rightArrow.className = 'prize_nav_arrow prize_nav_next';
    
    // Only append if screen is small
    if (window.innerWidth < 1024) {
      prizesSection.appendChild(leftArrow);
      prizesSection.appendChild(rightArrow);
      leftArrow.style.display = 'block';
      rightArrow.style.display = 'block';
    }
    
    // Handle scrolling
    const scrollAmount = window.innerWidth * 0.75; // Scroll by roughly one card width
    
    leftArrow.addEventListener('click', function() {
      prizesGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    rightArrow.addEventListener('click', function() {
      prizesGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    // Resize handler
    window.addEventListener('resize', function() {
      if (window.innerWidth < 1024) {
         if (!prizesSection.contains(leftArrow)) {
             prizesSection.appendChild(leftArrow);
             prizesSection.appendChild(rightArrow);
         }
         leftArrow.style.display = 'block';
         rightArrow.style.display = 'block';
      } else {
         leftArrow.style.display = 'none';
         rightArrow.style.display = 'none';
      }
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
    var isAndroid = /Android/.test(navigator.userAgent);
    var isLine = /Line/.test(navigator.userAgent);

    // Scroll Monitor
    window.addEventListener('scroll', function() {
      // Logic: Show button when Video Section top reaches viewport (or desired trigger point)
      // Requirement: "滑動到出現section vedio時 這個按鈕才出現"
      
      // Hide on Android Line
      if (isAndroid && isLine) {
        cameraContainer.classList.remove('visible');
        return;
      }

      var videoRect = videoSection.getBoundingClientRect();
      var triggerPoint = window.innerHeight * 0.8; // Trigger when video section is near bottom of viewport
      
      // If video section top is higher than trigger point (meaning it's entering view or passed)
      if (videoRect.top < triggerPoint) {
        cameraContainer.classList.add('visible');
      } else {
        cameraContainer.classList.remove('visible');
      }
    });

    // Fix for Line in-app browser on Android not opening camera
    // Line sometimes blocks file inputs unless they have specific attributes
    // We can try to force a click on a newly created input if the original one fails, 
    // but usually ensuring the input has accept="video/*" and capture="user" (or environment) is key.
    // Let's check the input attributes.
    if (!videoInput.hasAttribute('accept')) {
        videoInput.setAttribute('accept', 'video/*');
    }
    
    // FOR ANDROID LINE: If it goes straight to gallery, it might be missing 'capture'.
    // If we want to offer BOTH camera and gallery, 'capture' should normally be omitted.
    // But some Android webviews (like Line) might default to gallery if capture is missing.
    // To FORCE camera or at least prioritize it, we can try adding capture="camcorder" or capture="environment".
    // However, this might disable gallery.
    // 
    // User report: "Opens album directly instead of camera".
    // User Goal: Wants camera access.
    //
    // Strategy: Detect Android + Line, and force 'capture' attribute.
    // variables isAndroid and isLine are already defined above
    
    if (isAndroid && isLine) {
        // Line on Android is tricky. 
        // User reports that it opens album directly instead of camera.
        // Usually 'capture' forces camera. If 'capture' was already there (in HTML) or added by us, 
        // and it still opens album, it might be that Line ignores it or behaves inversely.
        // 
        // However, standard behavior for <input type="file" accept="video/*"> WITHOUT capture 
        // is to show a chooser (Camera / Files).
        // 
        // Let's try REMOVING 'capture' attribute if it exists, to let the OS chooser appear.
        // This gives the user the choice to pick Camera.
        if (videoInput.hasAttribute('capture')) {
            videoInput.removeAttribute('capture');
        }
    }

    // Attempt to workaround Line Android issue by resetting value on click
    videoInput.onclick = function() {
        this.value = null;
    };

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
              <p id="preview_instruction_text" style="font-size: 0.9rem; line-height: 1.5;">
                 <!-- Text will be updated dynamically -->
              </p>
            </div>
            <video id="preview_video_player" controls playsinline style="max-width: 90%; max-height: 50vh; border: 2px solid white; margin-bottom: 20px;"></video>
            
            <div style="display: flex; gap: 15px;">
              <button id="share_video_btn" style="padding: 10px 30px; background: #FFC83B; color: #333; border: none; border-radius: 20px; font-weight: bold; display: none;">儲存 / 分享</button>
              <button id="close_preview_btn" style="padding: 10px 30px; background: white; border: none; border-radius: 20px; font-weight: bold;">關閉</button>
            </div>
            <a id="fallback_download_link" style="color: #aaa; font-size: 0.8rem; margin-top: 15px; text-decoration: underline; cursor: pointer;">無法儲存？點此下載檔案</a>
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
        
        // --- Update Instruction Text based on OS ---
        var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        var isLine = /Line/.test(navigator.userAgent);
        var instructionTextEl = document.getElementById('preview_instruction_text');
        var shareBtn = document.getElementById('share_video_btn');
        var downloadLink = document.getElementById('fallback_download_link');
        
        if (isIOS) {
           instructionTextEl.innerHTML = `
             <span style="color: #FFC83B; font-weight: bold;">iPhone 用戶：</span><br>
             請點擊下方「儲存/分享」按鈕，<br>
             並在選單中選擇 <span style="border: 1px solid #fff; padding: 2px 5px; border-radius: 4px; font-size: 0.8em;">儲存影片</span> 即可存入相簿。
           `;
           // Show share button for iOS
           if (navigator.canShare && navigator.canShare({ files: [file] })) {
               shareBtn.style.display = 'block';
               downloadLink.style.display = 'none';
           } else {
               shareBtn.style.display = 'none';
               downloadLink.style.display = 'block';
           }
        } else {
           // Android or others
           instructionTextEl.innerHTML = `
             影片已錄製完成，<br>
             快前往活動貼文進行上傳吧！
           `;
           // Hide share/save buttons for Android as requested
           shareBtn.style.display = 'none';
           downloadLink.style.display = 'none';
        }
        
        // --- Update Logic for Share/Save Button (Run every time file changes) ---
        // Only attach handler if button is visible (which is mainly iOS now)
        if (shareBtn.style.display !== 'none') {
           shareBtn.onclick = function() {
             navigator.share({
               files: [file],
               title: '我的舞蹈影片',
               text: '參加國泰產險活動抽大獎！'
             })
             .then(() => console.log('Share successful'))
             .catch((error) => console.log('Share failed', error));
           };
        }
        
        if (downloadLink.style.display !== 'none') {
           downloadLink.onclick = function() {
             var a = document.createElement('a');
             a.style.display = 'none';
             a.href = url;
             var timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15);
             a.download = 'cathay-dance-' + timestamp + '.mp4';
             document.body.appendChild(a);
             a.click();
             setTimeout(function() { document.body.removeChild(a); }, 100);
           };
        }
      }
    });
  }
});
