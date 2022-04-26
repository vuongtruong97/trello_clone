function swapValueArrayWithIndex(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr;
}
export default swapValueArrayWithIndex;
