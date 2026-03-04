// Экран загрузки
const loader = document.getElementById('loader');
const loaderText = document.getElementById('loader-text');
const loaderProgress = document.getElementById('loader-progress');
const content = document.getElementById('content');

let percent = 0;

function updateLoader() {
    percent++;
    loaderText.textContent = percent + '%';
    loaderProgress.style.width = percent + '%';
    
    if (percent < 100) {
        setTimeout(updateLoader, 1); // 1% за 1мс
    } else {
        // Загрузка завершена
        setTimeout(() => {
            loader.style.display = 'none';
            content.style.display = 'block';
            startMatrix();
        }, 500);
    }
}

// Запуск загрузки
updateLoader();

// Матрица
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = Math.floor(canvas.width / 20);
const drops = [];

// Инициализация капель
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

const chars = '01';

function drawMatrix() {
    // Полупрозрачный фон для следа
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0';
    ctx.font = '16px Courier New';
    
    for (let i = 0; i < drops.length; i++) {
        // Случайный символ
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Рисуем символ
        ctx.fillText(char, i * 20, drops[i] * 20);
        
        // Сброс капли
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        drops[i]++;
    }
}

function startMatrix() {
    setInterval(drawMatrix, 50);
}

// Изменение размера окна
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Кнопка DOS
const dosBtn = document.getElementById('dos-btn');
const dosMenu = document.getElementById('dos-menu');
const dosStart = document.getElementById('dos-start');
const dosBack = document.getElementById('dos-back');
const dosUrl = document.getElementById('dos-url');
const dosBots = document.getElementById('dos-bots');
const dosFormat = document.getElementById('dos-format');
const dosResults = document.getElementById('dos-results');
const resultContent = document.getElementById('result-content');
const resultsBack = document.getElementById('results-back');

// Открыть DOS меню
dosBtn.addEventListener('click', () => {
    dosMenu.style.display = 'flex';
});

// Закрыть DOS меню (назад)
dosBack.addEventListener('click', () => {
    dosMenu.style.display = 'none';
});

// Запуск DOS
dosStart.addEventListener('click', () => {
    const url = dosUrl.value || 'Не указано';
    const bots = dosBots.value || '0';
    const format = dosFormat.value;
    
    // Шанс 98% на успех
    const isSuccess = Math.random() < 0.98;
    const successPercent = Math.floor(Math.random() * 45) + 55; // 55-99%
    
    let resultHTML = '';
    
    if (isSuccess) {
        resultHTML = `
            <p class="result-success">✓ УСПЕШНО</p>
            <p>Эффективность: ${successPercent}%</p>
            <p>Цель: ${url}</p>
            <p>Ботов задействовано: ${bots}</p>
            <p>Формат: ${format}</p>
        `;
    } else {
        // Не успешно (2% шанс)
        const errorTypes = ['ОШИБКА СОЕДИНЕНИЯ', 'ЦЕЛЬ НЕДОСТУПНА', 'ПРЕВЫШЕН ЛИМИТ', 'ОТКАЗ СЕРВЕРА'];
        const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
        resultHTML = `
            <p class="result-error">✗ ${errorType}</p>
            <p>Статус: НЕ УСПЕШНО</p>
            <p>Цель: ${url}</p>
            <p>Формат: ${format}</p>
        `;
    }
    
    resultContent.innerHTML = resultHTML;
    dosMenu.style.display = 'none';
    dosResults.style.display = 'flex';
});

// Закрыть результаты (назад)
resultsBack.addEventListener('click', () => {
    dosResults.style.display = 'none';
});

// Консоль
const consoleBtn = document.getElementById('console-btn');
const consoleMenu = document.getElementById('console-menu');
const consoleOutput = document.getElementById('console-output');
const consoleUrl = document.getElementById('console-url');
const consoleBack = document.getElementById('console-back');
const cmdBtns = document.querySelectorAll('.cmd-btn');

// Флаг защиты
let protectionHacked = false;

// Открыть консоль
consoleBtn.addEventListener('click', () => {
    consoleMenu.style.display = 'flex';
    consoleOutput.innerHTML = '<p>Консоль готова...</p>';
    protectionHacked = false;
});

// Закрыть консоль
consoleBack.addEventListener('click', () => {
    consoleMenu.style.display = 'none';
    protectionHacked = false;
});

// Обработка команд
cmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        const url = consoleUrl.value || 'Не указано';
        
        consoleOutput.innerHTML += `<p>> ${cmd} ${url}</p>`;
        
        // Проверка: если команда не XOPGOP и защита не взломана
        if (cmd !== 'XOPGOP' && !protectionHacked) {
            consoleOutput.innerHTML += '<p class="result-error">✗ ОШИБКА 44444444: Сначала используйте XOPGOP для взлома защиты!</p>';
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
            return;
        }
        
        // Симуляция выполнения
        const steps = cmd === 'XOPGOP' 
            ? ['Анализ защиты...', 'Поиск уязвимостей...', 'Взлом защиты...', 'Калибровка сайта...']
            : ['Подключение к цели...', 'Обход защиты...', 'Внедрение кода...', 'Выполнение команды...'];
        
        let step = 0;
        const interval = setInterval(() => {
            if (step < steps.length) {
                consoleOutput.innerHTML += `<p>${steps[step]}</p>`;
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
                step++;
            } else {
                clearInterval(interval);
                
                // Результат команды
                if (cmd === 'XOPGOP') {
                    consoleOutput.innerHTML += '<p class="result-success">✓ ЗАЩИТА ВЗЛОМАНА. Сайт откалиброван. Теперь можно использовать другие команды.</p>';
                    protectionHacked = true;
                } else if (cmd === 'XOP') {
                    consoleOutput.innerHTML += '<p class="result-success">✓ САЙТ УНИЧТОЖЕН</p>';
                } else if (cmd === 'COPLOR') {
                    consoleOutput.innerHTML += '<p class="result-success">✓ САЙТ ВЗЛОМАН</p>';
                } else if (cmd === 'QWERRRRR') {
                    consoleOutput.innerHTML += '<p class="result-success">✓ БАЗА ДАННЫХ ВЗЛОМАНА</p>';
                } else if (cmd === 'XOPLOTROPE') {
                    const randomId = 'ID-' + Math.floor(Math.random() * 10000000000);
                    const names = ['Alex', 'Dmitry', 'Maxim', 'Ivan', 'Sergey', 'Pavel', 'Andrey', 'Nikolay'];
                    const cities = ['Moscow', 'Saint Petersburg', 'Kazan', 'Novosibirsk', 'Yekaterinburg', 'Sochi'];
                    const randomName = names[Math.floor(Math.random() * names.length)];
                    const randomCity = cities[Math.floor(Math.random() * cities.length)];
                    consoleOutput.innerHTML += '<p class="result-success">✓ ДАННЫЕ ПЕРЕХВАЧЕНЫ</p>';
                    consoleOutput.innerHTML += `<p>Имя: ${randomName}</p>`;
                    consoleOutput.innerHTML += `<p>Город: ${randomCity}</p>`;
                    consoleOutput.innerHTML += `<p>IP: ${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}</p>`;
                    consoleOutput.innerHTML += `<p class="result-normal">Найден ID: ${randomId}</p>`;
                } else if (cmd === 'SOURCEHACK') {
                    consoleOutput.innerHTML += '<p class="result-success">✓ ВЗЛОМ ИСХОДНОГО КОДА...</p>';
                    // Генерация случайного HTML кода
                    const htmlSnippets = [
                        '&lt;html&gt;&lt;head&gt;&lt;title&gt;Target Site&lt;/title&gt;&lt;/head&gt;',
                        '&lt;body bgcolor="black"&gt;&lt;div class="container"&gt;',
                        '&lt;script src="malware.js"&gt;&lt;/script&gt;',
                        '&lt;iframe src="http://evil.com/steal.php"&gt;&lt;/iframe&gt;',
                        '&lt;input type="password" name="pass"&gt;',
                        '&lt;/body&gt;&lt;/html&gt;'
                    ];
                    // Показываем случайный HTML и бинарный код
                    for (let i = 0; i < 5; i++) {
                        const randomHtml = htmlSnippets[Math.floor(Math.random() * htmlSnippets.length)];
                        const binaryCode = Array(8).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('');
                        consoleOutput.innerHTML += `<p class="result-normal">${randomHtml}</p>`;
                        consoleOutput.innerHTML += `<p>101010${binaryCode}010101001010</p>`;
                    }
                }
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
            }
        }, 500);
    });
});

// Устройства
const devicesBtn = document.getElementById('devices-btn');
const devicesMenu = document.getElementById('devices-menu');
const deviceIdInput = document.getElementById('device-id-input');
const deviceConnect = document.getElementById('device-connect');
const deviceSystem = document.getElementById('device-system');
const systemTitle = document.getElementById('system-title');
const systemScreen = document.getElementById('system-screen');
const deviceDestroy = document.getElementById('device-destroy');
const deviceSystemBack = document.getElementById('device-system-back');

let currentDeviceId = '';
let currentSystem = '';

// Открыть меню устройств
devicesBtn.addEventListener('click', () => {
    devicesMenu.style.display = 'flex';
});

// Подключиться к устройству
deviceConnect.addEventListener('click', () => {
    const deviceId = deviceIdInput.value || 'DEVICE-' + Math.floor(Math.random() * 100000);
    currentDeviceId = deviceId;
    
    // Случайный выбор системы (50/50)
    currentSystem = Math.random() > 0.5 ? 'android' : 'windows';
    
    devicesMenu.style.display = 'none';
    deviceSystem.style.display = 'flex';
    
    // Настройка системы
    if (currentSystem === 'android') {
        systemTitle.textContent = 'ANDROID SYSTEM';
        systemScreen.className = 'system-screen android';
        systemScreen.innerHTML = `
            <div class="system-title">Устройство: ${deviceId}</div>
            <div class="system-apps" style="position: absolute; bottom: 80px; left: 0; right: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; padding: 10px;">
                <div class="system-app" onclick="openApp('Телефон')">📱</div>
                <div class="system-app" onclick="openApp('Сообщения')">💬</div>
                <div class="system-app" onclick="openApp('Почта')">📧</div>
                <div class="system-app" onclick="openApp('Браузер')">🌐</div>
                <div class="system-app" onclick="openApp('Камера')">📷</div>
                <div class="system-app" onclick="openApp('Музыка')">🎵</div>
                <div class="system-app" onclick="openApp('Настройки')">⚙️</div>
                <div class="system-app" onclick="openApp('Файлы')">📁</div>
                <div class="system-app" onclick="openBank()">🏦</div>
                <div class="system-app" onclick="openYoutube()">📺</div>
            </div>
        `;
    } else {
        systemTitle.textContent = 'WINDOWS SYSTEM';
        systemScreen.className = 'system-screen windows';
        systemScreen.innerHTML = `
            <div class="system-title">Устройство: ${deviceId}</div>
            <div class="system-apps" style="position: absolute; top: 50px; left: 10px;">
                <div class="system-app windows-app" onclick="openApp('Мой компьютер')">🪟</div>
                <div class="system-app windows-app" onclick="openApp('Проводник')">📁</div>
                <div class="system-app windows-app" onclick="openApp('Edge')">🌐</div>
                <div class="system-app windows-app" onclick="openApp('Блокнот')">📝</div>
                <div class="system-app windows-app" onclick="openApp('Игры')">🎮</div>
                <div class="system-app windows-app" onclick="openApp('Параметры')">⚙️</div>
                <div class="system-app windows-app" onclick="openApp('Защитник')">🔒</div>
                <div class="system-app windows-app" onclick="openApp('Корзина')">🗑️</div>
            </div>
        `;
    }
});

// Открыть приложение
function openApp(appName) {
    if (appName === 'Сообщения') {
        openMessages();
    } else {
        alert(`Открыто приложение: ${appName}`);
    }
}

// Открыть сообщения
function openMessages() {
    const names = ['Иван', 'Петя', 'Лёня', 'Никита'];
    const messages = [
        'Привет, как дела?\n- Норм, а у тебя?\n- Тоже норм',
        'Привет, псина!\n- Чё сказал?\n- То что слышал',
        'Привет, пойдём на свидание на Старый мост?\n- Ну давай, во сколько?\n- В 7 вечера',
        'Лукум хочешь?\n- Какой ещё лукум?\n- Турецкий, вкусный\n- Давай попробуем',
        'Привет! Давно не виделись\n- Привет, да как ты?\n- Всё отлично, работаю',
        'Ты где сейчас?\n- Дома, отдыхаю\n- Понятно, я тоже'
    ];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    alert(`💬 СООБЩЕНИЯ\n\nОт: ${randomName}\n\n${randomMessage}`);
}

// Открыть банк
function openBank() {
    const balance = Math.floor(Math.random() * 80000) + 20000; // 20000-100000
    alert(`🏦 БАНК ПРИЛОЖЕНИЕ\n\nВаш баланс: ${balance.toLocaleString()} ₽\n\nСчёт: **** 4582\nВладелец: Иван И.\n\n[Пополнить] [Перевести] [Снять]`);
}

// Открыть YouTube
function openYoutube() {
    const videos = [
        'https://avatars.mds.yandex.net/get-entity_search/5107294/1198114299/SUx182',
        'https://avatars.mds.yandex.net/get-entity_search/5101278/1247991102/SUx182_2x'
    ];
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    const titles = ['ТОП 10 взломов 2025', 'Как взломать систему за 5 минут', 'Хакерская атака на Пентагон', 'Взлом века раскрыт'];
    const views = [Math.floor(Math.random() * 900) + 100, Math.floor(Math.random() * 50) + 1];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    
    alert(`📺 YOUTUBE\n\n▶ ${randomTitle}\n\n👁 ${views[0]}K просмотров\n👍 ${views[1]}K лайков\n\n[Смотреть] [Лайк] [Подписка]`);
}

// Уничтожить устройство
deviceDestroy.addEventListener('click', () => {
    systemScreen.innerHTML = `
        <p class="result-error" style="text-align: center; font-size: 24px;">
            ✗ УНИЧТОЖЕНИЕ...<br><br>
            Система разрушена<br>
            Устройство отключено<br>
            ID: ${currentDeviceId}
        </p>
    `;
    systemScreen.style.background = '#300';
    systemScreen.style.borderColor = '#f00';
    systemScreen.style.boxShadow = '0 0 30px #f00';
    
    setTimeout(() => {
        deviceSystem.style.display = 'none';
        devicesMenu.style.display = 'flex';
        deviceIdInput.value = '';
    }, 2000);
});

// Назад из системы
deviceSystemBack.addEventListener('click', () => {
    deviceSystem.style.display = 'none';
    devicesMenu.style.display = 'flex';
});

// Город
const cityBtn = document.getElementById('city-btn');
const cityMenu = document.getElementById('city-menu');
const cityBack = document.getElementById('city-back');
const cityTabs = document.querySelectorAll('.city-tab');
const cityTraffic = document.getElementById('city-traffic');
const cityDoors = document.getElementById('city-doors');
const cityCars = document.getElementById('city-cars');
const trafficSet = document.getElementById('traffic-set');
const doorsSet = document.getElementById('doors-set');
const carSet = document.getElementById('car-set');

// Открыть меню города
cityBtn.addEventListener('click', () => {
    cityMenu.style.display = 'flex';
});

// Закрыть меню города
cityBack.addEventListener('click', () => {
    cityMenu.style.display = 'none';
});

// Переключение вкладок
cityTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        cityTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const tabName = tab.getAttribute('data-tab');
        if (tabName === 'traffic') {
            cityTraffic.style.display = 'flex';
            cityDoors.style.display = 'none';
            cityCars.style.display = 'none';
        } else if (tabName === 'doors') {
            cityTraffic.style.display = 'none';
            cityDoors.style.display = 'flex';
            cityCars.style.display = 'none';
        } else if (tabName === 'cars') {
            cityTraffic.style.display = 'none';
            cityDoors.style.display = 'none';
            cityCars.style.display = 'flex';
        }
    });
});

// Установка светофора
trafficSet.addEventListener('click', () => {
    const street = document.getElementById('traffic-street').value || 'Не указано';
    const house = document.getElementById('traffic-house').value || 'Не указано';
    const color = document.getElementById('traffic-color').value;
    const colorNames = { red: '🔴 КРАСНЫЙ', yellow: '🟡 ЖЁЛТЫЙ', green: '🟢 ЗЕЛЁНЫЙ' };
    
    alert(`СВЕТОФОР УСТАНОВЛЕН!\n\n📍 Улица: ${street}\n🏠 Дом: ${house}\n🚦 Цвет: ${colorNames[color]}\n\nСигнал изменён!`);
});

// Управление дверями
doorsSet.addEventListener('click', () => {
    const street = document.getElementById('doors-street').value || 'Не указано';
    const house = document.getElementById('doors-house').value || 'Не указано';
    const action = document.getElementById('doors-action').value;
    const actionNames = { open: '🔓 ОТКРЫТО', close: '🔒 ЗАКРЫТО' };
    
    alert(`УПРАВЛЕНИЕ ДВЕРЯМИ!\n\n📍 Улица: ${street}\n🏠 Дом: ${house}\n${actionNames[action]}\n\nДверь ${action === 'open' ? 'открыта' : 'закрыта'}!`);
});

// Управление машинами
carSet.addEventListener('click', () => {
    const brand = document.getElementById('car-brand').value || 'Не указано';
    const number = document.getElementById('car-number').value || 'Не указано';
    const direction = document.getElementById('car-direction').value;
    const directionNames = { north: '⬆️ СЕВЕР', south: '⬇️ ЮГ', east: '➡️ ВОСТОК', west: '⬅️ ЗАПАД' };
    
    alert(`МАШИНА ОТПРАВЛЕНА!\n\n🚗 Марка: ${brand}\n🔢 Номер: ${number}\n🧭 Направление: ${directionNames[direction]}\n\nАвтомобиль в пути!`);
});
