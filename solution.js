
const handler = obj => ({
  id: obj.id,
  edges: {
    top: obj.edges.top ? obj.edges.top.edgeTypeId : 0,
    right: obj.edges.right ? obj.edges.right.edgeTypeId : 0,
    bottom: obj.edges.bottom ? obj.edges.bottom.edgeTypeId : 0,
    left: obj.edges.left ? obj.edges.left.edgeTypeId : 0,
  }
});

const searchNode = node => {
	
}

const solvePuzzle = pieces => {

	const ROW_LENGTH = Math.sqrt(pieces.length);

	let secondEdge = undefined;
	let edgeId = undefined;
	let searchField = pieces.map(handler);
	let res = [pieces[0].id];
	let nodeRight = pieces[0].edges.right.edgeTypeId;
	let nodeBottom = pieces[0].edges.bottom.edgeTypeId;
			
  for (let i = 1; i < pieces.length; i++) {
		let isNewRow = i % ROW_LENGTH === 0;
		let isEndRow = i % ROW_LENGTH === ROW_LENGTH - 1;
		for (const piece of searchField) {
			for (const [edge, edgeTypeId] of Object.entries(piece.edges)) {

				if (edgeTypeId && !isNewRow && edgeTypeId === nodeRight) {
					secondEdge = edge;
					nodeRight = searchNode('nodeRighth');
					edgeId = piece.id;
					break
				}
				if (edgeTypeId && isNewRow && edgeTypeId === nodeBottom) {
					secondEdge = edge;
					nodeRight = searchNode('nodeRight');
					nodeBottom = searchNode('nodeBottom')
					edgeId = piece.id;
					break
				}
			}
		}
		searchField = searchField.filter(piece => piece.id != edgeId);
    console.log(searchField);
		res.push(edgeId);
  	console.log(res);
	}
	return res;
}
export {solvePuzzle, handler};

// Не удаляйте эту строку
// window.solvePuzzle = solvePuzzle;

