export enum JobFlexibility {
    flexible = 1,
    strict = 2,
}

export enum Geography {
    //A
    //B
    "Ballerup" = 1,
    "Bornholm" = 2,
    "Brøndby" = 3,
    //C
    //D
    //E
    "Esbjerg" = 4,
    //F
    "Faaborg-Midtfyn" = 5,
    "Fredericia" = 6,
    "Frederiksberg" = 7,
    "Frederikshavn" = 8,
    //G
    "Guldborgsund" = 9,
    //H
    "Haderslev" = 10,
    "Hedensted" = 11,
    "Herning" = 12,
    "Hillerød" = 13,
    "Hjørring" = 14,
    "Holbæk" = 15,
    "Holstebro" = 16,
    "Horsens" = 17,
    //I
    "Ikast-Brande" = 18,
    //J
    //K
    "Kalundborg" = 19,
    "Kolding" = 20,
    "København" = 21,
    "Køge" = 22,
    //L
    "Lemvig" = 23,
    "Lyngby-Taarbæk" = 24,  
    //M
    "Mariagerfjord" = 25,
    //N
    "Norddjurs" = 26,
    "Næstved" = 27,
    //O
    "Odense" = 28,
    //P
    //Q
    //R
    "Randers" = 29,
    "Roskilde" = 30,
    "Rudersdal" = 31,
    //S
    "Silkeborg" = 32,
    "Skive" = 33,
    "Slagelse" = 34,
    "Svendborg" = 35,
    "Syddjurs" = 36,
    "Sønderborg" = 37,
    //T
    "Thisted" = 38,
    "Tønder" = 39,
    //U
    //V
    "Vejle" = 40,
    "Viborg" = 41,
    "Vordingborg" = 42,
    //W
    //X
    //Y
    //Z
    //AE
    //OE
    "Ærø" = 43,
    //AA
    "Aabenraa" = 44,
    "Aalborg" = 45,
    "Aarhus" = 46,


    //Andet
    "ukendt" = 1000,
    "uoplyst" = 1000,
}

export enum Institution {
    "Aalborg Universitet" = 1,
    "Aarhus Maskinmesterskole" = 2,
    "Aarhus Universitet" = 3,
    "Arkitektskolen Aarhus" = 4,
    "Copenhagen Business School - Handelshøjskolen" = 5,
    "Dalum Landbrugsskole" = 6,
    "Danmarks Medie- og Journalisthøjskole" = 7,
    "Danmarks Tekniske Universitet" = 8,
    "Den Danske Filmskole" = 9,
    "Den Danske Scenekunstskole" = 10,
    "Den Frie Lærerskole" = 11,
    "Designskolen Kolding" = 12,
    "Det Fynske Kunstakademi" = 13,
    "Det Jyske Kunstakademi" = 14,
    "Det Jyske Musikkonservatorium" = 15,
    "Det Kgl. Danske Musikkonservatorium" = 16,
    "Det Kongelige Akademi - Arkitektur, Design, Konservering" = 17,
    "Det Kongelige Danske Kunstakademi - Billedkunstskolerne" = 18,
    "Diakonissestiftelsen" = 19,
    "EUC Nordvest" = 20,
    "Erhvervsakademi Aarhus" = 21,
    "Erhvervsakademi Dania" = 22,
    "Erhvervsakademi MidtVest" = 23,
    "Erhvervsakademi SydVest" = 24,
    "Erhvervsakademiet Copenhagen Business Academy" = 25,
    "Forfatterskolen" = 26,
    "Fredericia Maskinmesterskole" = 27,
    "IBA Erhvervsakademi Kolding" = 28,
    "IT-Universitetet i København" = 29,
    "Kriminalforsorgens Uddannelsescenter" = 30,
    "Københavns Erhvervsakademi (KEA)" = 31,
    "Københavns Professionshøjskole" = 32,
    "Københavns Universitet" = 33,
    "MARTEC - Maritime and Polytechnic College" = 34,
    "Marstal Navigationsskole" = 35,
    "Maskinmesterskolen København" = 36,
    "Møgelkær Fængsel" = 37,
    "Nyborg Søfartsskole" = 38,
    "Politiskolen" = 39,
    "Politiskolen, Uddannelsescenter Vest (UCV)" = 40,
    "Professionshøjskolen Absalon" = 41,
    "Professionshøjskolen UC Syddanmark" = 42,
    "Professionshøjskolen University College Nordjylland" = 43,
    "Professionshøjskolen VIA University College" = 44,
    "Roskilde Universitet" = 45,
    "Rytmisk Musikkonservatorium" = 46,
    "Skoleskibet Georg Stage" = 47,
    "Svendborg International Maritime Academy, SIMAC" = 48,
    "Svendborg Søfartsskole" = 49,
    "Syddansk Musikkonservatorium" = 50,
    "Syddansk Universitet" = 51,
    "TietgenSkolen" = 52,
    "UCL Erhvervsakademi og Professionshøjskole" = 53,
    "Uddannelsen på landsplan" = 54,
    "Vildtforvaltningsskolen, Kalø" = 55,
    "Zealand Sjællands Erhvervsakademi" = 56,
    
    "?" = 1000,
}

export enum DegreeType {
    "Akademisk overbygningsuddannelse" = 1,
    "Bacheloruddannelse" = 2,
    "Erhvervsakademiuddannelse" = 3,
    "Kandidatuddannelse" = 4,
    "Kunstnerisk uddannelse" = 5,
    "Politi og forsvar" = 6,
    "Professionsbacheloruddannelse" = 7,

    "Andre uddannelser" = 1000,
}
