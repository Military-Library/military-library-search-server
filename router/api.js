const express = require("express");
const sendQuery = require("../feature/db");
const router = express.Router();

router.get("/search", async (req, res) => {
    const book_title = req.query.title;

    if(book_title.length < 2){
        res.json({"result" : "error", "message" : "책 제목은 최소 2글자 이상 입니다."});
        return;
    }

    const result = await sendQuery(`SELECT * FROM books WHERE marc_title like ?`, [`%${book_title}%`]);
    res.json({"result" : "success", "message" : result});
})

router.get("/random", async (req, res) => {
    let cnt = (!parseInt(req.query.cnt) ? 20 : (parseInt(req.query.cnt) > 20 || parseInt(req.query.cnt) <= 0 ? 20 : parseInt(req.query.cnt)));
    const total_book_cnt = await sendQuery(`SELECT count(*) as cnt FROM books`);
    const result = [];

    for(; cnt>0; cnt--){
        const db_result = await sendQuery(`SELECT * FROM books WHERE idx = ?`, [Math.floor(Math.random() * (total_book_cnt[0].cnt - 2)) + 1]);
        result.push(db_result[0])
    }

    res.json({"result" : "success", "message" : result});
})

module.exports = router;