CREATE TABLE "to-do" (
	"id" serial primary key,
	"task" VARCHAR(500) NOT NULL,
	"status" VARCHAR(30) DEFAULT 'Incomplete' NOT NULL
	)

INSERT INTO "to-do" ("task")
VALUES ('Get toiletries from Target.')
INSERT INTO "to-do" ("task")
VALUES ('Do the laundry.')
INSERT INTO "to-do" ("task")
VALUES ('Complete my weekend challenge.')
