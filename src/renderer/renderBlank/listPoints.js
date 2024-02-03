import { getTypeTable, QRPointType } from '@/utils/qrcodeHandler';

export default function listPoints(qrcode, params) {
    if (!qrcode) return [];

    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = new Array(nCount);

    const size = 1.001;
    const size2 = 1.001;
    let height = params[0];
    let height2 = params[1];
    const upColor = params[2];
    const leftColor = params[3];
    const rightColor = params[4];
    let id = 0;

    const X = [-Math.sqrt(3) / 2, 1 / 2];
    const Y = [Math.sqrt(3) / 2, 1 / 2];
    const Z = [0, 0];

    const matrixString =
        'matrix(' +
        String(X[0]) +
        ', ' +
        String(X[1]) +
        ', ' +
        String(Y[0]) +
        ', ' +
        String(Y[1]) +
        ', ' +
        String(Z[0]) +
        ', ' +
        String(Z[1]) +
        ')';

    if (height <= 0) height = 1.0;
    if (height2 <= 0) height2 = 1.0;

    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            if (qrcode.isDark(x, y) === false) continue;
            else if (
                typeTable[x][y] === QRPointType.POS_OTHER ||
                typeTable[x][y] === QRPointType.POS_CENTER
            ) {
                pointList.push(
                    `<rect
                        width="${size2}"
                        height="${size2}"
                        key="${id++}"
                        fill="${upColor}"
                        x="${x + (1 - size2) / 2}"
                        y="${y + (1 - size2) / 2}"
                        transform="${matrixString}"
                    />`
                );
                pointList.push(
                    `<rect
                        width="${height2}"
                        height="${size2}"
                        key="${id++}"
                        fill="${leftColor}"
                        x="${0}"
                        y="${0}"
                        transform="${
                            matrixString +
                            'translate(' +
                            String(x + (1 - size2) / 2 + size2) +
                            ',' +
                            String(y + (1 - size2) / 2) +
                            ') ' +
                            'skewY(45) '
                        }"
                    />`
                );
                pointList.push(
                    `<rect
                        width="${size2}"
                        height="${height2}"
                        key="${id++}"
                        fill="${rightColor}"
                        x="${0}"
                        y="${0}"
                        transform="${
                            matrixString +
                            'translate(' +
                            String(x + (1 - size2) / 2) +
                            ',' +
                            String(y + size2 + (1 - size2) / 2) +
                            ') ' +
                            'skewX(45) '
                        }"
                    />`
                );
            } else {
                pointList.push(
                    `<rect
                        width="${size}"
                        height="${size}"
                        key="${id++}"
                        fill="${upColor}"
                        x="${x + (1 - size) / 2}"
                        y="${y + (1 - size) / 2}"
                        transform="${matrixString}"
                    />`
                );
                pointList.push(
                    `<rect
                        width="${height}"
                        height="${size}"
                        key="${id++}"
                        fill="${leftColor}"
                        x="${0}"
                        y="${0}"
                        transform="${
                            matrixString +
                            'translate(' +
                            String(x + (1 - size) / 2 + size) +
                            ',' +
                            String(y + (1 - size) / 2) +
                            ') ' +
                            'skewY(45) '
                        }"
                    />`
                );
                pointList.push(
                    `<rect
                        width="${size}"
                        height="${height}"
                        key="${id++}"
                        fill="${rightColor}"
                        x="${0}"
                        y="${0}"
                        transform="${
                            matrixString +
                            'translate(' +
                            String(x + (1 - size) / 2) +
                            ',' +
                            String(y + size + (1 - size) / 2) +
                            ') ' +
                            'skewX(45) '
                        }"
                    />`
                );
            }
        }
    }

    return pointList;
}