document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("christmasAudio");
  const musicBtn = document.getElementById("musicBtn");
  const volumeControl = document.getElementById("volume");
  const giftModal = document.getElementById("giftModal");
  const treeContainer = document.getElementById("treeContainer");
  const snowflakes = document.getElementById("snowflakes");
  const yearsCount = document.getElementById("yearsCount");

  const startYear = 2014;
  const currentYear = 2025;
  const friendshipYears = currentYear - startYear;

  let count = 0;
  const counterInterval = setInterval(() => {
    if (count < friendshipYears) {
      count++;
      yearsCount.textContent = count;
    } else {
      clearInterval(counterInterval);
    }
  }, 100);

  function createSnowflakes() {
    const snowflakeChars = ["❄️", "❅", "❆", "*", "·"];

    for (let i = 0; i < 50; i++) {
      const snowflake = document.createElement("div");
      snowflake.textContent =
        snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
      snowflake.style.position = "fixed";
      snowflake.style.fontSize = Math.random() * 20 + 10 + "px";
      snowflake.style.left = Math.random() * 100 + "%";
      snowflake.style.top = "-50px";
      snowflake.style.opacity = Math.random() * 0.7 + 0.3;
      snowflake.style.color = "#FFFFFF";
      snowflake.style.zIndex = "1";
      snowflake.style.pointerEvents = "none";
      snowflake.style.animation = `fall ${
        Math.random() * 10 + 5
      }s linear infinite`;
      snowflake.style.animationDelay = Math.random() * 5 + "s";

      snowflakes.appendChild(snowflake);
    }
  }

  window.launchSnowball = function () {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FFFFFF", "#E8F4FF", "#F0F9FF"],
      shapes: ["circle"],
    });

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const snowball = document.createElement("div");
        snowball.textContent = "❄️";
        snowball.style.position = "fixed";
        snowball.style.fontSize = "30px";
        snowball.style.left = Math.random() * 100 + "%";
        snowball.style.top = "-50px";
        snowball.style.zIndex = "100";
        snowball.style.animation = `snowballFall ${
          Math.random() * 2 + 1
        }s linear forwards`;
        document.body.appendChild(snowball);

        setTimeout(() => snowball.remove(), 2000);
      }, i * 100);
    }

    const style = document.createElement("style");
    style.textContent = `
            @keyframes snowballFall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                }
            }
        `;
    document.head.appendChild(style);
  };

  window.decorateTree = function () {
    treeContainer.style.display = "block";

    const ornaments = ["🔴", "🟢", "🟡", "🔵", "🎀", "🎁", "⭐", "✨", "🌟"];
    const treeMiddle = document.querySelector(".tree-middle");
    const treeBottom = document.querySelector(".tree-bottom");

    treeMiddle.innerHTML = "";
    treeBottom.innerHTML = "";

    for (let i = 0; i < 4; i++) {
      const ornament = document.createElement("span");
      ornament.textContent =
        ornaments[Math.floor(Math.random() * ornaments.length)];
      ornament.className = "ornament";
      ornament.style.animationDelay = i * 0.5 + "s";
      ornament.style.margin = "0 5px";
      treeMiddle.appendChild(ornament);
    }

    for (let i = 0; i < 3; i++) {
      const ornament = document.createElement("span");
      ornament.textContent =
        ornaments[Math.floor(Math.random() * ornaments.length)];
      ornament.className = "ornament";
      ornament.style.animationDelay = i * 0.5 + 2 + "s";
      ornament.style.margin = "0 5px";
      treeBottom.appendChild(ornament);
    }

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#2A9D8F", "#E63946", "#E9C46A"],
    });
  };

  window.closeTree = function () {
    treeContainer.style.display = "none";
  };

  window.playChristmasSong = function () {
    if (audio.paused) {
      audio.play();
      musicBtn.innerHTML = '<i class="fas fa-pause"></i> ПАУЗА НА КОЛЯДІ';
      musicBtn.style.background = "linear-gradient(135deg, #E63946, #2A9D8F)";
    } else {
      audio.pause();
      musicBtn.innerHTML = '<i class="fas fa-music"></i> РІЗДВЯНА МЕЛОДІЯ';
      musicBtn.style.background = "";
    }
  };

  window.toggleAudio = function () {
    playChristmasSong();
  };

  volumeControl.addEventListener("input", function () {
    audio.volume = this.value;
  });

  window.openGift = function () {
    giftModal.style.display = "flex";
    launchSnowball();
  };

  window.closeGift = function () {
    giftModal.style.display = "none";
  };

  window.unwrapGift = function () {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#E63946", "#2A9D8F", "#E9C46A", "#FFFFFF"],
    });

    const giftContent = document.querySelector(".gift-content");
    giftContent.innerHTML = `
            <div class="gift-icon">🎉</div>
            <h3>ПОДАРУНОК РОЗПАКОВАНО!</h3>
            <div class="gift-message">
                <p>🎄 <strong>Вітаю!</strong> Ти отримав:</p>
                <ul>
                    <li>🎮 Безстрокову дружбу</li>
                    <li>😂 Вічний запас сміху</li>
                    <li>👊 Підтримку 24/7</li>
                    <li>🌟 Усі твої мрії на 2026 рік</li>
                </ul>
                <p class="gift-note">Дякую, що ти є! 🎂</p>
            </div>
            <button class="unwrap-btn" onclick="closeGift()">
                <i class="fas fa-check"></i> ДЯКУЮ!
            </button>
        `;
  };

  function updateCountdown() {
    const now = new Date();
    const birthday = new Date(2025, 11, 24);
    const diff = birthday - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = days
        .toString()
        .padStart(2, "0");
      document.getElementById("hours").textContent = hours
        .toString()
        .padStart(2, "0");
      document.getElementById("minutes").textContent = minutes
        .toString()
        .padStart(2, "0");
      document.getElementById("seconds").textContent = seconds
        .toString()
        .padStart(2, "0");
    } else {
      document.querySelector(".countdown-section").innerHTML = `
                <h3><i class="fas fa-birthday-cake"></i> З ДНЕМ НАРОДЖЕННЯ!</h3>
                <div class="birthday-message">
                    <p style="font-size: 2rem; color: var(--christmas-red); font-weight: 900;">
                        🎂 СЬОГОДНІ ТВІЙ ДЕНЬ! 🎉
                    </p>
                    <p>Насолоджуйся цим особливим днем! 🎄✨</p>
                </div>
            `;
    }
  }

  function init() {
    createSnowflakes();

    updateCountdown();
    setInterval(updateCountdown, 1000);

    setTimeout(() => {
      audio.play().catch((e) => {
        console.log("Натисніть кнопку для включення музики");
      });
    }, 1000);

    setTimeout(launchSnowball, 2000);
    setTimeout(decorateTree, 3000);

    console.log(
      "%c🎄 З РІЗДВОМ ТА ДНЕМ НАРОДЖЕННЯ! 🎂",
      "color: #E63946; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 0 #2A9D8F;"
    );
    console.log(
      "%c🎅 24 грудня 2025 – найчарівніший день для святкування 25-річчя! 🌟",
      "color: #2A9D8F; font-size: 18px;"
    );
    console.log(
      "%c🎁 11 років дружби з 2014 року – і це лише початок! 👬",
      "color: #E9C46A; font-size: 16px;"
    );
  }

  init();
});
