/* ============================================================
   Clearwater Capital Group — shared site script (multi-page)
   ============================================================ */

/* ---------------- ACTIVE NAV STATE ---------------- */
(function(){
  let path = location.pathname.split('/').pop();
  if(!path) path = 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === path) a.classList.add('active');
  });
})();

/* ---------------- NAV SCROLL ---------------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll',()=>{ nav.classList.toggle('scrolled', window.scrollY>10); });

/* ---------------- DRAWER ---------------- */
const drawer = document.getElementById('drawer');
function openDrawer(){ drawer.classList.add('open'); document.body.style.overflow='hidden'; }
function closeDrawer(){ drawer.classList.remove('open'); document.body.style.overflow=''; }
const hb = document.getElementById('hamburger');
const dc = document.getElementById('drawerClose');
if(hb) hb.addEventListener('click',openDrawer);
if(dc) dc.addEventListener('click',closeDrawer);
if(drawer) drawer.addEventListener('click',e=>{ if(e.target===drawer) closeDrawer(); });

/* ---------------- REVEAL ON SCROLL ---------------- */
const io = new IntersectionObserver(entries=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
},{threshold:0.1, rootMargin:'0px 0px -6% 0px'});
function observeReveals(scope){
  (scope||document).querySelectorAll('[data-reveal]:not(.in)').forEach(el=>io.observe(el));
}
observeReveals(document);

/* ---------------- TABS (mortgage page) ---------------- */
document.querySelectorAll('.tab').forEach(t=>{
  t.addEventListener('click',()=>{
    const target = t.dataset.tab;
    document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active', x===t));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active', p.dataset.panel===target));
    observeReveals(document.querySelector('.tab-panel.active'));
  });
});

/* ---------------- FAQ ACCORDION ---------------- */
const faqs = {
  homeFaq:[
    ['Do you lend on both homes and commercial property?','Yes. Clearwater Capital Group works on residential mortgage lending and commercial real estate finance, so you can explore both under one relationship.'],
    ['Will applying affect anything before I commit?','Starting an application helps us understand your options. It is not a commitment to lend, and you are never obligated to move forward.'],
    ['What do you look at to understand my options?','Generally your credit profile, income, assets, and the property. Specific requirements vary by program and eligibility.'],
    ['Can you help first-time buyers?','Absolutely. We walk first-time buyers through pre-approval, buying power, and program comparison in plain language.'],
    ['How long does the process take?','It depends on the program, property, and how quickly documents come together. We work to keep things moving and set clear expectations.'],
    ['Do you guarantee a rate or approval?','No. Rates and approvals depend on market conditions and underwriting. We focus on giving you accurate information and realistic options.'],
    ['Is the online application secure?','Your information is submitted through a secure online application portal designed to protect your data.'],
    ['What does it cost to start?','Starting an application or a conversation to understand your options carries no obligation. We will be transparent about any costs before you proceed.']
  ],
  commFaq:[
    ['What property types do you finance?','Multifamily, mixed-use, retail, office, industrial, warehouse, hospitality, owner-occupied commercial, and investment properties, among others.'],
    ['What is DSCR and why does it matter?','Debt-service coverage ratio compares a property\u2019s net operating income to its debt service. Many investment programs weigh it heavily because it reflects whether the property can cover its own payment.'],
    ['Do you offer bridge financing?','We work on short-term bridge scenarios for timing gaps between acquisition, stabilization, or sale, subject to program eligibility.'],
    ['Can I do a cash-out refinance on a commercial property?','In many cases, yes. Availability depends on equity, income, the property, and underwriting review.'],
    ['Do you handle SBA-style financing?','We can help position owner-occupied scenarios; specific SBA programs are subject to eligibility and separate guidelines. We will never overpromise here.'],
    ['What documents should I prepare?','Commonly a rent roll and leases, operating statements, tax returns, and entity documents. We confirm the exact list for your file.'],
    ['Is the calculator an approval?','No. Our calculators are educational estimates only and are not approvals, quotes, or commitments to lend.'],
    ['How do I start?','Submit a financing request with the property and your goal, and we will review the numbers with you.']
  ],
  mortgageFaq:[
    ['How much do I need for a down payment?','It depends on the program and your profile. Some paths allow lower down payments than many buyers expect, while others have different requirements. We will walk you through what may apply to your situation.'],
    ['Can I get pre-approved before I find a home?','Yes \u2014 and it is usually the smart move. A pre-approval helps you understand your buying power and shows sellers you are a serious, prepared buyer.'],
    ['What if my credit is not perfect?','Credit is only one part of the picture. We will review your full profile and explain which options may be available rather than ruling anything out up front.'],
    ['How long does the process take?','It varies by program, property, and how quickly documents come together. We set clear expectations early and work to keep your file moving.'],
    ['What documents will I need?','Typically items that verify income, assets, and identity \u2014 things like recent pay stubs, bank statements, and tax returns. We give you a specific checklist for your file.'],
    ['Is there any cost or obligation to apply?','Starting an application or a conversation to understand your options carries no obligation. We are transparent about any costs before you proceed, and applying is not a commitment to lend.'],
    ['Do you handle the loan from start to closing?','Yes. You work with us through the whole process \u2014 from your first question to final closing \u2014 with guidance at each step.'],
    ['Can you help with both buying and refinancing?','Yes. Whether you are purchasing or refinancing, we help you compare the options that may fit your goals.']
  ],
  contactFaq:[
    ['How do I apply?','Use the secure online application button anywhere on this site, or send your details and a specialist will reach out.'],
    ['Is there any obligation?','No. Applying or requesting a callback does not obligate you to proceed and is not a commitment to lend.'],
    ['What happens right after I apply?','A specialist reviews your information, reaches out to confirm your goals, and shares a clear checklist of next steps.'],
    ['What if I am not sure which option fits?','That is exactly what the conversation is for. Choose \u201cNot sure yet\u201d and we will help you figure it out.'],
    ['How is my information protected?','Applications are submitted through a secure online portal, and we handle your details with care.'],
    ['Can you help with both residential and commercial?','Yes, both are available under one relationship with Clearwater Capital Group.']
  ]
};
function buildFaq(id){
  const c = document.getElementById(id); if(!c) return;
  faqs[id].forEach(([q,a])=>{
    const item = document.createElement('div'); item.className='faq-item';
    item.innerHTML = '<button class="faq-q">'+q+'<span class="pm"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg></span></button><div class="faq-a"><div>'+a+'</div></div>';
    const q_btn = item.querySelector('.faq-q'); const ans = item.querySelector('.faq-a');
    q_btn.addEventListener('click',()=>{
      const open = item.classList.contains('open');
      c.querySelectorAll('.faq-item').forEach(fi=>{ fi.classList.remove('open'); fi.querySelector('.faq-a').style.maxHeight=null; });
      if(!open){ item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight+'px'; }
    });
    c.appendChild(item);
  });
}
['homeFaq','mortgageFaq','commFaq','contactFaq'].forEach(buildFaq);

/* ---------------- RESOURCES (resources page) ---------------- */
const resources = [
  ['Fundamentals','Purchase vs. refinance: which question are you answering?','Buying and refinancing solve different problems. Here\u2019s how to tell which decision you are actually making.','purchase-vs-refinance.html'],
  ['Getting started','How pre-approval works','What a pre-approval reviews, what it signals to sellers, and why doing it early changes how you shop.','how-pre-approval-works.html'],
  ['Payments','What actually affects your mortgage payment','Principal, interest, taxes, insurance, and mortgage insurance \u2014 the five inputs that move your monthly number.','what-affects-your-mortgage-payment.html'],
  ['Programs','FHA vs. Conventional','A plain-language look at how these two common paths differ, and where each may make sense.','fha-vs-conventional.html'],
  ['Preparation','What documents you need for a mortgage','Income, assets, and identity \u2014 the paperwork that keeps your file moving without delays.','documents-you-need.html'],
  ['Commercial','Commercial real estate loan basics','How commercial financing is evaluated differently from a home loan, and what investors should expect.','commercial-loan-basics.html'],
  ['Investing','DSCR explained','Debt-service coverage ratio, why lenders care about it, and how investors use it to read a deal.','dscr-explained.html'],
  ['Strategy','Cash-out refinance strategy','When tapping equity can be a smart move \u2014 and the trade-offs worth weighing first.','cash-out-refinance-strategy.html'],
  ['Preparation','How to prepare before you apply','A short checklist to get organized so your application starts from a position of strength.','how-to-prepare-before-you-apply.html']
];
const resColors = [['#2E94C8','#0D1B2A'],['#1F2A5E','#2E94C8'],['#8E8E8E','#0D1B2A']];
function buildRes(){
  const g = document.getElementById('resGrid'); if(!g) return;
  resources.forEach((r,i)=>{
    const cols = resColors[i%3];
    const card = document.createElement('div'); card.className='res-card';
    card.setAttribute('data-reveal',''); card.setAttribute('data-d', String(i%3));
    card.innerHTML =
      '<div class="res-top" style="background:linear-gradient(135deg,'+cols[0]+'14,'+cols[1]+'08)">'
      +'<div class="pl" style="width:140px;height:26px;background:'+cols[0]+';top:14px;left:24px;opacity:.85"></div>'
      +'<div class="pl" style="width:160px;height:28px;background:'+cols[1]+';top:44px;left:10px;opacity:.55"></div>'
      +'<div class="pl" style="width:130px;height:24px;background:#8E8E8E;top:76px;left:30px;opacity:.4"></div></div>'
      +'<div class="res-body"><span class="res-cat">'+r[0]+'</span><h3>'+r[1]+'</h3><p>'+r[2]+'</p>'
      +'<span class="more">Read guide <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>';
    card.addEventListener('click',()=>{ location.href = r[3]; });
    g.appendChild(card);
  });
  observeReveals(g);
}
buildRes();

/* ---------------- CALCULATORS ---------------- */
const fmt = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
const num = id => parseFloat(document.getElementById(id).value)||0;
function amort(principal, annualRate, years){
  const r = annualRate/100/12, n = years*12;
  if(principal<=0) return 0;
  if(r===0) return principal/n;
  return principal*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
}
function calcMortgage(){
  const price=num('m_price'), down=num('m_down');
  const loan=Math.max(price-down,0);
  const pi=amort(loan,num('m_rate'),parseInt(document.getElementById('m_term').value));
  const tax=num('m_tax')/12, ins=num('m_ins')/12, hoa=num('m_hoa'), pmi=loan*(num('m_pmi')/100)/12;
  const total=pi+tax+ins+hoa+pmi;
  document.getElementById('m_pi').textContent=fmt.format(pi);
  document.getElementById('m_otax').textContent=fmt.format(tax);
  document.getElementById('m_oins').textContent=fmt.format(ins);
  document.getElementById('m_ohoa').textContent=fmt.format(hoa);
  document.getElementById('m_opmi').textContent=fmt.format(pmi);
  document.getElementById('m_total').innerHTML=fmt.format(total)+'<span>/mo</span>';
  const pct=price>0?Math.round(down/price*100):0;
  document.getElementById('m_dpct').textContent=pct+'%';
}
if(document.getElementById('m_price')){
  ['m_price','m_down','m_rate','m_term','m_tax','m_ins','m_hoa','m_pmi'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.addEventListener('input',calcMortgage);
  });
  calcMortgage();
}

function calcComm(){
  const value=num('c_value'), loan=num('c_loan');
  const pay=amort(loan,num('c_rate'),parseInt(document.getElementById('c_amort').value));
  const noiAnnual=(num('c_rent')-num('c_exp'))*12;
  const debtAnnual=pay*12;
  const dscr=debtAnnual>0?noiAnnual/debtAnnual:0;
  const ltv=value>0?loan/value*100:0;
  document.getElementById('c_pay').innerHTML=fmt.format(pay)+'<span>/mo</span>';
  document.getElementById('c_noi').textContent=fmt.format(noiAnnual);
  document.getElementById('c_dscr').textContent=dscr.toFixed(2)+'x';
  document.getElementById('c_ltv').textContent=Math.round(ltv)+'%';
}
if(document.getElementById('c_value')){
  ['c_value','c_loan','c_rate','c_amort','c_rent','c_exp'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.addEventListener('input',calcComm);
  });
  calcComm();
}

/* ---------------- INIT ---------------- */
const yrEl = document.getElementById('yr');
if(yrEl) yrEl.textContent = new Date().getFullYear();
