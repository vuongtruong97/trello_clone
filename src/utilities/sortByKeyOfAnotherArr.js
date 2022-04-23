function sortByKeyOfAnotherArr(arr1, arr2, key) {
    return arr1.sort((a, b) => {
        return arr2.indexOf(a[key]) - arr2.indexOf(b[key]);
    });
}

export default sortByKeyOfAnotherArr;
