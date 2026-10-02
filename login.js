const discordButton=document.querySelector('#discordButton');
const toast=document.querySelector('#loginToast');
let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200);}
function continueWithDiscord(){
  discordButton.classList.add('is-clicked');
  sessionStorage.setItem('404-discord-auth','1');
  const next=new URLSearchParams(window.location.search).get('next');
  showToast('Đang xác thực với Discord…');
  setTimeout(()=>{window.location.href=next==='invite'?'./panel.html?invite=1':'./panel.html';},520);
}
discordButton?.addEventListener('click',continueWithDiscord);
document.querySelectorAll('button').forEach(button=>button.addEventListener('click',event=>{const ripple=document.createElement('span');ripple.className='ripple';const rect=button.getBoundingClientRect();ripple.style.left=(event.clientX-rect.left)+'px';ripple.style.top=(event.clientY-rect.top)+'px';button.appendChild(ripple);setTimeout(()=>ripple.remove(),600);}));