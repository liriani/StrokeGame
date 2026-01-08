const levels = [
{ name: "1. Oficina Mecânica", mechanic: "match", layout: "standard", items: [ {id:"w",icon:"🔧"}, {id:"g",icon:"⚙️"}, {id:"o",icon:"🛢️"} ] },
{ name: "2. O Puma Branco", mechanic: "match", layout: "standard", items: [ {id:"wh",icon:"🛞"}, {id:"c",icon:"🚗"}, {id:"k",icon:"🔑"} ] },
{ name: "3. Na Estrada", mechanic: "match", layout: "standard", items: [ {id:"b",icon:"🚌"}, {id:"r",icon:"🛣️"}, {id:"t",icon:"🎫"} ] },
{ name: "4. Café da Manhã", mechanic: "match", layout: "standard", items: [ {id:"co",icon:"☕"}, {id:"br",icon:"🍞"}, {id:"ch",icon:"🧀"} ] },
{ name: "5. Uniforme", mechanic: "match", layout: "standard", items: [ {id:"sh",icon:"👔"}, {id:"ha",icon:"🧢"}, {id:"gl",icon:"👓"} ] },
{ name: "6. Caixa de Parafusos", mechanic: "match", layout: "corners", items: [ {id:"sc",icon:"🔩"}, {id:"na",icon:"📍"}, {id:"hk",icon:"🪝"}, {id:"mg",icon:"🧲"} ] },
{ name: "7. Churrasco Gaúcho", mechanic: "category", layout: "vertical_split", zones: [ {id:"fire",icon:"🔥",label:"Fogo"}, {id:"table",icon:"🍽️",label:"Mesa"} ], items: [ {id:"meat",icon:"🥩",target:"fire"}, {id:"wood",icon:"🪵",target:"fire"}, {id:"salt",icon:"🧂",target:"table"}, {id:"knife",icon:"🔪",target:"table"} ] },
{ name: "8. Preparar o Mate", mechanic: "single", layout: "center_target", zones: [ {id:"cuia",icon:"🧉",label:"Cuia"} ], items: [ {id:"herb",icon:"🌿",target:"cuia"}, {id:"kettle",icon:"🫖",target:"cuia"}, {id:"thermos",icon:"🌡️",target:"cuia"} ] },
{ name: "9. Limpeza do Ônibus", mechanic: "single", layout: "center_target", zones: [ {id:"bucket",icon:"🪣",label:"Lixo"} ], items: [ {id:"p1",icon:"📄",target:"bucket"}, {id:"ap",icon:"🍎",target:"bucket"}, {id:"cn",icon:"🥫",target:"bucket"}, {id:"p2",icon:"🗞️",target:"bucket"} ] },
{ name: "10. Colheita na Horta", mechanic: "vertical", layout: "standard", zones: [ {id:"bsk",icon:"🧺",label:"Cesta"} ], items: [ {id:"cr",icon:"🥕",target:"bsk"}, {id:"po",icon:"🥔",target:"bsk"}, {id:"on",icon:"🧅",target:"bsk"}, {id:"be",icon:"🍆",target:"bsk"} ] },
{ name: "11. Animais da Fazenda", mechanic: "match", layout: "corners", items: [ {id:"cow",icon:"🐄"}, {id:"chk",icon:"🐔"}, {id:"hrs",icon:"🐎"}, {id:"pig",icon:"🐖"} ] },
{ name: "12. Pescaria", mechanic: "vertical", layout: "standard", zones: [ {id:"boat",icon:"⛵",label:"Barco"} ], items: [ {id:"f1",icon:"🐟",target:"boat"}, {id:"f2",icon:"🐠",target:"boat"}, {id:"f3",icon:"🐡",target:"boat"} ] },
{ name: "13. Jogo de Cartas (Truco)", mechanic: "match", layout: "standard", items: [ {id:"sp",icon:"♠️"}, {id:"hr",icon:"♥️"}, {id:"dm",icon:"♦️"}, {id:"cl",icon:"♣️"} ] },
{ name: "14. Sinais de Trânsito", mechanic: "match", layout: "vertical_split", items: [ {id:"st",icon:"🛑"}, {id:"go",icon:"🟢"}, {id:"wr",icon:"⚠️"} ] },
{ name: "15. Hora de Dormir", mechanic: "match", layout: "corners", items: [ {id:"bd",icon:"🛏️"}, {id:"pl",icon:"😴"}, {id:"lp",icon:"💡"}, {id:"ck",icon:"⏰"} ] },
{
    name: "16. A Gatinha Naomi",
    mechanic: "single",
    layout: "center_target",
    zones: [ {id:"cat",icon:"🐈‍⬛",label:"Naomi"} ],
    items: [ {id:"fish",icon:"🐟",target:"cat"}, {id:"milk",icon:"🥛",target:"cat"}, {id:"yarn",icon:"🧶",target:"cat"} ]
},
{ name: "17. Dia de Chuva", mechanic: "match", layout: "standard", items: [ {id:"umb",icon:"☂️"}, {id:"cloud",icon:"🌧️"}, {id:"boot",icon:"👢"} ] },
{ name: "18. Ferramentas da Mala", mechanic: "single", layout: "vertical_split", zones: [ {id:"box",icon:"🧰",label:"Caixa"} ], items: [ {id:"hm",icon:"🔨",target:"box"}, {id:"sd",icon:"🪛",target:"box"}, {id:"pl",icon:"🔧",target:"box"} ] },
{ name: "19. Dinheiro do Passagem", mechanic: "category", layout: "standard", zones: [ {id:"coin",icon:"🪙",label:"Moeda"}, {id:"cash",icon:"💵",label:"Nota"} ], items: [ {id:"c1",icon:"🪙",target:"coin"}, {id:"m1",icon:"💵",target:"cash"}, {id:"c2",icon:"🪙",target:"coin"}, {id:"m2",icon:"💵",target:"cash"} ] },
{ name: "20. Volta para Casa", mechanic: "single", layout: "center_target", zones: [ {id:"home",icon:"🏠",label:"Lar"} ], items: [ {id:"fam",icon:"❤️",target:"home"}, {id:"bus2",icon:"🚌",target:"home"}, {id:"car2",icon:"🚗",target:"home"} ] }
];

let currentLevelIndex = 0;
let completedInLevel = 0;
let gameBoard, victoryModal, nextLevelBtn, levelMenu;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start(); osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'win') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.8);
        osc.start(); osc.stop(audioCtx.currentTime + 0.8);
    }
}

function ensureAudioReady() {
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    window.removeEventListener('pointerdown', ensureAudioReady);
}
window.addEventListener('pointerdown', ensureAudioReady, { once: true });

function initMenu() {
    levelMenu.innerHTML = '';
    levels.forEach((level, index) => {
        const btn = document.createElement('button');
        btn.className = 'level-btn';
        if(index === currentLevelIndex) btn.classList.add('active');
        let icon = '❓';
        if(level.zones) icon = level.zones[0].icon;
        else if(level.items) icon = level.items[0].icon;
        btn.innerHTML = `
                        <span>${index + 1}</span>
                        <span class="emoji">${icon}</span>
                    `;
        btn.onclick = () => {
            currentLevelIndex = index;
            loadLevel(index);
        };
        levelMenu.appendChild(btn);
    });
}

function restartLevel() { loadLevel(currentLevelIndex); }

function nextLevel() {
    currentLevelIndex++;
    if(currentLevelIndex >= levels.length) currentLevelIndex = 0;
    loadLevel(currentLevelIndex);
}

function loadLevel(index) {
    gameBoard.innerHTML = '<div id="level-title"></div>';
    victoryModal.classList.remove('visible');
    completedInLevel = 0;
    const levelData = levels[index];
    document.getElementById('level-title').textContent = levelData.name;
    const btns = document.querySelectorAll('.level-btn');
    btns.forEach((b, i) => {
        if(i === index) {
            b.classList.add('active');
            b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            b.classList.remove('active');
        }
    });
    renderLevelElements(levelData);
}

function renderLevelElements(levelData) {
    const zones = levelData.zones || levelData.items.map(i => ({id: i.id, icon: i.icon}));
    const items = levelData.items;
    zones.forEach((z, i) => {
        const zoneEl = document.createElement('div');
        zoneEl.className = 'drop-zone-wrapper';
        let innerHTML = '';
        let className = 'drop-zone';
        if (levelData.mechanic === 'match') {
            innerHTML = `<div class="shadow-icon">${z.icon}</div>`;
            zoneEl.dataset.type = z.id;
        } else if (levelData.mechanic === 'vertical') {
            className = 'drop-zone-basket';
            innerHTML = z.icon;
            zoneEl.dataset.type = z.id;
        } else {
            className = 'drop-zone-large';
            innerHTML = `<div class="large-icon">${z.icon}</div><div class="drop-zone-label">${z.label}</div>`;
            zoneEl.dataset.type = z.id;
        }
        zoneEl.innerHTML = `<div class="${className}">${innerHTML}</div>`;
        const layout = levelData.layout || 'standard';
        if (layout === 'standard' || layout === 'vertical') {
            zoneEl.style.top = '30px';
            const spacing = 100 / (zones.length + 1);
            zoneEl.style.left = `calc(${spacing * (i + 1)}% - 45px)`;
        }
        else if (layout === 'corners') {
            const isTop = i < 2;
            const isLeft = i % 2 === 0;
            zoneEl.style.top = isTop ? '30px' : 'auto';
            zoneEl.style.bottom = isTop ? 'auto' : '20px';
            zoneEl.style.left = isLeft ? '20px' : 'auto';
            zoneEl.style.right = isLeft ? 'auto' : '20px';
        }
        else if (layout === 'vertical_split') {
            zoneEl.style.left = '20px';
            const spacing = 100 / (zones.length + 1);
            zoneEl.style.top = `calc(${spacing * (i + 1)}% - 45px)`;
        }
        else if (layout === 'center_target') {
            zoneEl.style.top = '50%';
            zoneEl.style.left = '50%';
            zoneEl.style.transform = 'translate(-50%, -50%)';
        }
        gameBoard.appendChild(zoneEl);
    });
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    shuffledItems.forEach(item => {
        const draggable = document.createElement('div');
        draggable.className = 'draggable';
        draggable.textContent = item.icon;
        draggable.dataset.type = (levelData.mechanic === 'match') ? item.id : item.target;
        const layout = levelData.layout || 'standard';
        let minX = 10, maxX = 90, minY = 10, maxY = 90;
        if (layout === 'standard' || layout === 'vertical') {
            minY = 40; maxY = 85;
        }
        else if (layout === 'corners') {
            minX = 25; maxX = 75; minY = 25; maxY = 75;
        }
        else if (layout === 'vertical_split') {
            minX = 40; maxX = 90;
        }
        const boardW = gameBoard.offsetWidth;
        const boardH = gameBoard.offsetHeight;
        let safeX, safeY;
        let tries = 0;
        do {
            safeX = (Math.random() * (maxX - minX) + minX) / 100 * boardW;
            safeY = (Math.random() * (maxY - minY) + minY) / 100 * boardH;
            if (layout === 'center_target') {
                const centerX = boardW / 2, centerY = boardH / 2;
                const dist = Math.sqrt(Math.pow(safeX - centerX, 2) + Math.pow(safeY - centerY, 2));
                if (dist > 110) break;
            } else {
                break;
            }
            tries++;
        } while (tries < 10);
        safeX = Math.min(Math.max(safeX, 0), boardW - 80);
        safeY = Math.min(Math.max(safeY, 0), boardH - 80);
        draggable.style.left = safeX + 'px';
        draggable.style.top = safeY + 'px';
        draggable.style.transform = `rotate(${(Math.random() * 30) - 15}deg)`;
        gameBoard.appendChild(draggable);
        setupDraggable(draggable, items.length, levelData.mechanic);
    });
}

function setupDraggable(draggable, totalItems, mechanic) {
    let startX, startY;
    let shiftX, shiftY;
    let originalLeft, originalTop;

    const startDrag = (e) => {
        e.preventDefault();
        originalLeft = draggable.style.left;
        originalTop = draggable.style.top;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const rect = draggable.getBoundingClientRect();
        shiftX = clientX - rect.left;
        shiftY = clientY - rect.top;

        draggable.style.zIndex = 2000;
        draggable.style.transform = 'scale(1.1)';

        moveAt(clientX, clientY);

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);
    };

    const moveAt = (clientX, clientY) => {
        const boardRect = gameBoard.getBoundingClientRect();
        let newLeft = clientX - boardRect.left - shiftX;
        let newTop = clientY - boardRect.top - shiftY;
        draggable.style.left = newLeft + 'px';
        draggable.style.top = newTop + 'px';
    };

    const onMouseMove = (e) => moveAt(e.clientX, e.clientY);
    const onTouchMove = (e) => { e.preventDefault(); moveAt(e.touches[0].clientX, e.touches[0].clientY); };

    const stopDrag = (clientX, clientY) => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);

        draggable.style.visibility = 'hidden';
        const elemBelow = document.elementFromPoint(clientX, clientY);
        draggable.style.visibility = 'visible';

        if (!elemBelow) return resetPosition();

        const dropZoneWrapper = elemBelow.closest('.drop-zone-wrapper');

        if (dropZoneWrapper) {
            if (dropZoneWrapper.dataset.type === draggable.dataset.type) {
                successDrop(draggable, dropZoneWrapper.firstElementChild, totalItems, mechanic);
            } else {
                resetPosition();
            }
        } else {
            resetPosition();
        }
    };

    const onMouseUp = (e) => stopDrag(e.clientX, e.clientY);
    const onTouchEnd = (e) => stopDrag(e.changedTouches[0].clientX, e.changedTouches[0].clientY);

    const resetPosition = () => {
        draggable.style.transition = "all 0.3s ease";
        draggable.style.left = originalLeft;
        draggable.style.top = originalTop;
        draggable.style.transform = `rotate(${(Math.random() * 30) - 15}deg)`;
        draggable.style.zIndex = 100;

        setTimeout(() => {
            draggable.style.transition = "transform 0.1s";
        }, 300);
    };

    draggable.addEventListener('mousedown', startDrag);
    draggable.addEventListener('touchstart', startDrag, { passive: false });
}

function successDrop(item, zoneInnerEl, totalItems, mechanic) {
    playSound('success');

    zoneInnerEl.classList.add('correct');
    setTimeout(() => zoneInnerEl.classList.remove('correct'), 500);

    if (mechanic === 'match') {
        const wrapper = zoneInnerEl.parentElement;
        wrapper.appendChild(item);
        item.style.position = 'absolute';
        item.style.left = '50%';
        item.style.top = '50%';
        item.style.transform = 'translate(-50%, -50%)';
        item.style.transition = 'all 0.2s';
        const newItem = item.cloneNode(true);
        newItem.classList.add('fixed-completed-item');
        item.parentNode.replaceChild(newItem, item);
    } else {
        item.classList.add('consumed-item');
        setTimeout(() => item.remove(), 400);
    }

    completedInLevel++;
    if (completedInLevel === totalItems) {
        setTimeout(showLevelComplete, 800);
    }
}

function showLevelComplete() {
    playSound('win');
    startConfetti();
    victoryModal.classList.add('visible');

    if (currentLevelIndex >= levels.length - 1) {
        nextLevelBtn.innerHTML = "↺";
        nextLevelBtn.onclick = () => {
            currentLevelIndex = 0;
            loadLevel(0);
        }
    } else {
        nextLevelBtn.innerHTML = "➜";
        nextLevelBtn.onclick = nextLevel;
    }
}

function startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const pieces = [];
    for(let i=0; i<80; i++) {
        pieces.push({
            x: Math.random()*canvas.width, y: Math.random()*canvas.height - canvas.height,
            color: `hsl(${Math.random()*360}, 100%, 50%)`,
            size: Math.random()*8 + 4, speed: Math.random()*4 + 2
        });
    }
    function loop() {
        if(!victoryModal.classList.contains('visible')) return;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        pieces.forEach(p => {
            p.y += p.speed; if(p.y > canvas.height) p.y = -20;
            ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.size, p.size);
        });
        requestAnimationFrame(loop);
    }
    loop();
}

// DOM init and startup
window.addEventListener('DOMContentLoaded', () => {
    gameBoard = document.getElementById('game-board');
    victoryModal = document.getElementById('victoryModal');
    nextLevelBtn = document.getElementById('nextLevelBtn');
    levelMenu = document.getElementById('level-menu');

    initMenu();
    loadLevel(0);
});
