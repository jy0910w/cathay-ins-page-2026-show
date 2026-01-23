window.version = window.version || '';
window.siteUrl = window.siteUrl || '/';
window.breakpoint = 992;
window.webFont = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap'; 
// const appUrl = `${window.siteUrl}js/app`;
// const compUrl = `${window.siteUrl}js/comp`;

const appUrl = '../static/cathay';
const compUrl = '../static/cathay';

paths = {
  "app": appUrl,
  "comp": compUrl,
  "flickity":"flickity.pkgd.min",
  "dotlottie":"dotlottie-player.min",
  "tooltip": compUrl+"/tooltip",
};

// requirejs.config({
//   urlArgs: `v=${window.version}`,
//   "baseUrl": `${window.siteUrl}js/plugin`,
//   "paths": paths,
// });

// requirejs(["app/main"]);