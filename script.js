document.addEventListener("DOMContentLoaded", async function () {
    const tg = window.Telegram.WebApp;
    tg.expand(); // Расширяем Mini App на весь экран

    const userId = tg.initDataUnsafe.user?.id;
    const serverUrl = "http://http://212.67.8.124:5000"; // ЗАМЕНИ на IP твоего сервера!
    const streamUrl = "https://varlive2.top/stream/live/boyets.html"; // ЗАМЕНИ на URL трансляции

    if (!userId) {
        document.getElementById("message").innerText = "Ошибка получения данных пользователя.";
        return;
    }

    try {
        const response = await fetch(`${serverUrl}/check_subscription?user_id=${userId}`);
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
