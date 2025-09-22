import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */

<img
  alt=""
  src="https://github.com/user-attachments/assets/67a50e7c-6db2-4f1a-902b-03efbc250579"
></img>;

let text = `# Hello World! I'm Mo there

## 📕 Latest Blog Posts

## Contact

<p>
  <img alt="" src= "https://img.shields.io/badge/Gmail-D14836.svg?&logo=gmail&logoColor=white)](mailto:jmmo0722@gmail.com"/> 
  <img alt="" src= "https://img.shields.io/badge/LinkedIn-0A66C2?&logo=linkedin&logoColor=fff)](https://www.linkedin.com/in/%EC%A0%95%EB%AF%BC-%EB%AA%A8-289504385/"/>
  <img alt="" src= "https://img.shields.io/badge/tistory-E34F26.svg?&logo=tistory&logoColor=white)](https://mozmin.tistory.com"/>
</p>

<p>
  <img alt="" src= "https://komarev.com/ghpvc/?username=mozmin"/> 
  <img alt="" src= "http://mazassumnida.wtf/api/mini/generate_badge?boj=jmmo0722)](https://solved.ac/jmmo0722"/>
</p>

`;

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
  },
});

(async () => {
  // 피드 목록
  const feed = await parser.parseURL('https://mozmin.tistory.com/rss'); // 본인의 블로그 주소

  text += `<ul>`;

  // 최신 10개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 10; i++) {
    const { title, link } = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);
    text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
  }

  text += `</ul>`;

  // README.md 파일 생성
  writeFileSync('README.md', text, 'utf8', (e) => {
    console.log(e);
  });
  console.log('업데이트 완료');
})();
