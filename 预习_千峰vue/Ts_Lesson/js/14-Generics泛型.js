function createArray(length, value) {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray(3, 1);
createArray(3, true);
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
swap(['hello', 100]);
swap([100, 'hello']);
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
loggingIdentity('hrllo');
export default {};
