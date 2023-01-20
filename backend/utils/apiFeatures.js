//ye ClassApi feature ham search krny k lia used kry gy
//Product.find() ye jo ham find krty ha is ko query bulty ha

//-------------------------------------constructors-------------------------------------------
class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    //-------------------------------------Search-------------------------------------------
    //keyword sy ham serch item ly gy.....or turneri oprator be used kry gy
    //$regex  ye mongodb ka func ha or $options is me capital word be search kr k dy ga ham ko
    // name ak keyword bania ha ham ny

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } : {};

        // console.log(`---------------------------------Search Product -----------------------------`);
        // console.log("keyword :", keyword)
        // console.log(`-----------------------------------------------------------------------------`);


        this.query = this.query.find({ ...keyword });
        //is function ko return krny gy .return this ka matlib ha is class ko retun kr dy gy
        return this;
    }
    //-------------------------------------filter()-------------------------------------------
    //filer ka matlib kuch be ham search kry to wo is me sy mil jy

    filter() {
        const queryCopy = { ...this.queryStr };

        // console.log(`---------------------------------Before QueryCopy Filter -----------------------------`);
        // console.log("keyword :", queryCopy)
        // console.log(`--------------------------------------------------------------------------------------`);

        //removing some fields for category
        //ham ny opr array lagia ha is lia forEach ko idr laga dia ha
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        // console.log(`---------------------------------After QueryCopy Filter -----------------------------`);
        // console.log("keyword :", queryCopy)
        // console.log(`-------------------------------------------------------------------------------------`);


        //-----------------Filter for Price and Rating-----------------
        //ab me price pr filter lgny laga hon
        //sub sy phlay is ko object sy string me convert krna ha
        //gt = greater then , gte >= greateTne Equal, lt < lessThen, lte <= lessthen equl to

        // console.log(`---------------------------------Before QueryCopy Filter Price-----------------------`);
        // console.log("keyword :", queryCopy)
        // console.log(`-------------------------------------------------------------------------------------`);


        let queryStr = JSON.stringify(queryCopy);

        //sb ko me ny replace kr dia ha
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        //back json me convert kr dia ha is ko 
        this.query = this.query.find(JSON.parse(queryStr));

        // console.log(`---------------------------------After QueryCopy Filter Price ---------------------`);
        // console.log("keyword :", queryCopy)
        // console.log(`------------------------------------------------------------------------------------`);



        //this.query == Product.find()
        // this.query = this.query.find(queryCopy);
        return this;
    }


    //---------------------------------------------pagination---------------------------------------------------
    //pagination resultPerPage ham product controller me bania ha is ko used kia ha ham ny
    //total 50  -10  page 5 her page me 10 product show ho  currentPage = 1, resultPerPage=10
    pagination(resultPerPage) {

        const currentPage = Number(this.queryStr.page) || 1;

        //resultPerPage = 10 ,,, or currentPage = 2-1 = 1 or ye staring ki 10 skip kr dy phir next 11 to 20 pr jy ga
        const skip = resultPerPage * (currentPage - 1);
        //limit resultPerPage me ay gi hamri her page me 5 product show hon gi
        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }


}


//is ko productController me ja k import kr ly gy
module.exports = ApiFeatures;