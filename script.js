document.addEventListener("DOMContentLoaded", async function () {
    const tg = window.Telegram.WebApp;
    tg.expand(); // Расширяем Mini App на весь экран

    const userId = tg.initDataUnsafe?.user?.id;
    
    alert("User ID: " + userId); // 🚀 Всплывающее окно с userId
    console.log("User ID from Telegram WebApp:", userId); // 🔍 Отладка

    const serverUrl = "http://212.67.8.124:5000"; // Твой сервер
    const streamUrl = "https://varlive2.top/stream/live/boyets.html"; // URL трансляции

    const messageEl = document.getElementById("message");
    const streamEl = document.getElementById("stream");
    const subscribeBtn = document.getElementById("subscribeBtn");

    // Проверка наличия userId
    if (!userId) {
        messageEl.innerText = "Ошибка: не удалось получить ID пользователя.";
        console.error("❌ Ошибка: не удалось получить userId из Telegram WebApp.");
        return;
    }

    try {
        console.log("📡 Отправляем запрос на сервер...");
        const response = await fetch(`${serverUrl}/check_subscription?user_id=${userId}`, { cache: "no-store" });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Ответ от сервера:", data); // 🔍 Лог ответа

        if (data.status === "subscribed") {
            console.log("🎉 Пользователь подписан! Показываем трансляцию.");
            messageEl.innerText = "Вы подписаны! Запускаем трансляцию...";
            streamEl.src = streamUrl;
            streamEl.style.display = "block";
        } else {
            console.warn("⚠️ Пользователь НЕ подписан!");
            messageEl.innerText = "Вы не подписаны на канал!";
            subscribeBtn.style.display = "block";
        }
    } catch (error) {
        console.error("❌ Ошибка при проверке подписки:", error);
        messageEl.innerText = "Ошибка проверки подписки.";
    }

    // Кнопка подписки
    subscribeBtn.addEventListener("click", function () {
        window.open("https://t.me/+C9OTtX5Fn2tiYTJi", "_blank");
    });
});
