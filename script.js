// Animal Go-Stop Mapping
const animalCardCounts = {
    '01_gwang.jpg': 1,
    '02_yul.jpg': 1,
    '04_yul.jpg': 1,
    '06_yul.jpg': 2,
    '07_yul.jpg': 3,
    '08_yul.jpg': 3,
    '10_yul.jpg': 1,
    '11_gwang.jpg': 1,
    '12_gwang.jpg': 2,
    '12_yul.jpg': 1
};

// Define all 48 cards
const hwatuDeckSpecs = [
    { id: 1, month: 1, type: "gwang", name: "1월 광" },
    { id: 2, month: 1, type: "pi_1", name: "1월 피1" },
    { id: 3, month: 1, type: "pi_2", name: "1월 피2" },
    { id: 4, month: 1, type: "tti", name: "1월 홍단" },
    { id: 5, month: 2, type: "pi_1", name: "2월 피1" },
    { id: 6, month: 2, type: "pi_2", name: "2월 피2" },
    { id: 7, month: 2, type: "tti", name: "2월 홍단" },
    { id: 8, month: 2, type: "yul", name: "2월 열끝(매조)" },
    { id: 9, month: 3, type: "gwang", name: "3월 광" },
    { id: 10, month: 3, type: "pi_1", name: "3월 피1" },
    { id: 11, month: 3, type: "pi_2", name: "3월 피2" },
    { id: 12, month: 3, type: "tti", name: "3월 홍단" },
    { id: 13, month: 4, type: "pi_1", name: "4월 피1" },
    { id: 14, month: 4, type: "pi_2", name: "4월 피2" },
    { id: 15, month: 4, type: "tti", name: "4월 초단" },
    { id: 16, month: 4, type: "yul", name: "4월 열끝(흑싸리)" },
    { id: 17, month: 5, type: "pi_1", name: "5월 피1" },
    { id: 18, month: 5, type: "pi_2", name: "5월 피2" },
    { id: 19, month: 5, type: "tti", name: "5월 초단" },
    { id: 20, month: 5, type: "yul", name: "5월 열끝(난초)" },
    { id: 21, month: 6, type: "pi_1", name: "6월 피1" },
    { id: 22, month: 6, type: "pi_2", name: "6월 피2" },
    { id: 23, month: 6, type: "tti", name: "6월 청단" },
    { id: 24, month: 6, type: "yul", name: "6월 열끝(모란)" },
    { id: 25, month: 7, type: "pi_1", name: "7월 피1" },
    { id: 26, month: 7, type: "pi_2", name: "7월 피2" },
    { id: 27, month: 7, type: "tti", name: "7월 초단" },
    { id: 28, month: 7, type: "yul", name: "7월 열끝(홍싸리)" },
    { id: 29, month: 8, type: "gwang", name: "8월 광" },
    { id: 30, month: 8, type: "pi_1", name: "8월 피1" },
    { id: 31, month: 8, type: "pi_2", name: "8월 피2" },
    { id: 32, month: 8, type: "yul", name: "8월 열끝(고도리)" },
    { id: 33, month: 9, type: "pi_1", name: "9월 피1" },
    { id: 34, month: 9, type: "pi_2", name: "9월 피2" },
    { id: 35, month: 9, type: "tti", name: "9월 청단" },
    { id: 36, month: 9, type: "yul", name: "9월 열끝(쌍피가능)" },
    { id: 37, month: 10, type: "pi_1", name: "10월 피1" },
    { id: 38, month: 10, type: "pi_2", name: "10월 피2" },
    { id: 39, month: 10, type: "tti", name: "10월 청단" },
    { id: 40, month: 10, type: "yul", name: "10월 열끝" },
    { id: 41, month: 11, type: "gwang", name: "11월 광" },
    { id: 42, month: 11, type: "pi_1", name: "11월 쌍피1" },
    { id: 43, month: 11, type: "pi_2", name: "11월 쌍피2" },
    { id: 44, month: 11, type: "pi_3", name: "11월 피" },
    { id: 45, month: 12, type: "gwang", name: "12월 비광" },
    { id: 46, month: 12, type: "kasu", name: "12월 쌍피" },
    { id: 47, month: 12, type: "tti", name: "12월 비띠" },
    { id: 48, month: 12, type: "yul", name: "12월 열끝(비도리)" }
];

// Add image paths to specs
const fullDeck = hwatuDeckSpecs.map(card => {
    let typeName = card.type;
    return {
        ...card,
        imgSrc: `real_cards/${String(card.month).padStart(2, '0')}_${typeName}.jpg`
    };
});

// Persistent Game State (Wager and Turn)
let playerMoney = 50000;
let comMoney = 50000;
let lastWinner = 'player'; // Player deals first initially

// Game State
let deck = [];
let playerHand = [];
let comHand = [];
let floorCards = [];
let playerCollected = { gwang: [], yul: [], tti: [], pi: [] };
let comCollected = { gwang: [], yul: [], tti: [], pi: [] };
let currentTurn = null; // 'player' or 'com'
let isDealing = false;

// DOM Elements
const deckCountEl = document.getElementById('deck-count');
const playerHandEl = document.getElementById('player-hand');
const comHandEl = document.getElementById('com-hand');
const floorAreaEl = document.getElementById('floor-area');
const btnDeal = document.getElementById('btn-deal');

// Score Elements
const playerScoreEl = document.getElementById('player-score');
const comScoreEl = document.getElementById('com-score');
const playerMoneyEl = document.getElementById('player-money');
const comMoneyEl = document.getElementById('com-money');

// Collected Cards Count Elements (Player)
const pGwangCount = document.querySelector('#player-area .gwang-group .count');
const pYulCount = document.querySelector('#player-area .yul-group .count');
const pTtiCount = document.querySelector('#player-area .tti-group .count');
const pPiCount = document.querySelector('#player-area .pi-group .count');

// Collected Cards Count Elements (Com)
const cGwangCount = document.querySelector('#computer-area .gwang-group .count');
const cYulCount = document.querySelector('#computer-area .yul-group .count');
const cTtiCount = document.querySelector('#computer-area .tti-group .count');
const cPiCount = document.querySelector('#computer-area .pi-group .count');

// Initialize Game
function initGame() {
    deck = [...fullDeck];
    playerHand = [];
    comHand = [];
    floorCards = [];
    playerCollected = { gwang: [], yul: [], tti: [], pi: [] };
    comCollected = { gwang: [], yul: [], tti: [], pi: [] };
    currentTurn = null;
    isDealing = false;

    // Additional state logic for bomb and multipliers
    window.playerMultiplier = 1;
    window.comMultiplier = 1;
    window.playerEmptyTurns = 0;
    window.comEmptyTurns = 0;

    window.playerGoCount = 0;
    window.comGoCount = 0;
    window.playerMaxScore = 0;
    window.comMaxScore = 0;

    // Animal tracking
    window.playerAnimals = 0;
    window.comAnimals = 0;

    window.playerShook = false;
    window.comShook = false;
    window.waitingForGiri = false;

    // Turn context variables to detect events like ttaddak (따닥)
    window.turnContext = {
        playedCard: null,
        matchedFloorCards: [],
        potentialHandCapture: []
    };

    // Clear DOM
    playerHandEl.innerHTML = '';
    comHandEl.innerHTML = '';
    floorAreaEl.innerHTML = '';

    const pBadge = document.getElementById('player-go-count');
    if (pBadge) { pBadge.style.display = 'none'; pBadge.innerText = ''; }
    const cBadge = document.getElementById('com-go-count');
    if (cBadge) { cBadge.style.display = 'none'; cBadge.innerText = ''; }

    // Clear Shake/Bomb UI badges
    ['player-shake-badge', 'com-shake-badge', 'player-bomb-badge', 'com-bomb-badge'].forEach(id => {
        let el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    playerMoneyEl.innerText = playerMoney.toLocaleString();
    comMoneyEl.innerText = comMoney.toLocaleString();

    updateDeckCount();
    updateScoreUI();
}

function renderMiniCards(container, cards) {
    let imgContainer = container.querySelector('.mini-cards');
    if (!imgContainer) return;

    imgContainer.innerHTML = '';

    cards.forEach((c, idx) => {
        let img = document.createElement('img');
        img.src = c.imgSrc;
        img.className = 'mini-card-img';
        img.style.left = `${idx * 15}px`;
        imgContainer.appendChild(img);
    });

    let countSpan = container.querySelector('.count');
    if (countSpan) countSpan.innerText = cards.length;
}

function updateScoreUI() {
    if (!pGwangCount) return;

    // Player Score Update
    const pBreakdown = calculateScore(playerCollected, 'player');
    renderMiniCards(document.querySelector('#player-area .gwang-group'), playerCollected.gwang);
    renderMiniCards(document.querySelector('#player-area .yul-group'), playerCollected.yul);
    renderMiniCards(document.querySelector('#player-area .tti-group'), playerCollected.tti);
    renderMiniCards(document.querySelector('#player-area .pi-group'), playerCollected.pi);
    playerScoreEl.innerText = pBreakdown.total;
    updateJokboBadges('player', pBreakdown);

    // Computer Score Update
    const cBreakdown = calculateScore(comCollected, 'com');
    renderMiniCards(document.querySelector('#computer-area .gwang-group'), comCollected.gwang);
    renderMiniCards(document.querySelector('#computer-area .yul-group'), comCollected.yul);
    renderMiniCards(document.querySelector('#computer-area .tti-group'), comCollected.tti);
    renderMiniCards(document.querySelector('#computer-area .pi-group'), comCollected.pi);
    comScoreEl.innerText = cBreakdown.total;
    updateJokboBadges('com', cBreakdown);
}

function updateJokboBadges(owner, breakdown) {
    const containerId = (owner === 'player') ? 'player-jokbo-status' : 'com-jokbo-status';
    const container = document.getElementById(containerId);
    if (!container) return;

    const oppCollected = (owner === 'player') ? comCollected : playerCollected;

    // Check if Godori is blocked: opponent has any of yul 2, 4, 8
    const godoriBlocked = oppCollected.yul.some(c => [2, 4, 8].includes(c.month));
    // Check if Hongdan is blocked: opponent has any of tti 1, 2, 3
    const hongdanBlocked = oppCollected.tti.some(c => [1, 2, 3].includes(c.month));
    // Check if Chodan is blocked: opponent has any of tti 4, 5, 7
    const chodanBlocked = oppCollected.tti.some(c => [4, 5, 7].includes(c.month));
    // Check if Cheongdan is blocked: opponent has any of tti 6, 9, 10
    const cheongdanBlocked = oppCollected.tti.some(c => [6, 9, 10].includes(c.month));

    const items = [
        { key: 'godori', count: breakdown.godoriCount, label: '고도리', blocked: godoriBlocked },
        { key: 'hongdan', count: breakdown.hongdanCount, label: '홍단', blocked: hongdanBlocked },
        { key: 'chodan', count: breakdown.chodanCount, label: '초단', blocked: chodanBlocked },
        { key: 'cheongdan', count: breakdown.cheongdanCount, label: '청단', blocked: cheongdanBlocked }
    ];

    items.forEach(item => {
        const badgeEl = container.querySelector(`.jokbo-badge.${item.key}`);
        if (badgeEl) {
            console.log(`[JOKBO DEBUG] ${owner} - ${item.key}: count = ${item.count}, blocked = ${item.blocked}`);
            if (item.count === 3) {
                badgeEl.classList.remove('emergency');
                badgeEl.classList.add('active');
                badgeEl.innerText = item.label;
                badgeEl.style.cssText = 'display: inline-block !important;';
            } else if (item.count === 2 && !item.blocked) {
                badgeEl.classList.remove('active');
                badgeEl.classList.add('emergency');
                badgeEl.innerText = `${item.label} 비상!`;
                badgeEl.style.cssText = 'display: inline-block !important; background-color: #ff0000; padding: 2px 8px; border-radius: 4px; box-shadow: 0 0 10px red; margin-bottom: 2px;';
            } else {
                badgeEl.classList.remove('active', 'emergency');
                badgeEl.style.display = 'none';
            }
        }
    });
}

// Basic Score Calculation (simplified for this phase)
function calculateScore(collected, ownerType) {
    let breakdown = {
        total: 0, gwang: 0, yul: 0, tti: 0, pi: 0,
        piCount: 0, gwangCount: 0,
        godori: 0, hongdan: 0, chodan: 0, cheongdan: 0,
        multiplierObj: 1
    };

    // Gwang (광)
    let gwangCount = collected.gwang.length;
    let hasBiGwang = collected.gwang.some(c => c.month === 12);
    if (gwangCount === 5) breakdown.gwang = 15;
    else if (gwangCount === 4) breakdown.gwang = 4;
    else if (gwangCount === 3) breakdown.gwang = (hasBiGwang ? 2 : 3);

    // Yul (열끝)
    let yulCount = collected.yul.length;
    if (yulCount >= 5) breakdown.yul = yulCount - 4;

    // 고도리 (Godori)
    let godoriComp = [2, 4, 8].filter(month => collected.yul.some(c => c.month === month));
    breakdown.godoriCount = godoriComp.length;
    if (breakdown.godoriCount === 3) {
        breakdown.yul += 5;
        breakdown.godori = 5;
    }

    // Tti (띠)
    let ttiCount = collected.tti.length;
    if (ttiCount >= 5) breakdown.tti = ttiCount - 4;

    // 홍단 (Hongdan)
    let hongdanComp = [1, 2, 3].filter(month => collected.tti.some(c => c.month === month));
    breakdown.hongdanCount = hongdanComp.length;
    if (breakdown.hongdanCount === 3) {
        breakdown.tti += 3;
        breakdown.hongdan = 3;
    }

    // 초단 (Chodan)
    let chodanComp = [4, 5, 7].filter(month => collected.tti.some(c => c.month === month));
    breakdown.chodanCount = chodanComp.length;
    if (breakdown.chodanCount === 3) {
        breakdown.tti += 3;
        breakdown.chodan = 3;
    }

    // 청단 (Cheongdan)
    let cheongdanComp = [6, 9, 10].filter(month => collected.tti.some(c => c.month === month));
    breakdown.cheongdanCount = cheongdanComp.length;
    if (breakdown.cheongdanCount === 3) {
        breakdown.tti += 3;
        breakdown.cheongdan = 3;
    }

    // Pi (피)
    let piCount = 0;
    collected.pi.forEach(c => {
        if (c.type === 'pi_1' || c.type === 'pi_2') piCount += 1;
        if (c.type === 'pi_3' || c.type === 'kasu') piCount += 2; // 쌍피
    });
    if (piCount >= 10) breakdown.pi = piCount - 9;

    breakdown.piCount = piCount;
    breakdown.gwangCount = gwangCount;

    // Board Score Total
    breakdown.total = breakdown.gwang + breakdown.yul + breakdown.tti + breakdown.pi;

    // Apply Shake/Bomb multiplier (These are per-player globals)
    let mult = (ownerType === 'player') ? window.playerMultiplier : window.comMultiplier;
    if (mult > 1) {
        breakdown.multiplierObj *= mult;
        breakdown.total *= mult;
    }

    return breakdown;
}

// Fisher-Yates Shuffle Algorithm
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function updateDeckCount() {
    deckCountEl.innerText = deck.length;
}

// Create Card Element for DOM
function createCardElement(card, isHidden = false, onClickCallback = null) {
    const img = document.createElement('img');
    img.className = 'card-img';
    if (isHidden) {
        // Transparent PNG or red background is handled by CSS, but we can set a dummy src or keep it empty
        // For actual implementation, we might use a dedicated 'back.png' if available. Here we rely on CSS background color.
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // transparent 1x1 pixel
    } else {
        img.src = card.imgSrc;
        img.alt = card.name;
        img.title = card.name;
    }
    img.dataset.id = card.id;

    if (onClickCallback && !isHidden) {
        img.addEventListener('click', () => onClickCallback(card));
    }

    return img;
}

// Render the arrays to DOM
function renderBoard() {
    playerHandEl.innerHTML = '';
    playerHand.forEach((card, index) => {
        const clickable = (currentTurn === 'player' && !isDealing) ? handlePlayerPlayCard : null;
        const cardEl = createCardElement(card, false, clickable);
        // Add dynamic z-index so overlapping works cleanly left to right
        cardEl.style.zIndex = index;
        if (currentTurn === 'player') cardEl.classList.add('playable');
        playerHandEl.appendChild(cardEl);
    });

    comHandEl.innerHTML = '';
    comHand.forEach((card, index) => {
        const cardEl = createCardElement(card, true); // True for hidden
        cardEl.style.zIndex = index;
        comHandEl.appendChild(cardEl);
    });

    floorAreaEl.innerHTML = '';

    // Regular floor cards
    floorCards.forEach(card => {
        const cardEl = createCardElement(card);
        floorAreaEl.appendChild(cardEl);
    });

    // PENDING CAPTURES (Delayed movement)
    if (window.turnContext && window.turnContext.potentialHandCapture.length > 0) {
        window.turnContext.potentialHandCapture.forEach((card, idx) => {
            const cardEl = createCardElement(card);
            cardEl.classList.add('pending-capture');
            // Offset slightly to show overlapping
            cardEl.style.marginLeft = idx > 0 ? "-40px" : "10px";
            floorAreaEl.appendChild(cardEl);
        });
    }

    updateDeckCount();
    updateScoreUI();

    // Highlight deck if clickable or if manual empty turn is available
    const deckEl = document.getElementById('deck');
    if (currentTurn === 'player' && (window.waitingForGiri || window.playerEmptyTurns > 0)) {
        deckEl.classList.add('clickable-deck');
    } else {
        deckEl.classList.remove('clickable-deck');
    }

    // 흔들기 기능 활성화 검사
    checkShakeAvailability();

    // Highlight turn visually
    document.getElementById('player-area').classList.toggle('active-turn', currentTurn === 'player');
    document.getElementById('computer-area').classList.toggle('active-turn', currentTurn === 'com');
}

function checkShakeAvailability() {
    const btnShake = document.getElementById('btn-shake');
    if (currentTurn === 'player' && !window.playerShook && !isDealing) {
        let shakeMonth = -1;
        for (let i = 1; i <= 12; i++) {
            if (playerHand.filter(c => c.month === i).length === 3) {
                shakeMonth = i;
                break;
            }
        }

        if (shakeMonth !== -1) {
            // Shake check: must have 3 in hand AND 0 on floor for that month
            const floorMatch = floorCards.some(fc => fc.month === shakeMonth);
            if (!floorMatch) {
                btnShake.style.display = 'block';
                btnShake.dataset.month = shakeMonth;
            } else {
                btnShake.style.display = 'none';
            }
        } else {
            btnShake.style.display = 'none';
        }
    } else {
        btnShake.style.display = 'none';
    }
}

function executeShake(owner, month) {
    if (owner === 'player') {
        window.playerShook = true;
        window.playerMultiplier *= 2;
        document.getElementById('btn-shake').style.display = 'none';
        let badge = document.getElementById('player-shake-badge');
        if (badge) badge.style.display = 'inline-block';
    } else {
        window.comShook = true;
        window.comMultiplier *= 2;
        let badge = document.getElementById('com-shake-badge');
        if (badge) badge.style.display = 'inline-block';
    }

    showShakeCards(owner, month);
    showEventAlert('흔들기!', owner);
}

function showShakeCards(owner, month) {
    const overlay = document.getElementById('shake-overlay');
    const container = document.getElementById('shake-cards');
    container.innerHTML = '';

    const hand = (owner === 'player') ? playerHand : comHand;
    const cards = hand.filter(c => c.month === month);

    cards.forEach(card => {
        const img = document.createElement('img');
        img.src = card.imgSrc;
        img.className = 'card-img';
        img.style.width = '80px';
        img.style.height = '128px';
        container.appendChild(img);
    });

    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 1500);
}

function showBombCards(owner, cards) {
    const overlay = document.getElementById('bomb-overlay');
    const container = document.getElementById('bomb-cards');
    container.innerHTML = '';

    cards.forEach(card => {
        const img = document.createElement('img');
        img.src = card.imgSrc;
        img.className = 'card-img';
        img.style.width = '80px';
        img.style.height = '128px';
        container.appendChild(img);
    });

    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 1500);
}

// Deal Cards (Standard rule: 10 to each player, 8 to floor)
async function dealCards() {
    isDealing = true;
    initGame();
    shuffleDeck();
    btnDeal.style.display = 'none'; // Hide deal button after dealing

    // Dealing sequence:
    // When Player is dealer (선): Floor -> Com -> Player -> Floor -> Com -> Player
    // When Com is dealer (선): Floor -> Player -> Com -> Floor -> Player -> Com
    const dealerPlayer = lastWinner === 'player';

    const dealingSequence = [
        { dest: floorCards, count: 4, label: 'floor' },
        { dest: dealerPlayer ? comHand : playerHand, count: 5, label: dealerPlayer ? 'com' : 'player' },
        { dest: dealerPlayer ? playerHand : comHand, count: 5, label: dealerPlayer ? 'player' : 'com' },
        { dest: floorCards, count: 4, label: 'floor' },
        { dest: dealerPlayer ? comHand : playerHand, count: 5, label: dealerPlayer ? 'com' : 'player' },
        { dest: dealerPlayer ? playerHand : comHand, count: 5, label: dealerPlayer ? 'player' : 'com' }
    ];

    // Deal sequentially with 0.3s interval per card
    for (let i = 0; i < dealingSequence.length; i++) {
        let step = dealingSequence[i];
        for (let j = 0; j < step.count; j++) {
            let cardObj = deck.shift();
            step.dest.push(cardObj);

            // Optionally, we could animate from deck to hand, but a simple render
            // with a sound effect gives the "dealing one by one" feel smoothly.
            if (window.playCardSound) window.playCardSound();

            // Re-render specifically what was updated to show growth
            renderBoardDealingPhase();

            // Wait 0.3 seconds
            await new Promise(r => setTimeout(r, 300));
        }
    }

    // Sort hands by month for easier viewing
    playerHand.sort((a, b) => a.month - b.month);
    // Group floor cards by month
    floorCards.sort((a, b) => a.month - b.month);

    if (checkChongtong()) {
        isDealing = false;
        renderBoard();
        return;
    }

    currentTurn = lastWinner;
    isDealing = false;

    renderBoard();

    // If Com is dealer, trigger com's first play after a short delay
    if (currentTurn === 'com') {
        setTimeout(playComTurn, 1000);
    }
}

// Chongtong (총통) Logic
function checkChongtong() {
    for (let i = 1; i <= 12; i++) {
        if (playerHand.filter(c => c.month === i).length === 4) {
            handleChongtong('Player', i);
            return true;
        }
        if (comHand.filter(c => c.month === i).length === 4) {
            handleChongtong('Com', i);
            return true;
        }
    }
    return false;
}

function handleChongtong(winner, month) {
    setTimeout(() => {
        let playerName = winner === 'Player' ? '사용자(나)' : '컴퓨터';
        let msg = `총통! (${month}월 4장)\n${playerName}님이 처음 받은 패에 같은 달 4장이 있어 즉시 승리합니다! (5점 점수 인정)`;

        let wagerResultMsg = processGameEndWager(winner.toLowerCase(), 5);
        alert(msg + "\n\n" + wagerResultMsg);

        if (winner === 'Player') {
            playerScoreEl.innerText = 5;
            lastWinner = 'player';
        } else {
            comScoreEl.innerText = 5;
            lastWinner = 'com';
        }

        btnDeal.style.display = 'block';
        btnDeal.innerText = '판 돌리기';
        currentTurn = null;
    }, 500); // Wait for board render
}

function processGameEndWager(winnerStr, score) {
    // 1 point = 1,000 Won
    let winnings = score * 1000;

    // Check if loser has enough money
    if (winnerStr === 'player') {
        if (comMoney < winnings) winnings = comMoney;
        playerMoney += winnings;
        comMoney -= winnings;
    } else {
        if (playerMoney < winnings) winnings = playerMoney;
        comMoney += winnings;
        playerMoney -= winnings;
    }

    // Explicit UI Update just in case
    playerMoneyEl.innerText = playerMoney.toLocaleString();
    comMoneyEl.innerText = comMoney.toLocaleString();

    let text = `[머니 정산] ${winnings.toLocaleString()}원 획득!`;
    if (comMoney <= 0) {
        text += `\n컴퓨터 파산! 당신의 승리입니다. 게임이 완전히 종료됩니다.`;
        btnDeal.style.display = 'none'; // Lock out the game
    } else if (playerMoney <= 0) {
        text += `\n사용자 파산! 컴퓨터 플렉스! 접속을 종료합니다.`;
        btnDeal.style.display = 'none'; // Lock out the game
    }

    return text;
}

// Special render specifically for the deal phase so we don't trigger turn logic
function renderBoardDealingPhase() {
    playerHandEl.innerHTML = '';
    playerHand.forEach((card, index) => {
        const cardEl = createCardElement(card, false, null); // not clickable yet
        cardEl.style.zIndex = index;
        playerHandEl.appendChild(cardEl);
    });

    comHandEl.innerHTML = '';
    comHand.forEach((card, index) => {
        const cardEl = createCardElement(card, true); // True for hidden
        cardEl.style.zIndex = index;
        comHandEl.appendChild(cardEl);
    });

    floorAreaEl.innerHTML = '';
    floorCards.forEach(card => {
        const cardEl = createCardElement(card);
        floorAreaEl.appendChild(cardEl);
    });

    updateDeckCount();
}

// Core Play Mechanics (Player)
function handlePlayerPlayCard(playedCard) {
    if (currentTurn !== 'player' || isDealing || window.waitingForGiri) return;

    // Check Bomb condition: 3 in hand, 1 on floor
    const matchingHandCards = playerHand.filter(c => c.month === playedCard.month);
    const matchingFloorCards = floorCards.filter(c => c.month === playedCard.month);

    isDealing = true; // Prevent player from playing another card during animation

    if (matchingHandCards.length === 3 && matchingFloorCards.length === 1) {
        processBombPhase(matchingHandCards, matchingFloorCards[0], 'player');
        return;
    }

    const clickedEl = Array.from(playerHandEl.children).find(el => el.dataset.id == playedCard.id);

    animateCardThrow(clickedEl, playedCard, 'player', () => {
        if (window.playCardSound) window.playCardSound();
        playerHand = playerHand.filter(c => c.id !== playedCard.id);
        isDealing = false;
        processPlayPhase(playedCard, 'player');
    });
}

// Process a card played from hand
function processPlayPhase(playedCard, turnOwner) {
    // 1. Check match with floor
    let matchedFloorCards = floorCards.filter(c => c.month === playedCard.month);

    // Save context for Ssanda (Ppeok), Ttaddak, etc.
    window.turnContext.playedCard = playedCard;
    window.turnContext.matchedFloorCards = [...matchedFloorCards];
    window.turnContext.potentialHandCapture = [];

    if (matchedFloorCards.length === 0) {
        // No match -> goes to floor immediately (as potential for Jjok)
        floorCards.push(playedCard);
        renderBoard();
        promptGiriFlip(turnOwner);
    } else if (matchedFloorCards.length === 1) {
        // 1 match -> potentially capture (but wait for Giri to check for Ppeok)
        window.turnContext.potentialHandCapture = [playedCard, matchedFloorCards[0]];
        // Temporarily remove matched floor card to avoid Giri matching the same individual card
        floorCards = floorCards.filter(c => c.id !== matchedFloorCards[0].id);
        renderBoard();
        promptGiriFlip(turnOwner);
    } else if (matchedFloorCards.length === 3) {
        // 3 matches (Taking existing Ppeok or group) -> Take all immediately or wait?
        // In Go-Stop, 3 matches usually means you take them.
        // We'll defer this too for consistency.
        window.turnContext.potentialHandCapture = [playedCard, ...matchedFloorCards];
        floorCards = floorCards.filter(c => c.month !== playedCard.month);
        renderBoard();
        promptGiriFlip(turnOwner);
    } else if (matchedFloorCards.length === 2) {
        // 2 matches -> User / Com must select which one to take
        if (turnOwner === 'player') {
            showCardSelection(matchedFloorCards, (selectedCard) => {
                window.turnContext.potentialHandCapture = [playedCard, selectedCard];
                floorCards = floorCards.filter(c => c.id !== selectedCard.id);
                renderBoard();
                promptGiriFlip(turnOwner);
            });
        } else {
            // Com randomly picks one
            let pick = matchedFloorCards[Math.floor(Math.random() * matchedFloorCards.length)];
            window.turnContext.potentialHandCapture = [playedCard, pick];
            floorCards = floorCards.filter(c => c.id !== pick.id);
            renderBoard();
            promptGiriFlip(turnOwner);
        }
    }
}

function promptGiriFlip(turnOwner) {
    if (turnOwner === 'player') {
        window.waitingForGiri = true;
        document.getElementById('deck').classList.add('clickable-deck');
    } else {
        setTimeout(() => {
            animateGiriCard(turnOwner);
        }, 800);
    }
}

function animateGiriCard(turnOwner) {
    if (deck.length === 0) {
        processGiriPhase(turnOwner);
        return;
    }
    const giriCard = deck[0];
    const deckRect = document.getElementById('deck').getBoundingClientRect();
    const floorRect = floorAreaEl.getBoundingClientRect();

    const targetX = floorRect.left + floorRect.width / 2 - 30; // approx card half width
    const targetY = floorRect.top + floorRect.height / 2 - 47;

    const flyingCard = document.createElement('img');
    flyingCard.src = giriCard.imgSrc;
    flyingCard.className = 'card-img';
    flyingCard.style.position = 'fixed';
    flyingCard.style.left = `${deckRect.left}px`;
    flyingCard.style.top = `${deckRect.top}px`;
    flyingCard.style.zIndex = '9999';
    flyingCard.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    flyingCard.style.margin = '0';
    flyingCard.style.transform = 'scale(1)';
    flyingCard.style.pointerEvents = 'none';

    document.body.appendChild(flyingCard);

    flyingCard.getBoundingClientRect();

    const randomRotation = (Math.random() - 0.5) * 40;

    flyingCard.style.left = `${targetX}px`;
    flyingCard.style.top = `${targetY}px`;
    flyingCard.style.transform = `scale(1.1) rotate(${randomRotation}deg)`;

    flyingCard.addEventListener('transitionend', () => {
        flyingCard.remove();
        if (window.playCardSound) window.playCardSound();
        processGiriPhase(turnOwner);
    }, { once: true });
}

function processGiriPhase(turnOwner) {
    let giriCard = null;
    let matchedFloorCards = [];

    if (deck.length > 0) {
        giriCard = deck.shift();
        matchedFloorCards = floorCards.filter(c => c.month === giriCard.month);
    }

    let capturedThisTurn = [...(window.turnContext?.potentialHandCapture || [])];

    const isPlayerFinalTurn = (turnOwner === 'player' && playerHand.length === 0);
    const isComFinalTurn = (turnOwner === 'com' && comHand.length === 0);
    const isLastTurn = isPlayerFinalTurn || isComFinalTurn || (deck.length === 0 && !giriCard && playerHand.length === 0 && comHand.length === 0);

    // --- Ssanda (Ppeok) Logic ---
    let handCard = window.turnContext ? window.turnContext.playedCard : null;
    let handMatchedCount = (window.turnContext && window.turnContext.matchedFloorCards) ? window.turnContext.matchedFloorCards.length : 0;
    let isPpeok = false;

    if (!isLastTurn && handCard && giriCard && handCard.month === giriCard.month && handMatchedCount === 1) {
        isPpeok = true;
    }

    const finishGiriPhase = () => {
        if (isPpeok) {
            // It's a Ppeok! Everything stays/goes on the floor.
            // handCard was already in potentialHandCapture[0], matched floor was in [1]
            // We need to put them back on floor + the giriCard.
            floorCards.push(handCard, window.turnContext.matchedFloorCards[0], giriCard);
            capturedThisTurn = []; // Nothing captured
            window.turnContext.potentialHandCapture = []; // Clear visual pending
            showEventAlert('뻑! (싼다)', turnOwner);
        }

        floorCards.sort((a, b) => a.month - b.month);

        if (capturedThisTurn.length > 0) {
            animateCardCapture(capturedThisTurn, turnOwner, onGiriFinishCapture);
        } else {
            onGiriFinishCapture();
        }

        function onGiriFinishCapture() {
            window.turnContext.potentialHandCapture = []; // CRITICAL: Clear visuals after move
            let stolenCount = 0;

            if (!isPpeok) {
                // Detect Jjok (쪽)
                if (handMatchedCount === 0 && handCard && giriCard && handCard.month === giriCard.month) {
                    showEventAlert('쪽!', turnOwner);
                    stolenCount++;
                }

                // Detect Ttaddak (따닥)
                if (handMatchedCount === 1 && handCard && giriCard && handCard.month === giriCard.month) {
                    showEventAlert('따닥!', turnOwner);
                    stolenCount++;
                }

                // Detect "Taking Ppeok" (뻑 먹기)
                // If we captured exactly 4 cards of one month this turn, it's taking a Ppeok pile (or naturally completing one)
                let monthsCaptured = {};
                capturedThisTurn.forEach(c => {
                    monthsCaptured[c.month] = (monthsCaptured[c.month] || 0) + 1;
                });
                for (let m in monthsCaptured) {
                    if (monthsCaptured[m] === 4) {
                        showEventAlert('뻑 먹기!', turnOwner);
                        stolenCount++;
                    }
                }
            }

            // Detect Sseul (쓸 / 판쓰리)
            if (floorCards.length === 0 && capturedThisTurn.length > 0 && !isLastTurn) {
                showEventAlert('쓸!', turnOwner);
                stolenCount++;
            }

            let postStealAction = async () => {
                renderBoard();

                // Allow browser a moment to visually paint the cards moving to the collection area
                await new Promise(resolve => setTimeout(resolve, 150));

                await evaluateAnimalRules(turnOwner);
                let currentScoreObj = calculateScore(turnOwner === 'player' ? playerCollected : comCollected, turnOwner);
                let maxScore = turnOwner === 'player' ? window.playerMaxScore : window.comMaxScore;

                if (currentScoreObj.total >= 3 && currentScoreObj.total > maxScore) {
                    if (isLastTurn) {
                        setTimeout(endGame, 500);
                        return;
                    }
                    promptGoStop(turnOwner, currentScoreObj.total);
                    return;
                }
                proceedToNextTurn(turnOwner);
            };

            if (stolenCount > 0) {
                animateStealPi(turnOwner, stolenCount, postStealAction);
            } else {
                postStealAction();
            }
        }
    };

    if (isPpeok) {
        finishGiriPhase();
    } else {
        // Normal Giri Logic
        if (!giriCard) {
            // No giri card, just finish with whatever the hand card captured
            finishGiriPhase();
        } else if (matchedFloorCards.length === 0) {
            floorCards.push(giriCard);
            finishGiriPhase();
        } else if (matchedFloorCards.length === 1) {
            capturedThisTurn.push(giriCard, matchedFloorCards[0]);
            floorCards = floorCards.filter(c => c.id !== matchedFloorCards[0].id);
            finishGiriPhase();
        } else if (matchedFloorCards.length === 3) {
            capturedThisTurn.push(giriCard, ...matchedFloorCards);
            floorCards = floorCards.filter(c => c.month !== giriCard.month);
            finishGiriPhase();
        } else if (matchedFloorCards.length === 2) {
            if (turnOwner === 'player') {
                showCardSelection(matchedFloorCards, (selectedCard) => {
                    capturedThisTurn.push(giriCard, selectedCard);
                    floorCards = floorCards.filter(c => c.id !== selectedCard.id);
                    finishGiriPhase();
                });
            } else {
                let pick = matchedFloorCards[Math.floor(Math.random() * matchedFloorCards.length)];
                capturedThisTurn.push(giriCard, pick);
                floorCards = floorCards.filter(c => c.id !== pick.id);
                finishGiriPhase();
            }
        }
    }
}
function processAnimalMoney(turnOwner, amount) {
    if (turnOwner === 'player') {
        if (comMoney < amount) amount = comMoney;
        playerMoney += amount;
        comMoney -= amount;
    } else {
        if (playerMoney < amount) amount = playerMoney;
        comMoney += amount;
        playerMoney -= amount;
    }

    playerMoneyEl.innerText = playerMoney.toLocaleString();
    comMoneyEl.innerText = comMoney.toLocaleString();
}

function showEventAlertWithConfirm(message, owner) {
    return new Promise(resolve => {
        let overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '99998';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';

        let div = document.createElement('div');
        div.style.backgroundColor = owner === 'player' ? 'rgba(0, 0, 255, 0.9)' : 'rgba(255, 0, 0, 0.9)';
        div.style.color = 'white';
        div.style.padding = '15px 25px';
        div.style.fontSize = '1.2rem';
        div.style.fontWeight = 'bold';
        div.style.borderRadius = '8px';
        div.style.boxShadow = '0 5px 15px rgba(0,0,0,0.5)';
        div.style.textAlign = 'center';
        div.style.zIndex = '99999';

        let textObj = document.createElement('div');
        textObj.innerText = message;
        textObj.style.marginBottom = '15px';
        div.appendChild(textObj);

        let btn = document.createElement('button');
        btn.innerText = '확인';
        btn.style.fontSize = '1rem';
        btn.style.padding = '8px 16px';
        btn.style.cursor = 'pointer';
        btn.style.borderRadius = '5px';
        btn.style.border = 'none';
        btn.style.backgroundColor = 'white';
        btn.style.color = 'black';
        btn.style.fontWeight = 'bold';

        btn.onclick = () => {
            overlay.remove();
            resolve();
        };

        div.appendChild(btn);
        overlay.appendChild(div);
        document.body.appendChild(overlay);

        btn.focus();
    });
}

async function evaluateAnimalRules(turnOwner) {
    const isPlayer = turnOwner === 'player';
    const collection = isPlayer ? playerCollected : comCollected;
    const oppCollection = isPlayer ? comCollected : playerCollected;

    // Count current animals
    let currentAnimals = 0;
    // Iterate over all collections to cleanly find animals by image name
    ['gwang', 'yul', 'tti', 'pi'].forEach(type => {
        collection[type].forEach(card => {
            const fileName = card.imgSrc.split('/').pop();
            // 7월 열끝 is already accurately mapped to 3 in animalCardCounts
            if (animalCardCounts[fileName]) {
                currentAnimals += animalCardCounts[fileName];
            }
        });
    });

    // Count opponent's current animals
    let oppAnimals = 0;
    ['gwang', 'yul', 'tti', 'pi'].forEach(type => {
        oppCollection[type].forEach(card => {
            const fileName = card.imgSrc.split('/').pop();
            if (animalCardCounts[fileName]) {
                oppAnimals += animalCardCounts[fileName];
            }
        });
    });

    let prevAnimals = isPlayer ? window.playerAnimals : window.comAnimals;

    if (currentAnimals > prevAnimals && currentAnimals >= 3) {
        // Gain money
        const isAnimalBak = (oppAnimals === 0);

        let baseAmount = 0;
        if (prevAnimals < 3) {
            // 최초 3마리 도달 시 (2마리 공제)
            baseAmount = (currentAnimals - 2) * 1000;
        } else {
            // 이미 3마리 이상인 상태에서의 추가 획득 (증분 계산)
            baseAmount = (currentAnimals - prevAnimals) * 1000;
        }

        const myMultiplier = isPlayer ? window.playerMultiplier : window.comMultiplier;
        let finalAmount = (isAnimalBak ? baseAmount * 2 : baseAmount) * myMultiplier;

        // Convert to rough Korean word format
        let amountStr = "";
        let numForStr = finalAmount;

        if (numForStr >= 10000) {
            let man = Math.floor(numForStr / 10000);
            let chun = numForStr % 10000;
            amountStr = (man > 1 ? man : "") + "만";
            if (chun > 0) amountStr += (chun / 1000) + "천";
            amountStr += "원";
        } else {
            if (numForStr === 1000) amountStr = "천원";
            else if (numForStr === 2000) amountStr = "이천원";
            else if (numForStr === 3000) amountStr = "삼천원";
            else if (numForStr === 4000) amountStr = "사천원";
            else if (numForStr === 5000) amountStr = "오천원";
            else if (numForStr === 6000) amountStr = "육천원";
            else if (numForStr === 7000) amountStr = "칠천원";
            else if (numForStr === 8000) amountStr = "팔천원";
            else if (numForStr === 9000) amountStr = "구천원";
            else amountStr = numForStr.toLocaleString() + "원";
        }

        let suffix = "";
        let reasons = [];
        if (myMultiplier > 1) reasons.push(`배수x${myMultiplier}`);
        if (isAnimalBak) reasons.push("동물박");
        if (reasons.length > 0) suffix = ` (${reasons.join(", ")})`;

        const msg = `앗싸! ${amountStr}${suffix}\n(현재 동물이 ${currentAnimals}마리)`;

        processAnimalMoney(turnOwner, finalAmount);
        await showEventAlertWithConfirm(msg, turnOwner);
    }

    // Save state
    if (isPlayer) {
        window.playerAnimals = currentAnimals;
    } else {
        window.comAnimals = currentAnimals;
    }
}

function proceedToNextTurn(turnOwner) {
    const isGameOver = (playerHand.length === 0 && comHand.length === 0 && window.playerEmptyTurns === 0 && window.comEmptyTurns === 0);

    if (isGameOver) {
        setTimeout(endGame, 500);
        return;
    }

    setTimeout(() => {
        currentTurn = turnOwner === 'player' ? 'com' : 'player';
        renderBoard();
        if (currentTurn === 'com') {
            setTimeout(playComTurn, 600);
        }
    }, 600);
}

function resolveCaptures(cards, owner) {
    let targetCollection = owner === 'player' ? playerCollected : comCollected;

    cards.forEach(card => {
        if (card.type === 'gwang') targetCollection.gwang.push(card);
        else if (card.type === 'yul') targetCollection.yul.push(card);
        else if (card.type === 'tti') targetCollection.tti.push(card);
        else targetCollection.pi.push(card);
    });
}

// Animation for drawing captured cards into collected score area
function animateCardCapture(capturedCards, turnOwner, callback) {
    if (!capturedCards || capturedCards.length === 0) {
        callback();
        return;
    }

    renderBoard(); // Render first so cards to capture vanish from the floor area, establishing their final rest target
    const targetAreaSelector = turnOwner === 'player' ? '#player-area .collected-cards' : '#computer-area .collected-cards';
    const targetEl = document.querySelector(targetAreaSelector);
    const targetRect = targetEl.getBoundingClientRect();
    const floorRect = floorAreaEl.getBoundingClientRect();

    let animationsRunning = capturedCards.length;

    capturedCards.forEach((cardObj, idx) => {
        const flyingCard = document.createElement('img');
        flyingCard.src = cardObj.imgSrc;
        flyingCard.className = 'card-img';
        flyingCard.style.position = 'fixed';

        // Start roughly where the floor is
        flyingCard.style.left = `${floorRect.left + floorRect.width / 2 - 30 + (Math.random() * 60 - 30)}px`;
        flyingCard.style.top = `${floorRect.top + floorRect.height / 2 - 47 + (Math.random() * 40 - 20)}px`;
        flyingCard.style.zIndex = '9999';

        // Slightly stagger delays
        let delay = idx * 0.1;
        flyingCard.style.transition = `all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`;
        flyingCard.style.margin = '0';
        flyingCard.style.transform = `scale(1.2) rotate(${(Math.random() - 0.5) * 60}deg)`;
        flyingCard.style.pointerEvents = 'none';

        document.body.appendChild(flyingCard);

        flyingCard.getBoundingClientRect(); // reflow

        // Move to target corner
        flyingCard.style.left = `${targetRect.left + 50}px`;
        flyingCard.style.top = `${targetRect.top + 30}px`;
        flyingCard.style.transform = 'scale(0.5) rotate(0deg)';
        flyingCard.style.opacity = '0.3';

        flyingCard.addEventListener('transitionend', () => {
            flyingCard.remove();

            // Only play the sound once for the very first card landing
            if (idx === 0 && window.playCardSound) {
                window.playCardSound();
            }

            animationsRunning--;
            if (animationsRunning <= 0) {
                // Done animating. Officially resolve to data models.
                resolveCaptures(capturedCards, turnOwner);
                renderBoard(); // Final update to update text counters and dom
                callback();
            }
        }, { once: true });
    });
}

function animateStealPi(taker, count, callback) {
    let victim = taker === 'player' ? 'com' : 'player';
    let victimCollection = victim === 'player' ? playerCollected : comCollected;
    let takerCollection = taker === 'player' ? playerCollected : comCollected;

    // Prioritize normal Pi (type pi_1, pi_2) over double Pi (pi_3, kasu)
    // We sort so that double Pi are at the beginning and normal Pi are at the end (for pop)
    // or just find and remove them. Sorting is easier with the current pop() logic.
    victimCollection.pi.sort((a, b) => {
        const isADouble = (a.type === 'pi_3' || a.type === 'kasu');
        const isBDouble = (b.type === 'pi_3' || b.type === 'kasu');
        if (isADouble && !isBDouble) return -1;
        if (!isADouble && isBDouble) return 1;
        return 0;
    });

    let stolenCards = [];
    for (let i = 0; i < count; i++) {
        if (victimCollection.pi.length > 0) {
            stolenCards.push(victimCollection.pi.pop());
        }
    }

    if (stolenCards.length === 0) {
        if (callback) callback();
        return;
    }

    renderBoard(); // Render immediately to visually remove Pi from victim's counter

    const sourceAreaSelector = victim === 'player' ? '#player-area .pi-group' : '#computer-area .pi-group';
    const targetAreaSelector = taker === 'player' ? '#player-area .pi-group' : '#computer-area .pi-group';

    const sourceEl = document.querySelector(sourceAreaSelector);
    const targetEl = document.querySelector(targetAreaSelector);
    const sourceRect = sourceEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    let animationsRunning = stolenCards.length;

    stolenCards.forEach((cardObj, idx) => {
        const flyingCard = document.createElement('img');
        flyingCard.src = cardObj.imgSrc;
        flyingCard.className = 'card-img';
        flyingCard.style.position = 'fixed';

        flyingCard.style.left = `${sourceRect.left + 20}px`;
        flyingCard.style.top = `${sourceRect.top - 10}px`;
        flyingCard.style.zIndex = '9999';

        let delay = idx * 0.2;
        flyingCard.style.transition = `all 2.0s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`;
        flyingCard.style.margin = '0';
        flyingCard.style.transform = `scale(0.8) rotate(${(Math.random() - 0.5) * 30}deg)`;
        flyingCard.style.pointerEvents = 'none';

        document.body.appendChild(flyingCard);

        // Force reflow
        flyingCard.getBoundingClientRect();

        // Set destination
        flyingCard.style.left = `${targetRect.left + 20}px`;
        flyingCard.style.top = `${targetRect.top - 10}px`;
        flyingCard.style.transform = 'scale(0.5) rotate(0deg)';
        flyingCard.style.opacity = '0.3';

        flyingCard.addEventListener('transitionend', () => {
            flyingCard.remove();

            if (idx === 0 && window.playCardSound) {
                window.playCardSound();
            }

            animationsRunning--;
            if (animationsRunning <= 0) {
                // Done animating. Push cards to taker and update board
                stolenCards.forEach(c => takerCollection.pi.push(c));
                renderBoard();
                if (callback) callback();
            }
        }, { once: true });
    });
}

function showEventAlert(message, owner) {
    // Simple temporary overlay for events
    let div = document.createElement('div');
    div.innerText = message;
    div.style.position = 'fixed';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.transform = 'translate(-50%, -50%)';
    div.style.backgroundColor = owner === 'player' ? 'rgba(0, 0, 255, 0.8)' : 'rgba(255, 0, 0, 0.8)';
    div.style.color = 'white';
    div.style.padding = '20px 40px';
    div.style.fontSize = '3rem';
    div.style.fontWeight = 'bold';
    div.style.borderRadius = '15px';
    div.style.zIndex = '99999';
    div.style.pointerEvents = 'none';
    div.style.animation = 'fadeOutUp 1.5s ease-out forwards';

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 1500);
}

function handleEmptyTurn(turnOwner) {
    console.log(`[Empty Turn] ${turnOwner} executes empty turn.`);
    if (turnOwner === 'player') {
        window.playerEmptyTurns--;
    } else {
        window.comEmptyTurns--;
    }

    // showEventAlert('공턴', turnOwner); // Removed per user request

    // 빈 턴일 경우 패를 내지 않고 대기 상태로 진입 (기리패 수동 클릭)
    window.turnContext.playedCardMatchedLength = -1; // 따닥 방지
    window.turnContext.playedCard = null;

    promptGiriFlip(turnOwner);
}

function processBombPhase(handCards, floorCard, turnOwner) {
    console.log(`[Bomb] ${turnOwner} used Bomb!`);
    showBombCards(turnOwner, handCards);
    showEventAlert('폭탄!', turnOwner);

    // Apply bomb rules
    if (turnOwner === 'player') {
        window.playerMultiplier *= 2;
        window.playerShook = true; // Bombing sets shake status
        window.playerEmptyTurns += 2;
        playerHand = playerHand.filter(c => !handCards.includes(c));

        let badge = document.getElementById('player-bomb-badge');
        if (badge) badge.style.display = 'inline-block';
    } else {
        window.comMultiplier *= 2;
        window.comShook = true; // Bombing sets shake status
        window.comEmptyTurns += 2;
        comHand = comHand.filter(c => !handCards.includes(c));

        let badge = document.getElementById('com-bomb-badge');
        if (badge) badge.style.display = 'inline-block';
    }

    // Find representative element for animation
    const container = turnOwner === 'player' ? playerHandEl : comHandEl;
    const repCard = handCards[0];
    const sourceEl = Array.from(container.children).find(el => el.dataset.id == repCard.id) || container.lastElementChild;
    const capturedThisTurn = [...handCards, floorCard];

    floorCards = floorCards.filter(c => c.id !== floorCard.id);

    // Context clean and initialization
    window.turnContext.playedCardMatchedLength = -1; // 따닥 방지
    window.turnContext.playedCard = handCards[0]; // Representative
    window.turnContext.matchedFloorCards = [floorCard];
    window.turnContext.potentialHandCapture = [];

    animateStealPi(turnOwner, 1, () => {
        animateCardThrow(sourceEl, repCard, turnOwner, () => {
            if (window.playCardSound) window.playCardSound();
            if (turnOwner === 'player') isDealing = false; // Reset dealing state so player can click deck
            resolveCaptures(capturedThisTurn, turnOwner);
            renderBoard();
            promptGiriFlip(turnOwner);
        });
    });
}

function playComTurn() {
    if (comHand.length === 0) return;

    if (window.comEmptyTurns > 0) {
        // AI Choice: Skip or Play?
        let hasMatch = false;
        for (let c of comHand) {
            if (floorCards.some(f => f.month === c.month)) {
                hasMatch = true;
                break;
            }
        }

        // If no match, strongly prefer skipping to save cards.
        // If match exists, 50% chance to still skip to stay "ahead".
        if (!hasMatch || Math.random() < 0.5) {
            handleEmptyTurn('com');
            return;
        }
    }

    // AI Shake Logic
    if (!window.comShook) {
        let monthToShake = -1;
        for (let i = 1; i <= 12; i++) {
            if (comHand.filter(c => c.month === i).length === 3) {
                // Shake condition: must have 3 in hand AND 0 on floor for that month
                const floorMatch = floorCards.some(fc => fc.month === i);
                if (!floorMatch) {
                    monthToShake = i;
                    break;
                }
            }
        }

        // Randomly decide to shake if reachable (70% chance)
        if (monthToShake !== -1 && Math.random() < 0.7) {
            executeShake('com', monthToShake);
            // Give brief delay before playing card so shake is visible
            setTimeout(playComAiCard, 2000);
            return;
        }
    }

    playComAiCard();
}

function playComAiCard() {

    // Dumb AI: Try to find a card that matches the floor
    let cardToPlay = null;
    let isBomb = false;
    let matchingHandCards = [];
    let matchingFloorCard = null;

    // Check for bomb first
    for (let c of comHand) {
        matchingHandCards = comHand.filter(handCard => handCard.month === c.month);
        let floorMatch = floorCards.filter(floorCard => floorCard.month === c.month);

        if (matchingHandCards.length === 3 && floorMatch.length === 1) {
            isBomb = true;
            matchingFloorCard = floorMatch[0];
            break;
        }
    }

    if (isBomb) {
        // Initialize context for Com bomb
        window.turnContext.playedCard = matchingHandCards[0];
        window.turnContext.matchedFloorCards = [matchingFloorCard];
        window.turnContext.potentialHandCapture = [];
        processBombPhase(matchingHandCards, matchingFloorCard, 'com');
        return;
    }

    for (let c of comHand) {
        if (floorCards.some(f => f.month === c.month)) {
            cardToPlay = c;
            break;
        }
    }

    // If no match, just play the first card
    if (!cardToPlay) {
        cardToPlay = comHand[0];
    }

    const cardEl = Array.from(comHandEl.children).find(el => el.dataset.id == cardToPlay.id) || comHandEl.lastElementChild;

    animateCardThrow(cardEl, cardToPlay, 'com', () => {
        if (window.playCardSound) window.playCardSound();
        comHand = comHand.filter(c => c.id !== cardToPlay.id);
        processPlayPhase(cardToPlay, 'com');
    });
}

function endGame(explicitWinner = null) {
    currentTurn = null;
    let pScoreObj = calculateScore(playerCollected, 'player');
    let cScoreObj = calculateScore(comCollected, 'com');

    setTimeout(() => {
        let msg = "게임 종료!\n";

        // Determine winner and initial score
        if (explicitWinner === 'player' || explicitWinner === 'com') {
            winner = explicitWinner === 'player' ? 'Player' : 'Com';
            winnerScoreInfo = explicitWinner === 'player' ? pScoreObj : cScoreObj;
            loserScoreInfo = explicitWinner === 'player' ? cScoreObj : pScoreObj;
        } else {
            // Natural termination (deck empty)
            if (pScoreObj.total > cScoreObj.total && pScoreObj.total >= 3) {
                winner = 'Player';
                winnerScoreInfo = pScoreObj;
                loserScoreInfo = cScoreObj;
            } else if (cScoreObj.total > pScoreObj.total && cScoreObj.total >= 3) {
                winner = 'Com';
                winnerScoreInfo = cScoreObj;
                loserScoreInfo = pScoreObj;
            } else {
                winner = null; // Nagari (Draw)
            }
        }

        if (winner) {
            let pureTotal = winnerScoreInfo.gwang + winnerScoreInfo.yul + winnerScoreInfo.tti + winnerScoreInfo.pi;
            let finalScore = pureTotal;
            let bakMsgs = [];
            let totalMultiplier = 1;

            let winnerGoCount = (winner === 'Player') ? window.playerGoCount : window.comGoCount;
            let loserGoCount = (winner === 'Player') ? window.comGoCount : window.playerGoCount;

            // 1. Go Point Bonus (Only for 1-Go and 2-Go)
            let goBonusPoints = 0;
            if (winnerGoCount === 1) goBonusPoints = 1;
            else if (winnerGoCount === 2) goBonusPoints = 2;

            finalScore += goBonusPoints;

            // 2. Multipliers
            // Shake/Bomb (Winner's multiplier)
            let winnerMultiplier = (winner === 'Player') ? window.playerMultiplier : window.comMultiplier;
            if (winnerMultiplier > 1) {
                totalMultiplier *= winnerMultiplier;
                // If it was a bomb or shake, let's just use "흔들기/폭탄" to keep it simple, 
                // but usually they are both x2 (or x4 if double shook)
                let label = (winner === 'Player' ? window.playerShook : window.comShook) ? "흔들기/폭탄" : "배수";
                bakMsgs.push(`${label}(x${winnerMultiplier})`);
            }

            // 광박
            if (winnerScoreInfo.gwang > 0 && loserScoreInfo.gwangCount === 0) {
                totalMultiplier *= 2;
                bakMsgs.push("광박");
            }

            // 고박 (Loser had called Go)
            if (loserGoCount > 0) {
                totalMultiplier *= 2;
                bakMsgs.push("고박");
            }

            // 피박
            if (winnerScoreInfo.pi > 0 && loserScoreInfo.piCount <= 5) {
                totalMultiplier *= 2;
                bakMsgs.push("피박");
            }

            // High Go Multiplier (3+ Go)
            if (winnerGoCount >= 3) {
                let goMult = Math.pow(2, winnerGoCount - 2);
                totalMultiplier *= goMult;
                bakMsgs.push(`${winnerGoCount}고(x${goMult})`);
            } else if (winnerGoCount > 0) {
                bakMsgs.push(`${winnerGoCount}고`);
            }

            finalScore *= totalMultiplier;
            winnerScoreInfo.multiplierObj = totalMultiplier;
            winnerScoreInfo.goBonusObj = goBonusPoints;

            let bakText = bakMsgs.length > 0 ? ` [${bakMsgs.join(", ")}] 적용` : "";

            if (winner === 'Player') {
                playerScoreEl.innerText = finalScore;
                lastWinner = 'player';
            } else {
                comScoreEl.innerText = finalScore;
                lastWinner = 'com';
            }

            let wagerResultMsg = processGameEndWager(winner.toLowerCase(), finalScore);

            showResultModal({
                winner: winner === 'Player' ? '사용자(나)' : '컴퓨터',
                finalScore: finalScore,
                bakText: bakText,
                pureTotal: pureTotal,
                gwang: winnerScoreInfo.gwang,
                gwangCount: winnerScoreInfo.gwangCount,
                yul: winnerScoreInfo.yul,
                tti: winnerScoreInfo.tti,
                pi: winnerScoreInfo.pi,
                piCount: winnerScoreInfo.piCount,
                godori: winnerScoreInfo.godori,
                hongdan: winnerScoreInfo.hongdan,
                chodan: winnerScoreInfo.chodan,
                cheongdan: winnerScoreInfo.cheongdan,
                goBonus: goBonusPoints,
                multiplier: winnerScoreInfo.multiplierObj,
                wagerMsg: wagerResultMsg,
                isDraw: false
            });
        } else {
            showResultModal({
                isDraw: true,
                msg: "무승부 (나가리)\n\n[머니 정산] 이동 없음."
            });
        }

        // If someone is bankrupt, btnDeal is already hidden inside processGameEndWager
        if (playerMoney > 0 && comMoney > 0) {
            btnDeal.style.display = 'block';
            btnDeal.innerText = '판 돌리기';
        }
    }, 500);
}

// --- Custom Modal Logic ---
function showResultModal(data) {
    const modal = document.getElementById('result-modal');
    const body = document.getElementById('result-modal-body');

    let content = "";
    if (data.isDraw) {
        content = `<div class="result-main">${data.msg}</div>`;
    } else {
        const godoriHtml = data.godori > 0 ? `<div class="result-detail-item"><span class="result-label">고도리</span><span class="result-value">+${data.godori}점</span></div>` : "";
        const danHtml = (data.hongdan || data.chodan || data.cheongdan) ?
            `<div class="result-detail-item"><span class="result-label">단 종류</span><span class="result-value">${[data.hongdan ? '홍단' : '', data.chodan ? '초단' : '', data.cheongdan ? '청단' : ''].filter(v => v).join(', ')}</span></div>` : "";

        content = `
            <div class="result-main">
                <span class="result-winner">${data.winner} 승리!</span>
                <span style="font-size: 1.8rem; color: #fff;">최종 ${data.finalScore}점</span>
                <div style="color: #00d2ff; font-size: 0.9rem; margin-top: 5px;">${data.bakText}</div>
            </div>
            
            <div class="result-separator"></div>
            
            <h4>상세 점수 내역</h4>
            <div class="result-detail-item"><span class="result-label">광</span><span class="result-value">${data.gwang}점 (${data.gwangCount}장)</span></div>
            <div class="result-detail-item"><span class="result-label">열끝</span><span class="result-value">${data.yul}점</span></div>
            ${godoriHtml}
            <div class="result-detail-item"><span class="result-label">띠</span><span class="result-value">${data.tti}점</span></div>
            ${danHtml}
            <div class="result-detail-item"><span class="result-label">피</span><span class="result-value">${data.pi}점 (${data.piCount}장)</span></div>
            
            <div class="result-total-box" style="margin-top: 15px;">
                <div class="result-detail-item" style="border:none;"><span class="result-label">족보 총합</span><span class="result-value">${data.pureTotal}점</span></div>
                ${data.goBonus > 0 ? `<div class="result-detail-item" style="border:none;"><span class="result-label">고 보너스</span><span class="result-value">+${data.goBonus}점</span></div>` : ""}
                ${data.multiplier > 1 ? `<div class="result-detail-item" style="border:none;"><span class="result-label">최종 배수</span><span class="result-value">x${data.multiplier}배</span></div>` : ""}
            </div>
            
            <div style="background: rgba(0, 210, 255, 0.1); padding: 10px; border-radius: 8px; font-size: 0.95rem; text-align: center;">
                ${data.wagerMsg}
            </div>
        `;
    }

    body.innerHTML = content;
    modal.style.display = 'flex';

    // Reset modal position to center
    const contentEl = document.getElementById('result-modal-content');
    contentEl.style.top = '50%';
    contentEl.style.left = '50%';
    contentEl.style.transform = 'translate(-50%, -50%)';
}

function closeResultModal() {
    document.getElementById('result-modal').style.display = 'none';
}

document.getElementById('modal-confirm-btn').addEventListener('click', closeResultModal);
document.getElementById('close-result-modal').addEventListener('click', closeResultModal);

// --- Draggable Logic ---
(function () {
    const header = document.getElementById('result-modal-header');
    const modalContent = document.getElementById('result-modal-content');
    const overlay = document.getElementById('result-modal');
    let isDragging = false;
    let offset = { x: 0, y: 0 };
    let overlayRect = null;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = modalContent.getBoundingClientRect();
        overlayRect = overlay.getBoundingClientRect();

        // Calculate the internal click offset
        offset.x = e.clientX - rect.left;
        offset.y = e.clientY - rect.top;

        // Set position relative to its container (overlay)
        let leftPx = rect.left - overlayRect.left;
        let topPx = rect.top - overlayRect.top;

        // Remove transitions while dragging
        modalContent.style.animation = 'none';
        modalContent.style.transition = 'none';

        // Change transform to simple positioning
        modalContent.style.transform = 'none';
        modalContent.style.left = leftPx + 'px';
        modalContent.style.top = topPx + 'px';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging || !overlayRect) return;

        let newLeft = e.clientX - offset.x - overlayRect.left;
        let newTop = e.clientY - offset.y - overlayRect.top;

        modalContent.style.left = newLeft + 'px';
        modalContent.style.top = newTop + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
})();

function animateCardThrow(sourceEl, cardObj, turnOwner, callback) {
    if (!sourceEl) {
        callback();
        return;
    }
    const startRect = sourceEl.getBoundingClientRect();
    const floorRect = floorAreaEl.getBoundingClientRect();

    const targetX = floorRect.left + floorRect.width / 2 - startRect.width / 2;
    const targetY = floorRect.top + floorRect.height / 2 - startRect.height / 2;

    const flyingCard = document.createElement('img');
    flyingCard.src = cardObj.imgSrc;
    flyingCard.className = 'card-img';
    flyingCard.style.position = 'fixed';
    flyingCard.style.left = `${startRect.left}px`;
    flyingCard.style.top = `${startRect.top}px`;
    flyingCard.style.zIndex = '9999';
    flyingCard.style.transition = 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
    flyingCard.style.margin = '0';
    flyingCard.style.transform = 'scale(1)';
    flyingCard.style.pointerEvents = 'none';

    sourceEl.style.visibility = 'hidden';
    document.body.appendChild(flyingCard);

    // Force reflow
    flyingCard.getBoundingClientRect();

    const randomRotation = (Math.random() - 0.5) * 40;

    flyingCard.style.left = `${targetX}px`;
    flyingCard.style.top = `${targetY}px`;
    flyingCard.style.transform = `scale(1.1) rotate(${randomRotation}deg)`;

    flyingCard.addEventListener('transitionend', () => {
        flyingCard.remove();
        sourceEl.style.visibility = 'visible';
        callback();
    }, { once: true });
}

// Show selection UI
function showCardSelection(options, onSelect) {
    const overlay = document.getElementById('card-selection-overlay');
    const container = document.getElementById('selection-cards');
    container.innerHTML = '';

    options.forEach(card => {
        const img = document.createElement('img');
        img.src = card.imgSrc;
        img.className = 'card-img selectable-card';
        img.addEventListener('click', () => {
            overlay.style.display = 'none';
            onSelect(card);
        });
        container.appendChild(img);
    });

    overlay.style.display = 'flex';
}

// Event Listeners
btnDeal.addEventListener('click', dealCards);
document.getElementById('btn-shake').addEventListener('click', function () {
    // 플레이어 턴일 때만 유효함
    if (currentTurn === 'player' && !isDealing) {
        const month = parseInt(this.dataset.month);
        executeShake('player', month);
    }
});

document.getElementById('deck').addEventListener('click', () => {
    if (currentTurn !== 'player' || isDealing) return;

    if (window.waitingForGiri) {
        window.waitingForGiri = false;
        document.getElementById('deck').classList.remove('clickable-deck');
        animateGiriCard('player');
    } else if (window.playerEmptyTurns > 0) {
        // Manual skip choice during player's turn phase
        handleEmptyTurn('player');
    }
});

// Inject keyframe animation for Event Alerts
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeOutUp {
    0% { opacity: 1; transform: translate(-50%, -50%); }
    100% { opacity: 0; transform: translate(-50%, -150%); }
}
`;
document.head.appendChild(style);

// Start with initialized empty board
initGame();

// --- Go/Stop Logic ---
function promptGoStop(turnOwner, currentScore) {
    if (turnOwner === 'player') {
        document.getElementById('gostop-message').innerText = `${currentScore}점이 났습니다! 고(Go) 하시겠습니까?`;
        document.getElementById('gostop-selection-overlay').style.display = 'flex';

        // Remove old listeners to prevent multiple fires
        let goBtn = document.getElementById('btn-go');
        let stopBtn = document.getElementById('btn-stop');

        let clonedGo = goBtn.cloneNode(true);
        let clonedStop = stopBtn.cloneNode(true);
        goBtn.parentNode.replaceChild(clonedGo, goBtn);
        stopBtn.parentNode.replaceChild(clonedStop, stopBtn);

        clonedGo.addEventListener('click', () => handleGo('player'));
        clonedStop.addEventListener('click', () => handleStop('player'));
    } else {
        // AI Logic
        setTimeout(() => playComGoStop(currentScore), 1500);
    }
}

function handleGo(turnOwner) {
    document.getElementById('gostop-selection-overlay').style.display = 'none';

    if (turnOwner === 'player') {
        window.playerGoCount++;
        window.playerMaxScore = calculateScore(playerCollected, 'player').total;

        let badge = document.getElementById('player-go-count');
        badge.style.display = 'inline';
        badge.innerText = `${window.playerGoCount}고`;

        showEventAlert(`${window.playerGoCount}고!`, 'player');
    } else {
        window.comGoCount++;
        window.comMaxScore = calculateScore(comCollected, 'com').total;

        let badge = document.getElementById('com-go-count');
        badge.style.display = 'inline';
        badge.innerText = `${window.comGoCount}고`;

        showEventAlert(`${window.comGoCount}고!`, 'com');
    }

    setTimeout(() => proceedToNextTurn(turnOwner), 1500);
}

function handleStop(turnOwner) {
    document.getElementById('gostop-selection-overlay').style.display = 'none';
    showEventAlert('스톱!', turnOwner);
    setTimeout(() => endGame(turnOwner), 1500);
}

function playComGoStop(currentScore) {
    let comGoCount = window.comGoCount;
    // Simple AI logic
    if (currentScore >= 7 || comGoCount >= 2) {
        handleStop('com');
    } else {
        if (Math.random() < 0.7) {
            handleGo('com');
        } else {
            handleStop('com');
        }
    }
}
