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

  // 섹션별 게시물 필터링 및 표시
  data.sections.forEach(section => {
    const sectionTitle = document.createElement('h2');
    sectionTitle.innerText = section.title; // 섹션 제목 표시
    petitionList.appendChild(sectionTitle);

    const postsInSection = data.posts.filter(post => post.section_id === section.id);

    postsInSection.forEach(post => {
      const petitionElement = document.createElement('div');
      petitionElement.classList.add('petition');
      petitionElement.innerHTML = `
        <h3>${post.content.subject}</h3>
        <p>${post.content.body.substring(0, 100)}...</p> <!-- 100자까지 표시 -->
        <button>자세히 보기</button>
      `;
      petitionList.appendChild(petitionElement);
    });
  });
})
.catch(error => console.error('Error fetching Padlet posts:', error));
