// ye file me ny Async error k lia used krni ha is ko productController me ja k import krna ha

module.exports = theFunc => (req, res, next) => {

    //ye wala function tri catch wala ha orPromise Javascript wala ha
    Promise.resolve(theFunc(req, res, next)).catch(next);

}