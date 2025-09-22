import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

/**
 * README.md에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `# Hello World! I'm Mo there

## 🖼️ About Me

<img alt="" src="https://github.com/user-attachments/assets/67a50e7c-6db2-4f1a-902b-03efbc250579" />

## 📕 Latest Blog Posts

## 📬 Contact

<p>
  <a href="mailto:jmmo0722@gmail.com">
    <img alt="Gmail" src="https://img.shields.io/badge/Gmail-D14836.svg?&logo=gmail&logoColor=white"/>
  </a>
  <a href="https://www.linkedin.com/in/%EC%A0%95%EB%AF%BC-%EB%AA%A8-289504385/">
    <img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-0A66C2?&logo=linkedin&logoColor=fff"/>
  </a>
  <a href="https://mozmin.tistory.com">
    <img alt="Tistory" src="https://img.shields.io/badge/tistory-E34F26.svg?&logo=tistory&logoColor=white"/>
  </a>
</p>

<p>
  <img alt="Profile Views" src="https://komarev.com/ghpvc/?username=mozmin"/> 
  <a href="https://solved.ac/jmmo0722">
    <img alt="BOJ Badge" src="http://mazassumnida.wtf/api/mini/generate_badge?boj=jmmo0722"/>
  </a>
</p>

`;

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
  },
});

(async () => {
  try {
    // 피드 가져오기
    const feed = await parser.parseURL('https://mozmin.tistory.com/rss'); // 본인 티스토리 RSS 주소

    text += `<ul>`;

    // 최신 10개의 글의 제목과 링크 추가
    const count = Math.min(10, feed.items.length);
    for (let i = 0; i < count; i++) {
      const { title, link } = feed.items[i];
      console.log(`${i + 1}번째 게시물 추가됨: ${title}`);
      text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
    }

    text += `</ul>`;

    // README.md 파일 생성
    writeFileSync('README.md', text, 'utf8');
    console.log('README.md 업데이트 완료');
  } catch (e) {
    console.error('RSS 파싱 중 오류:', e);
  }
})();
