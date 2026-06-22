const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {

    const limit = parseInt(req.query.limit) || 20;
    const category = req.query.category;

    const cursorUpdatedAt = req.query.cursorUpdatedAt;
    const cursorId = req.query.cursorId;

    let sql = `
        SELECT *
        FROM products
        WHERE 1=1
    `;

    const params = [];

    if (category) {
        sql += ` AND category = ? `;
        params.push(category);
    }

    if (cursorUpdatedAt && cursorId) {
        sql += `
        AND (
            updated_at < ?
            OR (
                updated_at = ?
                AND id < ?
            )
        )
        `;

        params.push(
            cursorUpdatedAt,
            cursorUpdatedAt,
            cursorId
        );
    }

    sql += `
      ORDER BY updated_at DESC, id DESC
      LIMIT ?
    `;

    params.push(limit);

    const [rows] = await pool.query(sql, params);

    let nextCursor = null;

    if (rows.length > 0) {
        const last = rows[rows.length - 1];

        nextCursor = {
            updated_at: last.updated_at,
            id: last.id
        };
    }

    res.json({
        count: rows.length,
        products: rows,
        nextCursor
    });
});

module.exports = router;