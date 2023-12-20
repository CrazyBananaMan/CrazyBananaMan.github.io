--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2023-12-15 00:33:42

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 121317)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    price integer NOT NULL,
    "remainingQuantity" integer NOT NULL,
    image character varying DEFAULT 'no_image.jpg'::character varying NOT NULL,
    "categoryId" integer
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 121316)
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO postgres;

--
-- TOC entry 3332 (class 0 OID 0)
-- Dependencies: 211
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- TOC entry 3181 (class 2604 OID 121320)
-- Name: product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- TOC entry 3326 (class 0 OID 121317)
-- Dependencies: 212
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, description, price, "remainingQuantity", image, "categoryId") FROM stdin;
1	Ветровка	ветровка осенняя	24900	25	image-1702562664258-180536383.png	1
2	Ветровка	ветровка демисезон	21900	20	image-1702562732598-310510530.png	1
3	Ветровка	ветровка весна-лето	19900	20	image-1702562756021-618885159.png	1
4	Обувь	Сапоги зимние	19900	20	image-1702562802814-668072638.png	2
5	Обувь	Сапоги осенние	18000	20	image-1702562832731-100835702.png	2
6	Обувь	Сапоги демисезон	18000	20	image-1702562856060-580184954.png	2
7	Перчатки	Перчатки зима	6000	20	image-1702562890675-544610742.png	3
8	Перчатки	Перчатки осень	6000	20	image-1702562904117-69569117.png	3
9	Перчатки	Перчатки демисезон	6000	20	image-1702562913147-968212059.png	3
10	Штаны	Штаны зимние	12000	20	image-1702562954621-659295238.png	4
11	Штаны	Штаны осень	12000	20	image-1702562963813-884139626.png	4
12	Штаны	Штаны демисезон	12000	20	image-1702562971822-547628018.png	4
13	Термобелье	Термобелье зима	18000	20	image-1702563018155-151049171.png	5
14	Термобелье	Термобелье осень	18000	20	image-1702563028850-210567429.png	5
15	Термобелье	Термобелье демисезон	18000	20	image-1702563036792-375275427.png	5
16	Головные уборы	Шапка зима	9000	20	image-1702563083853-582540483.png	6
17	Головные уборы	Шапка осень	9000	20	image-1702563093214-707654983.png	6
18	Головные уборы	Шапка демисезон	9000	20	image-1702563099577-297141483.png	6
\.


--
-- TOC entry 3333 (class 0 OID 0)
-- Dependencies: 211
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 18, true);


--
-- TOC entry 3184 (class 2606 OID 121325)
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- TOC entry 3185 (class 2606 OID 121362)
-- Name: product FK_ff0c0301a95e517153df97f6812; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


-- Completed on 2023-12-15 00:33:42

--
-- PostgreSQL database dump complete
--

