document.addEventListener("DOMContentLoaded", async function () {
    const tg = window.Telegram.WebApp;
    tg.expand(); 

    console.log("🔍 initDataUnsafe:", tg.initDataUnsafe); // Отладка

    const userId = tg.initDataUnsafe?.user?.id || new URLSearchParams(window.location.search).get("user_id");

    alert("User ID: " + userId);
    console.log("User ID from Telegram WebApp:", userId);

    if (!userId) {
        document.getElementById("message").innerText = "Ошибка: не удалось получить ID пользователя.";
        console.error("❌ Ошибка: userId не определён!");
        return;
    }

    try {
        console.log("📡 Отправляем запрос на сервер...");
        const response = await fetch(`http://212.67.8.124:5000/check_subscription?user_id=${userId}`, { cache: "no-store" });

        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

        const data = await response.json();
        console.log("✅ Ответ от сервера:", data);

        if (data.status === "subscribed") {
            document.getElementById("message").innerText = "Вы подписаны! Запускаем трансляцию...";
            document.getElementById("stream").src = "https://varlive2.top/stream/live/boyets.html";
            document.getElementById("stream").style.display = "block";
        } else {
            document.getElementById("message").innerText = "Вы не подписаны на канал!";
            document.getElementById("subscribeBtn").style.display = "block";
        }
    } catch (error) {
        console.error("❌ Ошибка при проверке подписки:", error);
        document.getElementById("message").innerText = "Ошибка проверки подписки.";
    }

    document.getElementById("subscribeBtn").addEventListener("click", function () {
        window.open("https://t.me/+C9OTtX5Fn2tiYTJi", "_blank");
    });
});
