'use strict';
const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:2}).format(n);
const number=id=>{const s=$(id).value.trim();if(s==='')throw Error('Complétez le montant : '+id);const n=Number(s);if(!Number.isFinite(n)||n<0)throw Error('Montant invalide : '+id);return n};
const patterns=[/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,/\b(?:matricule|nom|prénom|adresse|téléphone|telephone)\s*[:=]/i,/\b(?:\+33|0[1-9])(?:[ .-]?\d{2}){4}\b/];
function inspect(){const found=patterns.some(re=>re.test($('raw').value));$('privacy').textContent=found?'Attention : identifiant personnel possible dans le texte. Retirez-le avant toute utilisation.':'Aucun identifiant évident détecté. Cela ne garantit pas l’anonymat.';return found}
$('raw').addEventListener('input',inspect);
function parseAmount(s){const v=s.replace(/[€\s\u00a0\u202f]/g,'').replace(',','.');const n=Number(v);return Number.isFinite(n)?n:null}
function extract(){inspect();const lines=$('raw').value.split(/\n/);const map=[['before',/(?:actuel|avant|suez).*?(?:salaire|rémunération|remuneration)|(?:salaire|rémunération|remuneration).*?(?:actuel|avant|suez)/i],['after',/(?:sbs|après|apres).*?(?:salaire|rémunération|remuneration)|(?:salaire|rémunération|remuneration).*?(?:sbs|après|apres)/i],['comp',/indemnit[eé]|compensation/i]];let count=0;for(const line of lines){for(const [id,re] of map){if(re.test(line)){const candidates=line.match(/-?\d[\d\s\u00a0\u202f]*(?:[,.]\d{1,2})?/g)||[];const val=parseAmount(candidates[candidates.length-1]||'');if(val!==null&&val>=0){$(id).value=val;count++;break}}}}$('status').textContent=count+' montant(s) proposé(s). Vérifiez les valeurs avant analyse.'}
$('extract').onclick=extract;
$('clear').onclick=()=>{for(const id of ['raw','before','after','seniority','retirement','report'])$(id).value='';$('comp').value='0';$('bonusBefore').value='0';$('bonusAfter').value='0';$('growth').value='0';$('report').textContent='';$('copy').disabled=$('save').disabled=true;inspect();$('status').textContent='Données effacées.'};
function build(){const a=number('before')+number('bonusBefore'),b=number('after')+number('bonusAfter')+number('comp');const g=Number($('growth').value)/100;if(!Number.isFinite(g)||g<-.1||g>.2)throw Error('Revalorisation hors limites');const d=b-a;const sum=y=>{let total=0;for(let i=0;i<y;i++)total+=d*Math.pow(1+g,i);return total};const years=$('retirement').value||'non précisé';return ['ANALYSE SBS — PROTOTYPE NON VALIDÉ','Aucune disposition de l’accord SBS n’a été vérifiée.','', 'SITUATION ANNUELLE (BRUTS DÉCLARÉS)', 'Avant : '+money(a),'Après SBS avec indemnité déclarée : '+money(b),'Écart annuel initial : '+money(d),'Écart relatif : '+(a?((d/a)*100).toFixed(2)+' %':'non calculable'),'','PROJECTIONS ILLUSTRATIVES','Hypothèse : les deux rémunérations évoluent au même taux de '+(g*100).toFixed(1)+' % par an ; indemnité supposée maintenue et revalorisée, sans vérification contractuelle.','Écart cumulé sur 5 ans : '+money(sum(5)),'Écart cumulé sur 10 ans : '+money(sum(10)),'','SITUATION COMPLÉMENTAIRE','Ancienneté : '+($('seniority').value||'non précisée'),'Années avant retraite : '+years,'Véhicule de fonction : '+$('car').value,'','POINTS NON CALCULÉS / À VÉRIFIER','- Net après cotisations et impôt : données et règles insuffisantes.','- Droits retraite : assiettes, taux et historique non vérifiés.','- Mutuelle, prévoyance et avantages : informations absentes.','- Maintien et indexation de l’indemnité : clause SBS non vérifiée.','- Les chiffres collés ne sont pas interprétés juridiquement.','','QUESTIONS À POSER À L’EMPLOYEUR','1. Quelle est la durée exacte de la garantie de rémunération ?','2. L’indemnité est-elle soumise aux cotisations retraite et sur quelle assiette ?','3. Les primes et avantages sont-ils maintenus ?','4. Quel sera le net après prélèvements dans chaque situation ?','5. Que se passe-t-il à l’échéance des garanties ?','','IMPORTANT : ce rapport n’est pas une analyse IA ni un conseil juridique. Vérifiez les montants et les clauses avec les interlocuteurs compétents.'].join('\n')}
$('analyze').onclick=()=>{try{const report=build();$('report').textContent=report;$('copy').disabled=$('save').disabled=false;$('status').textContent='Rapport local généré. Aucune donnée envoyée à un serveur.'}catch(e){$('status').textContent=e.message}};
$('copy').onclick=async()=>{try{await navigator.clipboard.writeText($('report').textContent);$('status').textContent='Rapport copié.'}catch(e){$('status').textContent='Copie indisponible : sélectionnez le texte du rapport.'}};
$('save').onclick=()=>{const blob=new Blob([$('report').textContent],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='analyse-sbs-prototype.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};

(function(){
 const section=$('report').closest('section');
 const consent=document.createElement('label');consent.innerHTML='<input id="aiConsent" type="checkbox" style="width:auto"> Je confirme que le rapport ne contient pas de données permettant de m’identifier et j’accepte son envoi au fournisseur IA.';
 const button=document.createElement('button');button.id='aiAnalyze';button.textContent='Compléter avec l’agent IA';button.disabled=true;
 section.append(consent,button);
 $('analyze').addEventListener('click',()=>{button.disabled=!$('report').textContent});
 $('clear').addEventListener('click',()=>{button.disabled=true;$('aiConsent').checked=false});
 button.onclick=async()=>{
  const url=window.SBS_API_URL;
  if(!url){$('status').textContent='Agent IA non configuré. Le rapport local reste disponible.';return}
  if(!$('aiConsent').checked){$('status').textContent='Confirmez la vérification des données avant transmission.';return}
  const report=$('report').textContent;
  if(!report||report.length>9000){$('status').textContent='Rapport absent ou trop long.';return}
  button.disabled=true;$('status').textContent='Analyse IA en cours…';
  try{
   const res=await fetch(url.replace(/\/$/,'')+'/analyze',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({report})});
   const data=await res.json();if(!res.ok)throw Error(data.error||'Erreur IA');
   $('report').textContent=report+'\n\nANALYSE COMPLÉMENTAIRE PAR IA (NON VALIDÉE)\n'+data.analysis;
   $('status').textContent='Analyse IA ajoutée au rapport. Vérifiez toutes les conclusions.';
  }catch(e){$('status').textContent='Analyse IA indisponible : '+e.message+'. Rapport local conservé.'}
  finally{button.disabled=false}
 };
})();
