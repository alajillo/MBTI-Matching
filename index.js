let mbtiA = ["INFP", "ENFP", "INFJ", "ENFJ"];
let mbtiB = ["ISFP", "ESFP", "ISTP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"];
let member = [];
let button = document.getElementById("make-table");

function tableClick() {
  console.log("test");
  let totalMember = document.getElementById("total-member").value;
  makeTable(totalMember);
}

function makeTable(totalMember) {
  document.body.innerHTML = `<table>
  <thead>
      <tr>
          <th colspan="2">MBTI 조합 생성기</th>
      </tr>
  </thead>
  <tbody id="container">
  </tbody>
</table>`;
  for (let i = 0; i < totalMember; i++) {
    console.log(i);
    document.getElementById("container").innerHTML += `
    <tr>
    <td><input class='name-${i}' type="text" placeholder="이름"></td>
    <td ><input class='mbti-${i}' type="text" placeholder="MBTI"></td>
</tr>`;
  }
  document.body.innerHTML += `
  <input
  id="max-member"
  type="number"
  placeholder="팀구성 최대인원을 입력주세요."
/> <input
id="min-member"
type="number"
placeholder="팀구성 최소인원을 입력주세요."
/><input
  id="build-team"
  type="button"
  value="최악의 조합 피하기!"
/>`;
}

function buildTeam() {}
