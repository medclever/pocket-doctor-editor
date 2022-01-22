CREATE TABLE "lang" (
  "id" bigint NOT NULL,
  "code" varchar(2) NOT NULL,
  "name" varchar(30) NOT NULL,
  "is_default" boolean NOT NULL,
  CONSTRAINT "lang.idPk" PRIMARY KEY ("id")
);
-- Сomments
COMMENT ON TABLE public."lang" IS 'Языки';
COMMENT ON COLUMN public."lang"."id" IS 'ID';
COMMENT ON COLUMN public."lang"."code" IS 'Код';
COMMENT ON COLUMN public."lang"."name" IS 'Название';
COMMENT ON COLUMN public."lang"."is_default" IS 'По умолчанию';

CREATE TABLE "image" (
  "id" bigint NOT NULL,
  "file" varchar(300) NOT NULL,
  "image_type_id" int NOT NULL,
  CONSTRAINT "image.idPk" PRIMARY KEY ("id")
);
CREATE TABLE "image_lang" (
  "id" bigint NOT NULL,
  "image_id" bigint NOT NULL,
  "lang_id" bigint NOT NULL,
  "name" varchar(300) NOT NULL,
  "file_lang" varchar(300),
  CONSTRAINT "image_lang.idPk" PRIMARY KEY ("id"),
  CONSTRAINT "image_lang.imageFk" FOREIGN KEY ("image_id") REFERENCES public."image"("id") ON DELETE RESTRICT
);
-- Сomments
COMMENT ON TABLE public."image" IS 'Изображения';
COMMENT ON COLUMN public."image"."id" IS 'ID';
COMMENT ON COLUMN public."image"."file" IS 'Файл';
COMMENT ON COLUMN public."image"."image_type_id" IS 'ID типа изображения';
COMMENT ON TABLE public."image_lang" IS 'Изображение языковая часть';
COMMENT ON COLUMN public."image_lang"."id" IS 'ID';
COMMENT ON COLUMN public."image_lang"."image_id" IS 'Связь с изображением';
COMMENT ON COLUMN public."image_lang"."lang_id" IS 'Связь с языком';
COMMENT ON COLUMN public."image_lang"."name" IS 'Название';
COMMENT ON COLUMN public."image_lang"."file_lang" IS 'Файл изображения для языка';

CREATE TABLE "article" (
  "id" bigint NOT NULL,
  "image_id" bigint NOT NULL,
  "position" int NOT NULL,
  "code" varchar(50) NOT NULL,
  "is_free" boolean NOT NULL,
  CONSTRAINT "article.idPk" PRIMARY KEY ("id"),
  CONSTRAINT "article_lang.imageFk" FOREIGN KEY ("image_id") REFERENCES public."image"("id") ON DELETE RESTRICT
);
CREATE TABLE "article_lang" (
  "id" bigint NOT NULL,
  "article_id" bigint NOT NULL,
  "lang_id" bigint NOT NULL,
  "title" text NOT NULL,
  "necessary" text NOT NULL,
  "possible" text NOT NULL,
  "must_not" text NOT NULL,
  "important" text NOT NULL,
  "text" text NOT NULL,
  "active" text NOT NULL,
  CONSTRAINT "article_lang.idPk" PRIMARY KEY ("id"),
  CONSTRAINT "article_lang.articleFk" FOREIGN KEY ("article_id") REFERENCES public."article"("id") ON DELETE RESTRICT
);
-- Сomments
COMMENT ON TABLE public."article" IS 'Статья';
COMMENT ON COLUMN public."article"."id" IS 'ID';
COMMENT ON COLUMN public."article"."image_id" IS 'ID файла';
COMMENT ON COLUMN public."article"."code" IS 'Код';
COMMENT ON COLUMN public."article"."is_free" IS 'Бесплатная/нет';
COMMENT ON TABLE public."article_lang" IS 'Статья языковая часть';
COMMENT ON COLUMN public."article_lang"."id" IS 'ID';
COMMENT ON COLUMN public."article_lang"."article_id" IS 'Связь со статьей';
COMMENT ON COLUMN public."article_lang"."lang_id" IS 'Связь с языком';
COMMENT ON COLUMN public."article_lang"."title" IS 'Заголовок';
COMMENT ON COLUMN public."article_lang"."necessary" IS 'Необходимо'; 
COMMENT ON COLUMN public."article_lang"."possible" IS 'Возможно'; 
COMMENT ON COLUMN public."article_lang"."must_not" IS 'Нельзя'; 
COMMENT ON COLUMN public."article_lang"."important" IS 'Важно'; 
COMMENT ON COLUMN public."article_lang"."text" IS 'текст'; 
COMMENT ON COLUMN public."article_lang"."active" IS 'Активность';