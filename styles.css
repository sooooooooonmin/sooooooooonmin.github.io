document.getElementById("generate-btn").addEventListener("click", generateLottoNumbers);

function generateLottoNumbers() {
  const balls = document.querySelectorAll(".ball");
  const numbers = [];

  while (numbers.length < 6) {
    const randomNum = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }

  balls.forEach((ball, index) => {
    ball.textContent = numbers[index];
  });
}
