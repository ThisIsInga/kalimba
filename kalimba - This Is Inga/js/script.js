// MENU 
let menu = document.querySelector('.menu');
let settingsBlock = document.querySelector('.menu__block');

menu.addEventListener('click', () => {
    menu.classList.toggle('menu__on');
    
    if (menu.classList.contains('menu__on')) {
        settingsBlock.style.display = 'block'; // Показываем настройки
    } else {
        settingsBlock.style.display = 'none'; // Скрываем настройки
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const themeBlock = document.querySelector('.theme__block');

    let colors = ['rgb(245, 225, 182)', 'pink', 'red', 'blue', 'green', 'purple', 'yellow'];
    let currentColorIndex = 0;

    const colorBlocks = document.querySelectorAll('.block__color');

    if (localStorage.getItem('blockColorIndex')) {
        currentColorIndex = parseInt(localStorage.getItem('blockColorIndex'));
        updateColors();
    }

    if (themeBlock) {
        themeBlock.addEventListener('click', () => {
            currentColorIndex = (currentColorIndex + 1) % colors.length; 

            localStorage.setItem('blockColorIndex', currentColorIndex);

            updateColors();
        });
    }

    function updateColors() {
        colorBlocks.forEach(block => {
            block.style.backgroundColor = colors[currentColorIndex]; 
        });
    }
});


const hasPlayed = {
    '5o': false,
    '3o': false,
    '1o': false,
    '6': false,
    '4': false,
    '2': false,
    '1': false,
    '3': false,
    '5': false,
    '7': false,
    '2o': false,
    '4o': false,
    '6o': false
};

const playAudio = (id) => {
    const audio = new Audio(`${id}.mp3`);
    const tab = document.getElementById(id);

    audio.addEventListener('play', () => {
        tab.classList.add('active');
    });

    audio.addEventListener('ended', () => {
        tab.classList.remove('active');
        hasPlayed[id] = false;
    });

    if (!hasPlayed[id]) {
        audio.play();
        hasPlayed[id] = true;
    }
};

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        playAudio(tab.id);
    });
});

document.addEventListener('keydown', (event) => {
    const keyToId = {
        '1': '5o',
        '2': '3o',
        '3': '1o',
        '4': '6',
        '5': '4',
        '6': '2',
        '7': '1',
        '8': '3',
        '9': '5',
        '0': '7',
        '-': '2o',
        '=': '4o',
        ']': '6o'
    };

    const id = keyToId[event.key];
    if (id) {
        playAudio(id);
    }
});