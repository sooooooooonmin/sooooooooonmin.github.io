document.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.padlet.dev/v1/boards/uctz1iehqn3raj?include=posts', {
    headers: {
      'x-api-key': 'pdltp_fcbe58d2c1f7d08a0714744f890231dea23fa9871afc7e52b468c4f370a075df447b3d',
      'accept': 'application/vnd.api+json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // 전체 API 응답 데이터 출력
    const petitionList = document.getElementById('petition-list');

    // included 배열에서 posts 가져오기
    if (data.included && Array.isArray(data.included)) {
      const posts = data.included.filter(item => item.type === 'post');

      if (posts.length > 0) {
        posts.forEach(post => {
          if (post.attributes && post.attributes.content) {
            const petitionElement = document.createElement('div');
            petitionElement.classList.add('petition');
            const postUrl = post.webUrl && post.webUrl.live ? post.webUrl.live : '#';
            
            const supportersCount = post.attributes.supporterCount || 0;
            const comments = post.attributes.comments || [];

            petitionElement.innerHTML = `
              <h3>${post.attributes.content.subject || '제목 없음'}</h3>
              <p>${post.attributes.content.bodyHtml.replace(/<[^>]+>/g, '').substring(0, 100) || '내용 없음'}...</p>
              <p><strong>지지자 수:</strong> ${supportersCount}</p>
              <a href="${postUrl}" target="_blank">자세히 보기</a>
              <div class="comments">
                <strong>댓글:</strong>
                ${comments.length > 0 ? comments.map(comment => `<div class="comment">${comment}</div>`).join('') : '<p>댓글이 없습니다.</p>'}
              </div>
            `;
            petitionList.appendChild(petitionElement);
          } else {
            console.error('Post attributes are undefined:', post);
          }
        });
      } else {
        petitionList.innerHTML = "<p>게시물이 없습니다.</p>";
      }
    } else {
      petitionList.innerHTML = "<p>게시물이 없습니다.</p>";
    }
  })
  .catch(error => console.error('Error fetching Padlet posts:', error));
});
