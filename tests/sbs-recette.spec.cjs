const {test,expect}=require('@playwright/test');

// SBS_TEST_BASE permet de rejouer ces parcours sur GitHub Pages après livraison.
const route=process.env.SBS_TEST_BASE||'/sbs-recette/index.html';
async function profile(page,{mode='transfer',origin='sef',status='c',car='yes',eligible='no'}={}){
 await page.locator('#mode').selectOption(mode);
 if(mode!=='new')await page.locator('#origin').selectOption(origin);
 await page.locator('#status').selectOption(status);
 if(mode!=='new')await page.locator('#car').selectOption(car);
 if(mode==='transfer'&&car==='yes')await page.locator('#eligible').selectOption(eligible);
}
async function vehicleTopic(page){
 await page.locator('#summary details').nth(2).locator('summary').click();
 return page.locator('#summary .topic').filter({has:page.getByRole('heading',{name:'Véhicule de fonction',exact:true})});
}
test.beforeEach(async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 page.__sbsErrors=errors;
 await page.goto(route);
});
test.afterEach(async({page})=>{expect(page.__sbsErrors).toEqual([])});

test('le questionnaire précède la brochure et attend toutes les réponses utiles',async({page})=>{
 await expect(page.locator('#summary')).toBeHidden();
 expect(await page.locator('#mode').evaluate(el=>Boolean(el.compareDocumentPosition(document.querySelector('.feature'))&Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
 await profile(page,{eligible:''});
 await expect(page.locator('#eligibleLabel')).toBeVisible();
 await expect(page.locator('#summary')).toBeHidden();
 await page.locator('#eligible').selectOption('no');
 await expect(page.getByRole('heading',{name:'Mon bilan',exact:true})).toBeVisible();
 await page.locator('#status').selectOption('');
 await expect(page.locator('#summary')).toBeHidden();
 await page.locator('#status').selectOption('nc');
 await expect(page.locator('#summary')).toBeVisible();
});

for(const mode of ['transfer','mob','new','unknown']){
 test('bilan complet et conseils structurés : '+mode,async({page})=>{
  await profile(page,{mode});
  await expect(page.locator('#summary')).toBeVisible();
  await expect(page.locator('#summary')).not.toContainText('undefined');
  await expect(page.locator('#summary details')).toHaveCount(4);
  await expect(page.getByRole('button',{name:/Lire la position publiée du S3E/})).toBeVisible();
  await expect(page.locator('#mail'))[mode==='transfer'?'toBeVisible':'toBeHidden']();
  await page.locator('#summary details').evaluateAll(ds=>ds.forEach(d=>d.open=true));
  for(const topic of await page.locator('#summary .topic').all()){
   await expect(topic).toContainText('Avant.');
   await expect(topic).toContainText('Après.');
   await expect(topic).toContainText('Conseil syndical.');
  }
  if(mode==='new'){
   await expect(page.locator('#originLabel')).toBeHidden();
   await expect(page.locator('#carLabel')).toBeHidden();
   await expect(page.locator('#eligibleLabel')).toBeHidden();
   await expect(page.locator('#summary')).not.toContainText('Vous relevez du groupe fermé.');
  }
  const dimensions=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width+1);
 });
}

test('véhicule : maintien personnel, critères remplis et réponses incertaines',async({page})=>{
 await profile(page);
 let topic=await vehicleTopic(page);
 await expect(topic).toContainText('Catégorie maintenue');
 await expect(topic).toContainText('sans limitation de durée');
 await expect(topic).toContainText('Toute renonciation est définitive');
 await expect(topic).toContainText('art. 19.2, p. 34');
 await page.locator('#eligible').selectOption('yes');
 topic=await vehicleTopic(page);
 await expect(topic).toContainText('Politique Groupe');
 await expect(topic).not.toContainText('Vous relevez du groupe fermé.');
 await page.locator('#eligible').selectOption('unknown');
 topic=await vehicleTopic(page);
 await expect(topic).toContainText('Éligibilité à confirmer');
 await expect(topic).toContainText('Si vous ne remplissez pas');
 await page.locator('#car').selectOption('unknown');
 topic=await vehicleTopic(page);
 await expect(page.locator('#eligibleLabel')).toBeHidden();
 await expect(topic).toContainText('reste à vérifier');
 await expect(topic).not.toContainText('Vous relevez du groupe fermé.');
 await page.locator('#car').selectOption('no');
 topic=await vehicleTopic(page);
 await expect(topic).toContainText('ne pas bénéficier');
 await expect(topic).not.toContainText('sans limitation de durée');
});

test('modifier le statut et comparer avec une embauche met à jour le bilan',async({page})=>{
 await profile(page,{status:'nc'});
 await expect(page.locator('#summary')).toContainText('Prime d’ancienneté');
 await page.locator('#status').selectOption('c');
 await expect(page.locator('#summary')).not.toContainText('Prime d’ancienneté');
 await page.getByRole('button',{name:'Comparer avec une embauche directe'}).click();
 await expect(page.locator('#mode')).toHaveValue('new');
 await expect(page.locator('#summary')).toContainText('proposition d’embauche');
 await expect(page.locator('#summary')).not.toContainText('Indemnité différentielle de transfert');
 await expect(page.locator('#mail')).toBeHidden();
});

test('chaque entité et statut produit des conseils complets',async({page})=>{
 await profile(page,{car:'no'});
 const origins=await page.locator('#origin option').evaluateAll(xs=>xs.map(x=>x.value).filter(Boolean));
 for(const origin of origins){
  await page.locator('#origin').selectOption(origin);
  for(const status of ['c','nc']){
   await page.locator('#status').selectOption(status);
   await expect(page.locator('#summary')).toBeVisible();
   await expect(page.locator('#summary')).not.toContainText('undefined');
  }
 }
});

test('brochure : les 17 images, navigation, raccourcis et position publiée',async({page})=>{
 await page.getByRole('button',{name:'Feuilleter la brochure complète'}).click();
 await expect(page.locator('#pages option')).toHaveCount(17);
 await expect(page.locator('#prev')).toBeDisabled();
 for(let n=1;n<=17;n++){
  await page.locator('#pages').selectOption(String(n));
  await expect(page.locator('#slide')).toHaveAttribute('alt',new RegExp('Diapositive '+n+' ·'));
  await expect.poll(()=>page.locator('#slide').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
 }
 await expect(page.locator('#next')).toBeDisabled();
 await page.locator('#prev').click();
 await expect(page.locator('#pages')).toHaveValue('16');
 await page.locator('#zoom').click();
 await expect(page.locator('#gallery')).toHaveClass('zoom');
 await page.locator('#zoom').click();
 await page.getByRole('button',{name:'Fermer',exact:true}).click();
 for(const [name,value]of [['Questions des salariés','4'],['La position du S3E','5'],['Comparatifs par entité','7']]){
  await page.getByRole('button',{name:new RegExp(name)}).click();
  await expect(page.locator('#pages')).toHaveValue(value);
  await page.keyboard.press('Escape');
 }
 await profile(page);
 await page.getByRole('button',{name:/Lire la position publiée du S3E/}).click();
 await expect(page.locator('#pages')).toHaveValue('5');
});

test('imprimer inclut tous les sujets et le courrier personnalisé',async({page},testInfo)=>{
 await profile(page);
 await page.locator('#letter').fill('Courrier de recette personnalisé — vérifier ma fiche.');
 await page.evaluate(()=>{
  window.__printCalled=false;
  window.print=()=>{window.__printCalled=true;window.dispatchEvent(new Event('beforeprint'))};
 });
 await page.getByRole('button',{name:'Imprimer mon bilan complet / PDF'}).click();
 expect(await page.evaluate(()=>window.__printCalled)).toBe(true);
 // Certains navigateurs ou moteurs PDF déclenchent beforeprint plusieurs fois.
 await page.evaluate(()=>window.dispatchEvent(new Event('beforeprint')));
 expect(await page.locator('#summary details').evaluateAll(ds=>ds.every(d=>d.open))).toBe(true);
 await expect(page.locator('#report-letter')).toHaveText('Courrier de recette personnalisé — vérifier ma fiche.');
 await page.emulateMedia({media:'print'});
 await expect(page.locator('#mode')).toBeHidden();
 await expect(page.locator('.feature')).toBeHidden();
 await expect(page.locator('#summary')).toBeVisible();
 await expect(page.locator('#summary .print-only')).toBeVisible();
 await page.pdf({path:testInfo.outputPath('bilan-sbs.pdf'),format:'A4'});
 await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));
 expect(await page.locator('#summary details[open]').count()).toBe(0);
});

test('les réponses restent locales et sont effacées au rechargement',async({page})=>{
 const outgoing=[];page.on('request',req=>{
  if(req.method()!=='GET'||['fetch','xhr','websocket'].includes(req.resourceType()))outgoing.push(req.url());
 });
 await profile(page);
 expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
 expect(outgoing).toEqual([]);
 await page.reload();
 await expect(page.locator('#mode')).toHaveValue('');
 await expect(page.locator('#summary')).toBeHidden();
});
