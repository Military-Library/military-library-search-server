const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const secret = require("../config/secret.json");
const sendQuery = require("../feature/db");

/****** 
{
    "DS_NDELCTR_LIB_BKSCTLG": 
    {
        "list_total_count": 228171,
        "row": [{
            "class_no_type": "1",
            "status": "U",
            "rec_key": "2060376310",
            "marc_page": "p.",
            "ddc_class_no": "",
            "marc_ea_isbn": "",
            "lib_code": "M1",
            "marc_publisher": "아고라",
            "marc_price": "48000",
            "marc_author": "레온 트로츠키 지음",
            "etc_class_no": "",
            "lib_name": "국방대학교 도서관",
            "marc_title": "러시아 혁명사",
            "marc_publish_year": "2017",
            "marc_size": "cm",
            "kdc_class_no": "929.07"
        },
        ...
        ]
    }
}
*/

const apiRequest = async (start_index, end_index) => {
    const KEY = secret.military.api_key;
    const TYPE = "json";
    const SERVICE = "DS_NDELCTR_LIB_BKSCTLG";
    const START_INDEX = start_index;
    const END_INDEX = end_index;

    const api_url = `https://openapi.mnd.go.kr/${KEY}/${TYPE}/${SERVICE}/${START_INDEX}/${END_INDEX}`;

    return fetch(api_url).then(res => res.json())
}

router.get("/check", async (req, res) => {
    let api_request_result = await apiRequest(1,1);
    let current_book_cnt = api_request_result.DS_NDELCTR_LIB_BKSCTLG.list_total_count;
    let db_row = await sendQuery(`SELECT count(idx) as cnt FROM books`);

    // DB에 저장된 책의 수와 API에 저장된 책의 수 비교
    if(db_row[0].cnt == current_book_cnt){
        api_request_result = await apiRequest(current_book_cnt, current_book_cnt);
        db_row = await sendQuery(`SELECT marc_title FROM books WHERE idx = ${db_row[0].cnt}`);

        // DB에 최근에 저장된 책의 제목과 API에 최근에 등록된 책의 제목 비교
        if(db_row[0].marc_title == api_request_result.DS_NDELCTR_LIB_BKSCTLG.row[0].marc_title){
            res.json({"result" : "success", "message" : "새로운 책이 없습니다."});
            return;
        }
    }
    api_request_result = await apiRequest(db_row[0].cnt + 1, current_book_cnt);
    const new_book_info = api_request_result.DS_NDELCTR_LIB_BKSCTLG.row;

    new_book_info.forEach(async (row) => {
        await sendQuery(`INSERT INTO books (class_no_type, status, rec_key, marc_page, ddc_class_no, marc_ea_isbn, marc_publisher, marc_price, marc_author, etc_class_no, lib_name, marc_title, marc_publish_year, marc_size, kdc_class_no) VALUES
                                            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [row.class_no_type, row.status,  row.rec_key, row.marc_page, row.ddc_class_no, row.marc_ea_isbn, row.marc_publisher, row.marc_price, row.marc_author, row.etc_class_no, row.lib_name, row.marc_title, row.marc_publish_year, row.marc_size, row.kdc_class_no]);
    })

    res.send({"result" : "processing", "message" : "새로운 책을 등록 중 입니다."});
})

module.exports = router;
