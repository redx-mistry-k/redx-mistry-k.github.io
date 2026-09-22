'use strict';
// ADD PRODUCTS here. Use local licensed images and genuine Amazon Associates URLs.
// affiliateUrl: '#' is intentional until you have a real link. Never add unverified prices/ratings.
const products = [
  {
    "id": "power-bank",
    "name": "20,000mAh Power Bank",
    "category": "Travel",
    "description": "A backup for long days away from a socket.",
    "why": "Extra charging capacity can be useful when maps and tickets live on your phone.",
    "best": "Long journeys and shared charging",
    "consideration": "Check weight, charging output and your airline’s battery rules.",
    "image": "assets/images/power-bank.svg",
    "affiliateUrl": "https://link.amazon/B0d4D4wPL"
  },
  {
    "id": "organizer",
    "name": "Compact Travel Organizer",
    "category": "Travel",
    "description": "Give cables and small essentials a place.",
    "why": "Separate compartments help prevent a hunt through the bottom of your bag.",
    "best": "Short trips with a few accessories",
    "consideration": "Measure the pouch against your bag; too many compartments add bulk.",
    "image": "assets/images/organizer.svg",
    "affiliateUrl": "https://link.amazon/B0gdPqvjb"
  },
  {
    "id": "charger",
    "name": "USB-C Fast Charger",
    "category": "Tech",
    "description": "One compact charging point for everyday devices.",
    "why": "A compatible multi-port charger can reduce the adapters you carry.",
    "best": "Phones, tablets and compatible laptops",
    "consideration": "Check USB Power Delivery support and power sharing before choosing.",
    "image": "assets/images/charger.svg",
    "affiliateUrl": "https://link.amazon/B0b09DcMU"
  },
  {
    "id": "stand",
    "name": "Laptop Stand",
    "category": "Desk",
    "description": "Bring your screen a little closer to eye level.",
    "why": "An elevated screen can make a separate keyboard and mouse setup more comfortable.",
    "best": "A regular desk workspace",
    "consideration": "Check stability, laptop size and whether you need an external keyboard.",
    "image": "assets/images/stand.svg",
    "affiliateUrl": "https://link.amazon/B02B94ZWw"
  },
  {
    "id": "mount",
    "name": "Bike Phone Mount",
    "category": "Bike & Car",
    "description": "A secure place for navigation when parked or riding.",
    "why": "A suitable mount keeps navigation visible without holding the phone.",
    "best": "Compatible handlebars and phone cases",
    "consideration": "Check fit and vibration protection. Set navigation before moving.",
    "image": "assets/images/mount.svg",
    "affiliateUrl": "https://link.amazon/B017rwIqD"
  },
  {
    "id": "grooming",
    "name": "Portable Grooming Kit",
    "category": "Everyday",
    "description": "Keep the basics together when you are away.",
    "why": "A compact pouch makes it easier to remember the tools you already use.",
    "best": "Overnight stays and daily bags",
    "consideration": "Carry only what you need; check restrictions on sharp items when flying.",
    "image": "assets/images/grooming.svg",
    "affiliateUrl": "https://link.amazon/B0fTxGwNN"
  },
  {
    "id": "bottle",
    "name": "Reusable Water Bottle",
    "category": "Travel",
    "description": "A refillable bottle that fits your day bag.",
    "why": "Easy access to water is helpful on walks and travel days.",
    "best": "Walking and train journeys",
    "consideration": "Check lid seals and washability; empty it before airport security.",
    "image": "assets/images/bottle.svg",
    "affiliateUrl": "https://link.amazon/B0gKbyfsw"
  },
  {
    "id": "cubes",
    "name": "Packing Cubes",
    "category": "Travel",
    "description": "Separate clean clothes from the rest of your bag.",
    "why": "Small packing cubes make it easier to unpack only what you need.",
    "best": "Two-night stays and shared luggage",
    "consideration": "They organise space rather than increasing your baggage allowance.",
    "image": "assets/images/cubes.svg",
    "affiliateUrl": "https://link.amazon/B0bdBTtnz"
  },
  {
    "id": "rain",
    "name": "Packable Rain Layer",
    "category": "Travel",
    "description": "A light extra layer for changing weather.",
    "why": "A compact layer may save you from carrying a bulky jacket for a short shower.",
    "best": "Changeable forecasts",
    "consideration": "Water resistance varies. Check the material and seams for your conditions.",
    "image": "assets/images/rain.svg",
    "affiliateUrl": "https://link.amazon/B0bSxf99d"
  },
  {
    "id": "earplugs",
    "name": "Reusable Earplugs",
    "category": "Travel",
    "description": "A small addition for noisier nights.",
    "why": "A comfortable pair may help reduce background noise while resting.",
    "best": "Shared accommodation",
    "consideration": "Fit matters; do not use where hearing your surroundings is essential.",
    "image": "assets/images/earplugs.svg",
    "affiliateUrl": "https://link.amazon/B01p52d14"
  },
  {
    "id": "pouch",
    "name": "Document Pouch",
    "category": "Travel",
    "description": "Keep tickets and identification together.",
    "why": "One dedicated place can simplify check-ins and station changes.",
    "best": "Trips with paper documents",
    "consideration": "A pouch is not a security device; keep important documents with you.",
    "image": "assets/images/pouch.svg",
    "affiliateUrl": "https://link.amazon/B02E6PAu4"
  },
  {
    "id": "tote",
    "name": "Foldable Tote",
    "category": "Travel",
    "description": "An extra bag that packs down small.",
    "why": "Useful for groceries, laundry or a layer you no longer need to wear.",
    "best": "Day trips and unexpected extras",
    "consideration": "Check handle stitching and carry limits.",
    "image": "assets/images/tote.svg",
    "affiliateUrl": "https://link.amazon/B0beJyREC"
  },
  {
    "id": "cable",
    "name": "Charging Cable",
    "category": "Tech",
    "description": "A spare cable with the right connectors.",
    "why": "A clearly labelled cable is easier to grab when leaving in a hurry.",
    "best": "A small charging kit",
    "consideration": "Match connector type, supported wattage and cable length to your device.",
    "image": "assets/images/cable.svg",
    "affiliateUrl": "https://link.amazon/B0iQ1fLze"
  },
  {
    "id": "ties",
    "name": "Reusable Cable Ties",
    "category": "Desk",
    "description": "Gather the loose ends around your desk.",
    "why": "Reusable ties are easy to adjust when your setup changes.",
    "best": "Charging leads and monitor cables",
    "consideration": "Leave slack at connectors and avoid over-tightening.",
    "image": "assets/images/ties.svg",
    "affiliateUrl": "https://link.amazon/B06qI8NJg"
  },
  {
    "id": "tray",
    "name": "Small Catch-all Tray",
    "category": "Home",
    "description": "A landing spot for keys and pocket essentials.",
    "why": "A consistent place for daily items can make leaving home simpler.",
    "best": "Entryways and bedside tables",
    "consideration": "Measure the available surface and choose a wipe-clean material.",
    "image": "assets/images/tray.svg",
    "affiliateUrl": "https://link.amazon/B05sM2Et2"
  },
  {
    "id": "cloth",
    "name": "Microfibre Cleaning Cloth",
    "category": "Home",
    "description": "A washable cloth for everyday tidying.",
    "why": "A reusable cloth is a simple addition to an existing cleaning routine.",
    "best": "Suitable hard surfaces",
    "consideration": "Follow surface-care guidance, especially for coated screens.",
    "image": "assets/images/cloth.svg",
    "affiliateUrl": "https://link.amazon/B0bAd05ks"
  },
  {
    "id": "torch",
    "name": "Compact Torch",
    "category": "Bike & Car",
    "description": "A separate light for a roadside stop.",
    "why": "A small torch can be useful when your phone needs to stay charged.",
    "best": "Checking luggage or a parked vehicle",
    "consideration": "Keep batteries charged and store away from excessive heat.",
    "image": "assets/images/torch.svg",
    "affiliateUrl": "https://link.amazon/B04nK7TMj"
  }
];
// ADD ARTICLE SEARCH ENTRIES here, then create the corresponding HTML page.
const articles = [
  {
    "title": "10 Useful Things for a Weekend Trip",
    "category": "Travel",
    "description": "Pack a little lighter. Leave a little more prepared. Ten practical additions for your next two-night escape.",
    "url": "article-weekend-trip.html"
  },
  {
    "title": "Best Desk Accessories for a Clean Setup",
    "category": "Desk",
    "description": "A calmer workspace starts with a few considered choices, not a bigger shopping list.",
    "url": "article-desk-accessories.html"
  },
  {
    "title": "Useful Tech Under ₹1,000",
    "category": "Tech",
    "description": "A budget-minded checklist: connectors, compatibility and the small details worth checking.",
    "url": "article-useful-tech.html"
  },
  {
    "title": "Motorcycle Accessories Worth Carrying",
    "category": "Bike & Car",
    "description": "A short checklist for navigation, charging and the unexpected roadside stop.",
    "url": "article-motorcycle-accessories.html"
  },
  {
    "title": "Travel Essentials Worth Packing",
    "category": "Travel",
    "description": "The everyday pieces that can earn a permanent place in a travel bag.",
    "url": "article-travel-essentials.html"
  },
  {
    "title": "Simple Home Products That Make Life Easier",
    "category": "Home",
    "description": "Small improvements for the places where daily clutter tends to gather.",
    "url": "article-simple-home.html"
  }
];
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let toastTimer;
function notify(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),4500);}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){menu.click();menu.focus();}});
document.addEventListener('click',event=>{if(nav.classList.contains('open')&&!event.target.closest('.header-inner'))menu.click();});
function productCard(p){return '<article class="product-card" data-category="'+escapeHTML(p.category)+'"><img src="'+escapeHTML(p.image)+'" width="1000" height="750" loading="lazy" alt="Generic illustration for '+escapeHTML(p.name)+'"><div class="product-body"><div class="eyebrow">'+escapeHTML(p.category)+'</div><h3>'+escapeHTML(p.name)+'</h3><p>'+escapeHTML(p.description)+'</p><p class="reason"><strong>Why I picked it</strong> '+escapeHTML(p.why)+'</p><a class="amazon" data-product="'+p.id+'" href="'+escapeHTML(p.affiliateUrl)+'" target="_blank" rel="nofollow sponsored noopener">View on Amazon ↗</a><small>Affiliate link</small></div></article>';}
document.querySelectorAll('[data-products="latest"]').forEach(el=>el.innerHTML=products.slice(-3).map(productCard).join(''));
// The catalogue is the source of truth for affiliate URLs, including static article buttons.
document.querySelectorAll('a[data-product]').forEach(link=>{const p=products.find(p=>p.id===link.dataset.product);if(p)link.href=p.affiliateUrl;});
document.addEventListener('click',event=>{const link=event.target.closest('a[data-product]');if(link&&link.getAttribute('href')==='#'){event.preventDefault();notify('This recommendation’s Amazon link is coming soon.');}const soon=event.target.closest('[data-coming]');if(soon)notify(soon.dataset.coming);});
document.querySelectorAll('.filter-scope').forEach(scope=>{const buttons=scope.querySelectorAll('[data-filter]'),cards=scope.querySelectorAll('[data-category]');function filter(category){let count=0;cards.forEach(card=>{card.hidden=category!=='All'&&card.dataset.category!==category;if(!card.hidden)count++;});buttons.forEach(button=>button.setAttribute('aria-pressed',button.dataset.filter===category));scope.querySelector('.filter-status').textContent=count+' '+(count===1?'result':'results')+(category==='All'?'':' in '+category);scope.querySelector('.empty-state').hidden=count!==0;}buttons.forEach(button=>button.addEventListener('click',()=>filter(button.dataset.filter)));filter(scope.querySelector('[data-initial-category]')?.dataset.initialCategory||'All');});
const dialog=document.querySelector('#search-dialog'),search=document.querySelector('#search-input'),results=document.querySelector('#search-results');
const searchItems=[...articles.map(a=>({...a,type:'Guide'})),...products.map(p=>({title:p.name,category:p.category,description:p.description+' '+p.why,url:(articles.find(a=>a.category===p.category)||articles[0]).url,type:'Find',id:p.id}))];
// Product results lead directly to the relevant recommendation section, not an unrelated storefront.
const locations={"power-bank":"article-weekend-trip.html#pick-2","organizer":"article-weekend-trip.html#pick-1","charger":"article-desk-accessories.html#pick-3","stand":"article-desk-accessories.html#pick-1","mount":"article-motorcycle-accessories.html#pick-1","grooming":"article-weekend-trip.html#pick-10","bottle":"article-weekend-trip.html#pick-3","cubes":"article-weekend-trip.html#pick-4","rain":"article-weekend-trip.html#pick-5","earplugs":"article-weekend-trip.html#pick-6","pouch":"article-weekend-trip.html#pick-7","tote":"article-weekend-trip.html#pick-8","cable":"article-weekend-trip.html#pick-9","ties":"article-desk-accessories.html#pick-2","tray":"article-desk-accessories.html#pick-4","cloth":"article-useful-tech.html#pick-3","torch":"article-motorcycle-accessories.html#pick-2"};
function searchNow(){const query=search.value.trim().toLowerCase(),tokens=query.split(/\s+/).filter(Boolean);const matches=searchItems.filter(item=>tokens.every(token=>(item.title+' '+item.category+' '+item.description).toLowerCase().includes(token)));document.querySelector('#search-count').textContent=query?matches.length+' results for “'+search.value.trim()+'”':'Browse guides and useful finds';results.innerHTML=matches.length?matches.map(item=>'<a class="search-result" href="'+escapeHTML(item.id?locations[item.id]:item.url)+'"><span class="eyebrow">'+item.type+' / '+escapeHTML(item.category)+'</span><strong>'+escapeHTML(item.title)+'</strong><span>'+escapeHTML(item.description)+'</span></a>').join(''):'<p>No matches yet. Try “travel”, “charger” or “desk”.</p>';}
document.querySelector('.search-toggle').addEventListener('click',()=>{dialog.showModal();document.body.classList.add('modal-open');searchNow();search.focus();});
document.querySelector('.close-search').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');document.querySelector('.search-toggle').focus();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
search.addEventListener('input',searchNow);
document.querySelector('#newsletter')?.addEventListener('submit',event=>{event.preventDefault();document.querySelector('#newsletter-status').textContent='Newsletter coming soon.';event.target.reset();});
const topButton=document.querySelector('#back-top');window.addEventListener('scroll',()=>topButton.hidden=window.scrollY<650,{passive:true});topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
async function copyLink(){try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(location.href);}else{const input=document.createElement('textarea');input.value=location.href;input.style.position='fixed';input.style.opacity='0';document.body.append(input);input.select();const copied=document.execCommand('copy');input.remove();if(!copied)throw Error('copy');}notify('Guide link copied.');}catch{notify('Copy the page address from your browser to share this guide.');}}
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',copyLink));
document.querySelectorAll('[data-share]').forEach(button=>button.addEventListener('click',async()=>{if(navigator.share){try{await navigator.share({title:document.title,url:location.href});}catch(error){if(error.name!=='AbortError')await copyLink();}}else await copyLink();}));
