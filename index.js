import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

/**
 * README.md 기본 텍스트 (자리 표시자 포함)
 */
let text = `# Hello World! I'm Mo there

## 🖼️ About Me

<img alt="" src="https://github.com/user-attachments/assets/67a50e7c-6db2-4f1a-902b-03efbc250579" />

## 📕 Latest Blog Posts
<!-- FEED_PLACEHOLDER -->

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

const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
  },
});

(async () => {
  try {
    // RSS 피드 가져오기
    const feed = await parser.parseURL('https://mozmin.tistory.com/rss');

    // 최신 글 뱃지 HTML 만들기
    let feedHtml = `<p>\n`;
    const count = Math.min(5, feed.items.length); // 뱃지는 5개만 표시 추천
    for (let i = 0; i < count; i++) {
      const { title, link } = feed.items[i];

      // 뱃지 텍스트 (너무 길면 잘라내기)
      const shortTitle =
        title.length > 30 ? title.substring(0, 27) + '...' : title;

      // Shields.io 뱃지 만들기 (파란색 버튼 스타일)
      const badge = `https://img.shields.io/badge/${encodeURIComponent(
        shortTitle
      )}-blue?style=for-the-badge`;

      // 링크로 감싸기
      feedHtml += `<a href="${link}" target="_blank"><img src="${badge}" alt="${shortTitle}"/></a>\n`;
    }
    feedHtml += `</p>`;

    // 자리 표시자 교체
    text = text.replace('<!-- FEED_PLACEHOLDER -->', feedHtml);

    // README.md 파일 생성/갱신
    writeFileSync('README.md', text, 'utf8');
    console.log('README.md 업데이트 완료');
  } catch (e) {
    console.error('RSS 파싱 오류:', e);
  }
})();
