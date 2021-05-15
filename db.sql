CREATE DATABASE military_library;

CREATE TABLE books (
    idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    class_no_type TEXT NOT NULL,
    status VARCHAR(2) NOT NULL,
    rec_key TEXT NOT NULL,
    marc_page TEXT NOT NULL,
    ddc_class_no TEXT NOT NULL,
    marc_ea_isbn TEXT NOT NULL,
    marc_publisher TEXT NOT NULL,
    marc_price TEXT NOT NULL,
    marc_author TEXT NOT NULL,
    etc_class_no TEXT NOT NULL,
    lib_name TEXT NOT NULL,
    marc_title TEXT NOT NULL,
    marc_publish_year TEXT NOT NULL,
    marc_size TEXT NOT NULL,
    kdc_class_no TEXT NOT NULL
);