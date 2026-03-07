// Animal Go-Stop Mapping
const animalCardCounts = {
    '01_gwang.jpg': 1,
    '02_yul.jpg': 1,
    '04_yul.jpg': 1,
    '05_yul.jpg': 0,
    '06_yul.jpg': 2,
    '07_yul.jpg': 3,
    '08_yul.jpg': 3,
    '08_gwang.jpg': 1,
    '10_yul.jpg': 1,
    '11_gwang.jpg': 1,
    '12_gwang.jpg': 2,
    '12_yul.jpg': 1,
    'double_pi_1.jpg': 2,
    'double_pi_2.jpg': 2,
    'double_pi_3.jpg': 2
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
    { id: 42, month: 11, type: "kasu", name: "11월 쌍피" },
    { id: 43, month: 11, type: "pi_1", name: "11월 피1" },
    { id: 44, month: 11, type: "pi_2", name: "11월 피2" },
    { id: 45, month: 12, type: "gwang", name: "12월 비광" },
    { id: 46, month: 12, type: "kasu", name: "12월 쌍피" },
    { id: 47, month: 12, type: "tti", name: "12월 비띠" },
    { id: 48, month: 12, type: "yul", name: "12월 열끝(비도리)" },
    { id: 49, month: 0, type: "bonus", name: "보너스 쌍피1" },
    { id: 50, month: 0, type: "bonus", name: "보너스 쌍피2" },
    { id: 51, month: 0, type: "bonus", name: "보너스 쌍피3" }
];

// Add image paths to specs
const fullDeck = hwatuDeckSpecs.map(card => {
    let typeName = card.type;
    let imgSrc = "";
    if (typeName === "bonus") {
        const bonusIdx = card.id - 48; // 49 -> 1, 50 -> 2, 51 -> 3
        imgSrc = `real_cards/double_pi_${bonusIdx}.jpg`;
    } else {
        imgSrc = `real_cards/${String(card.month).padStart(2, '0')}_${typeName}.jpg`;
    }
    return {
        ...card,
        imgSrc: imgSrc
    };
});

// Persistent Game State (Wager and Turn)
let playerMoney = 1000000;
let comMoney = 1000000;
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
window.isGameOver = true; // True if waiting to deal a new game
let currentDealId = 0; // Atomic lock for deal sequence
window.activeAlertResolver = null; // Remote resolve for synced alerts

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
const cPiCount = document.querySelector('#computer-area .pi-group .count');

// --- Multiplayer State & PeerJS ---
let isMultiplayer = false;
let isHost = false;
let peer = null;
let conn = null;
let myPeerId = null;

// Initialize Multiplayer UI
function initMultiplayerUI() {
    const overlay = document.getElementById('multiplayer-overlay');
    const btnShow = document.getElementById('btn-show-multiplayer');
    const btnClose = document.getElementById('btn-close-modal');
    const btnHost = document.getElementById('btn-host-game');
    const btnJoin = document.getElementById('btn-join-game');
    const joinInput = document.getElementById('join-id-input');
    const btnWaitClose = document.getElementById('btn-wait-close');
    const btnCloseMulti = document.getElementById('btn-close-multi-modal');

    btnShow.onclick = () => overlay.style.display = 'flex';
    btnClose.onclick = () => overlay.style.display = 'none';
    btnWaitClose.onclick = () => overlay.style.display = 'none';
    btnCloseMulti.onclick = () => overlay.style.display = 'none';

    btnHost.onclick = () => {
        isHost = true;
        lastWinner = 'player'; // Force Host to be the dealer initially
        setupPeer();
        document.getElementById('multi-init-section').style.display = 'none';
        document.getElementById('host-id-section').style.display = 'block';
        // Hide Deal button until guest connects
        btnDeal.style.display = 'none';
    };

    btnJoin.onclick = () => {
        const id = joinInput.value.trim();
        if (id) {
            isHost = false;
            lastWinner = 'com'; // Guest conceptually treats Host as dealer
            updateDealButtonVisibility(); // Hide button while connecting
            setupPeer(() => {
                connectToPeer(id);
            });
        } else {
            alert('입장할 ID를 입력해주세요.');
        }
    };
}

function updateConnectionStatus(status, color = 'white') {
    const el = document.getElementById('connection-status');
    if (el) {
        el.innerText = `상태: ${status}`;
        el.style.color = color;
    }
    updateRoleIndicator(); // Ensure role is updated with status
}

function updateRoleIndicator() {
    const el = document.getElementById('player-role');
    if (isMultiplayer && el) {
        el.innerText = isHost ? '방장 (Host)' : '손님 (Guest)';
        el.style.display = 'block';
    } else if (el) {
        el.style.display = 'none';
        el.innerText = '';
    }
}

function setupPeer(onOpenCallback) {
    if (peer) return;

    // Generate a short 6-digit numeric ID for easier sharing
    const shortId = isHost ? Math.floor(100000 + Math.random() * 900000).toString() : undefined;

    peer = new Peer(shortId);

    peer.on('open', (id) => {
        myPeerId = id;
        document.getElementById('my-peer-id').innerText = id;
        updateConnectionStatus('ID 생성됨', '#ffd700');
        if (onOpenCallback) onOpenCallback();
    });

    peer.on('connection', (c) => {
        if (conn) {
            c.close();
            return;
        }
        conn = c;
        setupConnection();
    });

    peer.on('error', (err) => {
        console.error('Peer error:', err);
        alert('연결 오류가 발생했습니다: ' + err.type);
        updateConnectionStatus('오류 발생', '#ff5252');
    });
}

function connectToPeer(id) {
    conn = peer.connect(id);
    setupConnection();
}

function setupConnection() {
    conn.on('open', () => {
        isMultiplayer = true;
        updateConnectionStatus('연결됨', '#4caf50');
        document.getElementById('multi-init-section').style.display = 'none';
        document.getElementById('host-id-section').style.display = 'none';
        document.getElementById('multi-connected-section').style.display = 'block';
        document.getElementById('remote-peer-id').innerText = `상대방: ${conn.peer}`;

        // Change UI labels for multiplayer
        document.querySelector('#computer-area h2').firstChild.textContent = '상대방 ';

        if (isHost) {
            // Host sends initial game state
            sendAction('SYNC_INIT', {
                lastWinner: lastWinner
            });
        } else {
            // CRITICAL FIX: The Guest must conceptually treat the Host as the dealer
            // upon initial connection to prevent the Guest from seeing the "Deal" button.
            lastWinner = 'com';
        }

        updateRoleIndicator(); // Explicitly update here
        updateDealButtonVisibility();
        // Re-check after brief delay in case renderBoard() overrides it
        setTimeout(updateDealButtonVisibility, 500);
    });

    conn.on('data', (data) => {
        handleRemoteAction(data);
    });

    conn.on('close', () => {
        updateConnectionStatus('연결 끊김', '#aaa');
        isMultiplayer = false;
        conn = null;
    });
}

function sendAction(type, payload) {
    if (conn && conn.open) {
        conn.send({ type, payload });
    }
}

function handleRemoteAction(data) {
    console.log('Received remote action:', data);
    const { type, payload } = data;

    switch (type) {
        case 'SYNC_INIT':
            // Sync initial state from host
            console.log("Multiplayer: Received SYNC_INIT", payload);
            // Default to forcing Host as the first dealer regardless of previous local states
            // Host sent their 'lastWinner' but we enforce Host start for multiplayer
            if (isMultiplayer && !isHost) {
                lastWinner = 'com'; // Always make host the dealer on first connection
            }
            initGame();
            updateRoleIndicator();
            updateDealButtonVisibility();
            break;
        case 'PLAY_CARD':
            // Opponent played a card
            handleRemotePlayCard(payload.cardId);
            break;
        case 'DEAL':
            console.log("Multiplayer: Received DEAL, initializing guest state...");
            stopAllAnimations(); // kill any stale loop

            // Definitively reset state before starting
            if (payload.playerMoney !== undefined) {
                comMoney = payload.playerMoney;
                playerMoney = payload.comMoney;
            }
            lastWinner = payload.lastWinner || 'player'; // Sync dealer status
            initGame(payload.deck);

            // Force dealCards to run
            isDealing = false;
            dealCards(true);
            break;
        case 'CLICK_DECK':
            if (currentTurn === 'com') {
                // Remote player clicked deck
                if (window.waitingForRemoteGiri) {
                    window.waitingForRemoteGiri = false;
                    console.log("Multiplayer: Remote player clicked deck, animating...");
                    animateGiriCard('com');
                } else if (window.comEmptyTurns > 0) {
                    handleEmptyRemoteTurn();
                } else {
                    // Fallback: if we missed the flag but it's clearly their turn to flip
                    console.log("Multiplayer: Remote player clicked deck (fallback), animating...");
                    animateGiriCard('com');
                }
            }
            break;
        case 'SELECT_FLOOR':
            if (currentTurn === 'com') {
                const selCard = fullDeck.find(c => c.id === payload.cardId);
                if (window.waitingForGiriSelection) {
                    window.waitingForGiriSelection = false;
                    // Logic from processGiriPhase callback
                    if (window.pendingGiriCaptured) {
                        window.pendingGiriCaptured.push(window.pendingGiriCard, selCard);
                        floorCards = floorCards.filter(c => c.id !== selCard.id);
                        if (window.pendingGiriFinishCallback) window.pendingGiriFinishCallback();
                    }
                } else {
                    // Logic from processPlayPhase
                    window.turnContext.potentialHandCapture = [window.turnContext.playedCard, selCard];
                    floorCards = floorCards.filter(c => c.id !== selCard.id);
                    renderBoard();
                    promptGiriFlip('com');
                }
            }
            break;
        case 'GO':
            handleGo('com');
            break;
        case 'STOP':
            handleStop('com');
            break;
        case 'PLAY_BONUS':
            // Opponent played a bonus card
            const bonusCard = fullDeck.find(c => c.id === payload.cardId);
            if (bonusCard) {
                handlePlayBonusCard(bonusCard, 'com');
            }
            break;
        case 'SHAKE':
            executeShake('com', payload.month);
            break;
        case 'CHONGTONG':
            handleChongtong(payload.winner === 'player' ? 'Com' : 'Player', payload.month);
            break;
        case 'BOMB':
            {
                const month = payload.month;
                const handCards = comHand.filter(c => c.month === month);
                const floorCard = floorCards.find(c => c.id === payload.floorCardId);
                if (handCards.length === 3 && floorCard) {
                    processBombPhase(handCards, floorCard, 'com');
                }
            }
            break;
        case 'RESULT_CONFIRM':
            closeResultModal(true); // true means remote call
            break;
        case 'SYNC_MONEY':
            // SENDER'S playerMoney is RECEIVER'S comMoney
            playerMoney = payload.comMoney;
            comMoney = payload.playerMoney;
            playerMoneyEl.innerText = playerMoney.toLocaleString();
            comMoneyEl.innerText = comMoney.toLocaleString();
            break;
        case 'SYNC_STATE':
            // SENDER'S player is RECEIVER'S com
            stopAllAnimations(); // Kill any visual competition

            currentTurn = (payload.currentTurn === 'player') ? 'com' : 'player';
            window.isGameOver = payload.isGameOver || false;

            window.playerGoCount = payload.comGoCount || 0;
            window.comGoCount = payload.playerGoCount || 0;
            window.playerMultiplier = payload.comMultiplier || 1;
            window.comMultiplier = payload.playerMultiplier || 1;
            window.playerAnimals = payload.comAnimals || 0;
            window.comAnimals = payload.playerAnimals || 0;

            window.playerShook = payload.comShook || false;
            window.comShook = payload.playerShook || false;

            playerMoney = payload.comMoney;
            comMoney = payload.playerMoney;

            // Deep sync collections if provided
            if (payload.playerCollectedIds || payload.comCollectedIds) {
                const mapToCards = (ids) => ids.map(id => fullDeck.find(c => c.id === id)).filter(Boolean);

                // SENDER'S playerCollected is RECEIVER'S comCollected
                const senderPlayer = payload.playerCollectedIds || { gwang: [], yul: [], tti: [], pi: [] };
                const senderCom = payload.comCollectedIds || { gwang: [], yul: [], tti: [], pi: [] };

                playerCollected = {
                    gwang: mapToCards(senderCom.gwang),
                    yul: mapToCards(senderCom.yul),
                    tti: mapToCards(senderCom.tti),
                    pi: mapToCards(senderCom.pi)
                };
                comCollected = {
                    gwang: mapToCards(senderPlayer.gwang),
                    yul: mapToCards(senderPlayer.yul),
                    tti: mapToCards(senderPlayer.tti),
                    pi: mapToCards(senderPlayer.pi)
                };
            }

            if (payload.floorCardIds) {
                floorCards = payload.floorCardIds.map(id => fullDeck.find(c => c.id === id)).filter(Boolean);
            }
            if (payload.deckIds) {
                deck = payload.deckIds.map(id => fullDeck.find(c => c.id === id)).filter(Boolean);
            }

            playerMoneyEl.innerText = playerMoney.toLocaleString();
            comMoneyEl.innerText = comMoney.toLocaleString();
            renderBoard();
            updateScoreUI();
            break;
        case 'SYNC_CAPTURE':
            // Host/active player tells observer exactly which card IDs were captured in PlayPhase
            if (currentTurn === 'com') {
                const remoteIds = payload.capturedIds || [];
                const capturedCards = remoteIds.map(id => fullDeck.find(c => c.id === id)).filter(Boolean);

                // If it was a match (1 or 3), update potentialHandCapture
                if (capturedCards.length > 0) {
                    window.turnContext.potentialHandCapture = [window.turnContext.playedCard, ...capturedCards];
                    // Also remove them from floor on observer's side
                    const capIds = capturedCards.map(c => c.id);
                    floorCards = floorCards.filter(c => !capIds.includes(c.id));
                } else {
                    // 0 matches -> card goes to floor
                    if (window.turnContext.playedCard && !floorCards.some(c => c.id === window.turnContext.playedCard.id)) {
                        floorCards.push(window.turnContext.playedCard);
                    }
                }

                renderBoard();
                promptGiriFlip('com');
            }
            break;
        case 'SYNC_GIRI_CAPTURE':
            // Host/active player tells observer exactly what happened in the Giri phase
            window.remoteGiriData = {
                stolenCount: payload.stolenCount || 0,
                isPpeok: payload.isPpeok || false,
                events: payload.events || []
            };
            break;
        case 'ANIMAL_BONUS':
            // Observer shows the alert triggered by the active player
            showEventAlertWithConfirm(payload.msg, 'com');
            break;
        case 'ALERT_CONFIRM':
            if (window.activeAlertResolver) {
                window.activeAlertResolver();
            } else {
                window.pendingAlertConfirm = (window.pendingAlertConfirm || 0) + 1;
            }
            break;
        case 'PROMPT_GOSTOP':
            // Active player tells observer a Go/Stop decision is needed
            promptGoStop('com', payload.score);
            break;
    }
}

function handleRemotePlayCard(cardId) {
    const card = fullDeck.find(c => c.id === cardId);
    if (!card) return;

    const cardInHand = comHand.find(c => c.id === cardId);
    if (cardInHand) {
        comHand = comHand.filter(c => c.id !== cardId);
        processPlayPhase(card, 'com');
    }
}

function executeComPlay(playedCard) {
    // This is a placeholder for the logic that executes a specific card play for the opponent
    // Similar to handlePlayerPlayCard but for 'com'
    // For now, let's assume the user will test the basic connection.
}

initMultiplayerUI();
// ----------------------------------
function stopAllAnimations() {
    currentDealId++; // Kills any dealCards loop
    isDealing = false;
    // Clear any pending timeouts or flags if possible
    window.waitingForGiri = false;
    window.waitingForRemoteGiri = false;
    window.waitingForGiriSelection = false;
}

// Initialize Game
function initGame(newDeck = null) {
    if (newDeck) {
        deck = [...newDeck];
    } else {
        deck = [...fullDeck];
    }
    playerHand = [];
    comHand = [];
    floorCards = [];
    playerCollected = { gwang: [], yul: [], tti: [], pi: [] };
    comCollected = { gwang: [], yul: [], tti: [], pi: [] };
    currentTurn = null;

    // Reset multipliers/flags
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

    window.playerAnimalBonusPaid = 0;
    window.comAnimalBonusPaid = 0;

    // Track which months were shaken to prevent later bombing in the same round
    window.playerShakenMonths = [];
    window.comShakenMonths = [];

    // Turn context variables to detect events like ttaddak (따닥)
    window.turnContext = {
        playedCard: null,
        matchedFloorCards: [],
        potentialHandCapture: []
    };
    window.waitingForGiri = false;
    window.waitingForRemoteGiri = false;
    window.waitingForGiriSelection = false;
    window.remoteGiriData = null;
    window.remoteNextCaptureIds = [];
    window.remoteNextGiriCaptureIds = [];

    // Clear DOM
    playerHandEl.innerHTML = '';
    comHandEl.innerHTML = '';
    floorAreaEl.innerHTML = '';

    // Clear collection areas
    document.querySelectorAll('.mini-cards').forEach(container => {
        container.innerHTML = '';
    });
    document.querySelectorAll('.count').forEach(span => {
        span.innerText = '0';
    });

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

function renderMiniCards(container, cards, points = 0) {
    let imgContainer = container.querySelector('.mini-cards');
    if (!imgContainer) return;

    imgContainer.innerHTML = '';

    cards.forEach((c, idx) => {
        if (!c) return;
        let img = document.createElement('img');
        img.src = c.imgSrc;
        img.className = 'mini-card-img';
        img.style.left = `${idx * 15}px`;
        imgContainer.appendChild(img);
    });

    let countSpan = container.querySelector('.count');
    if (countSpan) countSpan.innerText = points;
}

function updateScoreUI() {
    // Player Score Update
    const pBreakdown = calculateScore(playerCollected, 'player');
    renderMiniCards(document.querySelector('#player-area .gwang-group'), playerCollected.gwang, pBreakdown.gwang);
    renderMiniCards(document.querySelector('#player-area .yul-group'), playerCollected.yul, pBreakdown.yul);
    renderMiniCards(document.querySelector('#player-area .tti-group'), playerCollected.tti, pBreakdown.tti);
    renderMiniCards(document.querySelector('#player-area .pi-group'), playerCollected.pi, pBreakdown.pi);

    let pScoreText = pBreakdown.total;
    if (pBreakdown.multiplierObj > 1) {
        pScoreText += ` (x${pBreakdown.multiplierObj})`;
    }
    playerScoreEl.innerText = pScoreText;
    updateJokboBadges('player', pBreakdown);

    // Computer Score Update
    const cBreakdown = calculateScore(comCollected, 'com');
    renderMiniCards(document.querySelector('#computer-area .gwang-group'), comCollected.gwang, cBreakdown.gwang);
    renderMiniCards(document.querySelector('#computer-area .yul-group'), comCollected.yul, cBreakdown.yul);
    renderMiniCards(document.querySelector('#computer-area .tti-group'), comCollected.tti, cBreakdown.tti);
    renderMiniCards(document.querySelector('#computer-area .pi-group'), comCollected.pi, cBreakdown.pi);

    let cScoreText = cBreakdown.total;
    if (cBreakdown.multiplierObj > 1) {
        cScoreText += ` (x${cBreakdown.multiplierObj})`;
    }
    comScoreEl.innerText = cScoreText;
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
    // Helper function to calculate points for a specific configuration of types
    function getBaseScore(currentCollected) {
        let breakdown = {
            total: 0, gwang: 0, yul: 0, tti: 0, pi: 0,
            piCount: 0, gwangCount: 0,
            godoriCount: 0, godori: 0,
            hongdanCount: 0, hongdan: 0,
            chodanCount: 0, chodan: 0,
            cheongdanCount: 0, cheongdan: 0,
            yulCount: 0, ttiCount: 0,
            goPoints: 0, multiplierObj: 1
        };

        // Gwang (광)
        let gwangCount = currentCollected.gwang.length;
        let hasBiGwang = currentCollected.gwang.some(c => c.month === 12);
        if (gwangCount === 5) breakdown.gwang = 15;
        else if (gwangCount === 4) breakdown.gwang = 4;
        else if (gwangCount === 3) breakdown.gwang = (hasBiGwang ? 2 : 3);
        breakdown.gwangCount = gwangCount;

        // Yul (열끝)
        // Rule: Each defined Yul card counts as 1 for the 5-card point rule.
        // Independent of the "animal count" used for the A-ssa! bonus.
        let yulCount = currentCollected.yul.length;

        if (yulCount >= 5) breakdown.yul = yulCount - 4;
        breakdown.yulCount = yulCount;

        // Godori
        let godoriComp = [2, 4, 8].filter(m => currentCollected.yul.some(c => c.month === m));
        breakdown.godoriCount = godoriComp.length;
        if (breakdown.godoriCount === 3) {
            breakdown.yul += 5;
            breakdown.godori = 5;
        }

        // Tti (띠)
        let ttiCount = currentCollected.tti.length;
        if (ttiCount >= 5) breakdown.tti = ttiCount - 4;
        breakdown.ttiCount = ttiCount;

        // Hongdan, Chodan, Cheongdan
        const hComp = [1, 2, 3].filter(m => currentCollected.tti.some(c => c.month === m));
        breakdown.hongdanCount = hComp.length;
        if (breakdown.hongdanCount === 3) { breakdown.tti += 3; breakdown.hongdan = 3; }

        const cComp = [4, 5, 7].filter(m => currentCollected.tti.some(c => c.month === m));
        breakdown.chodanCount = cComp.length;
        if (breakdown.chodanCount === 3) { breakdown.tti += 3; breakdown.chodan = 3; }

        const chComp = [6, 9, 10].filter(m => currentCollected.tti.some(c => c.month === m));
        breakdown.cheongdanCount = chComp.length;
        if (breakdown.cheongdanCount === 3) { breakdown.tti += 3; breakdown.cheongdan = 3; }

        // Pi (피)
        let piCount = 0;
        currentCollected.pi.forEach(c => {
            // kasu(쌍피), bonus(보너스), 9월 국진(열끝)은 2장으로 계산
            if (c.type === 'kasu' || c.type === 'bonus' || (c.month === 9 && c.type === 'yul')) {
                piCount += 2;
            } else {
                piCount += 1;
            }
        });
        if (piCount >= 10) breakdown.pi = piCount - 9;
        breakdown.piCount = piCount;

        const ownerGoCount = (ownerType === 'player') ? window.playerGoCount : window.comGoCount;
        let goPoints = 0;
        if (ownerGoCount === 1) goPoints = 1;
        else if (ownerGoCount >= 2) goPoints = 2;
        breakdown.goPoints = goPoints;

        breakdown.total = breakdown.gwang + breakdown.yul + breakdown.tti + breakdown.pi + goPoints;
        const baseTotal = breakdown.total;

        // Multipliers: Only apply if base score is 3 or more
        let totalMult = (ownerType === 'player') ? window.playerMultiplier : window.comMultiplier;
        if (ownerGoCount >= 3) totalMult *= Math.pow(2, ownerGoCount - 2);

        breakdown.multiplierObj = totalMult;

        if (baseTotal >= 5) {
            breakdown.total = baseTotal * totalMult;
        } else {
            // Raw score is below 3, don't multiply total (but keep multiplier for display)
            breakdown.total = baseTotal;
        }

        return breakdown;
    }

    // Handle 9-month card (Kikku) choice
    const kiku = collected.yul.find(c => c.month === 9);
    if (!kiku) {
        return getBaseScore(collected);
    }

    // Option A: 9-month is an Animal (default position in yul array)
    let scoreA = getBaseScore(collected);

    // Option B: 9-month is a Double Pi
    let altCollected = {
        gwang: [...collected.gwang],
        tti: [...collected.tti],
        yul: collected.yul.filter(c => c.id !== kiku.id),
        pi: [...collected.pi, kiku]
    };
    let scoreB = getBaseScore(altCollected);

    return scoreA.total >= scoreB.total ? scoreA : scoreB;
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
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // transparent
        img.alt = '뒷면';
        img.title = '상대방 패';
    } else {
        img.src = card ? card.imgSrc : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        img.alt = card ? card.name : '카드';
        img.title = card ? card.name : '카드';
    }
    img.dataset.id = card ? card.id : 'hidden';
    // Original comment:
    // Transparent PNG or red background is handled by CSS, but we can set a dummy src or keep it empty
    // For actual implementation, we might use a dedicated 'back.png' if available. Here we rely on CSS background color.
    // img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // transparent 1x1 pixel


    if (onClickCallback && !isHidden) {
        img.addEventListener('click', () => onClickCallback(card));
    }

    return img;
}

// Render the arrays to DOM
function renderBoard() {
    // Always ensure hands are sorted by month for consistent UI
    playerHand.sort((a, b) => a.month - b.month);
    comHand.sort((a, b) => a.month - b.month);

    playerHandEl.innerHTML = '';
    playerHand.forEach((card, index) => {
        let clickable = null;
        if (currentTurn === 'player' && !isDealing) {
            clickable = (card.type === 'bonus') ? (c => handlePlayBonusCard(c, 'player')) : handlePlayerPlayCard;
        }
        const cardEl = createCardElement(card, false, clickable);
        // Add dynamic z-index so overlapping works cleanly left to right
        cardEl.style.zIndex = index;
        if (currentTurn === 'player') cardEl.classList.add('playable');
        if (card.type === 'bonus' && currentTurn === 'player') cardEl.classList.add('bonus-card');
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
    updateDealButtonVisibility();

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
        window.playerShakenMonths.push(month);
        document.getElementById('btn-shake').style.display = 'none';
        let badge = document.getElementById('player-shake-badge');
        if (badge) badge.style.display = 'inline-block';

        if (isMultiplayer) {
            sendAction('SHAKE', { month: month });
        }
    } else {
        window.comShook = true;
        window.comMultiplier *= 2;
        window.comShakenMonths.push(month);
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
async function dealCards(isAlreadySynced = false) {
    if (typeof isAlreadySynced !== 'boolean') isAlreadySynced = false;

    if (isDealing) return;
    isDealing = true;
    window.isGameOver = false; // Game is now active
    currentDealId++;
    const myDealId = currentDealId;

    console.log(`dealCards started. Synced: ${isAlreadySynced}, Multiplayer: ${isMultiplayer}, Dealer: ${lastWinner}`);

    try {

        if (isMultiplayer && !isAlreadySynced) {
            // Only the current dealer (lastWinner) can initiate the deal
            if (lastWinner !== 'player') {
                alert("Not your turn to deal! lastWinner is " + lastWinner);
                console.log("Not your turn to deal!");
                isDealing = false;
                return;
            }

            // Dealer shuffles and initializes
            initGame();
            if (window.playShuffleSound) window.playShuffleSound();
            shuffleDeck();

            // Send DEAL action to opponent with a CLONE of the shuffled deck
            // to avoid race conditions during local deck consumption.
            console.log("Multiplayer: Sending DEAL with deck size", deck.length);
            sendAction('DEAL', {
                deck: [...deck],
                lastWinner: 'com', // Inform guest that their dealer is conceptually 'com' (the Host)
                playerMoney: playerMoney,
                comMoney: comMoney
            });
        } else if (!isMultiplayer) {
            initGame();
            if (window.playShuffleSound) window.playShuffleSound();
            shuffleDeck();
        }
        // For guest (isAlreadySynced=true), deck/state is already set in handleRemoteAction

        btnDeal.style.display = 'none';

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
            if (currentDealId !== myDealId) {
                console.log("dealCards loop cancelled by new deal ID!");
                return; // Abort silently, another deal is running
            }
            let step = dealingSequence[i];
            for (let j = 0; j < step.count; j++) {
                if (currentDealId !== myDealId) return;

                if (deck.length === 0) continue; // Protection against empty deck
                let cardObj = deck.shift();
                step.dest.push(cardObj);

                if (window.playCardSound) window.playCardSound();

                renderBoardDealingPhase();

                await new Promise(r => setTimeout(r, 300));
            }
        }

        // Sort hands by month for easier viewing
        playerHand.sort((a, b) => a.month - b.month);
        // Group floor cards by month
        floorCards.sort((a, b) => a.month - b.month);

        await handleFloorBonusCards();


        if (checkChongtong()) {
            isDealing = false;
            renderBoard();
            return;
        }

        currentTurn = lastWinner;
        renderBoard();

        if (checkChongtong()) {
            return;
        }

        // If Com is dealer, trigger com's first play after a short delay
        if (currentTurn === 'com' && !isMultiplayer) {
            setTimeout(playComTurn, 1000);
        }

        // In multiplayer, the dealer updates the button visibility for themselves
        if (isMultiplayer) {
            updateDealButtonVisibility();
            if (isHost) {
                const mapToIds = (cards) => cards.map(c => c.id);
                sendAction('SYNC_STATE', {
                    currentTurn: currentTurn,
                    isGameOver: window.isGameOver,
                    playerShook: window.playerShook,
                    comShook: window.comShook,
                    playerGoCount: window.playerGoCount,
                    comGoCount: window.comGoCount,
                    playerMultiplier: window.playerMultiplier,
                    comMultiplier: window.comMultiplier,
                    playerAnimals: window.playerAnimals,
                    comAnimals: window.comAnimals,
                    playerMoney: playerMoney,
                    comMoney: comMoney,
                    playerCollectedIds: {
                        gwang: mapToIds(playerCollected.gwang),
                        yul: mapToIds(playerCollected.yul),
                        tti: mapToIds(playerCollected.tti),
                        pi: mapToIds(playerCollected.pi)
                    },
                    comCollectedIds: {
                        gwang: mapToIds(comCollected.gwang),
                        yul: mapToIds(comCollected.yul),
                        tti: mapToIds(comCollected.tti),
                        pi: mapToIds(comCollected.pi)
                    },
                    floorCardIds: mapToIds(floorCards),
                    deckIds: mapToIds(deck)
                });
            }
        }
    } catch (err) {
        console.error("Error during dealCards:", err);
        alert("dealCards Error: " + err.message + "\nStack: " + err.stack);
    } finally {
        isDealing = false;
        renderBoard();
    }
}

function updateDealButtonVisibility() {
    // Hide if dealing, bankrupted, or if the game is actively playing right now
    if (isDealing || playerMoney <= 0 || comMoney <= 0 || !window.isGameOver) {
        btnDeal.style.display = 'none';
        return;
    }

    if (isMultiplayer) {
        // Only the dealer (lastWinner === 'player') sees the button, AND only if connected
        const isConnected = conn && conn.open;
        btnDeal.style.display = (lastWinner === 'player' && isConnected) ? 'block' : 'none';
    } else if (isHost) {
        // Host is waiting for a guest to connect; hide until then
        btnDeal.style.display = 'none';
    } else {
        btnDeal.style.display = 'block';
    }
}

async function handleFloorBonusCards() {
    if (isMultiplayer && !isHost) return; // Host only authority

    let bonusOnFloor = floorCards.filter(c => c.type === 'bonus');
    if (bonusOnFloor.length === 0) return;

    // The dealer (lastWinner) gets the floor bonus cards
    const dealer = lastWinner;
    const targetCollection = dealer === 'player' ? playerCollected : comCollected;

    for (let card of bonusOnFloor) {
        // Move to collection
        targetCollection.pi.push(card);
        // Remove from floor
        floorCards = floorCards.filter(c => c.id !== card.id);

        // Replace from deck
        if (deck.length > 0) {
            let replacement = deck.shift();
            floorCards.push(replacement);
        }

        showEventAlert('아싸! 뽀너스', dealer);
        if (window.playCardSound) window.playCardSound();
        renderBoard();
        await new Promise(r => setTimeout(r, 600));
    }

    // Check if new cards are also bonus cards (recursive-ish check)
    if (floorCards.some(c => c.type === 'bonus')) {
        await handleFloorBonusCards();
    } else {
        // Final broadcast after all floor bonuses are handled to ensure initial state sync
        if (isMultiplayer && isHost) {
            const mapToIds = (cards) => cards.map(c => c.id);
            sendAction('SYNC_STATE', {
                currentTurn: currentTurn,
                isGameOver: window.isGameOver,
                playerShook: window.playerShook,
                comShook: window.comShook,
                playerGoCount: window.playerGoCount,
                comGoCount: window.comGoCount,
                playerMultiplier: window.playerMultiplier,
                comMultiplier: window.comMultiplier,
                playerAnimals: window.playerAnimals,
                comAnimals: window.comAnimals,
                playerMoney: playerMoney,
                comMoney: comMoney,
                playerCollectedIds: {
                    gwang: mapToIds(playerCollected.gwang),
                    yul: mapToIds(playerCollected.yul),
                    tti: mapToIds(playerCollected.tti),
                    pi: mapToIds(playerCollected.pi)
                },
                comCollectedIds: {
                    gwang: mapToIds(comCollected.gwang),
                    yul: mapToIds(comCollected.yul),
                    tti: mapToIds(comCollected.tti),
                    pi: mapToIds(comCollected.pi)
                },
                floorCardIds: mapToIds(floorCards),
                deckIds: mapToIds(deck)
            });
        }
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
    if (isDealing) isDealing = false; // Stop dealing if someone got chongtong

    setTimeout(() => {
        let playerName = winner === 'Player' ? '사용자(나)' : '상대방';
        let msg = `총통!(${month}월 4장) \n${playerName}님이 처음 받은 패에 같은 달 4장이 있어 즉시 승리합니다!(5점 점수 인정)`;

        // In multiplayer, broadcast the chongtong if it's ours
        if (isMultiplayer && (winner === 'Player')) {
            sendAction('CHONGTONG', { winner: 'player', month: month });
        }

        let wagerResultMsg = processGameEndWager(winner.toLowerCase(), 5, "총통!");

        showResultModal({
            winner: winner === 'Player' ? '사용자(나)' : '컴퓨터',
            title: `총통! (${month}월 4장)`,
            finalScore: 5,
            bakText: "",
            pureTotal: 5,
            gwang: 0,
            gwangCount: 0,
            yul: 0,
            yulCount: 0,
            tti: 0,
            ttiCount: 0,
            pi: 0,
            piCount: 0,
            godori: 0,
            hongdan: false,
            chodan: false,
            cheongdan: false,
            goBonus: 0,
            multiplier: 1,
            wagerMsg: wagerResultMsg,
            isDraw: false
        });

        lastWinner = winner.toLowerCase();
        renderBoard(); // Update UI to show winner status if needed
    }, 500);
}


function processGameEndWager(winnerStr, score, titleOverride = null) {
    window.isGameOver = true; // Game officially ended
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

    if (isMultiplayer && winnerStr === 'player') {
        sendAction('SYNC_MONEY', { playerMoney, comMoney });
    }

    // Explicit UI Update just in case
    playerMoneyEl.innerText = playerMoney.toLocaleString();
    comMoneyEl.innerText = comMoney.toLocaleString();

    let text = `[머니 정산] ${winnings.toLocaleString()}원 획득!`;
    if (comMoney <= 0) {
        text += `\n상대방 파산! 나의 승!`;
    } else if (playerMoney <= 0) {
        text += `\n사용자 파산! 상대방 승!`;
    }

    updateDealButtonVisibility();
    return text;
}

function checkBankruptcyAndRestart() {
    if (playerMoney <= 0 || comMoney <= 0) {
        const modal = document.getElementById('restart-modal');
        const title = document.getElementById('restart-modal-title');
        const msg = document.getElementById('restart-modal-msg');

        let bankruptPerson = playerMoney <= 0 ? "사용자(나)" : "상대방";
        title.innerText = "파산!";
        msg.innerHTML = `${bankruptPerson}가 파산했습니다.<br>보유 금액을 1,000,000원으로 초기화하고 새로 시작하시겠습니까?`;

        modal.style.display = 'flex';
    }
}

function executeRestart() {
    playerMoney = 1000000;
    comMoney = 1000000;
    playerMoneyEl.innerText = playerMoney.toLocaleString();
    comMoneyEl.innerText = comMoney.toLocaleString();

    if (isMultiplayer) {
        sendAction('SYNC_MONEY', { playerMoney: playerMoney, comMoney: comMoney });
    }

    updateDealButtonVisibility();
    const btnDealEl = document.getElementById('btn-deal');
    if (btnDealEl && btnDealEl.style.display !== 'none') {
        btnDealEl.innerText = '새 게임 시작';
    }
    document.getElementById('restart-modal').style.display = 'none';
}

document.getElementById('btn-restart-confirm').addEventListener('click', executeRestart);
document.getElementById('btn-restart-cancel').addEventListener('click', () => {
    document.getElementById('restart-modal').style.display = 'none';
});

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

    if (isMultiplayer) {
        sendAction('PLAY_CARD', { cardId: playedCard.id });
    }

    // Check Bomb condition: 3 in hand, 1 on floor
    const matchingHandCards = playerHand.filter(c => c.month === playedCard.month);
    const matchingFloorCards = floorCards.filter(c => c.month === playedCard.month);

    isDealing = true; // Prevent player from playing another card during animation

    if (matchingHandCards.length === 3 && matchingFloorCards.length === 1) {
        // Restriction: Cannot bomb if the month was already shaken
        if (!window.playerShakenMonths.includes(playedCard.month)) {
            if (isMultiplayer) {
                sendAction('BOMB', { month: playedCard.month, floorCardId: matchingFloorCards[0].id });
            }
            processBombPhase(matchingHandCards, matchingFloorCards[0], 'player');
            return;
        }
    }

    const clickedEl = Array.from(playerHandEl.children).find(el => el.dataset.id == playedCard.id);

    animateCardThrow(clickedEl, playedCard, 'player', () => {
        if (window.playCardSound) window.playCardSound();
        playerHand = playerHand.filter(c => c.id !== playedCard.id);
        isDealing = false;
        processPlayPhase(playedCard, 'player');
    });
}

function animateHandToCollection(cardObj, owner, callback) {
    const handEl = owner === 'player' ? playerHandEl : comHandEl;
    const cardEl = Array.from(handEl.children).find(el => el.dataset.id == cardObj.id);
    if (!cardEl) {
        if (callback) callback();
        return;
    }

    const targetAreaSelector = owner === 'player' ? '#player-area .pi-group' : '#computer-area .pi-group';
    const targetEl = document.querySelector(targetAreaSelector);
    const targetRect = targetEl.getBoundingClientRect();
    const startRect = cardEl.getBoundingClientRect();

    const flyingCard = cardEl.cloneNode(true);
    flyingCard.style.position = 'fixed';
    flyingCard.style.left = `${startRect.left}px`;
    flyingCard.style.top = `${startRect.top}px`;
    flyingCard.style.zIndex = '9999';
    flyingCard.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
    flyingCard.style.margin = '0';
    document.body.appendChild(flyingCard);

    cardEl.style.visibility = 'hidden';

    requestAnimationFrame(() => {
        flyingCard.style.left = `${targetRect.left + 20}px`;
        flyingCard.style.top = `${targetRect.top - 10}px`;
        flyingCard.style.transform = 'scale(0.5)';
        flyingCard.style.opacity = '0.3';
    });

    let finished = false;
    const cleanup = () => {
        if (finished) return;
        finished = true;
        flyingCard.remove();
        if (callback) callback();
    };
    flyingCard.addEventListener('transitionend', cleanup, { once: true });
    setTimeout(cleanup, 1200);
}

function animateDeckToHand(cardObj, owner, callback) {
    const deckEl = document.getElementById('deck');
    if (!deckEl) { callback(); return; }
    const deckRect = deckEl.getBoundingClientRect();

    const targetEl = owner === 'player' ? playerHandEl : comHandEl;
    const targetRect = targetEl.getBoundingClientRect();

    const flyingCard = document.createElement('img');
    flyingCard.src = (owner === 'player') ? cardObj.imgSrc : 'real_cards/back.jpg';
    flyingCard.className = 'card-img';
    flyingCard.style.position = 'fixed';
    flyingCard.style.left = `${deckRect.left}px`;
    flyingCard.style.top = `${deckRect.top}px`;
    flyingCard.style.zIndex = '9999';
    flyingCard.style.transition = 'all 1.2s ease-in-out';
    flyingCard.style.margin = '0';
    document.body.appendChild(flyingCard);

    requestAnimationFrame(() => {
        let xOffset = 0;
        if (targetEl.children && targetEl.children.length > 0) {
            const lastChildRect = targetEl.lastElementChild.getBoundingClientRect();
            xOffset = (lastChildRect.left - targetRect.left) + 40;
        }
        flyingCard.style.left = `${targetRect.left + xOffset}px`;
        flyingCard.style.top = `${targetRect.top}px`;
    });

    let finished = false;
    const cleanup = () => {
        if (finished) return;
        finished = true;
        flyingCard.remove();
        if (callback) callback();
    };
    flyingCard.addEventListener('transitionend', cleanup, { once: true });
    setTimeout(cleanup, 1600);
}

function animateDeckToCollection(cardObj, owner, callback) {
    const deckEl = document.getElementById('deck');
    if (!deckEl) { callback(); return; }
    const deckRect = deckEl.getBoundingClientRect();

    const targetAreaSelector = owner === 'player' ? '#player-area .pi-group' : '#computer-area .pi-group';
    const targetEl = document.querySelector(targetAreaSelector);
    const targetRect = targetEl.getBoundingClientRect();

    const flyingCard = document.createElement('img');
    flyingCard.src = cardObj.imgSrc;
    flyingCard.className = 'card-img';
    flyingCard.style.position = 'fixed';
    flyingCard.style.left = `${deckRect.left}px`;
    flyingCard.style.top = `${deckRect.top}px`;
    flyingCard.style.zIndex = '9999';
    flyingCard.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
    flyingCard.style.margin = '0';
    document.body.appendChild(flyingCard);

    requestAnimationFrame(() => {
        flyingCard.style.left = `${targetRect.left + 20}px`;
        flyingCard.style.top = `${targetRect.top - 10}px`;
        flyingCard.style.transform = 'scale(0.5)';
        flyingCard.style.opacity = '0.3';
    });

    let finished = false;
    const cleanup = () => {
        if (finished) return;
        finished = true;
        flyingCard.remove();
        if (callback) callback();
    };
    flyingCard.addEventListener('transitionend', cleanup, { once: true });
    setTimeout(cleanup, 1200);
}

async function handlePlayBonusCard(card, owner) {
    if (currentTurn !== owner || isDealing || window.waitingForGiri) return;

    if (owner === 'player' && isMultiplayer) {
        sendAction('PLAY_BONUS', { cardId: card.id });
    }

    isDealing = true;

    // 1. Animate from hand to collection
    await new Promise(resolve => {
        animateHandToCollection(card, owner, () => {
            // Remove from hand model
            if (owner === 'player') {
                playerHand = playerHand.filter(c => c.id !== card.id);
            } else {
                comHand = comHand.filter(c => c.id !== card.id);
            }
            // Move to collection model
            const collection = owner === 'player' ? playerCollected : comCollected;
            collection.pi.push(card);
            if (window.playCardSound) window.playCardSound();
            renderBoard();
            resolve();
        });
    });

    // 2. Loop to draw replacement from deck to hand
    // If replacement is bonus, it goes to collection and we flip another for hand
    while (deck.length > 0) {
        let replacement = deck.shift();
        if (replacement.type === 'bonus') {
            await new Promise(resolve => {
                animateDeckToCollection(replacement, owner, () => {
                    const collection = owner === 'player' ? playerCollected : comCollected;
                    collection.pi.push(replacement);
                    if (window.playCardSound) window.playCardSound();
                    renderBoard();
                    resolve();
                });
            });
            // continues to next iteration to get a non-bonus card for the hand
        } else {
            // Animate moving to hand slowly
            await new Promise(resolve => {
                animateDeckToHand(replacement, owner, () => {
                    if (owner === 'player') {
                        playerHand.push(replacement);
                        playerHand.sort((a, b) => a.month - b.month);
                    } else {
                        comHand.push(replacement);
                        comHand.sort((a, b) => a.month - b.month);
                    }
                    if (window.playCardSound) window.playCardSound();
                    renderBoard();
                    resolve();
                });
            });
            break; // Finished getting a normal card for hand
        }
    }

    isDealing = false;
    renderBoard();

    // TURN CONTINUES
    if (owner === 'com' && !isMultiplayer) {
        setTimeout(playComAiCard, 600);
    } else {
        // Re-attach listeners to the updated hand just in case
        renderBoard(); // Forces recreation of elements with correct bindings
    }
}

// Process a card played from hand
function processPlayPhase(playedCard, turnOwner) {
    // 1. Check match with floor
    let matchedFloorCards = floorCards.filter(c => c.month === playedCard.month);

    // Save context for Ssanda (Ppeok), Ttaddak, etc.
    window.turnContext.playedCard = playedCard;
    window.turnContext.matchedFloorCards = [...matchedFloorCards];
    window.turnContext.potentialHandCapture = [];

    // Guard: Observer in multiplayer skips local matching logic
    if (isMultiplayer && turnOwner === 'com') {
        console.log("Multiplayer: Observer skipping local matching, waiting for SYNC_CAPTURE/SELECT_FLOOR...");
        renderBoard();
        return;
    }

    if (matchedFloorCards.length === 0) {
        // No match -> goes to floor immediately
        floorCards.push(playedCard);
        if (isMultiplayer && turnOwner === 'player') {
            sendAction('SYNC_CAPTURE', { capturedIds: [] });
        }
        renderBoard();
        promptGiriFlip(turnOwner);
    } else if (matchedFloorCards.length === 1) {
        // 1 match
        window.turnContext.potentialHandCapture = [playedCard, matchedFloorCards[0]];
        if (isMultiplayer && turnOwner === 'player') {
            sendAction('SYNC_CAPTURE', { capturedIds: [matchedFloorCards[0].id] });
        }
        floorCards = floorCards.filter(c => c.id !== matchedFloorCards[0].id);
        renderBoard();
        promptGiriFlip(turnOwner);
    } else if (matchedFloorCards.length === 3) {
        window.turnContext.potentialHandCapture = [playedCard, ...matchedFloorCards];
        if (isMultiplayer && turnOwner === 'player') {
            sendAction('SYNC_CAPTURE', { capturedIds: matchedFloorCards.map(c => c.id) });
        }
        floorCards = floorCards.filter(c => c.month !== playedCard.month);
        renderBoard();
        promptGiriFlip(turnOwner);
    } else if (matchedFloorCards.length === 2) {
        // 2 matches -> User / Com must select which one to take
        if (turnOwner === 'player') {
            showCardSelection(matchedFloorCards, (selectedCard) => {
                if (isMultiplayer) {
                    sendAction('SELECT_FLOOR', { cardId: selectedCard.id });
                }
                window.turnContext.potentialHandCapture = [playedCard, selectedCard];
                floorCards = floorCards.filter(c => c.id !== selectedCard.id);
                renderBoard();
                promptGiriFlip(turnOwner);
            });
        } else {
            if (isMultiplayer) {
                // Multi: Wait for the other player's selection
                console.log("Multiplayer: Waiting for remote player to select floor card...");
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
}

function promptGiriFlip(turnOwner) {
    if (turnOwner === 'player') {
        window.waitingForGiri = true;
        document.getElementById('deck').classList.add('clickable-deck');

        // Automate deck flip with a short delay (1000ms)
        setTimeout(() => {
            if (window.waitingForGiri && currentTurn === 'player' && !isDealing) {
                window.waitingForGiri = false;
                document.getElementById('deck').classList.remove('clickable-deck');
                animateGiriCard('player');
            }
        }, 1000);
    } else {
        if (isMultiplayer) {
            // Multiplayer: Wait for CLICK_DECK action from remote.
            window.waitingForRemoteGiri = true;
            console.log("Multiplayer: Waiting for remote player to flip deck...");
        } else {
            setTimeout(() => {
                animateGiriCard(turnOwner);
            }, 1000);
        }
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

    let transitionFinished = false;
    const cleanup = () => {
        if (transitionFinished) return;
        transitionFinished = true;
        flyingCard.remove();
        if (window.playCardSound) window.playCardSound();
        processGiriPhase(turnOwner);
    };

    flyingCard.addEventListener('transitionend', cleanup, { once: true });
    // Safety timeout: transition is 0.6s
    setTimeout(cleanup, 1000);
}

function processGiriPhase(turnOwner) {
    let giriCard = null;
    let matchedFloorCards = [];

    if (deck.length > 0) {
        giriCard = deck.shift();
        matchedFloorCards = floorCards.filter(c => c.month === giriCard.month);
    }

    // Capture autoritative sync IDs if they exist
    if (isMultiplayer && turnOwner === 'com' && window.remoteNextCaptureIds) {
        // We'll trust what host says was in potentialHandCapture (the PlayPhase result)
        const remoteIds = window.remoteNextCaptureIds;
        window.turnContext.potentialHandCapture = remoteIds.map(id => fullDeck.find(c => c.id === id)).filter(Boolean);
        if (window.turnContext.playedCard) {
            window.turnContext.potentialHandCapture.unshift(window.turnContext.playedCard);
        }
        window.remoteNextCaptureIds = null;
    }

    let capturedThisTurn = [...(window.turnContext?.potentialHandCapture || [])];

    const isPlayerFinalTurn = (turnOwner === 'player' && playerHand.length === 0);
    const isComFinalTurn = (turnOwner === 'com' && comHand.length === 0);
    const isLastTurn = isPlayerFinalTurn || isComFinalTurn || (deck.length === 0 && !giriCard && playerHand.length === 0 && comHand.length === 0);

    // --- Ssanda (Ppeok) Logic ---
    let handCard = window.turnContext ? window.turnContext.playedCard : null;
    let handMatchedCount = (window.turnContext && window.turnContext.matchedFloorCards) ? window.turnContext.matchedFloorCards.length : 0;
    let isPpeok = false;

    // Guard: Observer skips local logic and waits for SYNC_GIRI_CAPTURE
    if (isMultiplayer && turnOwner === 'com') {
        // We will finalize in finishGiriPhase using window.remoteGiriData
    } else {
        if (!isLastTurn && handCard && giriCard && handCard.month === giriCard.month && handMatchedCount === 1) {
            isPpeok = true;
        }
    }

    if (isPpeok) {
        // It's a Ppeok! Everything stays/goes on the floor.
        floorCards.push(handCard, window.turnContext.matchedFloorCards[0], giriCard);
        capturedThisTurn = []; // Nothing captured
        window.turnContext.potentialHandCapture = []; // Clear visual pending
        renderBoard(); // Force visual clear of tilted cards
        showEventAlert('헉~ 뻑!', turnOwner);
        finishGiriPhase();
    }

    floorCards.sort((a, b) => a.month - b.month);

    if (isMultiplayer && turnOwner === 'player') {
        // Authoritative player broadcasts the result immediately
        // We'll calculate stolenCount and event alerts later, but we need to let the observer know the basics
        // Actually, let's calculate everything first.
    }


    // NOTE: finishGiriPhase is called ONLY inside each branch below (not here)
    // to avoid double-calling when capturedThisTurn has hand captures

    function finishGiriPhase() {
        let stolenCount = 0;
        let capturedEvents = [];

        // Observer Logic: Trust the remote broadcast
        if (isMultiplayer && turnOwner === 'com') {
            if (window.remoteGiriData) {
                stolenCount = window.remoteGiriData.stolenCount || 0;
                isPpeok = window.remoteGiriData.isPpeok || false;
                capturedEvents = window.remoteGiriData.events || [];

                if (isPpeok) {
                    showEventAlert('헉~ 뻑!', turnOwner);
                } else {
                    capturedEvents.forEach(evt => showEventAlert(evt, turnOwner));
                }
                window.remoteGiriData = null;
            }
        } else {
            // Active Player Logic: Calculate bonuses
            if (!isPpeok) {
                // Detect Jjok (쪽)
                if (handMatchedCount === 0 && handCard && giriCard && handCard.month === giriCard.month) {
                    capturedEvents.push('쪽!');
                    stolenCount++;
                }

                // Detect Ttaddak (따닥)
                if (handMatchedCount === 1 && handCard && giriCard && handCard.month === giriCard.month) {
                    capturedEvents.push('따닥!');
                    stolenCount++;
                }

                // Detect "Taking Ppeok" (뻑 먹기)
                let monthsCaptured = {};
                capturedThisTurn.forEach(c => {
                    monthsCaptured[c.month] = (monthsCaptured[c.month] || 0) + 1;
                });
                for (let m in monthsCaptured) {
                    if (monthsCaptured[m] === 4) {
                        capturedEvents.push('뻑 먹기!');
                        stolenCount++;
                    }
                }
            }

            // Detect Sseul (쓸 / 판쓰리)
            if (floorCards.length === 0 && capturedThisTurn.length > 0 && !isLastTurn) {
                capturedEvents.push('판쓸!');
                stolenCount++;
            }

            // Show Alerts for Active Player
            if (isPpeok) {
                // Alert already shown in finishGiriPhase? No, let's keep it consistent.
            } else {
                capturedEvents.forEach(evt => showEventAlert(evt, turnOwner));
            }

            // Broadcast results to observer
            if (isMultiplayer && turnOwner === 'player') {
                sendAction('SYNC_GIRI_CAPTURE', {
                    stolenCount: stolenCount,
                    isPpeok: isPpeok,
                    events: capturedEvents
                });
            }
        }

        window.turnContext.potentialHandCapture = []; // CRITICAL: Clear visuals after move

        let postStealAction = async () => {
            renderBoard();

            // Allow browser a moment to visually paint the cards moving to the collection area
            await new Promise(resolve => setTimeout(resolve, 150));

            await evaluateAnimalRules(turnOwner);
            let currentScoreObj = calculateScore(turnOwner === 'player' ? playerCollected : comCollected, turnOwner);
            let maxScore = turnOwner === 'player' ? window.playerMaxScore : window.comMaxScore;

            // In multiplayer, OBSERVER must NOT independently trigger Go/Stop.
            // Only the active player decides, and notifies the observer via PROMPT_GOSTOP.
            if (isMultiplayer && turnOwner === 'com') {
                // Observer just proceeds; waits for PROMPT_GOSTOP from active player
                proceedToNextTurn(turnOwner);
                return;
            }

            if (currentScoreObj.total >= 5 && currentScoreObj.total > maxScore) {
                if (isLastTurn) {
                    setTimeout(endGame, 500);
                    return;
                }

                // Force STATE sync before showing the Go/Stop prompt to ensure identical display
                if (isMultiplayer && turnOwner === 'player') {
                    forceSyncState();
                    // Notify observer to show the waiting screen
                    sendAction('PROMPT_GOSTOP', { score: currentScoreObj.total });
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

    if (isPpeok) {
        // Handled above.
        return;
    } else {
        floorCards.sort((a, b) => a.month - b.month);

        if (!giriCard) {
            // No giri card - just animate any hand captures, then finish
            if (capturedThisTurn.length > 0) {
                animateCardCapture(capturedThisTurn, turnOwner, finishGiriPhase);
            } else {
                finishGiriPhase();
            }
        } else if (giriCard.type === 'bonus') {
            resolveCaptures([giriCard], turnOwner);
            if (window.playCardSound) window.playCardSound();
            renderBoard();
            setTimeout(() => {
                animateGiriCard(turnOwner);
            }, 600);
            return;
        } else if (matchedFloorCards.length === 0) {
            floorCards.push(giriCard);
            // No giri match - animate any hand captures, then finish
            if (capturedThisTurn.length > 0) {
                animateCardCapture(capturedThisTurn, turnOwner, finishGiriPhase);
            } else {
                finishGiriPhase();
            }
        } else if (matchedFloorCards.length === 1) {
            capturedThisTurn.push(giriCard, matchedFloorCards[0]);
            floorCards = floorCards.filter(c => c.id !== matchedFloorCards[0].id);
            if (capturedThisTurn.length > 0) {
                animateCardCapture(capturedThisTurn, turnOwner, finishGiriPhase);
            } else {
                finishGiriPhase();
            }
        } else if (matchedFloorCards.length === 3) {
            capturedThisTurn.push(giriCard, ...matchedFloorCards);
            floorCards = floorCards.filter(c => c.month !== giriCard.month);
            if (capturedThisTurn.length > 0) {
                animateCardCapture(capturedThisTurn, turnOwner, finishGiriPhase);
            } else {
                finishGiriPhase();
            }
        } else if (matchedFloorCards.length === 2) {
            if (turnOwner === 'player') {
                showCardSelection(matchedFloorCards, (selectedCard) => {
                    if (isMultiplayer) {
                        sendAction('SELECT_FLOOR', { cardId: selectedCard.id });
                    }
                    capturedThisTurn.push(giriCard, selectedCard);
                    floorCards = floorCards.filter(c => c.id !== selectedCard.id);
                    if (capturedThisTurn.length > 0) {
                        animateCardCapture(capturedThisTurn, turnOwner, finishGiriPhase);
                    } else {
                        finishGiriPhase();
                    }
                });
            } else {
                if (isMultiplayer) {
                    window.waitingForGiriSelection = true;
                    window.pendingGiriCard = giriCard;
                    window.pendingGiriCaptured = capturedThisTurn;
                    window.pendingGiriFinishCallback = finishGiriPhase;
                    console.log("Multiplayer (Giri): Waiting for remote player to select floor card...");
                } else {
                    let pick = matchedFloorCards[Math.floor(Math.random() * matchedFloorCards.length)];
                    capturedThisTurn.push(giriCard, pick);
                    floorCards = floorCards.filter(c => c.id !== pick.id);
                    if (capturedThisTurn.length > 0) {
                        animateCardCapture(capturedThisTurn, turnOwner, finishGiriPhase);
                    } else {
                        finishGiriPhase();
                    }
                }
            }
        }
    }
}

function forceSyncState() {
    if (!isMultiplayer) return;
    const mapToIds = (cards) => cards.map(c => c.id);
    sendAction('SYNC_STATE', {
        currentTurn: currentTurn,
        isGameOver: window.isGameOver,
        playerShook: window.playerShook,
        comShook: window.comShook,
        playerGoCount: window.playerGoCount,
        comGoCount: window.comGoCount,
        playerMultiplier: window.playerMultiplier,
        comMultiplier: window.comMultiplier,
        playerAnimals: window.playerAnimals,
        comAnimals: window.comAnimals,
        playerMoney: playerMoney,
        comMoney: comMoney,
        playerCollectedIds: {
            gwang: mapToIds(playerCollected.gwang),
            yul: mapToIds(playerCollected.yul),
            tti: mapToIds(playerCollected.tti),
            pi: mapToIds(playerCollected.pi)
        },
        comCollectedIds: {
            gwang: mapToIds(comCollected.gwang),
            yul: mapToIds(comCollected.yul),
            tti: mapToIds(comCollected.tti),
            pi: mapToIds(comCollected.pi)
        },
        floorCardIds: mapToIds(floorCards),
        deckIds: mapToIds(deck)
    });
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

    if (isMultiplayer && turnOwner === 'player') {
        sendAction('SYNC_MONEY', { playerMoney, comMoney });
    }

    playerMoneyEl.innerText = playerMoney.toLocaleString();
    comMoneyEl.innerText = comMoney.toLocaleString();
}

function showEventAlertWithConfirm(message, owner) {
    if (isMultiplayer && window.pendingAlertConfirm > 0) {
        window.pendingAlertConfirm--;
        return Promise.resolve();
    }
    return new Promise(resolve => {
        let overlay = document.createElement('div');

        window.activeAlertResolver = () => {
            if (overlay && overlay.parentNode) overlay.remove();
            resolve();
            window.activeAlertResolver = null;
        };

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

        if (isMultiplayer) {
            if (owner === 'com') {
                btn.disabled = true;
                btn.innerText = '상대방 확인 대기 중...';
                btn.style.backgroundColor = '#ccc';
                btn.style.cursor = 'not-allowed';
                btn.onclick = null;
            } else {
                btn.onclick = () => {
                    sendAction('ALERT_CONFIRM', {});
                    if (typeof window.activeAlertResolver === 'function') {
                        window.activeAlertResolver();
                    } else {
                        // Fallback if resolver was cleared: just remove this overlay
                        if (overlay && overlay.parentNode) overlay.remove();
                        resolve();
                    }
                };
            }
        } else {
            btn.onclick = () => {
                window.activeAlertResolver();
            };
        }

        div.appendChild(btn);
        overlay.appendChild(div);
        document.body.appendChild(overlay);

        btn.focus();
    });
}

function countCurrentAnimals(owner) {
    const isPlayer = owner === 'player';
    const collection = isPlayer ? playerCollected : comCollected;
    let count = 0;
    ['gwang', 'yul', 'tti', 'pi'].forEach(type => {
        collection[type].forEach(card => {
            const fileName = card.imgSrc.split('/').pop();
            if (animalCardCounts[fileName]) {
                count += animalCardCounts[fileName];
            }
        });
    });
    return count;
}

async function evaluateAnimalRules(turnOwner) {
    const isPlayer = turnOwner === 'player';

    // Count current animals
    const currentAnimals = countCurrentAnimals(turnOwner);

    // Count opponent's current animals
    const oppAnimals = countCurrentAnimals(isPlayer ? 'com' : 'player');

    let prevAnimals = isPlayer ? window.playerAnimals : window.comAnimals;

    // Guard: In multiplayer, only the active player calculates and broadcasts the bonus alert.
    if (isMultiplayer && !isPlayer) {
        // Observer just updates the state quietly to match the future/current state.
        if (isPlayer) window.playerAnimals = currentAnimals;
        else window.comAnimals = currentAnimals;
        return;
    }

    if (currentAnimals > Math.max(4, prevAnimals)) {
        const myMultiplier = isPlayer ? window.playerMultiplier : window.comMultiplier;
        const isAnimalBak = (oppAnimals === 0);

        // Calculate the incremental base bonus for the newly acquired animals
        let incrementalBase = (currentAnimals - Math.max(4, prevAnimals)) * 1000;
        let finalAmountToPay = isAnimalBak ? incrementalBase * 2 : incrementalBase * myMultiplier;

        if (finalAmountToPay > 0) {
            // Function to format Korean money string
            const formatMoney = (amount) => {
                if (amount >= 10000) {
                    let man = Math.floor(amount / 10000);
                    let chun = amount % 10000;
                    let str = (man > 1 ? man : "") + "만";
                    if (chun > 0) str += (chun / 1000) + "천";
                    return str + "원";
                } else {
                    const words = ["", "천원", "이천원", "삼천원", "사천원", "오천원", "육천원", "칠천원", "팔천원", "구천원"];
                    if (amount % 1000 === 0 && amount <= 9000) {
                        return words[amount / 1000];
                    } else {
                        return amount.toLocaleString() + "원";
                    }
                }
            };

            let suffix = "";
            let reasons = [];
            if (myMultiplier > 1) reasons.push(`배수x${myMultiplier} `);
            if (isAnimalBak) reasons.push("동물박");
            if (reasons.length > 0) suffix = ` (${reasons.join(", ")})`;

            processAnimalMoney(turnOwner, finalAmountToPay);
            if (isPlayer) window.playerAnimalBonusPaid += finalAmountToPay;
            else window.comAnimalBonusPaid += finalAmountToPay;

            let totalPaidSoFar = isPlayer ? window.playerAnimalBonusPaid : window.comAnimalBonusPaid;
            const msg = `앗싸! 이번 수익: ${formatMoney(finalAmountToPay)}${suffix} \n(현재 동물이 ${currentAnimals}마리, 총 수익: ${formatMoney(totalPaidSoFar)})`;

            if (isMultiplayer && isPlayer) {
                sendAction('ANIMAL_BONUS', { msg: msg });
            }

            // Save state early (before await) to prevent re-triggering if function is called again
            if (isPlayer) {
                window.playerAnimals = currentAnimals;
            } else {
                window.comAnimals = currentAnimals;
            }

            await showEventAlertWithConfirm(msg, turnOwner);
        }
    } else {
        // Even if no alert, still sync current count
        if (isPlayer) {
            window.playerAnimals = currentAnimals;
        } else {
            window.comAnimals = currentAnimals;
        }
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

        if (isMultiplayer && turnOwner === 'player') {
            // Turn owner broadcasts definitive state after their turn is fully resolved
            const mapToIds = (cards) => cards.map(c => c.id);
            sendAction('SYNC_STATE', {
                playerGoCount: window.playerGoCount,
                comGoCount: window.comGoCount,
                playerMultiplier: window.playerMultiplier,
                comMultiplier: window.comMultiplier,
                playerAnimals: window.playerAnimals,
                comAnimals: window.comAnimals,
                playerMoney: playerMoney,
                comMoney: comMoney,
                playerCollectedIds: {
                    gwang: mapToIds(playerCollected.gwang),
                    yul: mapToIds(playerCollected.yul),
                    tti: mapToIds(playerCollected.tti),
                    pi: mapToIds(playerCollected.pi)
                },
                comCollectedIds: {
                    gwang: mapToIds(comCollected.gwang),
                    yul: mapToIds(comCollected.yul),
                    tti: mapToIds(comCollected.tti),
                    pi: mapToIds(comCollected.pi)
                },
                floorCardIds: mapToIds(floorCards),
                deckIds: mapToIds(deck)
            });
        }

        renderBoard();
        if (currentTurn === 'com' && !isMultiplayer) {
            setTimeout(playComTurn, 600);
        }
    }, 600);
}

function resolveCaptures(cards, owner) {
    let targetCollection = owner === 'player' ? playerCollected : comCollected;

    cards.forEach(card => {
        if (card.type === 'gwang') {
            targetCollection.gwang.push(card);
        } else if (card.type === 'yul') {
            targetCollection.yul.push(card);
        } else if (card.type === 'tti') {
            targetCollection.tti.push(card);
        } else {
            targetCollection.pi.push(card);
        }
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
        flyingCard.style.transition = `all 0.5s cubic - bezier(0.2, 0.8, 0.2, 1) ${delay} s`;
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

        let transitionFinished = false;
        const cleanup = () => {
            if (transitionFinished) return;
            transitionFinished = true;
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
        };

        flyingCard.addEventListener('transitionend', cleanup, { once: true });
        // Safety timeout: transition is 0.5s + staggered delay
        setTimeout(cleanup, 1000 + (capturedCards.length * 100));
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
        flyingCard.style.transition = `all 2.0s cubic - bezier(0.2, 0.8, 0.2, 1) ${delay} s`;
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
    if (turnOwner === 'player') {
        window.playerEmptyTurns--;
        if (isMultiplayer) {
            sendAction('CLICK_DECK', {});
        }
    } else {
        window.comEmptyTurns--;
    }

    // 빈 턴일 경우 패를 내지 않고 대기 상태로 진입 (기리패 수동 클릭)
    window.turnContext.playedCardMatchedLength = -1; // 따닥 방지
    window.turnContext.playedCard = null;

    promptGiriFlip(turnOwner);
}

function handleEmptyRemoteTurn() {
    window.comEmptyTurns--;
    window.turnContext.playedCardMatchedLength = -1;
    window.turnContext.playedCard = null;
    promptGiriFlip('com');
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
    if (isMultiplayer || comHand.length === 0 || currentTurn !== 'com') return;

    if (isDealing) {
        setTimeout(playComTurn, 500);
        return;
    }

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
    if (isMultiplayer) return;

    // Dumb AI: Try to find a card that matches the floor
    // Check for bonus cards first
    let bonusCard = comHand.find(c => c.type === 'bonus');
    if (bonusCard) {
        handlePlayBonusCard(bonusCard, 'com');
        return; // handlePlayBonusCard will call playComAiCard again
    }

    let cardToPlay = null;
    let isBomb = false;
    let matchingHandCards = [];
    let matchingFloorCard = null;

    // Check for bomb first
    for (let c of comHand) {
        matchingHandCards = comHand.filter(handCard => handCard.month === c.month);
        let floorMatch = floorCards.filter(floorCard => floorCard.month === c.month);

        if (matchingHandCards.length === 3 && floorMatch.length === 1) {
            // Restriction: Cannot bomb if the month was already shaken
            if (!window.comShakenMonths.includes(c.month)) {
                isBomb = true;
                matchingFloorCard = floorMatch[0];
                break;
            }
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
                bakMsgs.push(`${label} (x${winnerMultiplier})`);
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
                bakMsgs.push(`${winnerGoCount} 고(x${goMult})`);
            } else if (winnerGoCount > 0) {
                bakMsgs.push(`${winnerGoCount} 고`);
            }

            finalScore *= totalMultiplier;
            winnerScoreInfo.multiplierObj = totalMultiplier;
            winnerScoreInfo.goBonusObj = goBonusPoints;

            let bakText = bakMsgs.length > 0 ? ` [${bakMsgs.join(", ")}]적용` : "";

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
                yulCount: winnerScoreInfo.yulCount || 0,
                tti: winnerScoreInfo.tti,
                ttiCount: winnerScoreInfo.ttiCount || 0,
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
            window.isGameOver = true; // Game ended in a draw
        }

        // If someone is bankrupt, btnDeal is already hidden inside processGameEndWager
        if (playerMoney > 0 && comMoney > 0) {
            updateDealButtonVisibility();
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
        const godoriHtml = data.godori > 0 ? `<div class="result-detail-item"><span class="result-label">고도리</span><span class="result-value">+${data.godori} 점</span></div>` : "";
        const danHtml = (data.hongdan || data.chodan || data.cheongdan) ?
            `<div class="result-detail-item"><span class="result-label">단 종류</span><span class="result-value">${[data.hongdan ? '홍단' : '', data.chodan ? '초단' : '', data.cheongdan ? '청단' : ''].filter(v => v).join(', ')}</span></div>` : "";

        content = `
    <div class="result-main">
                <span class="result-winner">${data.title || data.winner + ' 승리!'}</span>
                <span style="font-size: 1.8rem; color: #fff;">최종 ${data.finalScore} 점</span>
                <div style="color: #00d2ff; font-size: 0.9rem; margin-top: 5px;">${data.bakText}</div>
            </div>
            
            <div class="result-separator"></div>
            
            <h4>상세 점수 내역</h4>
            <div class="result-detail-item"><span class="result-label">광</span><span class="result-value">${data.gwang} 점 (${data.gwangCount}장)</span></div>
            <div class="result-detail-item"><span class="result-label">열</span><span class="result-value">${data.yul} 점 (${data.yulCount}장)</span></div>
            ${godoriHtml}
<div class="result-detail-item"><span class="result-label">띠</span><span class="result-value">${data.tti} 점 (${data.ttiCount}장)</span></div>
            ${danHtml}
            <div class="result-detail-item"><span class="result-label">피</span><span class="result-value">${data.pi} 점 (${data.piCount}장)</span></div>
            
            <div class="result-total-box" style="margin-top: 15px;">
                <div class="result-detail-item" style="border:none;"><span class="result-label">족보 총합</span><span class="result-value">${data.pureTotal} 점</span></div>
                ${data.goBonus > 0 ? `<div class="result-detail-item" style="border:none;"><span class="result-label">고 보너스</span><span class="result-value">+${data.goBonus} 점</span></div>` : ""}
                ${data.multiplier > 1 ? `<div class="result-detail-item" style="border:none;"><span class="result-label">최종 배수</span><span class="result-value">x${data.multiplier}배</span></div>` : ""}
            </div>
            
            <div style="background: rgba(0, 210, 255, 0.1); padding: 10px; border-radius: 8px; font-size: 0.95rem; text-align: center;">
                ${data.wagerMsg}
            </div>
`;
    }

    body.innerHTML = content;
    modal.style.display = 'flex';

    // MULTIPLAYER SYNC: Only the winner can confirm the next game
    const confirmBtn = document.getElementById('modal-confirm-btn');
    if (isMultiplayer) {
        const myWin = (lastWinner === 'player');
        if (myWin) {
            confirmBtn.disabled = false;
            confirmBtn.innerText = '확인 (Next Game)';
            confirmBtn.style.opacity = '1';
        } else {
            confirmBtn.disabled = true;
            confirmBtn.innerText = '상대방 확인 대기 중...';
            confirmBtn.style.opacity = '0.5';
        }
    } else {
        confirmBtn.disabled = false;
        confirmBtn.innerText = '확인 (Next Game)';
        confirmBtn.style.opacity = '1';
    }

    // Reset modal position to center
    const contentEl = document.getElementById('result-modal-content');
    contentEl.style.top = '50%';
    contentEl.style.left = '50%';
    contentEl.style.transform = 'translate(-50%, -50%)';
}

function closeResultModal(isRemote = false) {
    // If called via event listener, the first arg is an Event object, which is truthy.
    // We only want to skip sending if isRemote is strictly true.
    const wasRemote = (isRemote === true);

    document.getElementById('result-modal').style.display = 'none';

    // Only send the confirm action if the local player (the winner) clicked the button
    if (!wasRemote && isMultiplayer && lastWinner === 'player') {
        console.log("Multiplayer: Sending RESULT_CONFIRM action...");
        sendAction('RESULT_CONFIRM', {});
    }

    checkBankruptcyAndRestart();
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

    if (isMultiplayer) {
        sendAction('CLICK_DECK', {});
    }

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
    0 % { opacity: 1; transform: translate(-50 %, -50 %); }
    100 % { opacity: 0; transform: translate(-50 %, -150 %); }
}
`;
document.head.appendChild(style);

// Start with initialized empty board
initGame();
updateDealButtonVisibility();

// --- Go/Stop Logic ---
function promptGoStop(turnOwner, currentScore) {
    if (turnOwner === 'player') {
        document.getElementById('gostop-message').innerText = `${currentScore}점이 났습니다! 고(Go) 하시겠습니까 ? `;
        document.getElementById('gostop-selection-overlay').style.display = 'flex';

        let goBtn = document.getElementById('btn-go');
        let stopBtn = document.getElementById('btn-stop');
        goBtn.disabled = false;
        stopBtn.disabled = false;

        // Remove old listeners to prevent multiple fires
        let clonedGo = goBtn.cloneNode(true);
        let clonedStop = stopBtn.cloneNode(true);
        goBtn.parentNode.replaceChild(clonedGo, goBtn);
        stopBtn.parentNode.replaceChild(clonedStop, stopBtn);

        clonedGo.addEventListener('click', () => handleGo('player'));
        clonedStop.addEventListener('click', () => handleStop('player'));
    } else {
        if (isMultiplayer) {
            // Observer side: show waiting overlay
            document.getElementById('gostop-message').innerText = `${currentScore}점이 났습니다! 상대방의 선택을 기다리는 중...`;
            document.getElementById('gostop-selection-overlay').style.display = 'flex';
            document.getElementById('btn-go').disabled = true;
            document.getElementById('btn-stop').disabled = true;
        } else {
            // AI Logic
            setTimeout(() => playComGoStop(currentScore), 1500);
        }
    }
}

function handleGo(turnOwner) {
    document.getElementById('gostop-selection-overlay').style.display = 'none';

    if (turnOwner === 'player') {
        window.playerGoCount++;
        window.playerMaxScore = calculateScore(playerCollected, 'player').total;

        let badge = document.getElementById('player-go-count');
        badge.style.display = 'inline';
        badge.innerText = `${window.playerGoCount} 고`;

        showEventAlert(`${window.playerGoCount} 고!`, 'player');
    } else {
        window.comGoCount++;
        window.comMaxScore = calculateScore(comCollected, 'com').total;

        let badge = document.getElementById('com-go-count');
        badge.style.display = 'inline';
        badge.innerText = `${window.comGoCount} 고`;

        showEventAlert(`${window.comGoCount} 고!`, 'com');
    }

    setTimeout(() => proceedToNextTurn(turnOwner), 1500);

    if (isMultiplayer && turnOwner === 'player') {
        sendAction('GO', {});
        // Also send full state to be safe
        sendAction('SYNC_STATE', {
            playerGoCount: window.playerGoCount,
            comGoCount: window.comGoCount,
            playerMultiplier: window.playerMultiplier,
            comMultiplier: window.comMultiplier,
            playerAnimals: window.playerAnimals,
            comAnimals: window.comAnimals,
            playerMoney: playerMoney,
            comMoney: comMoney
        });
    }
    updateScoreUI();
}

function handleStop(turnOwner) {
    document.getElementById('gostop-selection-overlay').style.display = 'none';
    showEventAlert('스톱!', turnOwner);
    if (isMultiplayer && turnOwner === 'player') {
        sendAction('STOP', {});
    }

    setTimeout(() => endGame(turnOwner), 1500);
}

function playComGoStop(currentScore) {
    if (isMultiplayer) return;
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
