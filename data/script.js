document.addEventListener("DOMContentLoaded", function() {
    const arrow = document.querySelector('.arrow');
    const button = document.querySelector('button');
    let arrowPosition = 0;
    let direction = 10; // 1 для движения вправо, -1 для движения влево
    let moving = true;

    function moveArrow() {
        if (moving) {
            arrowPosition += 2 * direction; // Скорость движения стрелки
            if (arrowPosition >= 300 || arrowPosition <= 0) {
                direction *= -1; // Разворот стрелки
            }
            arrow.style.left = `${arrowPosition}px`;
            requestAnimationFrame(moveArrow);
        }
    }

    button.addEventListener('click', function() {
        if (moving) {
            moving = false;
            showPrizeModal();
        }
    });

    function showPrizeModal() {
        const prizeSegments = ["10%", "20%", "25%", "Free delivery"];
        const prize = prizeSegments[Math.floor(Math.random() * prizeSegments.length)];

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <form action="/add-page" method="POST">
                <div class="modal-content">
                    <span class="close-button">&times;</span>
                    <h2>Congratulations!</h2>
                    <p>You won: ${prize}</p>
                    <label for="email">Enter your email to receive the coupon:</label>
                    <input type="email" id="email" name="email" required>
                    <button id="sendCoupon">Send Coupon</button>
                </div>
            </form>
        `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector('.close-button');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });

        const sendCouponButton = modal.querySelector('#sendCoupon');
        sendCouponButton.addEventListener('click', function() {
            const email = modal.querySelector('#email').value;
            if (email) {
                alert(`Coupon for ${prize} sent to ${email}!`);
                document.body.removeChild(modal);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    moveArrow();
});
