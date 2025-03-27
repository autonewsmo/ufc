document.addEventListener("DOMContentLoaded", async function () {
    const tg = window.Telegram.WebApp;
    tg.expand(); // Расширяет Mini App на весь экран

    const userId = tg.initDataUnsafe.user?.id;
    const streamUrl = "https://varlive2.top/stream/live/boyets.html"; // ЗАМЕНИТЬ НА URL ТРАНСЛЯЦИИ
    const backendUrl = "https://ТВОЙ_СЕРВЕР/check_sub"; // Сюда вставишь адрес сервера

    if (!userId) {
        document.getElementById("message").innerText = "Ошибка получения данных пользователя.";
        return;
    }

    try {
        const response = await fetch(`${backendUrl}?user_id=${userId}`);
        const data = await response.json();

        if (data.status === "subscribed") {
            document.getElementById("message").innerText = "Вы подписаны! Запускаем трансляцию...";
            document.getElementById("stream").src = streamUrl;
            document.getElementById("stream").style.display = "block";
        } else {
            document.getElementById("message").innerText = "Вы не подписаны на канал!";
            document.getElementById("subscribeBtn").style.display = "block";
        }
    } catch (error) {
        document.getElementById("message").innerText = "Ошибка проверки подписки.";
    }

    document.getElementById("subscribeBtn").addEventListener("click", function () {
        window.open("https://t.me/+C9OTtX5Fn2tiYTJi", "_blank");
    });
});
