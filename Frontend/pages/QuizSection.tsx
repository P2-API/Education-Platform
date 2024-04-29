


import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
  width: 1000,
  height: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

type QuizModalProperties = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizModal: React.FC<QuizModalProperties> = ({ isModalOpen, setIsModalOpen }) => {
    const questions = [
        {
            positiveReferencedAnswers: ["geography_priority", "institution_priority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at du studerer tæt på din nuværende bopæl?",
        },
        {
            positiveReferencedAnswers: ["subjects_priority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at der er høj faglig interesse på studiet?",
        },
        {
            positiveReferencedAnswers: ["social_environment_priority", "group_engagement_priority"],
            negativeReferencedAnswers: ["loneliness_priority"],
            question: "Hvor vigtigt er det for dig, at der er et godt socialt miljø på studiet?",
        },
        {
            positiveReferencedAnswers: ["academic_environment_priority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at der er et godt fagligt miljø på studiet?",
        },
        {
            positiveReferencedAnswers: [],
            negativeReferencedAnswers: ["stress_priority", "high_workload_acceptance_priority"],
            question: "Hvor vigtigt er det for dig, at have meget fritid uden for studiet",
        },
        {
            positiveReferencedAnswers: ["student_job_priority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at du kan få studiejob?",
        },
        {
            positiveReferencedAnswers: ["teaching_priority", "lectures_priority"],
            negativeReferencedAnswers: ["literature_priority"],
            question: "Hvor vigtigt er det for dig, at der høj grad er undevisning frem for selvstudie?",
        },
        {
            positiveReferencedAnswers: ["dislike_exam_priority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at der er mindre eksamner?",
        },
        {
            positiveReferencedAnswers: ["internship_priority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at du kommer i praktik?",
        },
        {
            positiveReferencedAnswers: ["work_internationally_priority", "international_stay_priority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at du kan arbejde eller studere internationalt?",
        },
        {
            positiveReferencedAnswers: ["starting_salary_priority", "general_salary_priority", "experienced_salary_priority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at der er høj løn på dine mulige jobs efter studiet?",
        },
        {
            positiveReferencedAnswers: ["unemployment_priority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at der er lav arbejdsløshed på mulige jobs efter studiet?",
        },
        {
            positiveReferencedAnswers: ["degree_relevance_priority"],
            negativeReferencedAnswers: [],
            question: "Hvor vigtigt er det for dig, at dine mulige jobs har høj relevans på arbejdsmarkedet?",
        },
        {
            positiveReferencedAnswers: ["flexible_hours_priority", "self_schedule_priority"],
            negativeReferencedAnswers: ["fixed_hours_priority", "variable_schedule_priority"],
            question: "Hvor vigtigt er det for dig, at der er høj fleksibilitet på studiet?",
        },
        {
            positiveReferencedAnswers: [],
            negativeReferencedAnswers: ["night_and_evening_shifts_priority"],
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


    const [quizAnswerState, SetQuizAnwerState] = React.useState<QuizAnswers>();

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

        currentQuestion.negativeReferencedAnswers.forEach(propName =>{
            newAnswer[propName as keyof QuizAnswers] = (6 - sliderValue);            
        })

        SetQuizAnwerState(newAnswer);

        const isLastQuestion = (currentQuestionIndex + 1) == questions.length;
        if (isLastQuestion){
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
        <Box>            
            <Box sx={{ ...style, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ textAlign: "center", width: "700px"}}>
                    <Typography id="modal-modal-title" variant="h3" component="h2">
                        Preference Quiz
                    </Typography>
                    <Typography variant="h6" component="h3" mt={2}>
                        {"Question " + (currentQuestionIndex + 1)}
                    </Typography>
                    <Typography mt={1}>
                        {currentQuestion.question}
                    </Typography>
                    <Slider onChange={(e, value) => SetSliderValue(Number(value))}
                        aria-label="discrete-slider-custom"
                        defaultValue={3}
                        value={sliderValue}
                        step={1}
                        marks={sliderMarks}
                        min={1}
                        max={5}
                        valueLabelDisplay="auto"
                    />
                    <div style={{display: 'flex', gap: '2em', justifyContent: 'center'}}>                       
                        <Button onClick={HandlePrevQuestion} disabled={currentQuestionIndex == 0}>
                            Tilbage
                        </Button>                          
                        <Button onClick={HandleNextQuestion}>
                            Næste
                        </Button>    
                    </div>            
                    <LinearProgressWithLabel value={getProgress()} />
                </div>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default QuizModal;