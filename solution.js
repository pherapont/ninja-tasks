
const handler = obj => ({
  id: obj.id,
  edges: {
    top: obj.edges.top ? obj.edges.top.edgeTypeId : 0,
    right: obj.edges.right ? obj.edges.right.edgeTypeId : 0,
    bottom: obj.edges.bottom ? obj.edges.bottom.edgeTypeId : 0,
    left: obj.edges.left ? obj.edges.left.edgeTypeId : 0,
  }
});

const searchNode = (edge, piece) => {
	const EDGES_LIST = ['top', 'right', 'bottom', 'left'];
	const oppositePlace = (EDGES_LIST.indexOf(edge) + 2) % 4;
	const oppositeEdge = EDGES_LIST[oppositePlace]; 
	return piece.edges[oppositeEdge];
}

const solvePuzzle = pieces => {

	const ROW_LENGTH = Math.sqrt(pieces.length);

	let secondEdge = undefined;
	let edgeId = undefined;
	let searchField = pieces.slice(1).map(handler);
	console.log(searchField[0]);
	let res = [pieces[0].id];
	let nodeRight = pieces[0].edges.right.edgeTypeId;
	console.log({nodeRight});
	let nodeBottom = pieces[0].edges.bottom.edgeTypeId;
			
  for (let i = 1; i < pieces.length; i++) {
		console.log(searchField);
		let isNewRow = i % ROW_LENGTH === 0;
		let isEndRow = i % ROW_LENGTH === ROW_LENGTH - 1;
		for (const item of searchField) {
			for (const [edge, edgeTypeId] of Object.entries(item.edges)) {
				if (edgeTypeId && !isNewRow && edgeTypeId === nodeRight) {
					console.log({edgeTypeId}, 'right');
					secondEdge = edge;
					console.log({item});
					nodeRight = searchNode(edge, item);
					console.log({nodeRight});
					edgeId = item.id;
				}
				if (edgeTypeId && isNewRow && edgeTypeId === nodeBottom) {
					console.log({edgeTypeId}, 'bottom');
					secondEdge = edge;
					nodeRight = searchNode(edge, item);
					nodeBottom = searchNode(edge, item)
					edgeId = item.id;
				}
			}
		}

		searchField = searchField.filter(piece => piece.id != edgeId);
		res.push(edgeId);
  	console.log(res);
	}
	return res;
}
export {solvePuzzle, handler, searchNode};

// Не удаляйте эту строку
// window.solvePuzzle = solvePuzzle;

