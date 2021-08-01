let mbtiA = ["INFP", "ENFP", "INFJ", "ENFJ"]; //mbti A,B가 만나면 최악의 조합
let mbtiB = ["ISFP", "ESFP", "ISTP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"];
let member = [];
let button = document.getElementById("make-table");
let totalMember;
let memberMin;
let memberMax;
let memberB = [];
let memberA = [];
let memberC = [];
let team = [];
function tableClick() {
  totalMember = parseInt(document.getElementById("total-member").value);
  makeTable(totalMember);
}

function makeTable(totalMember) {
  // 입력 테이블 생성
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
    document.getElementById("container").innerHTML += `
    <tr>
    <td><input class='name' type="text" placeholder="이름"></td>
    <td ><input class='mbti' type="text" placeholder="MBTI"></td>
</tr>`;
  }
  document.body.innerHTML += `
  <div class="table-input">
  <input
  id="max-member"
  type="number"
  placeholder="팀구성 최대인원을 입력주세요."
/> 
<input
id="min-member"
type="number"
placeholder="팀구성 최소인원을 입력주세요."
/>
<input
  id="build-team"
  type="button"
  value="최악의 팀 피하기!"
  onclick="inputTeam()"
/>
</div>
`;
}

function inputTeam() {
  //입력된 이름,mbti유형 배열로 저장
  let name = document.getElementsByClassName("name");
  let mbti = document.getElementsByClassName("mbti");
  for (let i = 0; i < name.length; i++) {
    member.push([name[i].value, mbti[i].value.toUpperCase()]);
  }
  memberMin = parseInt(document.getElementById("min-member").value);
  memberMax = parseInt(document.getElementById("max-member").value);
  seperate();
  buildTeam();
}

function seperate() {
  // mbti A,B,C 유형으로 분리
  for (let i of member) {
    if (mbtiA.indexOf(i[1]) !== -1) {
      memberA.push(i);
    } else if (mbtiB.indexOf(i[1]) !== -1) {
      memberB.push(i);
    } else memberC.push(i);
  }
}

function buildTeam() {
  let i = 0;
  while (memberMax <= memberA.length) {
    //a유형 인원들로만 최대인원 팀 구성
    team[i] = memberA.splice(0, memberMax);
    i++;
  }
  while (memberMax <= memberB.length) {
    //b유형 인원들로만 최대인원 팀 구성
    team[i] = memberB.splice(0, memberMax);
    i++;
  }
  team.push(memberA);
  team.push(memberB);

  for (let j = 0; j < team.length; j++) {
    while (team[j].length < memberMin && memberC.length !== 0) {
      let tempMember = memberC.pop();
      team[j].push(tempMember);
    }
  }
  for (let j = 0; j < team.length; j++) {
    while (team[j].length < memberMax && memberC.length !== 0) {
      let tempMember = memberC.pop();
      team[j].push(tempMember);
    }
  }
  let teeamIndex = team.length - 1;
  while (memberC.length !== 0) {
    let tempMember = memberC.pop();
    team[teamindedx].push(tempMember);
    if (team[teamIndex].length >= memberMax) teamIndex++;
  }
  drawResult();
}

function drawResult() {
  let teamFinal = team.filter((v) => {
    return v[0] !== null && v[0] !== undefined && v[0] !== "";
  });
  console.log(teamFinal);
  document.body.innerHTML = "";
  let container = document.createElement("div");
  container.classList.add("flex-container");
  for (let i of teamFinal) {
    let box = document.createElement("ul");
    for (let j of i) {
      let memberInBox = document.createElement("li");
      box.append(memberInBox);
      memberInBox.innerText = `${j[0]}(${j[1]})`;
    }
    container.append(box);
  }
  document.body.append(container);
}
