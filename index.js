import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

/**
 * README.md에 작성될 텍스트 (자리 표시자 포함)
 */
let text = `

![DSC00446-Enhanced-NR](https://github.com/user-attachments/assets/67a50e7c-6db2-4f1a-902b-03efbc250579)

# Hello World! I'm Mo

<!-- FEED_PLACEHOLDER -->

## Contact

[![jmmo0722@naver.com](https://img.shields.io/badge/Gmail-D14836.svg?&logo=gmail&logoColor=white)](mailto:jmmo0722@naver.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?&logo=linkedin&logoColor=fff)](https://www.linkedin.com/in/%EC%A0%95%EB%AF%BC-%EB%AA%A8-289504385/)
[![tistory](https://img.shields.io/badge/tistory-E34F26.svg?&logo=tistory&logoColor=white)](https://mozmin.tistory.com)



![Hits](https://komarev.com/ghpvc/?username=mozmin)
[![Solved.ac프로필](http://mazassumnida.wtf/api/mini/generate_badge?boj=jmmo0722)](https://solved.ac/jmmo0722)
`;

const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
  },
});

(async () => {
  try {
    // RSS 피드 가져오기
    const feed = await parser.parseURL('https://mozmin.tistory.com/rss');

    // 피드 HTML 생성
    let feedHtml = `<div>
    Mo's latest posts <br>`;
    const count = Math.min(10, feed.items.length);
    for (let i = 0; i < count; i++) {
      const { title, link } = feed.items[i];
      console.log(`${i + 1}번째 게시물 추가됨: ${title}`);
      feedHtml += `<a href='${link}' target='_blank'>${title}<br></a>`;
    }
    feedHtml += `</div>`;

    // 자리 표시자 교체
    text = text.replace('<!-- FEED_PLACEHOLDER -->', feedHtml);

    // README.md 파일 생성/덮어쓰기
    writeFileSync('README.md', text, 'utf8');
    console.log('README.md 업데이트 완료');
  } catch (e) {
    console.error('RSS 파싱 중 오류:', e);
  }
})();
