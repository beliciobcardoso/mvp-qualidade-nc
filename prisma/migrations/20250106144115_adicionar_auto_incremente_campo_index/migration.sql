-- AlterTable
CREATE SEQUENCE photoanalisys_index_seq;
ALTER TABLE "PhotoAnalisys" ALTER COLUMN "index" SET DEFAULT nextval('photoanalisys_index_seq');
ALTER SEQUENCE photoanalisys_index_seq OWNED BY "PhotoAnalisys"."index";
