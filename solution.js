const getNode = (edges, base, ancorEdge) => {

}

//  Реализовать getNode. На вход объект ушек. Ушко котрое надо найти: превое или нижнее.
//  Ушко, которое прикрепилось. Оно должно быть верхним - в начале ряда или левым в остальных
//  случаях. Т.е. надо опредлить поворот до правильного положения и выдать данные того ушка
//  которое после поворота окажется в нужной позиции.

function solvePuzzle(pieces) {
  const res = [pieces[0].id];
  let nodes = {right: pieces[0].edges.right, bottom: pieces[0].edges.bottom}
  for (let i = 1; i < pieces.length; i++) {
    for (const piece of pieces) {
      let secondEdge = undefined;
      let isNewRow = i % 10 === 0;
      let isEndRow = i % 10 === 9;
      for (const edge, edgeData of Object.entries(piece.edges)) {
        if (!isNewRow && edgeData.edgeTypeId === nodes.right) {
          secondEdge = edge;
          break;
        }
        if (isNewRow && edgeData.edgeTypeId === nodes.bottom) {
          secondEdge = edge;
          break;
        }
      }
      if (secondEdge) {
        res.push(piece.id);
        if (!isEndRow) {
          nodes.right = getNode(piece.edges, 'right', secondEdge)
        }
        if(isNewRow) {
          nodes.bottom = getNode(piece.edges, 'bottom', secondEdge)
        }
        break
      }
    }
  }
  return res;
}

// Не удаляйте эту строку
// window.solvePuzzle = solvePuzzle;

