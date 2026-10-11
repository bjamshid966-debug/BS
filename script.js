const $=s=>document.querySelector(s),R=a=>a[Math.floor(Math.random()*a.length)],N=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const M=['Иван','Пётр','Фёдор','Аркадий','Тимофей','Захар','Борис','Савелий'],
F=['Мария','Зинаида','Агафья','Полина','Клавдия','Глафира','Тамара','Василиса'],
S=[['Петров','Петрова'],['Бубликов','Бубликова'],['Сковородин','Сковородина'],['Пельменев','Пельменева'],['Самоваров','Самоварова'],['Огурцов','Огурцова'],['Валенков','Валенкова'],['Баранкин','Баранкина']],
PM=['Иванович','Петрович','Борисович','Кузьмич','Фёдорович'],PF=['Ивановна','Петровна','Борисовна','Кузьминична','Фёдоровна'];
const fio=()=>{const g=Math.random()<.5?0:1;return `${R(S)[g]} ${R(g?F:M)} ${R(g?PF:PM)}`};
const CERT=['обладает правом на один внеплановый чай с баранками','имеет официальное разрешение не отвечать на сообщения до обеда','считается человеком, которому всегда везёт с очередями','награждается правом выбирать музыку в такси','вправе в любой момент сказать «я подумаю»','обладает иммунитетом от фразы «а помнишь, ты обещал»','числится среди лучших знатоков того, где лежат запасные ключи','имеет право на второй завтрак без объяснения причин','получает бессрочное право на последний пирожок','допускается к управлению пультом от телевизора в выходные'];
const STAMPS=['ВЫДАНО','ОДОБРЕНО','СРОЧНО','В АРХИВ','УТВЕРЖДЕНО'];
const ADV=['Надень шапку — и всё сразу наладится.','Не спорь с самоваром.','Утро вечера мудренее, а борщ на второй день вкуснее.','Не откладывай на завтра пирожки, которые можно съесть сегодня.','Если сомневаешься — выпей чаю, потом сомневайся дальше.','Хороший человек — тот, кто звонит маме без повода.','Не всё то золото, что в банке с надписью «сахар».','Тише едешь — дальше от скандала.','Лучше иметь запасные носки, чем запасной план.','Что посеешь, то и съешь. Сажай картошку.'];
const FACTS=['У осьминога три сердца.','Ботанически бананы — это ягоды, а клубника ягодой не считается.','Байкал — самое глубокое озеро на Земле: его глубина превышает 1600 метров.','Московский метрополитен открыли в 1935 году.','Следы вомбата имеют форму кубиков — это уникальная особенность среди животных.','Сатурн в среднем менее плотный, чем вода.','Матрёшка появилась в России в конце XIX века.','Мёд из древних гробниц находили пригодным в пищу спустя тысячелетия.'];
const OP=['Выпить чаю','Позвонить маме','Прогуляться','Сделать сайт','Съесть пельмени','Лечь спать','Выучить слово','Ничего не делать'],COL=['#1f3a93','#c4302b','#25292f','#2e7d5b'];

let log=[];try{log=JSON.parse(localStorage.getItem('bs')||'[]')}catch(e){}
function render(){$('#log').innerHTML=log.length?log.map(x=>`<li>${x}</li>`).join(''):'<li class="empty">Журнал пуст. Получите справку, совет или бросьте кубик — запись появится здесь.</li>'}
function add(t){log.unshift(t);log=log.slice(0,8);try{localStorage.setItem('bs',JSON.stringify(log))}catch(e){}render()}
$('#clear').onclick=()=>{log=[];try{localStorage.removeItem('bs')}catch(e){}render()};

let tm;$('#take').onclick=()=>{clearInterval(tm);let q=N(4,9);const num='А-'+N(100,999),w=N(1,6);
const show=()=>{$('#tNum').textContent=num;$('#tInfo').textContent=q>0?`Перед вами: ${q} чел. Окно № ${w}`:`Ваша очередь! Проходите к окну № ${w}`};
show();add('Номерок '+num);tm=setInterval(()=>{if(q>0){q--;show()}else clearInterval(tm)},1800)};

$('#cert').onclick=()=>{const f=fio();$('#certOut').innerHTML=`<div>Справка № ${N(1000,9999)}</div><p>Настоящим подтверждается, что <b>${f}</b> ${R(CERT)}.</p><span class="stamp" style="--r:${N(-14,-4)}deg">${R(STAMPS)}</span>`;add('Справка: '+f)};
$('#adv').onclick=()=>{const a=R(ADV);$('#advOut').textContent='«'+a+'»';add('Совет: '+a)};
$('#fact').onclick=()=>{const a=R(FACTS);$('#factOut').textContent=a;add('Факт: '+a)};

const cv=$('#wheel'),cx=cv.getContext('2d'),K=OP.length,st=2*Math.PI/K;let ang=0,busy=0;
function draw(){const c=cv.width/2;cx.clearRect(0,0,cv.width,cv.height);OP.forEach((o,i)=>{cx.beginPath();cx.moveTo(c,c);cx.arc(c,c,c-6,ang+i*st,ang+(i+1)*st);cx.fillStyle=COL[i%4];cx.fill();cx.save();cx.translate(c,c);cx.rotate(ang+(i+.5)*st);cx.fillStyle='#fff';cx.font='15px "PT Serif",serif';cx.textAlign='right';cx.fillText(o,c-22,5);cx.restore()});cx.beginPath();cx.arc(c,c,16,0,7);cx.fillStyle='#f2c94c';cx.fill()}
draw();document.fonts&&document.fonts.ready.then(draw);
$('#spin').onclick=()=>{if(busy)return;busy=1;const a0=ang,tot=(5+Math.random()*3)*2*Math.PI,t0=performance.now(),D=4200;
const step=t=>{const p=Math.min((t-t0)/D,1);ang=a0+tot*(1-Math.pow(1-p,3));draw();if(p<1)requestAnimationFrame(step);else{busy=0;const rel=(((1.5*Math.PI-ang)%(2*Math.PI))+2*Math.PI)%(2*Math.PI),w=OP[Math.floor(rel/st)];$('#wheelOut').textContent='Постановлено: '+w;add('Колесо: '+w)}};requestAnimationFrame(step)};

const face='⚀⚁⚂⚃⚄⚅';
$('#d6').onclick=()=>{const n=N(1,6);$('#diceOut').textContent=face[n-1];$('#diceTxt').textContent='Выпало: '+n;add('Кубик d6: '+n)};
$('#d20').onclick=()=>{const n=N(1,20);$('#diceOut').textContent='⬡';$('#diceTxt').textContent='Выпало: '+n+(n==20?' — критический успех!':n==1?' — критическая неудача.':'');add('Кубик d20: '+n)};
let sec=N(1,100),tr=0;
$('#gForm').onsubmit=e=>{e.preventDefault();const v=+$('#gIn').value;tr++;$('#gOut').textContent=v<sec?`Больше. Попыток: ${tr}`:v>sec?`Меньше. Попыток: ${tr}`:`Верно! Число ${sec}, попыток: ${tr}`;if(v==sec){add(`Угадано число ${sec} за ${tr}`);sec=N(1,100);tr=0}};
$('#gNew').onclick=()=>{sec=N(1,100);tr=0;$('#gOut').textContent='Попыток: 0'};

const hex=(h,s,l)=>{s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));return '#'+[f(0),f(8),f(4)].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('')};
function pal(){const h=N(0,360);$('#pal').innerHTML=[0,1,2,3,4].map(i=>{const c=hex((h+i*N(20,60))%360,N(45,80),N(32,55));return `<button class="sw" style="background:${c}" data-c="${c}" aria-label="Цвет ${c}"><span>${c}</span></button>`}).join('')}
$('#palBtn').onclick=pal;pal();
$('#pal').onclick=e=>{const b=e.target.closest('.sw');if(!b)return;const c=b.dataset.c;document.documentElement.style.setProperty('--ink',c);try{navigator.clipboard.writeText(c)}catch(e){}$('#palOut').textContent='Скопировано: '+c;add('Цвет '+c)};

$('#theme').onclick=e=>{const n=document.body.classList.toggle('night');e.target.setAttribute('aria-pressed',n);e.target.textContent=n?'Дневная смена':'Ночная смена'};
render();
