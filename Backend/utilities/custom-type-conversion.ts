import { Education, EducationGroup } from "../../src/types";
import { County, Geography } from "../../src/enums";

// Converts an Education to an EducationGroup
export function educationToEducationGroup(education: Education) {
    let educationGroup: EducationGroup = {
        title: education.title,
        url: education.url
    };
    return educationGroup;  
}

// Returns the Geography of a given County
export const countyToGeography = (county: County): Geography => {
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