USE react_node_app;

CREATE TABLE IF NOT EXISTS `author` ( 
  `id` int NOT NULL AUTO_INCREMENT, 
  `name` varchar(255) NOT NULL, 
  `birthday` date NOT NULL, 
  `bio` text NOT NULL, 
  `createdAt` date NOT NULL, 
  `updatedAt` date NOT NULL, 
  PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 

CREATE TABLE IF NOT EXISTS `book` ( 
  `id` int NOT NULL AUTO_INCREMENT, 
  `title` varchar(255) NOT NULL, 
  `releaseDate` date NOT NULL, 
  `description` text NOT NULL, 
  `pages` int NOT NULL, 
  `createdAt` date NOT NULL, 
  `updatedAt` date NOT NULL, 
  `authorId` int DEFAULT NULL, 
  PRIMARY KEY (`id`), 
  KEY `FK_66a4f0f47943a0d99c16ecf90b2` (`authorId`), 
  CONSTRAINT `FK_66a4f0f47943a0d99c16ecf90b2` FOREIGN KEY (`authorId`) REFERENCES `author` (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 

INSERT IGNORE INTO `author` VALUES 
(1,'J.K. Rowling (Joanne Kathleen Rowling)','1965-07-31','J.K. Rowling is a British author best known for writing the Harry Potter fantasy series.','2024-05-29','2024-05-29'),
(3,'Jane Austen','1775-12-16','Jane Austen was an English novelist known for her wit, social commentary, and romantic stories.','2024-05-29','2024-05-29'),
(4,'Harper Lee','1960-07-11','Harper Lee was an American novelist best known for her Pulitzer Prize-winning novel To Kill a Mockingbird.','2024-05-29','2024-05-29'),
(5,'J.R.R. Tolkien','1954-07-29','J.R.R. Tolkien was a British philologist and writer best known for his fantasy novels The Hobbit and The Lord of the Rings.','2024-05-29','2024-05-29'),
(6,'Mary Shelley','1818-03-03','Mary Shelley was a British novelist, playwright, and short story writer.','2024-05-29','2024-05-29'),
(7,'Douglas Adams','1979-10-12','Douglas Adams was an English science fiction writer and satirist.','2024-05-29','2024-05-29'); 

INSERT IGNORE INTO `book` VALUES 
(1,'Harry Potter and the Sorcerer\'s Stone','1997-07-26','On his birthday, Harry Potter discovers that he is the son of two well-known wizards.',223,'2024-05-29','2024-05-29',1),
(3,'Harry Potter and the chamber of secrets','1998-07-02','Harry Potter and the sophomores investigate a malevolent threat to their Hogwarts classmates.',251,'2024-05-29','2024-05-29',1),
(4,'Pride and Prejudice','1813-01-28','An English novel of manners by Jane Austen, first published in 1813.',224,'2024-05-29','2024-05-29',3),
(5,'Harry Potter and the Prisoner of Azkaban','1999-07-08','Harry\'s third year of studies at Hogwarts is threatened by Sirius Black\'s escape from Azkaban prison.',317,'2024-05-29','2024-05-29',1),
(6,'Harry Potter and the Goblet of Fire','2000-07-08','Hogwarts prepares for the Triwizard Tournament, in which three schools of wizardry will compete.',636,'2024-05-29','2024-05-29',1),
(7,'The Hitchhiker\'s Guide to the Galaxy','1979-10-12','A comic science fiction comedy series created by Douglas Adams.',184,'2024-05-29','2024-05-29',7),
(8,'Frankenstein; or, The Modern Prometheus','1818-03-03','A Gothic novel by Mary Shelley that tells the story of Victor Frankenstein.',211,'2024-05-29','2024-05-29',6),
(9,'The Lord of the Rings: The Fellowship of the Ring','1954-07-29','The first book in J.R.R. Tolkien\'s epic fantasy trilogy.',482,'2024-05-29','2024-05-29',5); 