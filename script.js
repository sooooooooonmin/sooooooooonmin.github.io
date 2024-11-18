// 개별 공의 번호를 랜덤하게 생성
function generateRandomNumber(ball) {
  const randomNumber = Math.floor(Math.random() * 45) + 1; // 1부터 45까지
  ball.textContent = randomNumber;
}

// 모든 공의 번호를 한번에 생성
function generateAllNumbers() {
  const balls = document.querySelectorAll('.ball');
  balls.forEach(ball => {
    generateRandomNumber(ball);
  });
}
