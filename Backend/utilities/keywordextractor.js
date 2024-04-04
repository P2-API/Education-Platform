import axios from 'axios';

(async () => {
    try {

        const text = "During the training you will acquire the competences to work with nursing with the close involvement of the patient, citizen and relatives when making decisions about health and disease. You learn to take initiative, coordinate and take responsibility for nursing in collaboration with other professionals. As a nurse, you will have a central role in ensuring that health and illness processes are experienced in a coherent manner for the patient and relatives. As a nurse, you can work in public and private, in Denmark and internationally, with general and highly specialized areas. Nurse In the Nursing Training program, you get close to people who are in challenging situations and you learn how to conduct, lead, communicate and develop nursing. At the Nurse degree you alternate between theoretical and clinical instruction. You will work practically with what you learn at the Nursing Training and will have the opportunity to investigate and dive into issues you encounter in practice. The programme consists of 7 semesters. During the first 4 semesters, the overall content is the same at all training sites. The content is divided into four themes: Observation and assessment of patient and citizen health challenges and disease connections Clinical decision-making in stable and complex care and treatment processes Clinical leadership of patient and citizen processes Situation-specific communication in interaction with patients and citizens, relatives and professionals in and across sectors The remaining 3 semesters are organized at each training site. Fag You will be taught in the field of nursing and a number of other subjects: Nursing: nurses and care theory, nursery concepts and models as well as clinical methods in the care Health sciences: public health sciences, disease theory and science theory Sciences of nature: biochemistry, microbiology, anatomy and physiology Humanities: psychology, communication, philosophy and ethics Social science: sociology, anthropology, organization, management and law";

        const apiKey = 'eyJvcmciOiI2NTNiOTllNjEzOGM3YzAwMDE2MDM5NTEiLCJpZCI6ImMzZjhjZjY3NWQ5OTQ1ZWJhMmQwNmI0OTRiZTczNzRhIiwiaCI6Im11cm11cjEyOCJ9';
        const url = 'https://gw.cortical.io/nlp/keywords?limit=10';

        const requestData = {
            text: text,
            language: "en",
        };

        const response = await axios.post(url, requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apiKey,
                'limit': 10,
            }
        });

        const keywordsList = response.data.keywords.map(keyword => keyword.word);
        console.log("Keywords List:", keywordsList);
    } catch (error) {
        console.error('There was a problem:', error.message);
    }
})();
