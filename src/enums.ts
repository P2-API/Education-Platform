import { MinimumMaximum } from "./types"

export enum JobFlexibility {
    Fleksibel = "Fleksibel",
    Streng = "Streng",
}

export enum Geography {
    Nordjylland = "Nordjylland",
    Midtjylland = "Midtjylland",
    Hovedstaden = "Hovedstaden",
    Sjælland = "Sjælland",
    Syddanmark = "Syddanmark",
    Ukendt = "Ukendt",
    Uoplyst = "Uoplyst",
}

export enum Institution {
    "Aalborg Universitet" = "Aalborg Universitet",
    "Aarhus Maskinmesterskole" = "Aarhus Maskinmesterskole",
    "Aarhus Universitet" = "Aarhus Universitet",
    "Arkitektskolen Aarhus" = "Arkitektskolen Aarhus",
    "Copenhagen Business School - Handelshøjskolen" = "Copenhagen Business School - Handelshøjskolen",
    "Dalum Landbrugsskole" = "Dalum Landbrugsskole",
    "Danmarks Medie- og Journalisthøjskole" = "Danmarks Medie- og Journalisthøjskole",
    "Danmarks Tekniske Universitet" = "Danmarks Tekniske Universitet",
    "Den Danske Filmskole" = "Den Danske Filmskole",
    "Den Danske Scenekunstskole" = "Den Danske Scenekunstskole",
    "Den Frie Lærerskole" = "Den Frie Lærerskole",
    "Designskolen Kolding" = "Designskolen Kolding",
    "Det Fynske Kunstakademi" = "Det Fynske Kunstakademi",
    "Det Jyske Kunstakademi" = "Det Jyske Kunstakademi",
    "Det Jyske Musikkonservatorium" = "Det Jyske Musikkonservatorium",
    "Det Kgl. Danske Musikkonservatorium" = "Det Kgl. Danske Musikkonservatorium",
    "Det Kongelige Akademi - Arkitektur, Design, Konservering" = "Det Kongelige Akademi - Arkitektur, Design, Konservering",
    "Det Kongelige Danske Kunstakademi - Billedkunstskolerne" = "Det Kongelige Danske Kunstakademi - Billedkunstskolerne",
    Diakonissestiftelsen = "Diakonissestiftelsen",
    "EUC Nordvest" = "EUC Nordvest",
    "Erhvervsakademi Aarhus" = "Erhvervsakademi Aarhus",
    "Erhvervsakademi Dania" = "Erhvervsakademi Dania",
    "Erhvervsakademi MidtVest" = "Erhvervsakademi MidtVest",
    "Erhvervsakademi SydVest" = "Erhvervsakademi SydVest",
    "Erhvervsakademiet Copenhagen Business Academy" = "Erhvervsakademiet Copenhagen Business Academy",
    Forfatterskolen = "Forfatterskolen",
    "Fredericia Maskinmesterskole" = "Fredericia Maskinmesterskole",
    "IBA Erhvervsakademi Kolding" = "IBA Erhvervsakademi Kolding",
    "IT-Universitetet i København" = "IT-Universitetet i København",
    "Kriminalforsorgens Uddannelsescenter" = "Kriminalforsorgens Uddannelsescenter",
    "Københavns Erhvervsakademi (KEA)" = "Københavns Erhvervsakademi (KEA)",
    "Københavns Professionshøjskole" = "Københavns Professionshøjskole",
    "Københavns Universitet" = "Københavns Universitet",
    "MARTEC - Maritime and Polytechnic College" = "MARTEC - Maritime and Polytechnic College",
    "Marstal Navigationsskole" = "Marstal Navigationsskole",
    "Maskinmesterskolen København" = "Maskinmesterskolen København",
    "Møgelkær Fængsel" = "Møgelkær Fængsel",
    "Nyborg Søfartsskole" = "Nyborg Søfartsskole",
    Politiskolen = "Politiskolen",
    "Politiskolen, Uddannelsescenter Vest (UCV)" = "Politiskolen, Uddannelsescenter Vest (UCV)",
    "Professionshøjskolen Absalon" = "Professionshøjskolen Absalon",
    "Professionshøjskolen UC Syddanmark" = "Professionshøjskolen UC Syddanmark",
    "Professionshøjskolen University College Nordjylland" = "Professionshøjskolen University College Nordjylland",
    "Professionshøjskolen VIA University College" = "Professionshøjskolen VIA University College",
    "Roskilde Universitet" = "Roskilde Universitet",
    "Rytmisk Musikkonservatorium" = "Rytmisk Musikkonservatorium",
    "Skoleskibet Georg Stage" = "Skoleskibet Georg Stage",
    "Svendborg International Maritime Academy, SIMAC" = "Svendborg International Maritime Academy, SIMAC",
    "Svendborg Søfartsskole" = "Svendborg Søfartsskole",
    "Syddansk Musikkonservatorium" = "Syddansk Musikkonservatorium",
    "Syddansk Universitet" = "Syddansk Universitet",
    TietgenSkolen = "TietgenSkolen",
    "UCL Erhvervsakademi og Professionshøjskole" = "UCL Erhvervsakademi og Professionshøjskole",
    "Uddannelsen på landsplan" = "Uddannelsen på landsplan",
    "Vildtforvaltningsskolen, Kalø" = "Vildtforvaltningsskolen, Kalø",
    "Zealand Sjællands Erhvervsakademi" = "Zealand Sjællands Erhvervsakademi",
    "?" = "?",
}

export enum DegreeType {
    "Akademisk overbygningsuddannelse" = "Akademisk overbygningsuddannelse",
    Bacheloruddannelse = "Bacheloruddannelse",
    Erhvervsakademiuddannelse = "Erhvervsakademiuddannelse",
    Kandidatuddannelse = "Kandidatuddannelse",
    "Kunstnerisk uddannelse" = "Kunstnerisk uddannelse",
    "Politi og forsvar" = "Politi og forsvar",
    Professionsbacheloruddannelse = "Professionsbacheloruddannelse",
    "Andre uddannelser" = "Andre uddannelser",
}

export enum County {
    Ballerup = "Ballerup",
    Bornholm = "Bornholm",
    Brøndby = "Brøndby",
    Esbjerg = "Esbjerg",
    "Faaborg-Midtfyn" = "Faaborg-Midtfyn",
    Fredericia = "Fredericia",
    Frederiksberg = "Frederiksberg",
    Frederikshavn = "Frederikshavn",
    Guldborgsund = "Guldborgsund",
    Haderslev = "Haderslev",
    Hedensted = "Hedensted",
    Herning = "Herning",
    Hillerød = "Hillerød",
    Hjørring = "Hjørring",
    Holbæk = "Holbæk",
    Holstebro = "Holstebro",
    Horsens = "Horsens",
    "Ikast-Brande" = "Ikast-Brande",
    Kalundborg = "Kalundborg",
    Kolding = "Kolding",
    København = "København",
    Køge = "Køge",
    Lemvig = "Lemvig",
    "Lyngby-Taarbæk" = "Lyngby-Taarbæk",
    Mariagerfjord = "Mariagerfjord",
    Norddjurs = "Norddjurs",
    Næstved = "Næstved",
    Odense = "Odense",
    Randers = "Randers",
    Roskilde = "Roskilde",
    Rudersdal = "Rudersdal",
    Silkeborg = "Silkeborg",
    Skive = "Skive",
    Slagelse = "Slagelse",
    Svendborg = "Svendborg",
    Syddjurs = "Syddjurs",
    Sønderborg = "Sønderborg",
    Thisted = "Thisted",
    Tønder = "Tønder",
    Vejle = "Vejle",
    Viborg = "Viborg",
    Vordingborg = "Vordingborg",
    Ærø = "Ærø",
    Aabenraa = "Aabenraa",
    Aalborg = "Aalborg",
    Aarhus = "Aarhus",
    Ukendt = "Ukendt",
    Uoplyst = "Uoplyst",
}

export enum SubjectTitle {
    Billedkunst = "Billedkunst",
    Biologi = "Biologi",
    Dansk = "Dansk",
    Engelsk = "Engelsk",
    Filosofi = "Filosofi",
    Fysik = "Fysik",
    Geografi = "Geografi",
    Historie = "Historie",
    Idræt = "Idræt",
    Kemi = "Kemi",
    Matematik = "Matematik",
    Musik = "Musik",
    Naturfag = "Naturfag",
    Psykologi = "Psykologi",
    Samfundsfag = "Samfundsfag",
    Økonomi = "Økonomi",
}

export const CountyToGeography = (county: County): Geography => {
    switch (county) {
        case County['Ballerup']:
        case County['Bornholm']:
        case County['Brøndby']:
        case County['Frederiksberg']:
        case County['Hillerød']:
        case County['København']:
        case County['Lyngby-Taarbæk']:
        case County['Rudersdal']:
            return Geography['Hovedstaden']
        case County['Aarhus']:
        case County['Hedensted']:
        case County['Herning']:
        case County['Holstebro']:
        case County['Horsens']:
        case County['Ikast-Brande']:
        case County['Lemvig']:
        case County['Norddjurs']:
        case County['Randers']:
        case County['Silkeborg']:
        case County['Skive']:
        case County['Syddjurs']:
        case County['Viborg']:
            return Geography['Midtjylland']
        case County['Aalborg']:
        case County['Frederikshavn']:
        case County['Hjørring']:
        case County['Mariagerfjord']:
        case County['Thisted']:
            return Geography['Nordjylland']
        case County['Guldborgsund']:
        case County['Holbæk']:
        case County['Kalundborg']:
        case County['Køge']:
        case County['Næstved']:
        case County['Roskilde']:
        case County['Slagelse']:
        case County['Vordingborg']:
            return Geography['Sjælland']
        case County['Aabenraa']:
        case County['Ærø']:
        case County['Esbjerg']:
        case County['Faaborg-Midtfyn']:
        case County['Fredericia']:
        case County['Haderslev']:
        case County['Kolding']:
        case County['Odense']:
        case County['Sønderborg']:
        case County['Svendborg']:
        case County['Tønder']:
        case County['Vejle']:
            return Geography['Syddanmark']
        default:
            return Geography['Ukendt']

    }
}

export const DegreeTypeToDuration = (degreeType: (keyof typeof DegreeType)): MinimumMaximum => {
    switch (degreeType) {
        case DegreeType["Akademisk overbygningsuddannelse"]:
            return { minimum: 12, maximum: 12 };
        case DegreeType.Bacheloruddannelse:
            return { minimum: 36, maximum: 36 };
        case DegreeType.Erhvervsakademiuddannelse:
            return { minimum: 30, maximum: 30 };
        case DegreeType.Kandidatuddannelse:
            return { minimum: 24, maximum: 24 };
        case DegreeType['Kunstnerisk uddannelse']:
            return { minimum: 36, maximum: 36 };
        case DegreeType['Politi og forsvar']:
            return { minimum: 4, maximum: 36 };
        case DegreeType['Professionsbacheloruddannelse']:
            return { minimum: 18, maximum: 18 };
        case DegreeType['Andre uddannelser']:
            return { minimum: 4, maximum: 36 }

        default:
            throw "Degree type not handled!";
    }
}

export enum FormOfEducation {
    "E-læring (eksempelvis fjernundervisning)" = "E-læring (eksempelvis fjernundervisning)",
    "Faglig vejledning fra din underviser" = "Faglig vejledning fra din underviser",
    Forelæsninger = "Forelæsninger",
    "Gruppearbejde (læsegruppe, studiegruppe)" = "Gruppearbejde (læsegruppe, studiegruppe)",
    "Klasseundervisning (holdundervisning)" = "Klasseundervisning (holdundervisning)",
    "Praktik (herunder klinik eller projektorienteret forløb hos en offentlig eller privat virksomhed" = "Praktik (herunder klinik eller projektorienteret forløb hos en offentlig eller privat virksomhed",
    "Projektarbejde (både individuelt og i grupper)" = "Projektarbejde (både individuelt og i grupper)",
    "Selvstudie (forberedelse, læsning, hjemmeopgaver)" = "Selvstudie (forberedelse, læsning, hjemmeopgaver)",
    "Øvelsestimer (herunder værksteds- og laboratoriearbejde)" = "Øvelsestimer (herunder værksteds- og laboratoriearbejde)"
}