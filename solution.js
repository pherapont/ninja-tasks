const getNode = (edges, base, ancorEdge) => {

}

//  Реализовать getNode. На вход объект ушек. Ушко котрое надо найти: превое или нижнее.
//  Ушко, которое прикрепилось. Оно должно быть верхним - в начале ряда или левым в остальных
//  случаях. Т.е. надо опредлить поворот до правильного положения и выдать данные того ушка
//  которое после поворота окажется в нужной позиции.

function solvePuzzle(pieces) {
  const res = [pieces[0].id];
  let nodes = {
      right: pieces[0].edges.right.edgeTypeId,
      bottom: pieces[0].edges.bottom.edgeTypeId
      }
  console.log(pieces.length)
  console.log({nodes});

  for (let i = 1; i < pieces.length; i++) {
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
    }
  }
  console.log(res);
  return res;
}

const data = [
  {
    id: 1,
    edges: {
      top: null,
      right: { edgeTypeId: 7, type: "outside" },
      bottom: { edgeTypeId: 5, type: "inside" },
      left: null,
    },
  },
  {
    id: 9,
    edges: {
      top: { edgeTypeId: 8, type: "inside" },
      right: { edgeTypeId: 15, type: "inside" },
      bottom: null,
      left: { edgeTypeId: 5, type: "outside" },
    },
  },
  {
    id: 5,
    edges: {
      top: null,
      right: { edgeTypeId: 2, type: "inside" },
      bottom: { edgeTypeId: 1, type: "inside" },
      left: null,
    },
  },
  {
    id: 4,
    edges: {
      top: { edgeTypeId: 34, type: "inside" },
      right: { edgeTypeId: 11, type: "outside" },
      bottom: { edgeTypeId: 7, type: "inside" },
      left: null,
    },
  },
  {
    id: 3,
    edges: {
      top: { edgeTypeId: 2, type: "outside" },
      right: null,
      bottom: { edgeTypeId: 4, type: "outside" },
      left: { edgeTypeId: 6, type: "inside" },
    },
  },
  {
    id: 2,
    edges: {
      top: { edgeTypeId: 3, type: "outside" },
      right: { edgeTypeId: 34, type: "outside" },
      bottom: null,
      left: null,
    },
  },
  {
    id: 8,
    edges: {
      top: null,
      right: { edgeTypeId: 15, type: "outside" },
      bottom: { edgeTypeId: 4, type: "inside" },
      left: null,
    },
  },
  {
    id: 7,
    edges: {
      top: { edgeTypeId: 3, type: "inside" },
      right: null,
      bottom: { edgeTypeId: 1, type: "outside" },
      left: { edgeTypeId: 10, type: "inside" },
    },
  },
  {
    id: 6,
    edges: {
      top: { edgeTypeId: 11, type: "inside" },
      right: { edgeTypeId: 10, type: "outside" },
      bottom: { edgeTypeId: 6, type: "outside" },
      left: { edgeTypeId: 8, type: "outside" },
    },
  },
];

solvePuzzle(data);

// Не удаляйте эту строку
// window.solvePuzzle = solvePuzzle;

