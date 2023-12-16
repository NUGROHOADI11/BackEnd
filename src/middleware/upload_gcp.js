"use strict";

const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const path = require("path");

const pathKey = path.resolve(__dirname, "../../serviceaccountkey.json");

const gcs = new Storage({
    projectId: "project_id_anda",
    keyFilename: pathKey,
});

const bucketName = "bucket_name_anda";
const bucket = gcs.bucket(bucketName);

function formatDate(date) {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
    );

    const replacedDate = formattedDate.replace(/[\s\/,]+/g, "_");

    return replacedDate;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = async (req, res, next) => {
    try {
        if (!req.file) return next();

        const gcsname = formatDate(new Date());
        const file = bucket.file(gcsname);

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        stream.on("error", (err) => {
            req.file.cloudStorageError = err;
            next(err);
        });

        stream.on("finish", () => {
            req.file.cloudStorageObject = gcsname;
            req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucketName}/${gcsname}`;
            next();
        });

        stream.end(req.file.buffer);
    } catch (error) {
        console.error("Error in uploadToGcs:", error);
        next(error);
    }
};

module.exports = ImgUpload;
