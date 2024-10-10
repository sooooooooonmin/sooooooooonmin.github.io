// 패들렛 API에서 게시물 가져오기
fetch('https://api.padlet.dev/v1/boards/uctz1iehqn3raj?include=posts', {
  headers: {
    'X-Api-Key': 'pdltp_fcbe58d2c1f7d08a0714744f890231dea23fa9871afc7e52b468c4f370a075df447b3d',
    'accept': 'application/vnd.api+json'
  }
})
.then(response => response.json())
.then(data => {
  const petitionList = document.getElementById('petition-list');

  // 모든 게시물 가져와서 표시하기
  data.posts.forEach(post => {
    const petitionElement = document.createElement('div');
    petitionElement.classList.add('petition');
    petitionElement.innerHTML = `
      <h3>${post.content.subject}</h3>
      <p>${post.content.body.substring(0, 100)}...</p> <!-- 100자까지만 표시 -->
      <button>자세히 보기</button>
    `;
    petitionList.appendChild(petitionElement);
  });
})
.catch(error => console.error('Error fetching Padlet posts:', error));
