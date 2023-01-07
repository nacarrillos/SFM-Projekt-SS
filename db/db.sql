"Benutzertabelle"
create table benutzer (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    benutzername VARCHAR(20) NOT NULL UNIQUE,
    kennwort VARCHAR(100) NOT NULL,
    benutzertyp VARCHAR(50) NOT NULL check(benutzertyp = 'Besitzer'  OR 
    benutzertyp = 'Handwerker' OR benutzertyp = 'Monteur' OR benutzertyp = 'Produktionsmitarbeiter' )   
);

-- Änderung für den Benutzer "Admin" 15.11.2022
    ALTER TABLE benutzer DROP CONSTRAINT benutzer_benutzertyp_check;
    ALTER TABLE benutzer ADD CHECK (benutzertyp = 'Besitzer'  OR 
    benutzertyp = 'Handwerker' OR benutzertyp = 'Monteur' OR benutzertyp = 'Produktionsmitarbeiter' 
        OR benutzertyp = 'Produktionsmitarbeiter' OR benutzertyp = 'Admin');
    -- Check für Neue Admin
    
    -- Änderung sodass Name, Nachname, Kontakt, Adresse and gesperrt zum Benutzer hinzugefügt werden
    ALTER TABLE benutzer ADD gesperrt BOOLEAN DEFAULT FALSE
    ALTER TABLE benutzer ADD Name VARCHAR(20) NOT NULL DEFAULT 'Name'
    ALTER TABLE benutzer ADD Nachname VARCHAR(20) NOT NULL DEFAULT 'Nachname'
    ALTER TABLE benutzer ADD Kontakt VARCHAR(20) NOT NULL DEFAULT '00000000'
    ALTER TABLE benutzer ADD Adresse VARCHAR(100) NOT NULL DEFAULT 'Muster Adresse' 

insert into benutzer (benutzername, kennwort, benutzertyp) values ('Kyle','1234!','Handwerker');

insert into benutzer (benutzername, kennwort, benutzertyp) values ('Nicolas','1234!','Handwerker');

insert into benutzer (benutzername, kennwort, benutzertyp) values ('Hannah','1234!','Monteur');

insert into benutzer (benutzername, kennwort, benutzertyp) values ('Jakim','1234!','Produktionsmitarbeiter');

"Baugruppentabelle"
create table baugruppen (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    baugruppe_name VARCHAR(50) NOT NULL,
    baugruppe_beschreibung TEXT NOT NULL,
    baugruppe_bild TEXT NOT NULL 
);


insert into baugruppen (baugruppe_name, baugruppe_beschreibung, baugruppe_bild) values ('Aufbau','Betrieb','Link');
insert into baugruppen (baugruppe_name, baugruppe_beschreibung, baugruppe_bild) values ('Innenausbau','Betrieb','Link');
insert into baugruppen (baugruppe_name, baugruppe_beschreibung, baugruppe_bild) values ('Stromversorgung','Betrieb','Link');
insert into baugruppen (baugruppe_name, baugruppe_beschreibung, baugruppe_bild) values ('Wasserversorgung','Betrieb','Link');
insert into baugruppen (baugruppe_name, baugruppe_beschreibung, baugruppe_bild) values ('Sanitäranlagen','Betrieb','Link');
insert into baugruppen (baugruppe_name, baugruppe_beschreibung, baugruppe_bild) values ('Heizung','Betrieb','Link');
insert into baugruppen (baugruppe_name, baugruppe_beschreibung, baugruppe_bild) values ('Lüftung','Betrieb','Link');

"Ergänzen der Teilenummer"

alter table baugruppen add column teilenummer varchar(50);

"Einfügen der Teilenummer"

update baugruppen set teilenummer = '01' where id=1;
update baugruppen set teilenummer = '02' where id=2;
update baugruppen set teilenummer = '03' where id=3;
update baugruppen set teilenummer = '04' where id=4;
update baugruppen set teilenummer = '05' where id=5;
update baugruppen set teilenummer = '06' where id=6;
update baugruppen set teilenummer = '07' where id=7;

"Not Null constraint ergänzen"
alter table baugruppen alter column teilenummer set not null

"Teilgruppen"

create table teilegruppen(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    teilegruppe_name VARCHAR(50) NOT NULL,
    teilegruppe_beschreibung TEXT NOT NULL,
    teilegruppe_bild TEXT NOT NULL,
    baugruppe_id BIGINT NOT NULL REFERENCES baugruppen(id) 
);

insert into teilegruppen (teilegruppe_name, teilegruppe_beschreibung, teilegruppe_bild, baugruppe_id) values ('Außenwände','Dummy','Link', 1);
insert into teilegruppen (teilegruppe_name, teilegruppe_beschreibung, teilegruppe_bild, baugruppe_id) values ('Innenwände','Dummy','Link', 1);
insert into teilegruppen (teilegruppe_name, teilegruppe_beschreibung, teilegruppe_bild, baugruppe_id) values ('Fußboden','Dummy','Link', 1);
insert into teilegruppen (teilegruppe_name, teilegruppe_beschreibung, teilegruppe_bild, baugruppe_id) values ('Dach','Dummy','Link', 1);
insert into teilegruppen (teilegruppe_name, teilegruppe_beschreibung, teilegruppe_bild, baugruppe_id) values ('Fenster','Dummy','Link', 1);
insert into teilegruppen (teilegruppe_name, teilegruppe_beschreibung, teilegruppe_bild, baugruppe_id) values ('Tueren','Dummy','Link', 1);

"Ergänzen der Teilenummer"

alter table teilegruppen add column teilenummer varchar(50);

"Einfügen der Teilenummer"

update teilegruppen set teilenummer = '01.01' where id=1;
update teilegruppen set teilenummer = '01.02' where id=2;
update teilegruppen set teilenummer = '01.03' where id=3;
update teilegruppen set teilenummer = '01.04' where id=4;
update teilegruppen set teilenummer = '01.05' where id=5;
update teilegruppen set teilenummer = '01.06' where id=6;

"Not Null constraint ergänzen"
alter table teilegruppen alter column teilenummer set not null;



"Bauteile"

create table bauteile(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    bauteil_name VARCHAR(50) NOT NULL,
    bauteil_beschreibung TEXT NOT NULL,
    bauteil_bild TEXT NOT NULL,
    teilegruppe_id BIGINT NOT NULL REFERENCES teilegruppen(id) 
);

insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Tuer1','Holz-Haustuer 100 cm x 201 cm Anschlag Links','/images/Tuer1Bild.png', 6);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Tuer2','Dummy','Link', 6);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Tuer3','Dummy','Link', 6);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Tuer4','Dummy','Link', 6);


insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Fenster1','Holz-Fenster 200 cm x 40 cm','/images/Fenster1Bild.png', 5);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Fenster2','Holz-Fenster 250 cm x 200 cm','/images/Fenster1Bild.png', 5);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Fenster3','Dummy','Link', 5);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Fenster4','Dummy','Link', 5);

insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Dach1','Dummy','Link', 4);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Dach2','Dummy','Link', 4);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Dach3','Dummy','Link', 4);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Dach4','Dummy','Link', 4);

insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Fußboden1','Dummy','Link', 3);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Fußboden2','Dummy','Link', 3);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Fußboden3','Dummy','Link', 3);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Fußboden4','Dummy','Link', 3);

insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Innenwand1','Dummy','Link', 2);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Innenwand2','Dummy','Link', 2);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Innenwand3','Dummy','Link', 2);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Innenwand4','Dummy','Link', 2);

insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Außenwand1','Dummy','Link', 1);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Außenwand2','Dummy','Link', 1);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Außenwand3','Dummy','Link', 1);
insert into bauteile (bauteil_name, bauteil_beschreibung, bauteil_bild, teilegruppe_id) values ('Außenwand4','Dummy','Link', 1);

"Ergänzen der Teilenummer"

alter table bauteile add column teilenummer varchar(50);

"Einfügen der Teilenummer"

update bauteile set teilenummer = '01.05.001' where id=1;
update bauteile set teilenummer = '01.05.002' where id=2;
update bauteile set teilenummer = '01.05.003' where id=3;
update bauteile set teilenummer = '01.05.004' where id=4;
update bauteile set teilenummer = '01.04.001' where id=5;
update bauteile set teilenummer = '01.04.002' where id=6;
update bauteile set teilenummer = '01.04.003' where id=7;
update bauteile set teilenummer = '01.04.004' where id=8;
update bauteile set teilenummer = '01.03.001' where id=9;
update bauteile set teilenummer = '01.03.002' where id=10;
update bauteile set teilenummer = '01.03.003' where id=11;
update bauteile set teilenummer = '01.03.004' where id=12;
update bauteile set teilenummer = '01.02.001' where id=13;
update bauteile set teilenummer = '01.02.002' where id=14;
update bauteile set teilenummer = '01.02.003' where id=15;
update bauteile set teilenummer = '01.02.004' where id=16;
update bauteile set teilenummer = '01.01.001' where id=17;
update bauteile set teilenummer = '01.01.002' where id=18;
update bauteile set teilenummer = '01.01.003' where id=19;
update bauteile set teilenummer = '01.01.004' where id=20;
update bauteile set teilenummer = '01.06.001' where id=25;
update bauteile set teilenummer = '01.06.002' where id=26;
update bauteile set teilenummer = '01.06.003' where id=27;
update bauteile set teilenummer = '01.06.004' where id=28;

"Not Null constraint ergänzen"
alter table bauteile alter column teilenummer set not null;

"Ergänzen der Teilenummer"

alter table bauteile add column bauteil_bild_explosion TEXT;

"Einfügen BauteilBild" 

update bauteile set bauteil_bild ='/images/Außenwand/Außenwand.png' where id = 17;
update bauteile set bauteil_name ='Außenwand' where id = 17;
update bauteile set bauteil_bild_explosion ='/images/Außenwand/AußenwandExplosion.png' where id = 17;

update bauteile set bauteil_bild ='/images/Außenwand/AußenwandFenster.png' where id = 18;
update bauteile set bauteil_name ='Außenwand mit Fenster' where id = 18;

update bauteile set bauteil_bild ='/images/Außenwand/AußenwandTuere.png' where id = 19;
update bauteile set bauteil_name ='Außenwand mit Türe' where id = 19;

update bauteile set bauteil_bild = '/images/Fußboden/Fußboden.png' where id = 9;
update bauteile set bauteil_name ='Fußboden' where id = 9;
update bauteile set bauteil_bild_explosion ='/images/Fußboden/FußbodenExplosion.png' where id = 9;

update bauteile set bauteil_bild ='/images/Innenwand/Innenwand.png' where id = 13;
update bauteile set bauteil_name ='Innenwand' where id = 13;
update bauteile set bauteil_bild_explosion ='/images/Innenwand/InnenwandExplosion.png' where id = 13;

update bauteile set bauteil_bild ='/images/Innenwand/InnenwandFensterausschnitt.png' where id = 14;
update bauteile set bauteil_name ='Innenwand mit Fensterausschnitt' where id = 14;

update bauteile set bauteil_bild ='/images/Innenwand/InnenwandDurchgang.png' where id = 15;
update bauteile set bauteil_name ='Innenwand mit Durchgang' where id = 15;

update bauteile set bauteil_bild ='/images/Dach/Dach.png' where id = 5;
update bauteile set bauteil_name ='Dach' where id = 5;
update bauteile set bauteil_bild_explosion ='/images/Dach/DachExplosion.png' where id = 5;


"Teile"

create table einzelteile(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    teilenummer VARCHAR(20) NOT NULL,
    einzelteil_name VARCHAR(50) NOT NULL,
    einzelteil_beschreibung TEXT NOT NULL,
    einzelteil_bild TEXT NOT NULL,
    bauteil_ids VARCHAR(50) NOT NULL
);

insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.01.111.001','Holzfassade','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.01.111.002','Lattung','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.01.111.003','Unterdeckplatte','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.02.222.001','Innenverkleidung','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.02.222.002','Holzwand','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.02.222.003','HWärmedämmung','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.03.333.001','Tragschicht','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.03.333.002','Bitumen','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.03.333.003','Wärmedämmung','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.03.333.004','Trittschalldämmung','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.03.333.005','Bodenbelag','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.04.444.001','Sparren','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.04.444.002','Dampfsperre','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.04.444.003','Dämmung','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.04.444.004','Witterungsschutz','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.04.444.005','Dachlatte','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.04.444.006','Dachziegel','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.05.555.001','Scherenlager','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.05.555.002','Fensterglas','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.05.555.003','Ecklager','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.05.555.004','Fenster-Griff','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.05.555.005','Flügelrahmen','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.05.555.006','Blendrahmen','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.06.666.001','Zarge','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.06.666.002','Türblatt','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.06.666.003','Drückergarnitur','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.06.666.004','Schlosskasten','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.06.666.005','Schließblech','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.06.666.006','Türband','Dummy','Link', 'hier folgt ein string');
insert into einzelteile (teilenummer,einzelteil_name, einzelteil_beschreibung, einzelteil_bild, bauteil_ids) 
values ('01.06.666.007','Schlossrosette','Dummy','Link', 'hier folgt ein string');


"Aufgaben"

create table aufgaben(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    aufgabe_typ VARCHAR(20) NOT NULL check(aufgabe_typ = 'Planung'  OR 
    aufgabe_typ = 'Produktion' OR aufgabe_typ = 'Montage' OR aufgabe_typ = 'Betrieb' 
    OR aufgabe_typ = 'Modernisierung' OR aufgabe_typ = 'Demontage' OR aufgabe_typ = 'Umzug'
    OR aufgabe_typ = 'Re-/Upcycling'),
    aufgabe_beschreibung TEXT NOT NULL,
    aufgabe_abschlussdatum DATE,
    aufgabe_timestamp_start TIMESTAMP,
    aufgabe_timestamp_end TIMESTAMP,
    aufgabe_dauer INTERVAL,
    benutzer_id BIGINT NOT NULL REFERENCES benutzer(id),
    bauteil_id  BIGINT NOT NULL REFERENCES bauteile(id)
);

insert into aufgaben (aufgabe_typ, aufgabe_beschreibung, aufgabe_abschlussdatum,aufgabe_timestamp_start,aufgabe_timestamp_end, aufgabe_dauer, benutzer_id, bauteil_id) 
values ('Produktion','Bauteil ist fertiggestellt','2022-05-27', '2022-05-27 08:01:00', '2022-05-27 22:08:00', AGE('2022-05-27 22:08:00','2022-05-27 08:01:00') ,8, 1);

################################################################

insert into aufgaben (aufgabe_typ, aufgabe_beschreibung, aufgabe_abschlussdatum,aufgabe_timestamp_start,aufgabe_timestamp_end, aufgabe_dauer, benutzer_id, bauteil_id) 
values ('Produktion','Bauteil ist verpackt','2022-05-28', '2022-05-28 07:35:30', '2022-05-28 08:40:20', AGE('2022-05-28 08:40:20','2022-05-28 07:35:30') ,8, 1);

insert into aufgaben (aufgabe_typ, aufgabe_beschreibung, aufgabe_abschlussdatum,aufgabe_timestamp_start,aufgabe_timestamp_end, aufgabe_dauer, benutzer_id, bauteil_id) 
values ('Produktion','Bauteil ist zur Montage überliefert','2022-05-28', '2022-05-28 09:00:30', '2022-05-28 10:02:20', AGE('2022-05-28 10:02:20','2022-05-28 09:00:30') ,8, 1);




insert into aufgaben (aufgabe_typ, aufgabe_beschreibung, aufgabe_abschlussdatum,aufgabe_timestamp_start,aufgabe_timestamp_end, aufgabe_dauer, benutzer_id, bauteil_id)
values ('Montage','Bauteil ist montiert','2022-05-28','2022-05-28 10:34:50', '2022-05-28 12:08:00', AGE('2022-05-28 12:08:00','2022-05-28 10:34:50'), 7, 1);


Tür2
insert into aufgaben (aufgabe_typ, aufgabe_beschreibung, aufgabe_abschlussdatum,aufgabe_timestamp_start,aufgabe_timestamp_end, aufgabe_dauer, benutzer_id, bauteil_id)
values ('Produktion','Bauteil ist fertiggestellt','2022-05-28','2022-05-28 10:45:00', '2022-05-28 21:45:20', AGE('2022-05-28 21:45:20','2022-05-28 10:45:00'), 8, 2);


