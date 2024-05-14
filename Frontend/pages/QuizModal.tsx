


import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { QuizAnswers } from ',,/../../src/types.tsx'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "800px",
    height: "500px",
    bgcolor: 'background.paper',
    border: '4px solid',
    borderColor: 'primary.main',
    borderRadius: "0.5em",
    boxShadow: 24,
    p: 4,
};

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ width: "800px", height: "30%" }}>
            <Box sx={{ minWidth: "800px", textAlign: "center", height: "100%", display: "flex", flexDirection: "column", justifyContent: "end" }}>
                <Typography sx={{ marginBottom: 2, marginLeft: "20px" }} variant="h5" color="black">{`${Math.round(
                    props.value,
                )}%`}</Typography>
                <LinearProgress style={{ height: 10, borderRadius: 2, color: "primary.main", marginTop: 0 }} variant="determinate" {...props} />

            </Box>
        </Box>
    );
}

type QuizModalProperties = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setQuizAnswerState: React.Dispatch<React.SetStateAction<QuizAnswers>>;
    quizAnswerState: QuizAnswers;
}

const QuizModal: React.FC<QuizModalProperties> = ({ isModalOpen, setIsModalOpen, setQuizAnswerState, quizAnswerState }) => {
    const questions = [
        {
            positiveReferencedAnswers: ["subjectsPriority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at uddannelsens faglige indhold er spændende?",
        },
        {
            positiveReferencedAnswers: ["industriesPriority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at uddanelsen passer til dine ønskede brancher?",
        },
        {
            positiveReferencedAnswers: ["socialEnvironmentPriority", "groupEngagementPriority"],
            negativeReferencedAnswers: ["lonelinessPriority"],
            question: "Hvor vigtigt er det for dig, at man i høj grad er social på studiet (gruppearbejde m.m.)?",
        },
        {
            positiveReferencedAnswers: ["academicEnvironmentPriority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at der er et godt fagligt miljø på studiet?",
        },
        {
            positiveReferencedAnswers: [],
            negativeReferencedAnswers: ["stressPriority", "highWorkloadAcceptancePriority"],
            question: "Hvor vigtigt er det for dig, at have meget fritid uden for studiet",
        },
        {
            positiveReferencedAnswers: ["studentJobPriority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at du kan få studiejob?",
        },
        {
            positiveReferencedAnswers: ["teachingPriority", "lecturesPriority"],
            negativeReferencedAnswers: ["literaturePriority"],
            question: "Hvor vigtigt er det for dig, at der høj grad er undevisning frem for selvstudie?",
        },
        {
            positiveReferencedAnswers: ["dislikeExamPriority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at have få eksamener?",
        },
        {
            positiveReferencedAnswers: ["internshipPriority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at du kommer i praktik?",
        },
        {
            positiveReferencedAnswers: ["internationalStayPriority"],
            negativeReferencedAnswers: ["workNationallyPriority"],
            question: "Hvor vigtigt er det for dig, at du kan arbejde eller studere internationalt?",
        },
        {
            positiveReferencedAnswers: ["startingSalaryPriority", "experiencedSalaryPriority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at der er høj løn på dine mulige jobs efter studiet?",
        },
        {
            positiveReferencedAnswers: ["unemploymentPriority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at der er lav arbejdsløshed på mulige jobs efter studiet?",
        },
        {
            positiveReferencedAnswers: ["degreeRelevancePriority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at uddannelsen er relevant på arbejdsmarkedet?",
        },
        {
            positiveReferencedAnswers: ["flexibleHoursPriority", "selfSchedulePriority"],
            negativeReferencedAnswers: ["fixedHoursPriority", "variableSchedulePriority"],
            question: "Hvor vigtigt er det for dig, at din arbejdstid i job efter studiet er fleksibel og selvbestemt?",
        },
        {
            positiveReferencedAnswers: [],
            negativeReferencedAnswers: ["nightAndEveningShiftsPriority"],
            question: "Hvor vigtigt er det for dig, at du ikke arbejder sent (aften og nat) på mulige jobs efter studiet?",
        },
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const currentQuestion = questions[currentQuestionIndex];

    const getProgress = () => (currentQuestionIndex) / questions.length * 100;

    const [sliderValue, SetSliderValue] = React.useState(3);
    const sliderMarks = [
        {
            value: 1,
            label: "Ikke Vigtigt"
        },
        {
            value: 5,
            label: "Meget Vigtigt"
        }
    ]




    const HandlePrevQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
    }

    const HandleNextQuestion = () => {

        const newAnswer: QuizAnswers = {
            ...quizAnswerState,
        };

        currentQuestion.positiveReferencedAnswers.forEach(propName => {
            newAnswer[propName as keyof QuizAnswers] = sliderValue;
        });

        currentQuestion.negativeReferencedAnswers.forEach(propName => {
            newAnswer[propName as keyof QuizAnswers] = (6 - sliderValue);
        })

        setQuizAnswerState(newAnswer);

        const isLastQuestion = (currentQuestionIndex + 1) == questions.length;
        if (isLastQuestion) {
            setIsModalOpen(false);
            setCurrentQuestionIndex(0);
            return;
        }

        SetSliderValue(3);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        console.log(newAnswer)
    }

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box height={"100%"}>
                    <Box sx={{ ...style, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0, height: "500px" }}>
                        <div style={{ height: "100%" }}>
                            <button className="red-button" style={{ borderRadius: 5, position: "absolute", top: 10, left: 10 }} onClick={() => setIsModalOpen(false)}>Luk quiz</button>

                            <div style={{ textAlign: "center", padding: "4em", paddingTop: 0, paddingBottom: 0, height: "70%", alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <Typography id="modal-modal-title" variant="h3" component="h2">
                                    UddannelsesQuiz
                                </Typography>
                                <Typography variant="h6" component="h3" mt={2}>
                                    {"Question " + (currentQuestionIndex + 1)}
                                </Typography>
                                <Typography mt={1}>
                                    {currentQuestion.question}
                                </Typography>
                                <Slider sx={{ marginLeft: "4px" }} onChange={(_e, value) => SetSliderValue(Number(value))}
                                    aria-label="discrete-slider-custom"
                                    defaultValue={3}
                                    value={sliderValue}
                                    step={1}
                                    marks={sliderMarks}
                                    min={1}
                                    max={5}
                                    valueLabelDisplay="auto"
                                />
                                <div style={{ display: 'flex', gap: '2em', justifyContent: 'center' }}>
                                    <button className='primary-button-blue' onClick={HandlePrevQuestion} disabled={currentQuestionIndex == 0}>
                                        Tilbage
                                    </button>
                                    <button className='primary-button-blue' onClick={HandleNextQuestion}>
                                        {currentQuestionIndex === questions.length - 1 ? 'Afslut quiz' : 'Næste'}
                                    </button>
                                </div>

                            </div>
                            <LinearProgressWithLabel sx={{ marginTop: "5em" }} value={getProgress()} />

                        </div>

                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default QuizModal;