// 패들렛 API에서 게시물 가져오기
fetch('https://api.padlet.dev/v1/boards/uctz1iehqn3raj?include=posts%2Csections', {
  headers: {
    'X-Api-Key': 'pdltp_fcbe58d2c1f7d08a0714744f890231dea23fa9871afc7e52b468c4f370a075df447b3d',
    'accept': 'application/vnd.api+json'
  }
})
.then(response => response.json())
.then(data => {
  const petitionList = document.getElementById('petition-list');
  data.posts.forEach(post => {
    const petitionElement = document.createElement('div');
    petitionElement.classList.add('petition');
    petitionElement.innerHTML = `
      <h3>${post.content.subject}</h3>
      <p>${post.content.body}</p>
      <button>자세히 보기</button>
    `;
    petitionList.appendChild(petitionElement);
  });
})
.catch(error => console.error('Error fetching Padlet posts:', error));

// 새 청원 등록
document.getElementById('petition-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  fetch('https://api.padlet.dev/v1/boards/uctz1iehqn3raj/posts', {
    method: 'POST',
    headers: {
      'X-Api-Key': 'pdltp_fcbe58d2c1f7d08a0714744f890231dea23fa9871afc7e52b468c4f370a075df447b3d',
      'accept': 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json'
    },
    body: JSON.stringify({
      data: {
        type: 'post',
        attributes: {
          content: {
            subject: title,
            body: description
          }
        }
      }
    })
  })
  .then(response => response.json())
  .then(data => {
    alert('청원이 성공적으로 등록되었습니다!');
    location.reload();  // 페이지 새로고침
  })
  .catch(error => console.error('Error creating Padlet post:', error));
});