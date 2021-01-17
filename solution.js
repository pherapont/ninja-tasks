// Add search of the first element position by programm way

const handler = obj => ({
  id: obj.id,
  edges: {
    top: obj.edges.top ? obj.edges.top.edgeTypeId : 0,
    right: obj.edges.right ? obj.edges.right.edgeTypeId : 0,
    bottom: obj.edges.bottom ? obj.edges.bottom.edgeTypeId : 0,
    left: obj.edges.left ? obj.edges.left.edgeTypeId : 0,
  }
});

const searchNode = (edge, piece, isNewRow = false) => {
	const EDGES_LIST = ['top', 'right', 'bottom', 'left'];
	const oppositePlace = (EDGES_LIST.indexOf(edge) + 2) % 4;
  const preOppositePlace = (EDGES_LIST.indexOf(edge) + 1) % 4;
	const oppositeEdge = EDGES_LIST[oppositePlace]; 
  const preOppositeEdge = EDGES_LIST[preOppositePlace]; 
  if (isNewRow) {
    return [piece.edges[preOppositeEdge], piece.edges[oppositeEdge]]
  } else {
    return piece.edges[oppositeEdge];
  }
}

const solvePuzzle = pieces => {
	console.log(pieces);

	const ROW_LENGTH = Math.sqrt(pieces.length);

	let edgeId = undefined;
	let searchField = pieces.slice(1).map(handler);
  console.log(pieces[0].edges);
	let res = [pieces[0].id];
	let nodeRight = pieces[0].edges.bottom.edgeTypeId; //right
	console.log({nodeRight});
	let nodeBottom = pieces[0].edges.left.edgeTypeId; //bottom
			
  for (let i = 1; i < pieces.length; i++) {
		console.log(searchField);
		let isNewRow = i % ROW_LENGTH === 0;
		let isEndRow = i % ROW_LENGTH === ROW_LENGTH - 1;
    let notDone = true;
		for (const item of searchField) {
      if (notDone) {
        for (const [edge, edgeTypeId] of Object.entries(item.edges)) {
          if (edgeTypeId && !isNewRow && edgeTypeId === nodeRight) {
            console.log({edgeTypeId}, 'right');
            console.log({edge});
            console.log({item});
            nodeRight = searchNode(edge, item);
            console.log({nodeRight});
            edgeId = item.id;
            notDone = false;
            break
          }
          if (edgeTypeId && isNewRow && edgeTypeId === nodeBottom) {
            console.log({edgeTypeId}, 'bottom');
            [nodeRight, nodeBottom] = searchNode(edge, item, true)
            edgeId = item.id;
            notDone = false;
            break
          }
        }
      }
		}

		searchField = searchField.filter(piece => piece.id != edgeId);
		res.push(edgeId);
  	console.log(res);
	}
	return res;
}
// export {solvePuzzle, handler, searchNode};

// Не удаляйте эту строку
window.solvePuzzle = solvePuzzle;

