DELETE FROM book;
ALTER TABLE book AUTO_INCREMENT = 1001;

DELETE FROM category;
ALTER TABLE category AUTO_INCREMENT = 1001;

INSERT INTO `category` (`name`) VALUES ('SciFi'),('Fantasy'),('Mystery'),('Romance'),('Classics');

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('The Martian', 'Andy Weir', '', 16.99, 0, FALSE, TRUE, 'books/The-Martian.jpeg', 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('Ready Player One', 'Ernest Cline', '', 13.99, 0, FALSE, FALSE, 'books/Ready-Player-One.jpg', 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('Star Wars Thrawn', 'Timothy Zahn', '', 15.99, 0, FALSE, FALSE, 'books/Star-Wars-Thrawn-Book-Cover.jpg', 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('Snowcrash', 'Neal Stephenson', '', 6.69, 0, FALSE, FALSE, 'books/Snowcrash.jpg', 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('Twenty Thousand Leagues Under The Sea', 'Jules Verne', '', 4.69, 0, TRUE, FALSE, 'books/20-thousand-leagues-Jules-Verne.jpg', 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('The Time Machine', 'HG Wells', '', 3.69, 0, TRUE, FALSE, 'books/Time-Machine-HG-Wells.jpg', 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('Dune', 'Frank Herbert', '', 13.13, 0, FALSE, FALSE, 'books/Dune-Book-Cover.jpg', 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('Star Trek New Voyages', 'Sondra Marshak', '', 11.29, 0, FALSE, FALSE, 'books/Star-Trek-New-Voyages.jpg', 1001);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('Outlander', 'Diana Gabaldon', '', 11.59, 0, FALSE, FALSE, 'books/Outlander.jpg', 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('A Game of Thrones', 'George R. R. Martin', '', 25.64, 0, FALSE, FALSE, 'books/Game-Of-Thrones.jpg', 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('American Gods', 'Neil Gaiman', '', 3.9, 0, FALSE, FALSE, 'books/American-Gods.jpg', 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('The Lord of the Rings', ' J. R. R. Tolkien', '', 6.00, 0, FALSE, FALSE, 'books/Lord-Of-The-Rings.jpg', 1002);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('The Moonstone', 'Wilkie Collins', '', 12.59, 0, FALSE, FALSE, 'books/The-Moonstone.jpg', 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('Gone Girl', 'Gillian Flynn', '', 7.99, 0, FALSE, FALSE, 'books/Gone-Girl.jpg', 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('Devil in a Blue Dress', 'Walter Mosley', '', 5.99, 0, FALSE, FALSE, 'books/Devil-In-A-Blue-Dress.jpg', 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('Presumed Innocent', 'Scott Turow', '', 6.99, 0, FALSE, FALSE, 'books/Presumed-Innocent.jpg', 1003);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('Jane Eyre', 'Charlotte Bronte', '',7.99, 0, TRUE, FALSE, 'books/Jane-Eyre.jpg', 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('One True Loves: A Novel', 'Taylor Jenkins', '', 2.99, 0, TRUE, FALSE, 'books/One-True-Loves.jpg', 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('Beach Read', 'Emily Henry', '', 12.99, 0, TRUE, FALSE, 'books/Beach-Read.jpg', 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('The Notebook', 'Nicholas Sparks', '',15, 0, FALSE, FALSE, 'books/The-Notebook.jpg', 1004);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('The Iliad', 'Homer', '', 6.99, 0, TRUE, FALSE, 'books/the-iliad.gif', 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('The Brothers Karamazov', 'Fyodor Dostoyevski', '', 7.99, 0, TRUE, FALSE, 'books/the-brothers-karamazov.gif', 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('Little Women ', 'Louisa May Alcott', '', 5.99, 0, TRUE, FALSE, 'books/Little-Women.jpg', 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, image_path, category_id) VALUES ('Little Dorrit', 'Charles Dickens', '', 6.659, 0, TRUE, FALSE, 'books/little-dorrit.gif', 1005);