export const SAMPLE = `Bulut bilişim, işlem gücü ve depolama gibi bilişim kaynaklarının internet üzerinden sunulmasıdır. IaaS sanal sunucu ve ağ altyapısı sağlar. PaaS uygulama geliştirme ve dağıtım platformu sunar. SaaS ise tarayıcıdan kullanılan hazır yazılımdır. Bulut bilişimin avantajları ölçeklenebilirlik, esneklik ve başlangıç maliyetinin azalmasıdır. Riskler arasında internet bağımlılığı, veri gizliliği ve sağlayıcıya bağımlılık bulunur. Güçlü parola ve çok faktörlü kimlik doğrulama hesap güvenliğini artırır. Düzenli yedekleme veri kaybı riskini azaltır.`;
const split = t => t.replace(/\s+/g,' ').trim().match(/[^.!?]+[.!?]?/g)?.map(x=>x.trim()).filter(x=>x.length>22) || [];
const unique = a => [...new Set(a)];
export function demoGenerate(type,notes,count=5){
 const sentences=split(notes).slice(0,20);if(!sentences.length)throw Error('İşlenebilir ders notu bulunamadı.');
 const terms=unique(sentences.flatMap(s=>s.match(/\b[A-ZÇĞİÖŞÜ]{2,}\b/g)||[]));
 if(type==='summary')return {title:'Ders notlarının özeti',bullets:sentences.slice(0,Math.min(7,sentences.length)),keywords:terms.slice(0,8),tip:'Ana kavramları kendi cümlelerinle açıklamayı dene.'};
 const cards=sentences.map((s,i)=>({front:`Not ${i+1}: Bu ifadeyi açıkla`,back:s}));
 if(type==='flashcards')return {cards:cards.slice(0,12)};
 const pool=sentences.length>=4?sentences: [...sentences,...sentences,...sentences,...sentences];
 const questions=Array.from({length:count},(_,i)=>{const answer=sentences[i%sentences.length];const other=unique(pool.filter(s=>s!==answer));const distractors=[...other.slice(i%Math.max(1,other.length)),...other].slice(0,3);while(distractors.length<3)distractors.push('Bu bilgi verilen notlarda yer almamaktadır.');const correctIndex=i%4;const options=[...distractors];options.splice(correctIndex,0,answer);return {question:`Ders notlarına göre ${i+1}. doğru ifade hangisidir?`,options,answerIndex:correctIndex,explanation:answer};});
 return {questions};
}
export function validate(type,data){if(type==='summary')return data&&Array.isArray(data.bullets)&&Array.isArray(data.keywords);if(type==='flashcards')return data&&Array.isArray(data.cards)&&data.cards.every(c=>typeof c.front==='string'&&typeof c.back==='string');return data&&Array.isArray(data.questions)&&data.questions.every(q=>typeof q.question==='string'&&Array.isArray(q.options)&&q.options.length===4&&Number.isInteger(q.answerIndex)&&q.answerIndex>=0&&q.answerIndex<4);}
