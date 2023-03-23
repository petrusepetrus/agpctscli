function testIfPromise(testObject) {
    if (
        testObject !== null &&
        typeof testObject === 'object' &&
        typeof testObject.then === 'function' &&
        typeof testObject.catch === 'function'
    ) {
        return true;
    } else {
        return false;
    }
}

function scrollToTop() {
    window.scrollTo({top: 0, behavior: "smooth"});
}

export {
    testIfPromise,
    scrollToTop
}