function drawSVGGraph(courses) {
  const width = 2000;
  const height = 2000;
  const svgs= document.querySelector('svg');
  
  // 모든 자식 요소를 제거합니다.
  while (svgs.firstChild) {
    svgs.removeChild(svgs.firstChild);
  }
  const svg = d3.select('svg').attr('width', width).attr('height', height);

  // 학년, 학기별 그룹화
  const groupedCourses = {};
  courses.forEach((course) => {
    if (course.학년 > 4 || (course.학기 !== 1 && course.학기 !== 2)) {
      return; // 4학년 2학기 이상 또는 유효하지 않은 학기는 제외
    }
    const key = `${course.학년}-${course.학기}`;
    if (!groupedCourses[key]) {
      groupedCourses[key] = [];
    }
    groupedCourses[key].push(course);
  });

  // 노드 및 링크 초기화
  const nodes = [];
  const links = [];

  let yOffset = 50;
  for (const [semester, courses] of Object.entries(groupedCourses).sort()) {
    let xOffset = 50;

    courses.forEach((course) => {
      nodes.push({
        name: course.과목명,
        학년: course.학년,
        학기: course.학기,
        트랙: course.트랙,
        마이크로디그리: course.마이크로디그리,
        실습여부: course.실습여부,
        구분: course.구분,
        x: xOffset,
        y: yOffset,
        prerequisites: course.선수과목 || [],
      });
      xOffset += 200; // 가로 간격
    });
    yOffset += 150; // 세로 간격
  }

  const nodeLookup = {};
  nodes.forEach((node) => {
    nodeLookup[node.name] = node;
  });

  // 링크 생성
  nodes.forEach((node) => {
    node.prerequisites.forEach((prerequisite) => {
      if (nodeLookup[prerequisite]) {
        links.push({
          source: nodeLookup[prerequisite],
          target: node,
        });
      }
    });
  });

  // 링크 그리기
  svg
    .selectAll('.link')
    .data(links)
    .enter()
    .append('line')
    .attr('class', 'link')
    .attr('x1', (d) => d.source.x + 50)
    .attr('y1', (d) => d.source.y + 40) // 노드의 아래에서 시작
    .attr('x2', (d) => d.target.x + 50)
    .attr('y2', (d) => d.target.y) // 노드의 위에서 끝
    .attr('marker-end', 'url(#arrow)');

  // 노드 그리기
  const node = svg
    .selectAll('.node')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.x},${d.y})`)
    .on('mouseover', function (event, d) {
      d3.select(this)
        .attr('stroke-width', 2)  // 예시: 테두리 두께를 두껍게
    })
    .on('mouseout', function (event, d) {
      d3.select(this)
        .attr('stroke-width', 1)  // 원래 테두리 두께로 복구
    });;

  // 노드의 테두리
  node
    .append('rect')
    .attr('width', 185)
    .attr('height', 40)
    .attr('rx', 5)
    .attr('ry', 5)
    .attr('stroke', '#000');

  // 노드의 텍스트
  node
    .append('text')
    .attr('dx', 10)
    .attr('dy', 25)
    .text((d) => d.name);

  // 화살표 정의
  svg
    .append('defs')
    .append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 5)
    .attr('refY', 1)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('class', 'arrowHead');
}