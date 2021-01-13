const getNode = (edges, base, ancorEdge) => {

}

//  Реализовать getNode. На вход объект ушек. Ушко котрое надо найти: превое или нижнее.
//  Ушко, которое прикрепилось. Оно должно быть верхним - в начале ряда или левым в остальных
//  случаях. Т.е. надо опредлить поворот до правильного положения и выдать данные того ушка
//  которое после поворота окажется в нужной позиции.


const handler = obj => ({
    id: obj.id,
    edges: {
        top: obj.edges.top ? obj.edges.top.edgeTypeId : 0,
        right: obj.edges.right ? obj.edges.right.edgeTypeId : 0,
        bottom: obj.edges.bottom ? obj.edges.bottom.edgeTypeId : 0,
        left: obj.edges.left ? obj.edges.left.edgeTypeId : 0,
    }
});

const findPiece = (data, nodes) => {
// Функция должна вернуть id следуюшего элемента, и новые значения nodes
// в ввиде массива из двух элементов
    for (const piece of pieces) {
      let secondEdge = undefined;
      let isNewRow = i % 10 === 0;
      let isEndRow = i % 10 === 9;
      for (const [edge, edgeData] of Object.entries(piece.edges)) {
        if (edgeData && !isNewRow && edgeData.edgeTypeId === nodes.right) {
          secondEdge = edge;
        }
        if (edgeData && isNewRow && edgeData.edgeTypeId === nodes.bottom) {
          secondEdge = edge;
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
      }

    };

const preparing = pieces => {
   const data = pieces.map(handler);
   return nodes  => findPiece(data, nodes);
   };

const solvePuzzle = pieces => {
  const res = [pieces[0].id];
  let nodes = {
      right: pieces[0].edges.right.edgeTypeId,
      bottom: pieces[0].edges.bottom.edgeTypeId
      }
  const mapper = preparing(pieces);

  for (let i = 1; i < pieces.length; i++) {
    [elem, nodes] = mapper(nodes);
    }
  }
  console.log(res);
  return res;
}

export {solvePuzzle, handler};

// Не удаляйте эту строку
// window.solvePuzzle = solvePuzzle;

